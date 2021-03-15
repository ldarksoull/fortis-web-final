<template>
    <div class="wrapper">
        <div class="tablet">
            <div class="tablet-inner menu" v-if="page === 'menu'">
                <div class="content">
                    <div class="left">
                        <div class="topline"></div>
                        <div class="title">Планшет инкассатора</div>
                        <div class="main">
                            <div class="cards-wrapper">
                                <div class="cards">
                                    <div class="card" v-if="mate !== null">
                                        <div class="title">Напарник:</div>
                                        <div class="avatar">
                                            <img src="/img/avatar-y.png" alt="" />
                                        </div>
                                        <div class="name">{{ mate }}</div>
                                        <div class="block">Заблокировать</div>
                                    </div>
                                </div>
                            </div>
                            <div class="footer">
                                <div class="btn" @click="startWorkDay">Начать смену</div>
                                <div class="btn" @click="endWorkDay">Закончить смену</div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="logo"></div>
                        <div class="body">
                            <div class="text mb-lg">
                                Проехано кило- <br />
                                метров за смену: <span>{{ totalDistance }}</span>
                            </div>
                            <div class="text mb-lg">
                                Заработано за смену: <span>{{ pay }} $</span>
                            </div>
                            <div class="text">
                                Количество банкоматов: <span>{{ atmCount }}</span>
                            </div>
                        </div>
                        <div class="stats"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            page: "menu"
        };
    },
    computed: {
        ...mapGetters({
            atmCount: "getCashCollectorAtmCount",
            totalDistance: "getCashCollectorTotalDistance",
            pay: "getCashCollectorPay",
            mate: "getCashCollectorMate"
        })
    },
    methods: {
        startWorkDay() {
            mp.trigger("cMisc-CallServerEvent", "sCashCollector-StartWorkDay");
            this.exit();
        },
        endWorkDay() {
            mp.trigger("cMisc-CallServerEvent", "sCashCollector-EndWorkDay");
            this.exit();
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
    background-color: #b1bc3a;
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
    height: 80%;
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
    background: url("/img/inkass-car.png") no-repeat;
    background-position: left top;
    background-size: 75% 75%;
    width: 100%;
    height: 100%;
    background-color: #f2f7fa;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-end;
}
.menu .footer {
    background-color: #f2f7fa;
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20%;
}
.menu .footer .btn {
    width: 9.48vw;
    height: 1.82vw;
    border-radius: 0.52vw;
    border: 1px solid rgba(177, 188, 58, 0.88);
    background-color: #ffffff;
    color: #231a15;
    font-family: "Century Gothic";
    font-size: 0.78vw;
    font-weight: 700;
    letter-spacing: 0.07px;
    transition: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu .footer .btn:hover {
    background-color: #b1bc3a;
    color: #ffffff;
}
.menu .card {
    float: left;
    width: 10.68vw;
    height: 11.15vw;
    box-shadow: 5px 8px 24px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
    background-color: #ffffff;
    margin-right: 14.25%;
    margin-left: 1.25%;
    margin-bottom: 2%;
}
.menu .card:nth-child(3n + 3) {
    margin-right: 0;
}
.menu .card .title {
    color: #43484c;
    font-family: "Century Gothic";
    font-size: 1.04vw;
    font-weight: 700;
    letter-spacing: 0.1px;
    margin-top: 1.41vw;
    padding-left: 1.04vw;
}
.menu .card .avatar {
    text-align: center;
    width: 100%;
    height: 45%;
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
    background: #6d7833 url("/img/gruppe6-logo.png") no-repeat;
    background-size: 85%;
    background-position: center;
}
.menu .right .body {
    width: 100%;
    height: 54.34%;
    background-color: #b1bc3a;
    padding: 15% 10%;
    padding-top: 30%;
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
    background-color: #6d7833;
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
</style>
