<template>
    <div class="wrapper">
        <div class="spawn">
            <div class="logo"><img src="/img/hud/logo-100px-blue.png" alt=""></div>
            <div class="page-title">Выберите место спавна</div>
            <div class="spawn-content flex">
                <div class="column content-center">
                    <div class="card tform-right mb">
                        <div class="image-wrapper image1"></div>
                        <div class="card-title">Точка выхода</div>
                        <div class="card-text">Появиться на месте <br> выхода</div>
                        <div class="card-btn p-absolute" @click="spawnEvent()">Выбрать</div>
                    </div>
                </div>
                <div class="column ml">
                    <div class="card mb tform-left-bottom" v-if="character.factionID && logOutTwoHourAgo">
                        <div class="image-wrapper image2"></div>
                        <div class="card-title">Фракция</div>
                        <div class="card-text">Заплатить 1000$ и <br> появиться на территории <br> фракции</div>
                        <div class="card-btn p-absolute" @click="spawnEvent('faction')">Выбрать</div>
                    </div>
                    <div class="card mb tform-left-bottom" v-if="character.factionID && !logOutTwoHourAgo">
                        <div class="image-wrapper image3"></div>
                        <div class="card-title">Фракция</div>
                        <div class="card-text font-size">Появиться в организации <br> можно будет через {{time}}</div>
                        <div class="card-btn p-absolute disabled">Выбрать</div>
                    </div>
                    <div class="card mb tform-left-bottom" v-if="!character.factionID">
                        <div class="image-wrapper image4"></div>
                        <div class="card-title"><img style="margin-right: 10px" src="/img/spawn/danger.png" alt=""> Фракция</div>
                        <div class="card-text">Вы не состоите во <br> фракции</div>
                        <div class="card-btn p-absolute disabled">Выбрать</div>
                    </div>
                    <div class="card tform-left-top" v-if="character.house && logOutTwoHourAgo" >
                        <div class="image-wrapper image5"></div>
                        <div class="card-title" v-if="Number.isInteger(character.house)">Отель</div>
                        <div class="card-title" v-else>Дом</div>
                        <div class="card-text">Заплатить 1000$ и <br> появиться в {{Number.isInteger(character.house) ? "отеле" : "доме"}}</div>
                        <div class="card-btn p-absolute" @click="spawnEvent('house')">Выбрать</div>
                    </div>
                     <div class="card tform-left-top" v-if="character.house && !logOutTwoHourAgo">
                        <div class="image-wrapper image6"></div>
                        <div class="card-title" v-if="Number.isInteger(character.house)">Отель</div>
                        <div class="card-title" v-else>Дом</div>
                        <div class="card-text font-size">Появиться в {{Number.isInteger(character.house) ? "отеле" : "доме"}} <br> можно будет через {{time}}</div>
                        <div class="card-btn p-absolute disabled">Выбрать</div>
                    </div>
                    <div class="card tform-left-top" v-if="!character.house">
                        <div class="image-wrapper image7"></div>
                        <div class="card-title"><img style="margin-right: 15px" src="/img/spawn/danger.png" alt=""> Дом</div>
                        <div class="card-text">У Вас нет собственного <br> дома</div>
                        <div class="card-btn p-absolute disabled">Выбрать</div>
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
            logOutTwoHourAgo: false,
            time: "",
            timer: null,
            startMs: 0,
        };
    },
    computed: {
        ...mapGetters({
            selected: "getSelectCatacter",
        }),
        character: function() {
            const charList = this.$store.getters.CharactersList;
            return charList[this.selected];
        },
    },
    methods: {
        spawnEvent(spawnPoint) {
            if (this.selected === -1) return;
            if (spawnPoint) {
                if (this.character.cash < 1000) return storage.addNotification({ text: "Недостаточно средств", theme: "error" });
                if (spawnPoint === "house" && Number.isInteger(this.character.house)) spawnPoint = 'hotel'
            }
            mp.trigger("cMisc-CallServerEvent", "sPlayer-Spawn", this.character.id, spawnPoint);
            this.exit();
        },
        startTimer() {
            this.startMs = TWO_HOUR_MS - this.character.logOutMs;
            this.timerPerMin();
            this.timer = setInterval(this.timerPerMin, 60000);
        },
        timerPerMin() {
            const ms = this.startMs;
            let hour = Math.floor(ms / 3600000);
            let min = Math.floor((ms - hour * 3600000) / 60000);
            if (hour < 10) hour = "0" + hour;
            if (min < 10) min = "0" + min;
            this.time = hour + ":" + min;
            this.startMs -= 60000;
            if (this.startMs <= 0) {
                clearInterval(this.timer);
                this.logOutTwoHourAgo = true;
            }
        },
        exit() {
            mp.trigger("cCloseCef");
        },
    },
    mounted() {
        if (this.character.logOutMs <= TWO_HOUR_MS) {
            this.logOutTwoHourAgo = false;
            this.startTimer();
        } else {
            this.logOutTwoHourAgo = true;
        }
    },
};
const TWO_HOUR_MS = 7.2e6;
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
    .spawn{
        width: 100%;
        height: 100%;
        background-size: cover;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logo{
        /* position: absolute;
        right: 2vw;
        top: 2vw;
        transform-origin: top right;
        transform-style: flat;
        z-index: 1111;
        width: 6.04vw;
        height: 5.31vw; */
        margin: 15px;
        position: absolute;
        right: 0;
        top: 0;
    }
    img{
        max-width: 100%;
    }
    .page-title{
        position: absolute;
        left: 10vh;
        top: 10vh;
        color: rgb(255, 255, 255);
        font-family: "10221";
        font-size:  3.75vw;
        font-weight: 400;
        letter-spacing: -1.8px;
    }
    .flex{
        display: flex;
    }
    .content-center{
        display: flex;
        align-items: center;
    }
    .p-absolute{
        position: absolute;
    }
    .spawn-content{
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    .card{
        width: 36.3vw;
        height: 18.65vw;
        background: url('/img/spawn/base.png') no-repeat;
        background-size: cover;
        border: none;
        position: relative;
        padding-right: 3.44vw;
        padding-top: 3.75vw;
        transform-origin: center;
        transform-style: flat;
    }
    .image{
        left: 0;
        bottom: 0;
    }
    .card-title{
        color: rgb(206, 206, 207);
        font-family: "Century Gothic";
        font-size: 2.34vw;
        font-weight: 700;
        letter-spacing: -3.38px;
        text-align: right;
        margin-bottom: 1.04vw;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
    .card-text{
        color: rgb(209, 209, 209);
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 400;
        line-height: 2.5vw;
        letter-spacing: -1.5px;
        text-align: right;
    }
    .card-btn{
        color: rgb(255, 255, 255);
        font-family: "Century Gothic";
        font-size: 1.3vw;
        font-weight: 400;
        letter-spacing: -1.35px;
        width: 18.13vw;
        height: 2.6vw;
        box-shadow: 0 0.47vw 2.08vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
        background-color: rgb(0, 59, 152);
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: -1.3vw;
        left: 50%;
        transition: background-color 0.3s;
        transform: translate(-50%);
        transform-style: flat;
        z-index: 12!important;
    }
    .card-btn:hover{
        background-color: rgb(22, 98, 193);
    }
    .hover-green:hover{
        background-color: rgb(0, 102, 120);
        z-index: 2;
    }
    .disabled{
        background-color: rgb(186, 186, 186);
        z-index: 2;
    }
    .disabled:hover{
        background-color: rgb(186, 186, 186);
    }
    .move-right{
        left: 20px
    }
    .tform-right{
        transform-origin: right;
        transform-style: flat;
    }
    .tform-left-bottom{
        transform-origin: left bottom;
        transform-style: flat;
    }
    .tform-left-top{
        transform-origin: left top;
        transform-style: flat;
    }
    .ml{
        margin-left: 5.21vw;
    }
    .mb{
        margin-bottom: 2.6vw;
    }
    .font-size{
        font-size: 1.35vw;
    }
    .image-wrapper{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0.56vw;
        width: 13.49vw;
        height: 20vw;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .image1{
        background-image: url('/img/spawn/man.png');
    }
    .image2{
        background-image: url('/img/spawn/man1.png');
    }
    .image3{
        background-image: url('/img/spawn/man11.png');
    }
    .image4{
        background-image: url('/img/spawn/man111.png');
    }
    .image5{
        background-image: url('/img/spawn/man2.png');
    }
    .image6{
        background-image: url('/img/spawn/man22.png');
    }
    .image7{
        background-image: url('/img/spawn/man222.png');
    }
</style>
