<template>
    <div class="wrapper">
        <div class="tablet">
            <div class="tablet-inner welcome" v-if="page === 'welcome'">
                <div class="topline"></div>
                <div class="content">
                    <div class="left"></div>
                    <div class="right">
                        <div class="logo"></div>
                        <div class="info">
                            <div class="title">Дальнобойщик</div>
                            <div class="text">Дальнобойщик занимается доставкой грузов по бизнесам нашего штата. <br>
                                Купите или арендуйте грузовой автомобиль, соответствующий типу груза и отправляйтесь на точку погрузки
                            </div>
                            <div class="btn" @click="page = 'menu'">Войти</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tablet-inner menu" v-if="page === 'menu'">
                <div class="content">
                    <div class="left">
                        <transition name="fade">
                            <div class="overlay" v-if="modalPage != 0"></div>
                        </transition>
                        <transition name="fade">
                            <div class="modal" v-if="selectOrderKey>-1">
                                <div class="modal-body">
                                    <div class="modal-item">
                                        <div class="modal-item-name">Тип груза:</div>
                                        <div class="modal-item-data">{{getResName(orders[selectOrderKey].type)}}</div>
                                    </div>
                                    <div class="modal-item">
                                        <div class="modal-item-name">Пункт назначения:</div>
                                        <div class="modal-item-data">{{orders[selectOrderKey].businessTitle}}</div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="modal-btn btn-accept" @click="acceptOrder">Подтвердить</div>
                                    <div class="modal-btn btn-error" @click="selectOrderKey = -1">Отменить</div>
                                </div>
                            </div>
                        </transition>
                        <div class="topline">
                            
                        </div>
                        <div class="title">Диспетчерская
                        </div>
                        <div class="main">
                            <div class="cards-wrapper">
                            <div class="cards">
								<div class="card" v-for="(item,key) in orders">
                                    <div class="avatar">
                                        <img :src="getResIcon(item.type)" alt="">
                                    </div>
                                    <div class="name">{{getResName(item.type)}}</div>
                                    <div class="block">{{item.businessTitle}}</div>
                                    <div class="block">Кол-во: <span class="red">{{item.count}}</span></div>
                                    <div class="actions">
                                        <div class="btn btn-accept" @click="selectOrder(key)">Принять</div>
                                    </div>
                                </div>
                            </div>
							
                            </div>
                            <div class="footer">
                                <!-- если заказ взят
                                <div class="btn">Отменить текущий вызов</div>
                                 -->
                                <div class="btn ml-auto" @click="page = 'welcome'">Закончить смену</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="logo"></div>
                        <div class="body">
                            <div class="text">Недавние поездки:</div>
                            <div class="list">
                                <li class="item" v-for="item in jobData.historyOrders">{{ item }}</li>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="text mb-lg">Заработано за смену: <span>{{jobData.pay | divideNumber}} $</span></div>
                            <div class="text">Поездок за смену: <span>{{jobData.historyOrders.length}}</span></div>
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
            page: 'welcome',
            modalPage: 0,
			selectOrderKey:-1,
        }
    },
	computed: {
        ...mapGetters({
            jobData: "getTruckerJobData",
        }),
        orders: function() {
            const allOrder = this.$store.getters.getTruckerOrders;
            return allOrder.filter(o => o.count-o.inProcces != 0)
        }
	},
	methods:{
		getResName(type){
			if(type === 'material') return 'Материалы';
			if(type === 'product') return 'Продукты';
			if(type === 'fuel') return 'Топливо';
			if(type === 'auto') return 'Автомобили';
			if(type === 'oil') return 'Нефть';
			if(type === 'ferm') return 'Овощи';
			//return this.getBusinesRes[this.activeItem-1].title;
		},
		getResIcon(type){
			return `/img/trucker/${type}.png`;
		},
		selectOrder(key){
			this.selectOrderKey = key;
		},
		acceptOrder(){
			mp.trigger("cMisc-CallServerEvent", "sTruckerAcceptOrder",this.orders[this.selectOrderKey].id);
			this.selectOrderKey = -1;
		},
		exit() {
            mp.trigger("cCloseCef");
        },
		onKeyDown(e){
            if( e.keyCode === 27){
				this.exit();
			}
        },
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
html,body {
	height: 100%;
  	width: 100%;
}
.wrapper{
	width: 100%;
	height: 100vh;
}

img{
    max-width: 100%;
}
.red{
    color: #ee5656;
}
.ml-auto{
    margin-left: auto;
}
    .tablet{
        width: 55.83vw;
        height: 39.79vw;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url('/img/taxi/tablet.png');
        background-size: cover;
        padding-top: 2.55vw;
        padding-left: 4.64vw;
        padding-right: 4.64vw;
        padding-bottom: 2.4vw;;
    }
    .tablet-inner{
        width: 100%;
        height: 100%;
    }

    .menu .content{
        display: flex;
        width: 100%;
        height: 100%;
    }
    .menu .left{
        width: 77.74%;
        height: 100%;
        position: relative;
    }
    .menu .right{
        width: 22.26%;
    }
    .menu .left .topline{
        width: 100%;
        height: 9.12%;
        background-color: #2576d2;
        position: relative;
    }
    .menu .left .topline img{
        max-width: 100%;
        max-height: 80%;
        position: absolute;
        bottom: 0;
        right: 10%;
    }
    .menu .title{
        width: 100%;
        height: 9.58%;
        background-color: #ffffff;
        color: #2d292a;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: bold;
        letter-spacing: 0.15px;
        display: flex;
        align-items: flex-end;
        padding-left: 4.2%;
        padding-bottom: 1.5%;
        position: relative;
    }
    .menu .main{
        height: 81.44%;
    }
    .menu .cards-wrapper{
        width: 100%;
        height: 86.9%;
        direction: rtl;
        overflow-y: auto;
        background-color: #f2f7fa;
        display: flex;
        justify-content: center;
        padding: 1.04vw 1.41vw;
        padding-bottom: 0;
        padding-left: 1.64vw;
    }
    .menu .cards{
        direction: ltr;
        width: 100%;
        height: 100%;
        background-color: #f2f7fa;
        display: flex;
        flex-wrap: wrap;
    }
    .menu .footer{
        background-color: #f2f7fa;
        height: 13%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16%;
    }
    .menu .footer .btn{
        padding: 0.4vw 0.56vw;
        border-radius: 0.52vw;
        border: 1px solid rgba(37, 118, 210, 0.88);
        background-color: #ffffff;
        color: #231a15;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 700;
        letter-spacing: 0.07px;
        transition: 0.2s;
    }
    .menu .footer .btn:hover{
        background-color: #2576d2;
        color: #ffffff
    }
    .menu .card{
        float: left;
        width: 30%;
        height: 43%;
        box-shadow: 5px 8px 24px rgba(0, 0, 0, 0.07);
        border-radius: 5px;
        background-color: #ffffff;
        margin-right: 1.25%;
        margin-left: 1.25%;
        margin-bottom: 5%;
    }
    .menu .card:nth-child(3n+3){
        margin-right: 0;
    }
    .menu .card .avatar{
        text-align: center;
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .menu .card .avatar img{
        max-width: 70%;
        max-height: 70%;
    }
    .menu .card .name{
        text-align: center;
        color: #383432;
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: 700;
        letter-spacing: 0.08px;
    }
    .menu .card .block{
        text-align: center;
        color: rgba(92, 89, 88, 0.788);
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 700;
        letter-spacing: 0.07px;
        margin-top: 2%;
    }
    .menu .card .actions{
        display: flex;
        justify-content: center;
        margin-top: 5%;
    }
    .menu .card .btn{
        margin: 0 2%;
        width: 3.75vw;
        height: 1.35vw;
        line-height: 1.35vw;
        box-shadow: 0.26vw 0.42vw 1.25vw rgba(0, 0, 0, 0.089);
        border-radius: 0.26vw;
        text-align: center;
        color: #f1f6f9;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 700;
        letter-spacing: 0.07px;
        transition: 0.2s;
    }
    .btn-accept{
        background-color: #2576d2;
    }
    .btn-accept:hover{
        background-color: #00ad5e;
    }
    .btn-error{
        background-color: #2576d2;
    }
    .btn-error:hover{
        background-color: #972525;
    }
    .menu .right .logo{
        height: 18.7%;
        width: 100%;
        background: #fff url('/img/trucker/truckstar.png') no-repeat;
        background-size: 70%;
        background-position: center;
    }
    .menu .right .body{
        width: 100%;
        height: 54.34%;
        background-color: #16477e;
        padding: 15% 10%;
    }
    .menu .right .text, .menu .right .item{
        color: #f0f5f8;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 700;
        letter-spacing: 0.07px; 
        line-height: 1.15vw;
    }
    .menu .right .item{
        color: #b7c1cf;
    }
    .menu .right .stats{
        background-color: #11345b;
        height: 26.96%;
        padding: 15% 10%;
    }
    .menu .right .list{
        margin: 5% 0;
        height: 100%;
        overflow-y: auto;
    }
    .mb-lg{
        margin-bottom: 20%;
    }
    .mb{
        margin-bottom: 8%;
    }
    .menu .right .list::-webkit-scrollbar {
        width: 4px;
    }
    
    .menu .right .list::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px #11345b;
        border-radius: 5px;
    }
    
    .menu .right .list::-webkit-scrollbar-thumb {
        background-color:rgba(37, 118, 210, 0.855);
        outline: 1px solid slategrey;
        border-radius: 5px;
    }
    .menu .cards-wrapper::-webkit-scrollbar {
        width: 8px;
    }
    
    .menu .cards-wrapper::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgb(255, 255, 255);
        border-radius: 8px;
    }
    
    .menu .cards-wrapper::-webkit-scrollbar-thumb {
        background-color:rgba(37, 118, 210, 0.855);
        border-radius: 8px;
    }
    .truck-img{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5.78vw;
    }
    .modal{
        position: absolute;
        width: 18.03vw;
        box-shadow: 5px 8px 24px rgba(0, 0, 0, 0.28);
        background-color: #2576d2;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.3vw
    }
    .modal-body{
        padding: 5% 10%;
    }
    .modal-item{
        margin-bottom: 0.5vw;
    }
    .modal-item-name{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        text-align: center;
        margin-bottom: 1%;
    }
    .modal-item-data{
        height: 1.51vw;
        background-color: #11345b;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 0.3vw;
    }
    .modal-item-data input{
        width: 100%;
        height: 100%;
        color: #fff;
        background-color: #11345b;
        font-family: "Century Gothic";
        font-weight: bold;
        font-size: 0.78vw;
        border: none;
        text-align: center;
        border-radius: 0.3vw;
    }
    .modal-footer{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 5% 0;
        padding-top: 0;
    }
    .modal-btn{
        color: #fff;
        background-color: #11345b;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: bold;
        border-radius: 0.3vw;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3vw 0.5vw;
        width: 6vw;
    }   
    .overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: rgba(0,0,0,0.3);
    }

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
    /* welcome */
    .welcome .topline{
        width: 100%;
        height: 9.12%;
        background-color: #2576d2;
    }
    .welcome .content{
        display: flex;
        height: 90.88%;
    }
    .welcome .left{
        width: 58.61%;
        height: 100%;
        background: url('/img/trucker/truck-home.png')  no-repeat;
        background-size: cover;
        z-index: 1;
    }
    .welcome .right{
        height: 100%;
        width: 41.39%;
        z-index: 2;
    }
    .welcome .logo{
        width: 100%;
        height: 41.12%;
        background: #fff url('/img/trucker/truckstar.png') no-repeat;
        background-size: 80%;
        background-position: center center;
    }
    .welcome .info{
        width: 100%;
        height: 58.88%;
        background-color: #16477e;
        padding-right: 7.84%;
        padding-top: 11.17%;
        padding-left: 13.51%;
        text-align: right;
    }
    .welcome .info .title{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 700;
        letter-spacing: 0.15px;
        margin-bottom: 8.94%;
    }
    .welcome .info .text{
        margin-bottom: 8.38%;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 700;
        line-height: 1.15vw;
    }
    .welcome .info .btn{
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7.24vw;
        height: 1.93vw;
        box-shadow: 0.26vw 0.42vw 1.25vw rgba(0, 0, 0, 0.089);
        border-radius: 5px;
        background-color: #2576d2;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 700;
        letter-spacing: 0.06px;
        transition: 0.2s;
    }
    .welcome .info .btn:hover{
        background-color: rgba(37, 118, 210, 0.855);
        box-shadow: 0.26vw 0.42vw 1.25vw rgba(0, 0, 0, 0.199);  
    }
</style>