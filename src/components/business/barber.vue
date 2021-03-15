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
        <!--<div class="help-info">Нажмите <span class="uppercase">E</span> для взаимодействия</div> -->
        <div class="clothes-store">
            <div class="left-block barber">
                <div class="left-block-content p40" v-if="state === 'select'">
                    <div class="logo"><img src="/img/barber/logo.png" alt=""></div>
                    <div class="title">Категории</div>
                    <div class="list">
                        <!--<div class="item" @click="selectType('hair')"> -->
                        <div class="item" v-on:click.self="selectType('hair')">
                            <div class="item-icon" v-on:click.self="selectType('hair')"><img src="/img/barber/hairs.png" alt="" v-on:click.self="selectType('hair')"></div>
                            <div class="item-name" v-on:click.self="selectType('hair')">Волосы</div>
                        </div>
                        <div class="item" v-on:click.self="selectType('makeup')">
                            <div class="item-icon" v-on:click.self="selectType('makeup')"><img src="/img/barber/makeup.png" alt="" v-on:click.self="selectType('makeup')"></div>
                            <div class="item-name" v-on:click.self="selectType('makeup')">Макияж</div>
                        </div>
						<div class="item" v-on:click.self="selectType('eyecolor')">
                            <div class="item-icon" v-on:click.self="selectType('eyecolor')"><img src="/img/barber/eyes.png" alt="" v-on:click.self="selectType('eyecolor')"></div>
                            <div class="item-name" v-on:click.self="selectType('eyecolor')">Линзы</div>
                        </div>
						<div class="item" v-on:click.self="selectType('beard')">
                            <div class="item-icon" v-on:click.self="selectType('beard')"><img src="/img/barber/beard.png" alt="" v-on:click.self="selectType('beard')"></div>
                            <div class="item-name" v-on:click.self="selectType('beard')">Борода</div>
                        </div>
                        <div class="item" v-on:click.self="selectType('chest')">
                            <div class="item-icon" v-on:click.self="selectType('chest')"><img src="/img/barber/body.png" alt="" v-on:click.self="selectType('chest')"></div>
                            <div class="item-name" v-on:click.self="selectType('chest')">Торс</div>
                        </div>
						<div class="item" v-on:click.self="selectType('eyebrows')">
                            <div class="item-icon" v-on:click.self="selectType('eyebrows')"><img src="/img/barber/eyebrows.png" alt="" v-on:click.self="selectType('eyebrows')"></div>
                            <div class="item-name" v-on:click.self="selectType('eyebrows')">Брови</div>
                        </div>
                    </div>
                </div>
                <div class="left-block-content" v-if="state != 'select'">
                    <div class="logo" v-on:click.self="mainMenu"><img src="/img/barber/logo.png" alt="" v-on:click.self="mainMenu"></div>
                    <div class="back" v-on:click.self="mainMenu"><img src="/img/barber/arrow.png" alt="" v-on:click.self="mainMenu">Назад</div>
                    <div class="clother-list-wrapper scroll" ref="scrollBlock">
                        <div class="clothes-list">
                            <div class="clothes-item" v-for="(item,key) in catalog[state]" :key='key' :class="{active: selectItem === key}" v-on:click.self="selectCloth(key)"  :ref="`navItem_${key}`">
                                <div class="clothes-name" v-on:click.self="selectCloth(key)">{{ item.title }}</div>
                                <div class="clothes-price" v-on:click.self="selectCloth(key)">{{ item.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settings" v-if="state != 'select' && selectItem > -1">
                <div class="settings-body">
                    <div class="settings-item" v-if="state != 'eyecolor' && state != 'makeup'">
                        <div class="settings-item-title">Цвет</div>
                        <div class="action">
                            <div class="action-arrow arrow-left" @click="prevColor('first')"></div>
                            <div class="action-value">{{ primaryColor[color.first].title }}</div>
                            <div class="action-arrow arrow-right" @click="nextColor('first')"></div>
                        </div>
                    </div>
                    <div class="settings-item" v-if="state === 'hair'">
                        <div class="settings-item-title">Доп. цвет</div>
                        <div class="action">
                            <div class="action-arrow arrow-left" @click="prevColor('second')"></div>
                            <div class="action-value">{{ primaryColor[color.second].title }}</div>
                            <div class="action-arrow arrow-right" @click="nextColor('second')"></div>
                        </div>
                    </div>
                </div>
                <div class="settings-footer">
                    <div class="btn" @click="buy()">Купить</div>
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
			color:{
				first: 0,
				second: 0,
			}

        }
    },
	computed: {
			...mapGetters({
				catalog: "getFirstObj",
				primaryColor: "getArrayFirst",
				secondaryColor: "getArraySecond",
				id: "enterBusiness",
			}),
	},
	methods: {
		mainMenu(){
			this.selectItem = -1;
			this.color.first = 0;
			this.color.second = 0;
			this.state = 'select';
		},
		exit() {
			mp.trigger("cMisc-CallServerEvent", "sInventoryPreviewReset");
			mp.trigger("cMisc-CallServerEvent", "sBarberShopMenuClose");
			mp.trigger("cCloseCefAndDestroyCam");
		},
		selectType(type){
			this.state = type;
            mp.trigger("cBarberShopSwithCam", this.state);
		},
		selectCloth(key){
			if(this.selectItem === key) return;
			this.selectItem = key;
			this.setClothToPlayer();
		},
		scrollMeTo(key) {
			var scrollBlock = this.$refs.scrollBlock;
			var name = `navItem_${key}`;
			var element = this.$refs[name];
			var height = element[0].clientHeight;
			var scroll = height * key;
			var minView = scrollBlock.scrollTop;
			var maxView = scrollBlock.scrollTop + scrollBlock.clientHeight - height;
			if(maxView < scroll || minView > scroll){
				scrollBlock.scrollTo(0, scroll);
			}
		},
		
		nextColor(type){
				if(this.state === 'select') return;
				if(type === 'first'){
					if(this.primaryColor.length-1 === this.color[type]) return this.color[type] = 0;
				}
				if(type === 'second'){
					if(this.secondaryColor.length-1 === this.color[type]) return this.color[type] = 0;
				}
				this.color[type]++;
				this.setClothToPlayer();
		},
		prevColor(type){
				if(this.state === 'select') return;
				if(this.color[type] === 0) {
					if(type === 'first') return this.color[type] = this.primaryColor.length-1;
					if(type === 'second') return this.color[type] = this.secondaryColor.length-1;
				}
				this.color[type]--;
				this.setClothToPlayer();
		},

		setClothToPlayer() {
			var obj = {
				type: this.state,
				select: this.catalog[this.state][this.selectItem],
				color: this.color,
			};
			mp.trigger("cBarberShopPreview", JSON.stringify(obj));
		},
		
		buy: function() {
			const obj = {
				id: this.id,
				type: this.state,
				key: this.selectItem,
				//data: this.catalog[this.state][this.selectItem],
				color: this.color,
			}
			mp.trigger("cMisc-CallServerEvent", "sBarberShopBuy", JSON.stringify(obj));
		},
		
		
		
		onKeyUp(e) {
			
			/*Backspace*/
			if( e.keyCode === 8 && this.state != 'select'){
				this.mainMenu();
			}
			/*up*/
			if( e.keyCode === 38){
				if(this.state === 'select') return;
				if(this.selectItem === 0) return;
				this.selectItem--;
				this.scrollMeTo(this.selectItem);
				/*this.selectColor = 0;*/
				this.setClothToPlayer();
			}
			/*down*/
			if( e.keyCode === 40){
				if(this.state === 'select') return;
				if(this.selectItem === this.catalog[this.state].length-1) return;
				this.selectItem++;
				this.scrollMeTo(this.selectItem);
				/*this.selectColor = 0;*/
				this.setClothToPlayer();
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
        background-size: cover;
        padding-top: 6.57vh;
        padding-left: 2.78vh;
        display: flex;
    }
    .left-block{
        width: 597px;
        height: 690px;
    }
    .barber{
        background: url('/img/barber/bg.png');
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
    .item-icon{
        background-color: #0c2855;
    }
    .item:hover > .item-icon{
        background-color: #174998;
        box-shadow: inset 0 0 2px 1px #0c2855;
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
        justify-content: center;
        width: 91px;
        height: 31px;
        transition: 0.3s;
        border-radius: 10px;
        margin-top: -20px;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    .back{
        background-color: #002c71;
        color: rgb(255, 255, 255);
    }
    .back:hover{
        background-color: #114faf;
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
        height: 488px;
        direction: ltr;
    }
    .clothes-item{
        display: flex;
        align-items: center;
        padding: 20px 40px;
        padding-left: 30px;
        height: 67px;
        transition: background-color 0.1s;
        justify-content: space-between;
       
    }
    .clothes-item.active{
        background-color: #0156dd;
    }
    .clothes-name,.clothes-price, .clothes-type-num{
        color: #fefefe;
        font-family: "Century Gothic";
        font-size: 25px;
        font-weight: 400;
    }
    .clothes-name{
        letter-spacing: -0.19px;
    }
    .clothes-buy{
        width: 30%;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
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
    .scroll::-webkit-scrollbar {
        width: 12px;
    }
    .scroll::-webkit-scrollbar-track, .scroll::-webkit-scrollbar-thumb{
        border-radius: 6px;
    }
    .scroll::-webkit-scrollbar-track{
        background-color:#dddcdc;
    }
    .scroll::-webkit-scrollbar-thumb{
        background-color: #002c71;
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

.settings{
    background: #0043ac;
    position: absolute;
    width: 300px;
    right: 2vw;
    top: 13vh;
    border-radius: 10px;
    overflow: hidden;
    padding: 15px; 
}
.settings-footer{
    width: 100%;
    height: 50px;
}
.settings-footer .btn{
    width: 100%;
    height: 100%;
    color: #fff;
    background: #0156dd;
    font-family: "Chalet - London Nineteen Sixty";
    font-size: 31px;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    border-radius: 5px;
}
.settings-footer .btn:hover{
    background: darken(#0156dd, 20%);
    color: #fff;
}
.action-arrow{
    background: url('/img/barber/Arrow1.png') no-repeat;
    background-size: contain;
    width: 21px;
    height: 32px;
}
.settings-item, .settings-body{
    width: 100%;
}
.settings-item{
    margin-bottom: 20px;
}
.settings-item-title{
    text-align: center;
    color: #fefefe;
    font-family: "Chalet - London Nineteen Sixty";
    font-size: 31px;
    font-weight: 400;
    margin-bottom: 10px;
}
.settings .action{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: #0156dd;
    padding: 5px 0;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.24);
}
.action-value{
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fffefe;
    font-family: "Chalet - London Nineteen Sixty";
    font-size: 25px;
    font-weight: 400;
}
.action-arrow{
    width: 10%;
}
.arrow-right{
    transform: rotate(180deg);
}
@media (max-width: 1605px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.9)
    }
    .check,.settings{
        transform-origin: right top;
        transform: scale(0.9)
    }
}
@media (max-width: 1500px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.85)
    }
    .check,.settings{
        transform-origin: right top;
        transform: scale(0.85)
    }
}
@media (max-width: 1370px){
    .left-block{
        transform-origin: left top;
        transform: scale(0.75)
    }
    .check,.settings{
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
    .check,.settings{
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
    .check,.settings{
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
    .check,.settings{
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