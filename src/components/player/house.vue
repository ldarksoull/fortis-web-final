<template>
    <div class="wrapper">
        <div class="house-card-wrapper">
            <div class="house-card" v-if="card === 'main'">
                <div class="header">
                    <div class="title">ДОМ № <span>{{houseData.id}}</span></div>
                    <div class="icon"><img src="/img/house-icon.png" alt=""></div>
                </div>
                <div class="body">
                    <div class="left">
                        <ul class="list">
                            <li class="list-item">
                                <div class="property">ВЛАДЕЛЕЦ</div>
                                <div class="property-info">{{ownerShow()}}</div>
                            </li>
                            <li class="list-item">
                                <div class="property">КЛАСС ДОМА</div>
                                <div class="property-info">{{houseData.type}}</div>
                            </li>
                            <li class="list-item">
                                <div class="property">ГАРАЖНЫЕ МЕСТА</div>
                                <div class="property-info">{{houseData.cars}}</div>
                            </li>
                            <li class="list-item" v-if="houseData.owner < 1">
                                <div class="property">ЦЕНА</div>
                                <div class="property-info">{{showPrice()}} $</div>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="image"><img :src="classImg()" alt=""></div>
                        <div class="actions">
                            <div class="btn" v-if="houseData.owner === houseData.playerGUID || houseData.lodger.indexOf(houseData.playerGUID)>-1 || houseData.openDoor" v-on:click.self="enterHouse">
                                <div class="icon" v-on:click.self="enterHouse"><img src="/img/houses/keys.png" alt="" v-on:click.self="enterHouse"></div>
                                <div class="text" v-on:click.self="enterHouse">Войти</div>
                            </div>
							<div class="btn" v-if="houseData.owner === houseData.playerGUID" v-on:click.self="managementPage">
                                <div class="icon" v-on:click.self="managementPage"><img src="/img/houses/keys.png" alt="" v-on:click.self="managementPage"></div>
                                <div class="text" v-on:click.self="managementPage">Управление</div>
                            </div>
                            <div class="btn" @click="hackDoor()" v-if="houseData.owner > 0 && houseData.owner != houseData.playerGUID && houseData.lodger.indexOf(houseData.playerGUID)===-1 && !houseData.openDoor">
                                <div class="icon"><img src="/img/houses/switches.png" alt=""></div>
                                <div class="text">Взломать</div>
                            </div>
                            <div class="btn" v-if="houseData.owner < 1" v-on:click.self="modalPage = 'buyHouse'">
                                <div class="icon" v-on:click.self="modalPage = 'buyHouse'"><img src="/img/houses/buy.png" alt="" v-on:click.self="modalPage = 'buyHouse'"></div>
                                <div class="text" v-on:click.self="modalPage = 'buyHouse'">Купить</div>
                            </div>
							<div class="btn" v-if="houseData.owner === houseData.playerGUID" v-on:click.self="modalPage = 'sellHouse'">
                                <div class="icon" v-on:click.self="modalPage = 'sellHouse'"><img src="/img/houses/buy.png" alt="" v-on:click.self="modalPage = 'sellHouse'"></div>
                                <div class="text" v-on:click.self="modalPage = 'sellHouse'">Продать</div>
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="fade">
                    <div class="modal" v-if="modalPage === 'buyHouse'">
                        <div class="modal-body">
                            <div class="modal-text">Вы точно хотите купить дом за {{ showPrice() }}$ ?</div>
                        </div>
                        <div class="modal-actions">
                            <div class="modal-btn" @click="buy">Да</div>
                            <div class="modal-btn" @click="modalPage = ''">Нет</div>
                        </div>
                    </div>
                </transition>
				<transition name="fade">
                    <div class="modal" v-if="modalPage === 'sellHouse'">
                        <div class="modal-body">
                            <div class="modal-text">Вы точно хотите продать дом за {{ showSellPrice() }}$ ?</div>
                        </div>
                        <div class="modal-actions">
                            <div class="modal-btn" @click="sell">Да</div>
                            <div class="modal-btn" @click="modalPage = ''">Нет</div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="house-card" v-if="card === 'management'">
                <div class="header">
                    <div class="title">МЕНЮ ВЛАДЕЛЬЦА ДОМА</div>
                </div>
                <div class="body">
                    <div class="left">
                        <ul class="list">
                            <li class="list-item m-b-1">
                                <div class="property">НАЛОГ В ДЕНЬ</div>
                                <div class="property-info">{{taxPerDay | divideNumber}}$</div>
                            </li>
                            <li class="list-item baseline">
                                <div class="property">ЖИЛЬЦЫ</div>
                                <div class="propety-wrapper">
                                    <div class="lodger-wrapper" v-for="(i,index) in houseData.lodgerNames">
                                        
                                    <div class="property-info m-b">
                                        {{index+1}}. {{i}} 
                                    </div>
                                        <div class="kick-lodger" @click="kickLodger(index)">Выгнать</div>
                                    </div>
                                    <div class="property-info m-b" v-if="houseData.lodgerNames.length === 0">Нет жильцов</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="actions d-block">
                            <div class="row">
                                <div class="btn btn-wide m" v-on:click.self="openDoors">
                                    <div class="icon zamok-icon" v-on:click.self="openDoors"><img src="/img/houses/icon-zamok.png" alt="" v-on:click.self="openDoors"></div>
                                    <div class="text" v-on:click.self="openDoors">ОТКРЫТЬ/ ЗАКРЫТЬ</div>
                                </div>
                                <!--<div class="btn m">
                                    <div class="icon people-icon"><img src="/img/houses/people.png" alt=""></div>
                                    <div class="text">ПОДСЕЛИТЬ</div>
                                </div>-->
                            </div>
                            <div class="row">
                                <!--<div class="btn btn-wide m" @click="modalPage = 'buyAlarm'">
                                    <div class="icon alarm-icon"><img src="/img/houses/alarm.png" alt=""></div>
                                    <div class="text">СИГНАЛИЗАЦИЯ</div>
                                </div>-->
                                <!-- <div class="btn m" @click="modalPage = 'buySafe'">
                                    <div class="icon safe-icon"><img src="/img/houses/safe.png" alt=""></div>
                                    <div class="text">СЕЙФ</div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="fade">
                    <div class="modal" v-if="modalPage === 'buyAlarm'">
                        <div class="modal-body">
                            <div class="modal-text">Вы точно хотите установить сейф в дом <br> за 59 000 $ ?</div>
                        </div>
                        <div class="modal-actions">
                            <div class="modal-btn" @click="modalPage = ''">Да</div>
                            <div class="modal-btn" @click="modalPage = ''">Нет</div>
                        </div>
                    </div>
                </transition>
                <transition name="fade">
                    <div class="modal" v-if="modalPage === 'buySafe'">
                        <div class="modal-body">
                            <div class="modal-text">Вы точно хотите установить сигнализацию в дом <br> за 15 000 $ ?</div>
                        </div>
                        <div class="modal-actions">
                            <div class="modal-btn" @click="buySignaling()">Да</div>
                            <div class="modal-btn" @click="modalPage = ''">Нет</div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>	
</template>

<script>

import { mapGetters } from "vuex";

export default{
    data(){
        return{
            modalPage: '',
            card: 'main',
        }
    },
	computed: {
		...mapGetters({
				houseData: "getHouseData",
                taxPercent: "getTaxValues",
			}),
        taxPerDay: function () {
            const allTaxes = this.$store.getters.getTaxes;
            const house = allTaxes.house.find(h => h.id === this.houseData.id);
            const houseTaxPercent = this.taxPercent.find(t => t.type === "house").value;
            return this.roundNum(house.price / 100 * houseTaxPercent / 7);
        },
	},
    methods:{
		ownerShow(){
			if(this.houseData.owner > 0) return 'Частное лицо';
			else return 'Государство';
		},
		classImg(){
			return `/img/houses/${this.houseData.type}.png`;
		},
		prettify (num) {
			let n = num.toString();
			const separator = " ";
			return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
		},
		showPrice () {
			return this.prettify(this.houseData.price);
		},
		showSellPrice () {
			return this.prettify(this.roundNum(this.houseData.govBuyPrice * 0.7));
		},
        roundNum(number, ends = 0) {
            return parseFloat(number.toFixed(ends));
        },
		managementPage(){
			this.card = 'management';
		},
		buy () {
			this.modalPage = '';
			mp.trigger("cMisc-CallServerEvent", "sHouse-BuyHouse",this.houseData.id);
			this.exit();
		},
		sell () {
			mp.trigger("cMisc-CallServerEvent", "sHouse-SellHouse",this.houseData.id);
			this.exit();
		},
        enterHouse () {
			mp.trigger("cMisc-CallServerEvent", "sHouse-EnterHouse",this.houseData.id);
			this.exit();
		},
		openDoors(){
			mp.trigger("cMisc-CallServerEvent", "sHouseOpenDoors",this.houseData.id);
			this.exit();
		},
		exit() {
			mp.trigger("cCloseCefAndDestroyCam");
		},
		onKeyDown(e) {
			if( e.keyCode === 27){
				this.exit();
			}
		},
        roundNum(num, ends = 0) {
            return parseFloat(num.toFixed(ends));
        },
        hackDoor(){
            mp.trigger("cMisc-CallServerEvent", "sHouseHackDoors",this.houseData.id);
            this.exit();
        },
        buySignaling() {
            mp.trigger("cMisc-CallServerEvent", "sHouseBuySignaling",this.houseData.id);
            this.modalPage = "";
        },
        kickLodger(index) {
            const lodgerId = this.houseData.lodger[index];
            mp.trigger("cMisc-CallServerEvent", "sHouseKickLodger", this.houseData.id, lodgerId);
        },
    },
	mounted() {
		//this.chekStatus();
	},
    created() {
		document.addEventListener('keyup', this.onKeyDown);
	},
	beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyDown);
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
.wrapper{
    width: 100%;
    height: 100vh;
	position: absolute;
	top: 0;
}
	
	.house-card-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .house-card{
        padding: 1.3vw 2.08vw;
        border-radius: 0.52vw;
        background-color: rgba(14, 47, 76, 0.952);
        position: relative;
    }
    .header{
        display: flex;
        align-items: center;
    }
    .header .title{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 2.24vw;
        font-weight: 700;
        letter-spacing: 0.25px;
    }
    .icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon img{
        max-width: 100%;
    }
    .header .icon{
        margin-left: 1.56vw;
        width: 3.28vw;
        height: 3.28vw;
    }
    .body{
        display: flex;
    }
    .left{
        padding-top: 2.34vw;
        padding-bottom: 0.52vw;
    }
    .list-item{
        display: flex;
        align-items: center;
        margin-bottom: 1.56vw;
    }
    .baseline{
        align-items: baseline
    }
    .m-b{
        margin-bottom: 1vw;
    }
    .m-b-1{
        margin-bottom: 2vw;
    }
    .m{
        margin: 0.5vw!important;
    }
    .property{
        width: 8.7vw;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 700;
        letter-spacing: 0.1px;
        padding-right: 1.04vw;
    }
    .property-info{
        width: 14.06vw;
        height: 1.93vw;
        border-radius: 0.94vw;
        background-color: #144470;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1px;
    }
    .right{
        padding-left: 3.13vw
    }
    .image{
        width: 15.31vw;
        height: 10.78vw;
    }
    .image img{
        max-width: 100%;
    }
    .actions{
        display: flex;
        justify-content: center;
        margin-top: 1.3vw;
    }
    .actions .btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 5vw;
        height: 5.2vw;
        border-radius: 1.04vw;
        background-color: #163552;
        margin: 0 1.04vw;
    }
    .btn-wide{
        width: 8.2vw!important;
    }
    .actions .btn:hover{
        background-color: #144470;
    }
    .actions .icon{
        width: 2.29vw;
        height: 1.93vw;
        margin-bottom: 0.52vw;
    }
    .actions .icon img{
        max-width: 100%;
    }
    .actions .text{
        height: 0.94vw;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 700;
        letter-spacing: 0.09px;
        text-transform: uppercase;
    }
    .modal{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(16, 48, 77, 0.95);
        border-radius: 0.52vw;
        overflow: hidden;
    }
    .modal-body{
        height: 7.14vw;
        width: 24.06vw;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5% 10%;
    }
    .modal-text, .modal-btn{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 1.09vw;
        font-weight: 400;
        letter-spacing: 0.55px;
        text-align: center;
    }
    .modal-actions{
        background-color: rgb(8, 45, 78);
        display: flex;
    }
    .modal-btn{
        width: 50%;
        height: 3.13vw;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
    }
    .propety-wrapper{
        max-height: 8vw;
        overflow-y: auto;
        padding-right: 1vw;
    }
    .row{
        display: flex;
    }
    .d-block{
        display: block;
    }
    .modal-btn:hover{
        background-color: rgb(16, 56, 101);
    }
    .zamok-icon{
        width: 1.67vw!important;
        height: 1.88vw!important;
    }
    .alarm-icon{
        width: 3vw!important;
        height: 2vw!important;
    }
    .peoples-icon{
        width: 2.4vw!important;
        height: 2.08vw!important;
    }
    .safe-icon{
        width: 2.08vw!important;
        height: 1.93vw!important;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .propety-wrapper::-webkit-scrollbar {
        width: 0.5vw;
    }
    .propety-wrapper::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    .propety-wrapper::-webkit-scrollbar-thumb {
        background-color: #144470;
    }
    .lodger-wrapper{
        display: flex;
    }
    .kick-lodger{
       display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 5.7vw;
        height: 1.93vw;
        border-radius: 1.04vw;
        margin-left: 1vw;
        background-color: #144470;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 700;
        letter-spacing: 0.1px;
    }

</style>