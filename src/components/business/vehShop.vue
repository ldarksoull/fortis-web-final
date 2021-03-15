<template>
    <div class="wrapper">
        <div class="cars-shop" :class="styleShop()">
            <div class="main">
                <div class="left">
                    <div class="shop-logo">
                        <div :class="iconStyleShop()"><img :src="imgStyleShop()" alt=""></div>
                    </div>
                    <div class="cars-list" ref="carsList">
                        <div class="cars-list-wrapper">
                            <div class="cars-item-wrapper" v-for="(veh,key) in catalogData" :key='key'>
                                <div class="cars-item" @click="selectCar(key)" :class="isActive(key)">{{veh.title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="camera">
                    <div class="camera-item">
                        <div class="item-icon">Q</div>
                        <div class="item-text">Повернуть влево</div>
                    </div>
                    <div class="camera-item">
                        <div class="item-icon">E</div>
                        <div class="item-text">Повернуть вправо</div>
                    </div>
                    <div class="camera-item" @click="exit()">
                        <div class="item-icon">ESC</div>
                        <div class="item-text">Выйти</div>
                    </div>
                </div>
                <div class="right">
                    <div class="block-1">
                        <div class="title">Характеристики</div>
                        <div class="items">
                            <div class="item">
                                <div class="item-name">Скорость</div>
                                <div class="item-bar">
                                    <div class="filler filler-1" :style="{width: selectVeh.maxSpeed + '%'}"></div>
                                </div>
                                <div class="item-info">{{selectVeh.maxSpeedKm}} км/ч</div>
                            </div>
                            <div class="item" v-if="option.styleShop !== 'pegassi'">
                                <div class="item-name">Ускорение</div>
                                <div class="item-bar">
                                    <div class="filler filler-2" :style="{width: selectVeh.acceleration + '%'}"></div>
                                </div>
                                <div class="item-info">{{selectVeh.acceleration}}</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Тормоза</div>
                                <div class="item-bar">
                                    <div class="filler filler-3" :style="{width: selectVeh.braking + '%'}"></div>
                                </div>
                                <div class="item-info">{{selectVeh.braking}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="block-2">
                        <div class="items">
                            <div class="item">
                                <div class="item-name">Тип двигателя</div>
                                <div class="item-info">{{getEngineType(catalogData[select].engineType)}}</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Расход топлива</div>
                                <div class="item-info">{{catalogData[select].fuelRate / 10 | roundNum(1)}}</div>
                            </div>
                            <div class="item">
                                <div class="item-name">Вместимость бака</div>
                                <div class="item-info">{{catalogData[select].fuelTank}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="colors">
                    <div class="colors-title">Цвет</div>
                    <div class="colors-list">
                        <div class="colors-list-item color-1" @click="selectColor(1)" :class="{active: colorSelect === 1}"></div>
                        <div class="colors-list-item color-2" @click="selectColor(2)" :class="{active: colorSelect === 2}"></div>
                        <div class="colors-list-item color-3" @click="selectColor(3)" :class="{active: colorSelect === 3}"></div>
                        <div class="colors-list-item color-4" @click="selectColor(4)" :class="{active: colorSelect === 4}"></div>
                        <div class="colors-list-item color-5" @click="selectColor(5)" :class="{active: colorSelect === 5}"></div>
                        <div class="colors-list-item color-6" @click="selectColor(6)" :class="{active: colorSelect === 6}"></div>
                        <div class="colors-list-item color-7" @click="selectColor(7)" :class="{active: colorSelect === 7}"></div>
                        <div class="colors-list-item color-8" @click="selectColor(8)" :class="{active: colorSelect === 8}"></div>
                        <div class="colors-list-item color-9" @click="selectColor(9)" :class="{active: colorSelect === 9}"></div>
                        <div class="colors-list-item color-10" @click="selectColor(10)" :class="{active: colorSelect === 10}"></div>
                    </div>
                </div>
                <div class="price">
                    <div class="price-title">Цена </div>
                    <div class="price-num">{{catalogData[select].price}} $</div>
                </div>
                <!-- <div class="buy"> -->
                    <div class="buy-btn" @click="modalPage = 'buy'">Купить</div>
                <!-- </div> -->
            </div>
            <transition name="scale">
            <div class="modal" v-if="modalPage === 'buy'">
                <div class="modal-body">
                    <div class="modal-text">Выберите цель покупки транспортного средства</div>
                </div>
                <div class="modal-footer">
                    <div class="modal-btn" @click="buyCar(false)">Для себя</div>
                    <div class="modal-btn" @click="buyCar(true)">Для фракции</div>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data(){
        return{
            modalPage: '',
            colorSelect: 1,
            select: 0,
            car:{
                speed: 0,
                acc: 0,
                move: 0
            },
            catalogColor:[
                    [],
                    [12,12,12],
                    [184,188,191],
                    [66,77,83],
                    [154,155,149],
                    [176,17,39],
                    [202,68,31],
                    [253,192,23],
                    [25,103,51],
                    [40,84,159],
                    [19,36,82]
                ],
            engineTypes: ["Бензин", "Дизель", "Электрический"],
            isDelayed: false,
        }
    },
	
	computed: {
		...mapGetters({
				id: "enterBusiness",
				option: "getFirstObj",
                selectVeh: "getSecondObj",
				catalogData: "getArrayFirst",
				colors: "getArraySecond",
				
			}),
	},
    methods:{
		styleShop(){
			return this.option.styleShop;
		},
		imgStyleShop(){
			return "/img/car-shop/"+this.option.styleShop+"-logo.png";
		},
		iconStyleShop(){
			return this.option.styleShop+"-icon";
		},
        selectCar(car){
            this.select = car;
            mp.trigger("cVehShopSpawn",  JSON.stringify(this.catalogData[car]),this.option.dim);
            mp.trigger("cVehShopColor",  JSON.stringify(this.catalogColor[this.colorSelect]));
        },
        isActive(key){
            if(key === this.select) return 'active';
        },
        selectColor(color){
            this.colorSelect = color;
            mp.trigger("cVehShopColor",  JSON.stringify(this.catalogColor[this.colorSelect]));
        },
        buyCar(forFaction){
			const obj = { model: this.catalogData[this.select].model, id: this.id, color: this.catalogColor[this.colorSelect], price: this.catalogData[this.select].price, forFaction: forFaction};
			mp.trigger("cMisc-CallServerEvent", "sVehShopBuy", JSON.stringify(obj));
            this.modalPage = '';
			this.exit();
		},
        exit() {
            mp.trigger("cVehShopExit");
			mp.trigger("cSetPage","none");
		},
        onKeyUp(e){
            if( e.keyCode === 27){
				this.exit();
			}
            
        },
        onKeyDown(e){
            /*q*/
            if( e.keyCode === 81){
                mp.trigger("cVehShopTurn",'l');
            }
            /*e*/
            if( e.keyCode === 69){
                mp.trigger("cVehShopTurn",'r');
            }
            /*down*/
            if (e.keyCode === 40) {
                if (this.delay()) return;
                if (this.select + 1 === this.catalogData.length) {
                    this.select = 0;
                } else {
                    this.select++;
                }
                this.selectCar(this.select);
                this.scrollPage();
            }
            /*up*/
            if (e.keyCode === 38) {
                if (this.delay()) return;
                if (this.select - 1 < 0) {
                    this.select = this.catalogData.length - 1;
                } else {
                    this.select--;
                }
                this.selectCar(this.select);
                this.scrollPage();
            }
        },
        delay() {
            if (this.isDelayed) {
                return true;
            } else {
                setTimeout(()=>{
                    this.isDelayed = false;
                }, 2000)
                this.isDelayed = true;
                return false;
            }
        },
        scrollPage() {
            const el = document.querySelector('.cars-item-wrapper');
            this.$refs.carsList.scrollTop = el.scrollHeight * this.select - el.scrollHeight * 4;
        },
        getEngineType(typeNumber) {
            return this.engineTypes[typeNumber];
        },
    },
    created() {
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('keydown', this.onKeyDown);

        mp.trigger("cVehShopSpawn",  JSON.stringify(this.catalogData[this.select]),this.option.dim);
        mp.trigger("cVehShopColor",  JSON.stringify(this.catalogColor[this.colorSelect]));
    },
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyUp);
        document.removeEventListener('keydown',this.onKeyDown);
	},
}
</script>
<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
* {
	padding: 0;
  	margin: 0;
  	outline: 0;
	text-decoration: none;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
li {
    list-style: none;
}
.camera{
    top: 2vh;
    right: 3vw;
    /*width: 380px;*/
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    /*background-color: rgba(10, 34, 81, 0.753);*/
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    align-self: end;
}
.camera-item{
    display: flex;
    align-items: center;
    padding: 10px;
}
.camera .item-icon{
    color: inherit;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    /*width: 15px;*/
}
.camera .item-text{
    color: inherit;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.94px;
    margin-left: 8px;
    font-weight: 600;
}

.wrapper{
	width: 100%;
	height: 100vh;
}
    .color-1{
        background-color: #0c0c0c;
    }
    .color-2{
        background-color: #b8bcbf;
    }
    .color-3{
        background-color: #424d53;
    }
    .color-4{
        background-color: #9a9b95;
    }
    .color-5{
        background-color: #b01127;
    }
    .color-6{
        background-color: #ca441f;
    }
    .color-7{
        background-color: #fdc017;
    }
    .color-8{
        background-color: #196733;
    }
    .color-9{
        background-color: #28549f;
    }
    .color-10{
        background-color: #132452;
    }
    .exit{
        position: absolute;
        top: 2.03vw;
        right: 2.03vw;
        color: #f5f5f6;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 700;
    }
    .cars-shop{
        padding: 2vw;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100vh;
    }
    .main{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        height: 100%;
    }
    .left{
        padding-bottom: 2vw;
        padding-left: 1vw;
        z-index: 2;
        width: 23.75vw;
        height: 30.7vw;
        border-radius: 1.04vw;
    }
    .right .block-1{
        width: 17.24vw;
        /*height: 16vw;*/
        border-radius: 1.04vw;
        margin-bottom: 0.73vw;
    }
    .right .block-2{
        width: 17.24vw;
        border-radius: 1.04vw;
    }
    .right .block-1 .title{
        width: 100%;
        text-align: center;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 700;
        letter-spacing: -0.75px;
        padding: 1vw 0 0 0;
    }
    .block-1 .items{
        padding: 1vw;
    }
    .block-1 .item{
        position: relative;
        margin-bottom: 1vw;
    }
    .block-1 .item-name{
        font-family: "Century Gothic";
        font-size: 1.15vw;
        font-weight: 700;
    }
    .block-1 .item-bar{
        width: 100%;
        height: 0.68vw;
        border-radius: 0.36vw;
        margin-top: 0.83vw;
    }
    .block-1 .item-info{
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 700;
        position: absolute;
        right: 0;
        bottom: 0.9vw
    }
    .block-1 .filler{
        height: 100%;
        transition: 0.4s;
        border-radius: 0.36vw;
    }
    .block-2 .items{
        padding: 1vw;
    }
    .block-2 .item{
        margin-bottom: 0.5vw;
    }
    .block-2 .item-name, .block-2 .item-info{
        font-family: "Century Gothic";
        font-size: 1.15vw;
        font-weight: 700;
    }
    .block-2 .item-info{
        width: 100%;
        height: 1.61vw;
        border-radius: 0.78vw;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0.6vw;
        margin-top: 0.7vw;
    }
    .shop-logo{
        height: 27%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cars-list{
        height: 73%;
        width: 100%;
        overflow: auto;
        direction: rtl;
        padding-left: 0.72vw;
        z-index: 2;
        padding-right: 1.72vw;
        padding-top: 0.5vw;
        padding-bottom: 0.5vw;
    }
    .cars-list-wrapper{
        direction: ltr;
    }
    .cars-item{
        width: 100%;
        height: 3.07vw;
        border-radius: 1.04vw;
        margin-bottom: 0.57vw;
        font-family: "Century Gothic";
        font-size: 1.15vw;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 1.77vw;
        z-index: 3;
        position: relative;
        transition: 0.2s;
    }
    .footer{
        display: flex;
        bottom: 3vh;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }
    .colors-title{
        font-family: "Century Gothic";
        font-size: 1.88vw;
        font-weight: 700;
        margin-bottom: 0.5vw;
    }
    .colors-list{
        display: flex;
    }
    .colors-list-item{
        margin-right: 0.68vw;
        height: 2.76vw;
        width: 2.76vw;
        border-radius: 50%;
        transition: 0.2s;
    }
    .colors-list-item.active{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .price{
    }
    .price-title{
        font-family: "Century Gothic";
        font-size: 1.88vw;
        font-weight: 700;
    }
    .price-num{
        font-family: "Century Gothic";
        font-size: 3vw;
        font-weight: bold;
    }
    .buy{
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    .buy-btn{
        width: 17.24vw;
        height: 5.21vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: "Century Gothic";
        font-size: 1.88vw;
        font-weight: 700;
        border-radius: 2.08vw;
    } 
    .modal{
        width: 32.14vw;
        height: 16.56vw;
        position: absolute;
        padding-bottom: 1.98vw;
        border-radius: 1.04vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        top: calc(50% - 16.56vw / 2);
        left: calc(50% - 32.14vw / 2);
    }
    .modal-text{
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 400;
        text-align: center;
        padding-left: 5.21vw;
        padding-right: 5.21vw;
    }
    .modal-footer{
        display: flex;
        justify-content: space-evenly;
        margin-top: 3.28vw;
    }
    .modal-btn{
        font-family: "Century Gothic";
        font-size: 1.25vw;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 11.82vw;
        height: 3.65vw;
        border-radius: 0.52vw;
        transition: 0.2s;
    }
	
	.scale-enter-active, .scale-leave-active {
        transition: all .2s;
        transform: scale(1)
    }
    .scale-enter, .scale-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: scale(0.5)
    }
	
	img{
        max-width: 100%;
    }
	
	/* nagasaki ============================================================================= */
    .nagasaki{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .nagasaki .left,
    .nagasaki .camera{
        background-color: rgba(0, 5, 33, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .nagasaki .right .block-1{
        background-color: rgba(6, 11, 37, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .nagasaki .right .block-2{
        background-color: rgba(6, 11, 37, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .nagasaki .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .nagasaki .cars-list::-webkit-scrollbar-track{
        background-color: #04081b;
        border-radius: 0.16vw;
    }
    .nagasaki .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(229, 8, 64, 0.38);
        background-color: #e50840;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .nagasaki-icon{
        width: 17.24vw;
        height: 5.16vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nagasaki .block-1 .title,
    .nagasaki .camera{
        color: #ffffff;
    }
    .nagasaki .block-1 .item-name{
        color: #ffffff;
    }
    .nagasaki .block-1 .item-bar{
        background-color: #090e28;
    }
    .nagasaki .block-1 .item-info{
        color: #ffffff;
    }
    .nagasaki .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(229, 8, 64, 0.38);
        background-color: #e50840;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .nagasaki .block-2 .items{
        color: #ffffff;
    }
    .nagasaki .block-2 .item-info{
        color: #ffffff;
        background-color: #060b25;
    }
    .nagasaki .cars-item{
        background-color: #090e28;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #ffffff;
    }
    .nagasaki .cars-item:hover,.nagasaki .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(229, 8, 64, 0.38);
        background-color: #e50840;
        color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .nagasaki .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .nagasaki .price-title{
        color: #ffffff;
    }
    .nagasaki .price-num{
        color: #ffffff;
    }
    .nagasaki .buy-btn{
        box-shadow: 0 0 1vw 0.1vw rgba(229, 8, 64, 0.38);
        background-color: #e50840;
        transition: 0.2s;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .nagasaki .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(229, 8, 64, 0.38);
    }
    .nagasaki .colors-title{
        color: #f5f5f6;
    }
    .nagasaki .filler-1{
        width: 40%;
    }
    .nagasaki .filler-2{
        width: 20%;
    }
    .nagasaki .filler-3{
        width: 10%;
    }
    
    .nagasaki .modal{
        background-color: rgba(5, 10, 35, 0.95);
    }
    .nagasaki .modal-text{
        color: #ffffff;
    }
    .nagasaki .modal-btn{
        border: 1px solid #e30b42;
        color: #ffffff;
    }
    .nagasaki .modal-btn:hover{
        background-color: #e50840;
        color: #ffffff;
    }
    /* albany =========================================================================*/
	
	.albany{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .albany .left,
    .albany .camera{
        background-color: rgba(22, 61, 152, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .albany .right .block-1{
        background-color: rgba(25, 64, 148, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .albany .right .block-2{
        background-color: rgba(25, 64, 148, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .albany .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .albany .cars-list::-webkit-scrollbar-track{
        background-color: #183d91;
        border-radius: 0.16vw;
    }
    .albany .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(112, 129, 218, 0.38);
        background-color: #e9e9e9;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .albany-icon{
        width: 14.43vw;
        height: 6.51vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .albany .block-1 .title
    .albany .camera{
        color: #f5f5f6;
    }
    .albany .block-1 .item-name{
        color: #f5f5f6;
    }
    .albany .block-1 .item-bar{
        background-color: #14357f;
    }
    .albany .block-1 .item-info{
        color: #f5f5f6;
    }
    .albany .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(255, 255, 255, 0.22);
        background-color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .albany .block-2 .items{
        color: #f5f5f6;  
    }
    .albany .block-2 .item-info{
        background-color: #14357f;
    }
    .albany .cars-item{
        background-color: #143682;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #ffffff;
    }
    .albany .cars-item:hover,.albany .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(255, 255, 255, 0.38);
        background-color: #ffffff;
        color: #204bad;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .albany .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .albany .price-title{
        color: #ffffff;
    }
    .albany .price-num{
        color: #ffffff;
    }
    .albany .buy-btn{
        box-shadow: 0 0 1vw 0.1vw  rgba(255, 255, 255, 0.38);
        transition: 0.2s;
        background-color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #224cac;
    }
    .albany .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(255, 255, 255, 0.38);
    }
    .albany .colors-title{
        color: #f5f5f6;
    }
    .albany .filler-1{
        width: 40%;
    }
    .albany .filler-2{
        width: 20%;
    }
    .albany .filler-3{
        width: 10%;
    }
    .albany .modal{
        background-color: rgba(21, 58, 145, 0.95);
    }
    .albany .modal-text{
        color: #ffffff;
    }
    .albany .modal-btn{
        border: 1px solid #ffffff;
        color: #ffffff; 
    }
    .albany .modal-btn:hover{
        background-color: #ffffff;
        color: #14398c;
    }
	
	/* benefactor ==================================================================================*/
    .benefactor{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .benefactor .left,
    .benefactor .camera{
        background-color: rgba(16, 21, 35, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .benefactor .right .block-1{
        background-color: rgba(16, 21, 35, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .benefactor .right .block-2{
        background-color: rgba(16, 21, 35, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .benefactor .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .benefactor .cars-list::-webkit-scrollbar-track{
        background-color: #292343;
        border-radius: 0.16vw;
    }
    .benefactor .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(18, 171, 101, 0.38);
        background-color: #12ab65;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .benefactor-icon{
        width: 8.28vw;
        height: 6.61vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .benefactor .block-1 .title,
    .benefactor .camera{
        color: #f5f5f6;
    }
    .benefactor .block-1 .item-name{
        color: #f5f5f6;
    }
    .benefactor .block-1 .item-bar{
        background-color: #15151f;
    }
    .benefactor .block-1 .item-info{
        color: #f5f5f6;
    }
    .benefactor .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(12, 172, 99, 0.38);
        background-color: #12ab65;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .benefactor .block-2 .items{
        color: #f5f5f6;  
    }
    .benefactor .block-2 .item-info{
        background-color: #15151f;
    }
    .benefactor .cars-item{
        background-color: #151520;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #ffffff;
    }
    .benefactor .cars-item:hover,.benefactor .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(0, 173, 94, 0.38);
        background-color: #12ab65;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .benefactor .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    
    .benefactor .price-title{
        color: #ffffff;
    }
    .benefactor .price-num{
        color: #ffffff;
    }
    .benefactor .buy-btn{
        box-shadow: 0 0 1vw 0.1vw rgba(34, 169, 107, 0.38);
        transition: 0.2s;
        background-color: rgba(7, 172, 98, 0.95);
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .benefactor .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(34, 169, 107, 0.38);
    }
    .benefactor .colors-title{
        color: #f5f5f6;
    }
    .benefactor .filler-1{
        width: 40%;
    }
    .benefactor .filler-2{
        width: 20%;
    }
    .benefactor .filler-3{
        width: 10%;
    }
    img{
        max-width: 100%;
    }
    .benefactor .modal{
        background-color: rgba(22, 26, 39, 0.95);
    }
    .benefactor .modal-text{
        color: #ffffff;
    }
    .benefactor .modal-btn{
        border: 1px solid #0ca961;
        color: #ffffff; 
    }
    .benefactor .modal-btn:hover{
        background-color: #0ca961;
    }
	/* enus ================================================================================= */
	
	.enus{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .enus .left,
    .enus .camera{
        background-color: rgba(16, 16, 16, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .enus .right .block-1{
        background-color: rgba(22, 22, 21, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .enus .right .block-2{
        background-color: rgba(22, 22, 21, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .enus .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .enus .cars-list::-webkit-scrollbar-track{
        background-color: #15151f;
        border-radius: 0.16vw;
    }
    .enus .cars-list::-webkit-scrollbar-thumb{
        box-shadow: 0 0 1.41vw rgba(36, 164, 207, 0.38);
        border-radius: 0.16vw;
        background-color: #0aa6db;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .enus-icon{
        width: 7.34vw;
        height: 7.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .enus .block-1 .title,
    .enus .camera{
        color: #f5f5f6;
    }
    .enus .block-1 .item-name{
        color: #f5f5f6;
    }
    .enus .block-1 .item-bar{
        background-color: #161615;
    }
    .enus .block-1 .item-info{
        color: #f5f5f6;
    }
    .enus .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(60, 162, 197, 0.38);
        background-color: #21a4d1;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .enus .block-2 .items{
        color: #f5f5f6;  
    }
    .enus .block-2 .item-info{
        background-color: #161615;
    }
    .enus .cars-item{
        background-color: #161615;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #ffffff;
    }
    .enus .cars-item:hover,.enus .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(36, 164, 207, 0.38);
        background-color: #03a7de;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .enus .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    
    .enus .price-title{
        color: #ffffff;
    }
    .enus .price-num{
        color: #ffffff;
    }
    .enus .buy-btn{
        box-shadow: 0 0 1vw 0.1vw rgba(27, 165, 211, 0.38);
        transition: 0.2s;
        background-color: rgba(28, 165, 211, 0.95);
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .enus .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(27, 165, 211, 0.38);
    }
    .enus .colors-title{
        color: #f5f5f6;
    }
    .enus .filler-1{
        width: 40%;
    }
    .enus .filler-2{
        width: 20%;
    }
    .enus .filler-3{
        width: 10%;
    }
	
    .enus .modal{
        background-color: rgba(20, 20, 19, 0.95);
    }
    .enus .modal-text{
        color: #ffffff;
    }
    .enus .modal-btn{
        border: 1px solid #03a7de;
        color: #ffffff; 
    }
    .enus .modal-btn:hover{
        background-color: #03a7de;
    }
	
	/* grotti  =====================================================================================*/
	
	.grotti{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .grotti .left,
    .grotti .camera{
        background-color: rgba(255, 255, 255, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .grotti .right .block-1{
        background-color: rgba(250, 250, 250, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .grotti .right .block-2{
        background-color: rgba(255, 255, 255, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .grotti .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .grotti .cars-list::-webkit-scrollbar-track{
        background-color: #c2c2c2;
        border-radius: 0.16vw;
    }
    .grotti .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(35, 159, 124, 0.38);
        background-color: #02a074;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .grotti-icon{
        width: 5.26vw;
        height: 6.61vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .grotti .block-1 .title,
    .grotti .camera{
        color: #000000;
    }
    .grotti .block-1 .item-name{
        color: #000000;
    }
    .grotti .block-1 .item-bar{
        background-color: #e0e1e5;
    }
    .grotti .block-1 .item-info{
        color: #000000;
    }
    .grotti .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(17, 156, 117, 0.22);
        background-color: #02a074;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .grotti .block-2 .items{
        color: #000000;
    }
    .grotti .block-2 .item-info{
        color: #000000;
        background-color: #e0e1e5;
    }
    .grotti .cars-item{
        background-color: #e0e1e5;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #000000;
    }
    .grotti .cars-item:hover,.grotti .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(35, 159, 124, 0.16);
        background-color: #02a074;
        color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .grotti .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .grotti .price-title{
        color: #ffffff;
    }
    .grotti .price-num{
        color: #ffffff;
    }
    .grotti .buy-btn{
        box-shadow: 0 0 1vw 0.1vw rgba(35, 159, 124, 0.2);
        background-color: #02a074;
        transition: 0.2s;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .grotti .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(35, 159, 124, 0.2);
    }
    .grotti .colors-title{
        color: #f5f5f6;
    }
    .grotti .filler-1{
        width: 40%;
    }
    .grotti .filler-2{
        width: 20%;
    }
    .grotti .filler-3{
        width: 10%;
    }
    .grotti .modal{
        background-color: rgba(246, 246, 245, 0.95);
    }
    .grotti .modal-text{
        color: #000000;
    }
    .grotti .modal-btn{
        border: 1px solid #079d73;
        color: #000000;
    }
    .grotti .modal-btn:hover{
        background-color: #079d73;
        color: #ffffff;
    }
	/* jobuilt ====================================================================================*/
	.jobuilt{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .jobuilt .left,
    .jobuilt .camera{
        background-color: rgba(255, 255, 255, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .jobuilt .right .block-1{
        background-color: rgba(250, 250, 250, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .jobuilt .right .block-2{
        background-color: rgba(255, 255, 255, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .jobuilt .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .jobuilt .cars-list::-webkit-scrollbar-track{
        background-color: #c2c2c2;
        border-radius: 0.16vw;
    }
    .jobuilt .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(112, 129, 218, 0.38);
        background-color: #6a80f4;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .jobuilt-icon{
        width: 13.23vw;
        height: 7.19vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .jobuilt .block-1 .title,
    .jobuilt .camera{
        color: #6c81f1;
    }
    .jobuilt .block-1 .item-name{
        color: #6c81f1;
    }
    .jobuilt .block-1 .item-bar{
        background-color: #e0e1e5;
    }
    .jobuilt .block-1 .item-info{
        color: #6c81f1;
    }
    .jobuilt .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(160, 175, 255, 0.38);
        background-color: #677ff9;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .jobuilt .block-2 .items{
        color: #677ff9; 
    }
    .jobuilt .block-2 .item-info{
        color: #6c81f1;
        background-color: #e0e1e5;
    }
    .jobuilt .cars-item{
        background-color: #e0e1e5;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #6c7de7;
    }
    .jobuilt .cars-item:hover,.jobuilt .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(160, 175, 255, 0.38);
        background-color: #6a80f4;
        color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .jobuilt .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .jobuilt .price-title{
        color: #ffffff;
    }
    .jobuilt .price-num{
        color: #ffffff;
    }
    .jobuilt .buy-btn{
        box-shadow: 0 0 1vw 0.1vw  rgba(160, 175, 255, 0.2);
        background-color: #6a80f4;
        transition: 0.2s;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .jobuilt .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(160, 175, 255, 0.2);
    }
    .jobuilt .colors-title{
        color: #f5f5f6;
    }
    .jobuilt .filler-1{
        width: 40%;
    }
    .jobuilt .filler-2{
        width: 20%;
    }
    .jobuilt .filler-3{
        width: 10%;
    }
    .jobuilt .modal{
        background-color: rgba(246, 246, 245, 0.95);
    }
    .jobuilt .modal-text{
        color: #7586e0;
    }
    .jobuilt .modal-btn{
        border: 1px solid #7586e0;
        color: #7586e0;
    }
    .jobuilt .modal-btn:hover{
        background-color: #7586e0;
        color: #ffffff;
    }
	/* ========================================================================================= */
	
	.pegassi{
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.589) 100%);
        background-size: cover;
    }
    .pegassi .left,
    .pegassi .camera{
        background-color: rgba(37, 20, 40, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .pegassi .right .block-1{
        background-color: rgba(52, 34, 56, 0.95);
        background-image: linear-gradient(31deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .pegassi .right .block-2{
        background-color: rgba(44, 28, 47, 0.95);
        background-image: linear-gradient(66deg, rgba(136, 136, 136, 0) 0%, rgba(136, 136, 136, 0.18) 100%);
    }
    .pegassi .cars-list::-webkit-scrollbar {
        width: 0.36vw!important;
    }
    .pegassi .cars-list::-webkit-scrollbar-track{
        background-color: #251428;
        border-radius: 0.16vw;
    }
    .pegassi .cars-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        box-shadow: 0 0 1.41vw rgba(255, 167, 174, 0.38);
        background-color: #ffa7ae;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .pegassi-icon{
        width: 5.31vw;
        height: 6.82vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pegassi .block-1 .title,
    .pegassi .camera{
        color: #f5f5f6;
    }
    .pegassi .block-1 .item-name{
        color: #f5f5f6;
    }
    .pegassi .block-1 .item-bar{
        background-color: #2c1c2f;
    }
    .pegassi .block-1 .item-info{
        color: #f5f5f6;
    }
    .pegassi .block-1 .filler{
        box-shadow: 0 0 1vw 0.3vw rgba(255, 167, 174, 0.27);
        background-color: #ffa7ae;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .pegassi .block-2 .items{
        color: #f5f5f6;  
    }
    .pegassi .block-2 .item-info{
        background-color: #2c1c2f;
    }
    .pegassi .cars-item{
        background-color: #251428;
        background-image: linear-gradient(31deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.02) 100%);
        color: #fffefe;
    }
    .pegassi .cars-item:hover,.pegassi .cars-item.active{
        box-shadow: 0 0 0.5vw 0.2vw rgba(255, 167, 174, 0.38);
        background-color: #ffa7ae;
        color: #ffffff;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
    }
    .pegassi .colors-list-item:hover{
        box-shadow: 0 0 0px 3px #6b6b6b;
    }
    .pegassi .price-title{
        color: #ffffff;
    }
    .pegassi .price-num{
        color: #ffffff;
    }
    .pegassi .buy-btn{
        box-shadow: 0 0 1vw 0.1vw  rgba(254, 167, 174, 0.38);
        transition: 0.2s;
        background-color: #fea7ae;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        color: #ffffff;
    }
    .pegassi .buy-btn:hover{
        box-shadow: 0 0 2vw 0.5vw rgba(254, 167, 174, 0.38);
    }
    .pegassi .colors-title{
        color: #f5f5f6;
    }
    .pegassi .filler-1{
        width: 40%;
    }
    .pegassi .filler-2{
        width: 20%;
    }
    .pegassi .filler-3{
        width: 10%;
    }
    img{
        max-width: 100%;
    }
    .pegassi .modal{
        background-color: rgba(52, 34, 56, 0.95);
    }
    .pegassi .modal-text{
        color: #f5f5f6;
    }
    .pegassi .modal-btn{
        border: 1px solid #ffa7ae;
        color: #ffffff; 
    }
    .pegassi .modal-btn:hover{
        background-color: #ffa7ae;
    }
</style>