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
                            <div class="title">Служба такси</div>
                            <div class="text">
                                <p>
                                    Таксопарк "Downtown" - самый крупный и самый старый в городе, основан был в 1922 году и с того времени гарантирует
                                    пассажирам быструю и комфортную поездку. Обслуживание пассажиров происходит на территории всего штата. Таксопарк находится в
                                    районе Восточный Вайнвуд, Лос Сантос.
                                </p>
                                <p>
                                    Нажимая на кнопку ниже Вы подтверждаете вход в аккаунт работника таксопарка "Downtown". Приятной работы!
                                </p>
                            </div>
                            <div class="btn" @click="changeTabletPage">Войти</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tablet-inner menu" v-if="page === 'menu'">
                <div class="content">
                    <div class="left">
                        <div class="topline">
                            <img src="/img/taxi/taxi-plashka.png" alt="" />
                        </div>
                        <div class="title">Диспетчерская</div>
                        <div class="main">
                            <div class="cards-wrapper">
                                <div class="cards">
                                    <div class="card" v-for="order in filteredOrderList">
                                        <div class="avatar">
                                            <img src="/img/taxi/avatar.png" alt="" />
                                        </div>
                                        <div class="name">{{ order.name }}</div>
                                        <div class="name">расстояние: {{ order.distance }} м</div>
                                        <div class="block" @click="blockPassenger(order.name, order.guid)">Заблокировать</div>
                                        <div class="actions">
                                            <div class="btn btn-accept" @click="acceptOrder(order.guid)">Принять</div>
                                            <div class="btn btn-error" @click="declineOrder(order.guid)">Отказ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="footer">
                                <div class="btn" @click="cancelOrder">Отменить текущий вызов</div>
                                <div class="btn" @click="passTaxiCar">Закончить смену</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="logo"></div>
                        <div class="body">
                            <div class="text mb-lg">Цена за км: 50 $</div>
                            <div class="text">Заблокированные:</div>
                            <ul class="list mb">
                                <li class="item" v-for="passenger in blockPassengerList" @click="unBlockPassenger(passenger.guid)">
                                    {{ passenger.name }}
                                </li>
                            </ul>
                            <div class="text">Недавние поездки:</div>
                            <div class="list">
                                <li class="item" v-for="order in lastOrderList">{{ order }}</li>
                            </div>
                        </div>
                        <div class="stats">
                            <div class="text mb-lg">
                                Заработано за смену: <span>{{ driverPay }} $</span>
                            </div>
                            <div class="text">
                                Клиентов за смену: <span>{{ lastOrderList.length }}</span>
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
    computed: {
        ...mapGetters({
            filteredOrderList: "getTaxiFilteredOrderList",
            blockPassengerList: "getTaxiBlockedPassengerList",
            lastOrderList: "getTaxiLastOrderList",
            page: "getTaxiTabletPage",
            driverPay: "getTaxiDriverPay"
        })
    },
    methods: {
        acceptOrder: orderGUID => {
            mp.trigger("cMisc-CallServerEvent", "sTaxi-AcceptOrder", orderGUID);
        },
        declineOrder: guid => {
            storage.setTaxiAddToDeclineList(guid);
        },
        blockPassenger: (name, guid) => {
            const data = { name, guid };
            storage.setTaxiAddToBlackList(data);
        },
        changeTabletPage: () => {
            storage.setTaxiTabletPage("menu");
        },
        unBlockPassenger: guid => {
            storage.setTaxiRemoveFromBlackList(guid);
        },
        cancelOrder: () => {
            mp.trigger("cMisc-CallServerEvent", "sTaxi-cancelCurrentOrder");
        },
        passTaxiCar: () => {
            mp.trigger("cMisc-CallServerEvent", "sTaxi-PassTaxiCar");
        },
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script><style scoped>
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
.tablet {
    width: 55.83vw;
    height: 39.79vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("/img/taxi/tablet.png");
    background-size: cover;
    padding-top: 2.55vw;
    padding-left: 4.64vw;
    padding-right: 4.64vw;
    padding-bottom: 2.4vw;
}
.tablet-inner {
    width: 100%;
    height: 100%;
}

.menu .content {
    display: flex;
    width: 100%;
    height: 100%;
}
.menu .left {
    width: 77.74%;
    height: 100%;
}
.menu .right {
    width: 22.26%;
}
.menu .left .topline {
    width: 100%;
    height: 9.12%;
    background-color: #2576d2;
    position: relative;
}
.menu .left .topline img {
    max-width: 100%;
    max-height: 80%;
    position: absolute;
    bottom: 0;
    right: 10%;
}
.menu .title {
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
}
.menu .main {
    height: 81.44%;
}
.menu .cards-wrapper {
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
.menu .cards {
    direction: ltr;
    width: 100%;
    height: 100%;
    background-color: #f2f7fa;
    display: flex;
    flex-wrap: wrap;
}
.menu .footer {
    background-color: #f2f7fa;
    height: 13%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16%;
}
.menu .footer .btn {
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
.menu .footer .btn:hover {
    background-color: #2576d2;
    color: #ffffff;
}
.menu .card {
    float: left;
    width: 30%;
    height: 47%;
    box-shadow: 5px 8px 24px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    background-color: #ffffff;
    margin-right: 1.25%;
    margin-left: 1.25%;
    margin-bottom: 5%;
}
.menu .card:nth-child(3n + 3) {
    margin-right: 0;
}
.menu .card .avatar {
    text-align: center;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu .card .avatar img {
    max-width: 70%;
    max-height: 70%;
}
.menu .card .name {
    text-align: center;
    color: #383432;
    font-family: "Century Gothic";
    font-size: 0.83vw;
    font-weight: 700;
    letter-spacing: 0.08px;
}
.menu .card .block {
    text-align: center;
    color: rgba(92, 89, 88, 0.788);
    font-family: "Century Gothic";
    font-size: 0.68vw;
    font-weight: 700;
    letter-spacing: 0.07px;
    margin-top: 2%;
}
.menu .card .actions {
    display: flex;
    justify-content: center;
    margin-top: 6%;
}
.menu .card .btn {
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
.menu .card .btn-accept {
    background-color: #2576d2;
}
.menu .card .btn-accept:hover {
    background-color: #00ad5e;
}
.menu .card .btn-error {
    background-color: #2576d2;
}
.menu .card .btn-error:hover {
    background-color: #972525;
}
.menu .right .logo {
    height: 18.7%;
    width: 100%;
    background: #11345b url("/img/taxi/logo-wphone.png") no-repeat;
    background-size: 85%;
    background-position: center;
}
.menu .right .body {
    width: 100%;
    height: 54.34%;
    background-color: #16477e;
    padding: 15% 10%;
}
.menu .right .text,
.menu .right .item {
    color: #f0f5f8;
    font-family: "Century Gothic";
    font-size: 0.78vw;
    font-weight: 700;
    letter-spacing: 0.07px;
    line-height: 1.15vw;
}
.menu .right .item {
    color: #b7c1cf;
}
.menu .right .stats {
    background-color: #11345b;
    height: 26.96%;
    padding: 15% 10%;
}
.menu .right .list {
    margin: 5% 0;
    height: 30%;
    overflow-y: auto;
}
.mb-lg {
    margin-bottom: 20%;
}
.mb {
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
    background-color: rgba(37, 118, 210, 0.855);
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
    background-color: rgba(37, 118, 210, 0.855);
    border-radius: 8px;
}

/* welcome */
.welcome .topline {
    width: 100%;
    height: 9.12%;
    background-color: #2576d2;
}
.welcome .content {
    display: flex;
    height: 90.88%;
}
.welcome .left {
    width: 58.61%;
    height: 100%;
    background: url("/img/taxi/taxi.png") no-repeat;
    background-size: cover;
    z-index: 1;
}
.welcome .right {
    height: 100%;
    width: 41.39%;
    z-index: 2;
}
.welcome .logo {
    width: 100%;
    height: 41.12%;
    background: #11345b url("/img/taxi/downtown.png") no-repeat;
    background-size: 80%;
    background-position: center center;
}
.welcome .info {
    width: 100%;
    height: 58.88%;
    background-color: #16477e;
    padding-right: 5.84%;
    padding-top: 0.17%;
    padding-left: 5.51%;
    text-align: right;
}
.welcome .info .title {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 700;
    letter-spacing: 0.15px;
    margin-bottom: 8.94%;
}
.welcome .info .text {
    margin-bottom: 8.38%;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 0.7vw;
    font-weight: 700;
    line-height: 1.15vw;
    text-align: justify;
}
.welcome .info .text p {
    text-indent: 1.3vw;
}
.welcome .info .btn {
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
.welcome .info .btn:hover {
    background-color: rgba(37, 118, 210, 0.855);
    box-shadow: 0.26vw 0.42vw 1.25vw rgba(0, 0, 0, 0.199);
}
</style>
