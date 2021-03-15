<template>
    <div class="wrapper">
        <div class="camera">
            <div class="camera-item">
                <div class="camera-item-icon">Q</div>
                <div class="camera-item-text">Повернуть влево</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">E</div>
                <div class="camera-item-text">Повернуть вправо</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">Esc</div>
                <div class="camera-item-text">Выйти</div>
            </div>
        </div>
        <div class="clothes-store">
            <div class="left-block" :class="shopData.style">
                <div class="left-block-content p40" v-if="state === 'select'">
                    <div class="logo">
						<img src="/img/clothes-store/binco-logo.png" alt="" v-if="shopData.style==='binco'">
						<img src="/img/clothes-store/ponsonbys-logo.png" alt="" v-if="shopData.style==='ponsonbys'">
						<img src="/img/clothes-store/suburban-logo.png" alt="" v-if="shopData.style==='suburban'">
					</div>
                    <div class="title">Категории</div>
                    <div class="list">
                        <div class="item" @click="selectType('undershirt')">
                            <div class="item-icon"><img src="/img/clothes-store/thirt.png" alt=""></div>
                            <div class="item-name">Футболка | Рубашка</div>
                        </div>
                        <div class="item" @click="selectType('jacket')">
                            <div class="item-icon"><img src="/img/clothes-store/jaket.png" alt=""></div>
                            <div class="item-name">Верхняя одежда</div>
                        </div>
                        <div class="item" @click="selectType('pants')">
                            <div class="item-icon"><img src="/img/clothes-store/shorts.png" alt=""></div>
                            <div class="item-name">Брюки | Шорты</div>
                        </div>
                        <div class="item" @click="selectType('hats')">
                            <div class="item-icon"><img src="/img/clothes-store/hat.png" alt=""></div>
                            <div class="item-name">Головной убор</div>
                        </div>
                        <div class="item" @click="selectType('feet')">
                            <div class="item-icon"><img src="/img/clothes-store/shoes.png" alt=""></div>
                            <div class="item-name">Обувь</div>
                        </div>
                        <div class="item" @click="selectType('glass')">
                            <div class="item-icon"><img src="/img/clothes-store/accessories.png" alt=""></div>
                            <div class="item-name">Аксессуары</div>
                        </div>
                        <div class="item" @click="selectType('backpack')">
                            <div class="item-icon"><img src="/img/clothes-store/backpack.png" alt=""></div>
                            <div class="item-name">Рюкзаки</div>
                        </div>
                    </div>
                </div>
                <div class="left-block-content" v-if="state != 'select'">
                    <div class="logo">
						<img src="/img/clothes-store/binco-logo.png" alt="" v-if="shopData.style==='binco'">
						<img src="/img/clothes-store/ponsonbys-logo.png" alt="" v-if="shopData.style==='ponsonbys'">
						<img src="/img/clothes-store/suburban-logo.png" alt="" v-if="shopData.style==='suburban'">
					</div>
                    <div class="back">
                        <div class="back-block">
                            <img src="/img/clothes-store/back-binco.png" alt="" @click="mainMenu">
                            <p @click="mainMenu">Назад</p>    
                        </div>
                        <div class="block" v-if="state === 'undershirt' && underTypes">
                            <label for="check">
                                <input type="checkbox" name="check" id="check" v-model='showCurrentShirts'>
                                <div class="checkmark"></div>
                                <span class="remember">Показывать только подходящие футболки к куртке</span> 
                            </label>
                        </div>
                    </div>
                    <div class="clother-list-wrapper scroll" ref="clothList">
                    <div class="clothes-list">
                        <div class="clothes-item" v-for="(item,key) in catalog[state]" :key='key' :class="{active: selectItem === key}" >
                            <div class="clothes-name" @click="selectCloth(key)">{{item.title}}</div>
                            <div class="clothes-price" @click="selectCloth(key)">{{item.basePrice}} $</div>
                            <div class="clothes-type">
                                <div class="arrow arrow-left" @click="prevColor(key)"><img src="/img/clothes-store/left.png" alt=""></div>
                                <div class="clothes-type-num" v-if="selectItem === key">{{selectColor}}</div>
                                <div class="clothes-type-num" v-if="selectItem != key">0</div>
                                <div class="arrow arrow-right" @click="nextColor(key)"><img src="/img/clothes-store/right.png" alt=""></div>
                            </div>
                            <div class="clothes-addToCart" ><img src="/img/clothes-store/cart-icon.png" alt="" @click="buy(key)"></div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data(){
        return{
            state: 'select',
			selectItem: -1,
			selectColor: 0,
			summ: 0,
			showCurrentShirts: true,
        }
    },
	computed: {
			...mapGetters({
				page: "page",
				id: "enterBusiness",
                shopData: "getSecondObj",
                underTypes: "getJacketUnderTypes",
			}),
            catalog: function () {
                const catalog = JSON.parse(JSON.stringify(this.$store.getters.getFirstObj));
                if (this.showCurrentShirts && this.underTypes) {
                    catalog.undershirt = catalog.undershirt.filter(shirt => this.underTypes.includes(shirt.style));
                    /*убирает дубликаты футболок у которых одинаковый mainItem*/
                    catalog.undershirt = catalog.undershirt.filter((thing, index, self) =>
                      index === self.findIndex((t) => (
                        t.mainItem === thing.mainItem
                      ))
                    )
                }
                return catalog;
            },
	},
	methods: {
		mainMenu(){
			this.selectItem = -1;
			this.selectColor = 0;
			this.state = 'select';
            mp.trigger("cMisc-CallServerEvent", "sInventoryPreviewReset");
		},
		exit() {
			mp.trigger("cMisc-CallServerEvent", "sClothShopBuyerClose");
			mp.trigger("cMisc-CallServerEvent", "sInventoryPreviewReset");
			mp.trigger("cCloseCefAndDestroyCam");
		},
		selectType(type){
			this.state = type;
			mp.trigger("cClothingShopPreview",type);
		},
		selectCloth(key){
			if(this.selectItem === key) return;
			this.selectItem = key;
            this.selectColor = 0;
			this.setClothToPlayer();
		},
		nextColor(key){
                if (this.selectItem !== key) return;
				if(this.state === 'select') return;
				if(this.selectItem < 0) return;
				if(this.selectColor === this.catalog[this.state][this.selectItem].colors.length - 1) {
                    this.selectColor = 0;
                } else {
    				this.selectColor++;
                }
				this.setClothToPlayer();
		},
		prevColor(key){
                if (this.selectItem !== key) return;
				if(this.state === 'select') return;
				if(this.selectItem < 0) return;
				if(this.selectColor === 0) {
                    this.selectColor = this.catalog[this.state][this.selectItem].colors.length - 1;
                } else {
				    this.selectColor--;
                }
				this.setClothToPlayer();
		},

		setClothToPlayer() {
            const id = this.catalog[this.state][this.selectItem].id;
            const color = this.catalog[this.state][this.selectItem].colors[this.selectColor];
            mp.trigger("cMisc-CallServerEvent", "sInventoryPreview", id, color);
		},

		buy: function(key) {
            if (this.selectItem !== key) return;
			const obj = {
				shopId: this.id,
                id: this.catalog[this.state][this.selectItem].id,
				color: this.catalog[this.state][key].colors[this.selectColor],
				basePrice: this.catalog[this.state][key].basePrice,
			}
			mp.trigger("cMisc-CallServerEvent", "sInventoryBuyCloth", JSON.stringify(obj));
		},
		
		onKeyUp(e) {
			/*Backspace*/
			if( e.keyCode === 8 && this.state != 'select'){
				this.mainMenu();
			}
			/*left*/
			if( e.keyCode === 37){
				this.prevColor();
			}
			/*right*/
			if( e.keyCode === 39){
				this.nextColor();
			}
			
			if( e.keyCode === 27){
				this.exit();
			}
			
		},
		onKeyDown(e){
			/*q*/
			if( e.keyCode === 81){
				mp.trigger("cTattoSaloneRotPlayer",'l');
			}
			
			/*e*/
			if( e.keyCode === 69){
				mp.trigger("cTattoSaloneRotPlayer",'r');
			}
                        /*up*/
            if( e.keyCode === 38){
                if(this.state === 'select') return;
                if(this.selectItem - 1 < 0) return;
                this.selectItem--;
                this.selectColor = 0;
                this.scrollPage(this.selectItem);
                this.setClothToPlayer();
            }
            /*down*/
            if( e.keyCode === 40){
                if(this.state === 'select') return;
                if(this.selectItem === this.catalog[this.state].length-1) return;
                this.selectItem++;
                this.selectColor = 0;
                this.scrollPage(this.selectItem);
                this.setClothToPlayer();
            }
		},
        scrollPage(count) {
            const el = document.querySelector('.clothes-item');
            this.$refs.clothList.scrollTop = el.scrollHeight * count - el.scrollHeight * 3;
        }
	},
	created() {
		document.addEventListener('keyup', this.onKeyUp);
		document.addEventListener('keydown', this.onKeyDown);
	},
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyUp);
		document.removeEventListener('keydown',this.onKeyDown);
	}
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
html,body {
	height: 100%;
  	width: 100%;
}

.wrapper{
	width: 100%;
	height: 100vh;
}
    .clothes-store{
        width: 100%;
        height: 100%;
        padding-top: 6.57vh;
        padding-left: 2.78vh;
        display: flex;
    }
    .left-block{
        width: 597px;
        height: 790px;
    }
    .suburban{
        background: url('/img/clothes-store/suburban-bg.png');
        background-size: cover;
    }
    .binco{
        background: url('/img/clothes-store/binco-bg.png');
        background-size: cover;
    }
    .ponsonbys{
        background: url('/img/clothes-store/ponsonbys-bg.png');
        background-size: cover;
    }
    .logo{
        width: 100%;
        height: 172px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title{
        color: rgba(255, 255, 255, 0.856);
        font-family: "Century Gothic";
        font-size: 29px;
        font-weight: 700;
        letter-spacing: 0.17px;
        margin-bottom: 30px;
    }
    .p40{
        padding: 0 40px
    }
    .list{
        display: flex;
        flex-wrap: wrap;
    }
    .item{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        flex-basis: 33.3%;
        margin-bottom: 30px;
    }
    .item-icon{
        margin-bottom: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 124px;
        height: 125px;
        border-radius: 10px;
        transition: 0.2s;
    }
    .suburban .item-icon{
        background-color: rgb(16, 57, 111);
    }
    .suburban .item:hover > .item-icon{
        background-color: rgb(24, 82, 158)
    }
    .binco .item-icon{
        background-color: rgb(167, 75, 19);
    }
    .binco .item:hover > .item-icon{
        background-color: rgb(231, 106, 28);
    }
    .ponsonbys .item-icon{
        background-color: rgb(98, 74, 45);
    }
    .ponsonbys .item:hover > .item-icon{
        background-color: rgb(141, 107, 65);
    }
    .item-name{
        color: rgb(255, 255, 255);
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.83px;
    }
    .back{
        color: rgba(255, 255, 255, 0.5);
        font-family: "Century Gothic";
        font-size: 17px;
        font-weight: 400;
        letter-spacing: -1.57px;
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        height: 31px;
        transition: 0.3s;
        border-radius: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .back-block:hover{
        color: rgb(255, 255, 255);
        background-color: rgb(10, 36, 71);
    }
    .binco .back-block:hover{
        background-color: rgb(51, 30, 54);
        color: rgb(255, 255, 255);
    }
    .ponsonbys .back-block:hover{
        background-color: rgb(27, 27, 27);
        color: rgb(255, 255, 255);
    }
    .back img{
        margin-right: 7px;
    }
    .clother-list-wrapper{
        width: 100%;
        direction: rtl;
        overflow-y: auto;
    }
    .clothes-list{
        height: 468px;
        direction: ltr;
    }
    .clothes-item{
        display: flex;
        align-items: center;
        padding: 20px 0;
        height: 67px;
        transition: background-color 0.3s;
    }
    .suburban .clothes-item.active{
        background-color: rgb(10, 36, 71);
    }
    .binco .clothes-item.active{
        background-color: rgb(51, 30, 54);
    }
    .ponsonbys .clothes-item.active{
        background-color: rgb(33, 32, 32);
    }
    .clothes-name,.clothes-price, .clothes-type-num{
        color: rgb(255, 255, 255);
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 400; 
    }
    .clothes-name{
        letter-spacing: -0.19px;
        width: 50%;
        padding-left: 20px;
    }
    .clothes-price{
        width: 20%
    }
    .clothes-type{
        width: 20%;
    }
    .clothes-addToCart{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .clothes-addToCart:active{
        transform: scale(0.95)
    }
    .clothes-type{
        display: flex;
        justify-content: center;
        align-items: center
    }
    .clothes-type-num{
        width: 40px;
        text-align: center;
    }
    .arrow{
        border-radius: 50%;
        width: 33px;
        height: 33px;
        transition: 0.1s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .arrow-left img{
        margin-right: 2px;
    }
    .arrow-right img{
        margin-left: 2px;
    }
    .suburban .arrow{
        background-color: rgba(16, 57, 111, 0.808);
    }
    .binco .arrow{
        background-color: rgba(167, 76, 19, 0.856);
    }
    .ponsonbys .arrow{
        background-color: rgba(98, 74, 45, 0.849);
    }
    .scroll::-webkit-scrollbar {
        width: 12px;
    }
    .scroll::-webkit-scrollbar-track,  .scroll::-webkit-scrollbar-thumb{
        border-radius: 6px;
    }
    .suburban .scroll::-webkit-scrollbar-track, .suburban .scroll::-webkit-scrollbar-track{
        background-color: rgb(19, 24, 32);
    }
    .suburban .scroll::-webkit-scrollbar-thumb{
        background-color: #10396b;
    }
    .binco .scroll::-webkit-scrollbar-track, .binco .scroll::-webkit-scrollbar-track{
        background-color: rgb(34, 21, 36);
    }
    .binco .scroll::-webkit-scrollbar-thumb{
        background-color: rgb(136, 67, 29);
    }
    .ponsonbys .scroll::-webkit-scrollbar-track, .ponsonbys  .scroll::-webkit-scrollbar-track{
        background-color: rgb(22, 22, 22);
    }
    .ponsonbys  .scroll::-webkit-scrollbar-thumb{
        background-color: rgb(98, 74, 45);
    }
    .check{
        width: 380px;
        height: 495px;
        background: url('/img/clothes-store/check-bg.png');
        margin-left: auto;
        margin-right: 6vw;
        margin-top: 13vh;
    }
    .check-title{
        width: 100%;
        height: 100px;
        color: rgb(72, 72, 72);
        font-family: "Century Gothic";
        font-size: 46px;
        font-weight: 400;
        letter-spacing: -0.23px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
    }
    .check-list{
        height: 168px;
        padding: 0 10px;
        padding-right: 30px;
        direction: ltr;
    }
    .check-list-wrapper{
        width: 100%;
        direction: rtl;
        overflow-y: auto;
        margin-left: 10px;
    }
    .check-list-wrapper::-webkit-scrollbar {
        width: 9px;
    }
    .check-list-wrapper::-webkit-scrollbar-track{
        background-color: rgb(85, 85, 85);
        border-radius: 4px;
    }
    .check-list-wrapper::-webkit-scrollbar-thumb{
        background-color: rgb(116, 116, 116);
        border-radius: 4px;
    }
.check-total{
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 27px;
    font-weight: 700;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    margin-bottom: 30px;
}
.check-actions{
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    color: rgb(72, 72, 72);
    font-family: "Century Gothic";
    font-size: 20px;
    font-weight: 700;
}
.check-item{
    display: flex;
    align-items: center;
    min-height: 25px;
}
.check-item-name{
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 700;
    width: 75%;
    line-height: 17px;
}
.check-item-price{
    color: rgb(115, 115, 115);
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -1.25px;
    width: 20%;
    position: relative;
}
.check-item-price::before, .check-total-price::before{
    position: absolute;
    left: -35px;
    content: '.....';
    color: rgb(201, 201, 201);
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 1.25px;
    width: 20%;
}
.check-total-price::before{
    left: -50px
}
.check-total-price{
    position: relative;
}
.check-item-checkbox{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 5%;
}
.container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
    /* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    right: 0;
    height: 13px;
    width: 13px;
    background-color: #fff;
    border: 1px solid rgb(167, 167, 167);
}
    /* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
    border: 1px solid rgb(167, 167, 167);
}

    /* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

    /* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

    /* Style the checkmark/indicator */
.container .checkmark:after {
    left: 5px;
    top: -6px;
    width: 5px;
    height: 13px;
    border: solid rgb(115, 115, 115);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
.help-info{
    position: absolute;
    top: 2vh;
    right: 2vh;
    width: 330px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    color: rgb(255, 255, 255);
    background-color: rgba(10, 34, 81, 0.753);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-family: "Century Gothic";
}
.help-info .uppercase{
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 10px;
}
.camera{
    position: absolute;
    bottom: 2vh;
    right: 2vh;
    width: 490px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    background-color: rgba(10, 34, 81, 0.753);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.camera-item{
    display: flex;
    color: #ffffff;
    align-items: center;
    
}
.camera-item-icon{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
.camera-item-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.94px;
    margin-left: 13px;
}
.back-block {
    display: flex;
}
.block{
    display: flex;
    align-items: center;
    margin-left: 4vw;
}
.block:hover{
    background-color: rgb(27, 27, 27);
    color: rgb(255, 255, 255);
}
.block label{
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 23px;
}
.block label .checkmark{
    position: absolute;
    left: 0;
    height: 20px;
    width: 20px;
    background: transparent;
    border: 1px solid #d1d1d1;
}
.block label input:checked ~ .checkmark{
    background: url('/img/startScreen/mark1.png') no-repeat;
    background-position: center center;
}
.block input{
    display: none;
}
@media (max-width: 1605px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.9)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.9)
    }
}
@media (max-width: 1500px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.85)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.85)
    }
}
@media (max-width: 1370px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.75)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.75)
    }
    .camera{
        transform-origin: right bottom;
        transform: scale(0.75)
    }
    .help-info{
        transform-origin: right top;
        transform: scale(0.75)
    }
}
@media (max-width: 1200px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.7)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.7)
    }
    .camera{
        transform-origin: right bottom;
        transform: scale(0.7)
    }
    .help-info{
        transform-origin: right top;
        transform: scale(0.7)
    }
}
@media (max-width: 1000px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.65)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.65)
    }
    .camera{
        transform-origin: right bottom;
        transform: scale(0.65)
    }
    .help-info{
        transform-origin: right top;
        transform: scale(0.65)
    }
}
@media (max-width: 900px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.6)
    }
    .check{
        transform-origin: right top;
        transform: scale(0.6)
    }
    .camera{
        transform-origin: right bottom;
        transform: scale(0.6)
    }
    .help-info{
        transform-origin: right top;
        transform: scale(0.6)
    }
}
</style>