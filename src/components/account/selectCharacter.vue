<template>
    <div class="wrapper" id="app">
        <div class="charSelect">
            <div class="logo"><img src="/img/hud/logo-100px-blue.png" alt=""></div>
            <div class="stats">
                <div class="stats-name">{{accountLogin}}</div>
                <div class="stats-amount">{{fortisCoin | divideNumber(" ")}} Fc</div>
                <div class="stats-icon"><img src="/img/selectCharacter/shop.png" alt=""></div>
            </div>
            <div class="player-card" v-if="currentSlot === 0">
                <div class="player-card__header">
                    <div class="slot-name">СЛОТ 1</div>
                    <div class="slot-delete" v-if="charactersData[0]" @click="deleted = true"><img src="/img/selectCharacter/delete.png" alt=""></div>
                </div>
				<div class="player-card__body" v-if="!charactersData[0]">
                    <div class="slot-card2">
                        <div class="image-locked"><img src="/img/selectCharacter/locked.png" alt=""></div>
                        <div class="info-text">Создайте своего первого персонажа.</div>
                    </div>
                </div>
                <div class="player-card__body" v-if="charactersData[0]">
                    <div class="slot-card">
                        <div class="slot-card__title">Имя персонажа</div>
                        <div class="slot-card__text">{{charactersData[0].nFirst}} {{charactersData[0].nSecond}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Часов отыграно</div>
                        <div class="slot-card__text"><span class="ml-10">{{charactersData[0].hoursPlayed}}</span></div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Фракция</div>
                        <div class="slot-card__text">{{charactersData[0].faction}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Должность</div>
                        <div class="slot-card__text">{{charactersData[0].rank}}</div>
                    </div>
                </div>
                <div class="player-card__footer">
                    <div class="select">
                        <div class="select-arrow left" @click="selectSlot(2)"></div>
                        <div class="select-body" v-if="charactersData[0]" @click="selectEvent(0)">Выбрать</div>
						<div class="select-body" v-if="!charactersData[0]" @click="createEvent">Создать</div>
                        <div class="select-arrow right" @click="selectSlot(1)"></div>
                    </div>
                </div>
            </div>
            <div class="player-card" v-if="currentSlot === 1">
                <div class="player-card__header">
                    <div class="slot-name">СЛОТ 2</div>
					<div class="slot-delete" v-if="charactersData[1]" @click="deleted = true"><img src="/img/selectCharacter/delete.png" alt=""></div>
                </div>
				<div class="player-card__body" v-if="charactersData[1]">
                    <div class="slot-card">
                        <div class="slot-card__title">Имя персонажа</div>
                        <div class="slot-card__text">{{charactersData[1].nFirst}} {{charactersData[1].nSecond}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Часов отыграно</div>
                        <div class="slot-card__text"><span class="ml-10">{{charactersData[1].hoursPlayed}}</span></div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Фракция</div>
                        <div class="slot-card__text">{{charactersData[1].faction}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Должность</div>
                        <div class="slot-card__text">{{charactersData[1].rank}}</div>
                    </div>
                </div>
                <div class="player-card__body" v-if="!charactersData[1]">
                    <div class="slot-card2">
                        <div class="image-locked">
                            <img v-if="!slots[0]" src="/img/selectCharacter/locked.png" alt="">
                            <img v-else src="/img/selectCharacter/unlocked.png" alt="">
                        </div>
                        <div class="info-text" v-if="!slots[0]">Слот будет разблокирован после 20 отыгранных часов на сервере или с приобретенным VIP аккаунтом</div>
                    </div>
                </div>
                <div class="player-card__footer" >
                    <div class="select">
                        <div class="select-arrow left" @click="selectSlot(0)"></div>
                        <div class="select-body" v-if="charactersData[1]" @click="selectEvent(1)">Выбрать</div>
                        <div class="select-body" v-if="!charactersData[1] && slots[0]" @click="createEvent">Создать</div>
						<div class="select-body" v-if="!charactersData[1] && !slots[0]">Купить</div>
                        <div class="select-arrow right" @click="selectSlot(2)"></div>
                    </div>
                </div>
            </div>
			<div class="player-card" v-if="currentSlot === 2">
                <div class="player-card__header">
                    <div class="slot-name">СЛОТ 3</div>
					<div class="slot-delete" v-if="charactersData[2]" @click="deleted = true"><img src="/img/selectCharacter/delete.png" alt=""></div>
                </div>
				<div class="player-card__body" v-if="charactersData[2]">
                    <div class="slot-card">
                        <div class="slot-card__title">Имя персонажа</div>
                        <div class="slot-card__text">{{charactersData[2].nFirst}} {{charactersData[2].nSecond}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Часов отыграно</div>
                        <div class="slot-card__text"><span class="ml-10">{{charactersData[2].hoursPlayed}}</span></div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Фракция</div>
                        <div class="slot-card__text">{{charactersData[2].faction}}</div>
                    </div>
                    <div class="slot-card">
                        <div class="slot-card__title">Должность</div>
                        <div class="slot-card__text">{{charactersData[2].rank}}</div>
                    </div>
                </div>
                <div class="player-card__body" v-if="!charactersData[2]">
                    <!-- <div class="slot-card2" v-if="!charactersData[2]">
                        <div class="image-locked"><img src="/img/selectCharacter/locked.png" alt=""></div>
                        <div class="info-text">Слот будет разблокирован при донате от 1000 рублей</div>
                    </div> -->
                    <div class="slot-card2">
                        <div class="image-locked">
                            <img v-if="!slots[1]" src="/img/selectCharacter/locked.png" alt="">
                            <img v-else src="/img/selectCharacter/unlocked.png" alt="">
                        </div>
                        <div class="info-text" v-if="!slots[1]">Слот будет разблокирован при донате от 1000 рублей</div>
                    </div>
                </div>
                <div class="player-card__footer">
                    <div class="select">
                        <div class="select-arrow left" @click="selectSlot(1)"></div>
                        <div class="select-body" v-if="charactersData[2]" @click="selectEvent(2)">Выбрать</div>
                        <div class="select-body" v-if="!charactersData[2] && slots[1]" @click="createEvent">Создать</div>
						<div class="select-body" v-if="!charactersData[2] && !slots[1]">Купить</div>
                        <div class="select-arrow right" @click="selectSlot(0)"></div>
                    </div>
                </div>
            </div>
            <div class="alert" v-if="deleted">
                <div class="alert-text">Вы точно хотите удалить персонажа?</div>
                <div class="alert-action">
                    <div class="alert-btn btn-ok" @click="deleteChar()">Да</div>
                    <div class="alert-btn btn-no" @click="deleted = false">Нет</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return{
			deleted: false,
            currentSlot: 0,
            slot2:{
                open: false
            },
        }
    },
    computed: {
			...mapGetters({
				charactersData: "CharactersList",
				slots: "GetSlotsOpen",
                accountLogin: "getAccountLogin",
                fortisCoin: "getFortisCoin",
			})
		},
	mounted() {
			//this.characters = this.$store.getters.CharactersList;
	},
    methods:{
        spawnEvent(key){
            mp.trigger("cMisc-CallServerEvent", "sPlayer-Spawn",key);
        },
		selectEvent(key){
            mp.trigger('moveSkyCamera','up');
			storage.setSelectCatacter(key); 
            mp.trigger("cSetPage", "charSpawn");
            mp.trigger('cCharsSelectRemoveCam');
        },
		haveDelete(id){
			this.slotDelete[id] = true;
		},
        createEvent(){
			mp.trigger("cSetPage", 'charsCreate');
			mp.trigger("cCharCreator-OpenMenu");
        },
		
		selectSlot(slot){
            mp.trigger('cCharSelectChangeCam', this.currentSlot, slot);
			this.currentSlot = slot;
		},
        deleteChar() {
            const id = this.charactersData[this.currentSlot].id;
            mp.trigger('cMisc-CallServerEvent', "sLoginDeleteCharacter", id);
            this.deleted = false;
        }

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
img {
    max-width: 100%
}
.wrapper{
    width: 100%;
    height: 100vh;   
}
.charSelect{
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    overflow: hidden;
    font-family: "Century Gothic";
}
.logo{
    /* position: absolute;
    right: 5vh;
    top: 5vh;
    z-index: 1222;
    transform-origin: right top; */
    margin: 15px;
    position: absolute;
    right: 0;
    top: 0;
}
.stats{
    position: absolute;
    left: 2vw;
    top: 2vw;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.38);
    border-radius: 10px;
    background-color: #08224b;
    opacity: 0.86;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    transform-origin: left top;
}
.stats-name{
    color: #d9dde8;
    font-family: "Century Gothic";
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1.2px;
    margin-right: 30px;
}
.stats-amount{
    color: #cbcfd5;
    font-family: "Century Gothic";
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-right: 20px;
}
.player-card{
    position: absolute;
    right: 8vw;
    top: calc(50% - 593px/ 2);
    background: url('/img/selectCharacter/card-bg.png') no-repeat;
    width: 529px;
    height: 593px;
    padding: 50px 20px 0;
    transform-origin: bottom
}

@media(max-height: 900px){
    .player-card{
        transform: scale(0.9);
        right: 6vw;
    }
    .stats{
        transform: scale(0.9);
    }
    .logo{
        transform: scale(0.9);
    }
    .alert{
        transform: scale(0.9);
    }
}
@media(max-height: 825px){
    .player-card{
        transform: scale(0.8);
        right: 4vw;
    }
    .stats{
        transform: scale(0.8);
    }
    .logo{
        transform: scale(0.8);
    }
    .alert{
        transform: scale(0.8);
    }
}
@media(max-width: 1360px){
    .player-card{
        transform: scale(0.8);
        right: 3vw;
    }
    .stats{
        transform: scale(0.8);
    }
    .logo{
        transform: scale(0.8);
    }
    .alert{
        transform: scale(0.8);
    }
}
@media(max-width: 850px){
    .player-card{
        transform-origin: right center;
        transform: scale(0.6);
        right: 3vw;
    }
    .stats{
        transform: scale(0.6);
    }
    .logo{
        transform: scale(0.6);
    }
    .alert{
        transform: scale(0.6);
    }
}
.player-card__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 20px;
}
.slot-name{
    color: #d1d1d1;
    font-family: "Century Gothic";
    font-size: 39px;
    font-weight: 700;
    letter-spacing: -0.21px;
}

.slot-card{
    width: 100%;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.205);
    text-align: right;
    padding: 13px 40px;
    width: 485px;
    height: 89px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.slot-card2{
    width: 485px;
    height: 371px;
    background-color: rgba(0, 0, 0, 0.205);
    border-radius: 10px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.ml-10{
    margin-left: 10px;
}
.slot-card__title{
    color: #d1d1d1;
    font-family: "Century Gothic";
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.9px;
}
.slot-card__text{
    color: #d1d1d1;
    font-family: "Century Gothic";
    font-size: 19px;
    font-weight: 400;
    letter-spacing: 0.65px;
}
.player-card__footer{
    height: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.select-body{
    width: 96px;
    color: #d1d1d1;
    font-family: "Century Gothic";
    font-size: 23px;
    font-weight: 700;
    margin: 0 30px;
    text-align: center;
}
.select-body:active{
    color: #fcfcfc;
}
.select{
    display: flex;
    align-items: center
}
.select-arrow.left{
    background: url('/img/selectCharacter/left.png') no-repeat;
    background-position: 45% 50%;
    background-color: rgba(9, 36, 75, 0.795);
}
.select-arrow.right{
    background: url('/img/selectCharacter/right.png') no-repeat;
    background-position: 55% 50%;
    background-color: rgba(9, 36, 75, 0.801);
}
.select-arrow{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: background-color 0.2s;
}
.select-arrow:hover{
    background-color: rgba(9, 36, 75, 0.801)
}
.select-arrow:focus, .select-arrow:active{
    background-color: rgba(15, 56, 114, 0.61);
}
.image-locked{
    margin-bottom: 40px;
}
.info-text{
    width: 417px;
    height: 39px;
    color: #cfcfcf;
    font-family: "Century Gothic";
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-align: center;
}

.alert{
    position: absolute;
    left: 20%;
    top: 20%;
    z-index: 1111;
    width: 462px;
    height: 147px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.38);
    border-radius: 10px;
    background-color: rgba(14, 42, 90, 0.897);
    display: flex;
    flex-direction: column;
    transform-origin: left bottom;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}
.alert-text{
    padding: 30px 10px;
    text-align: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 21px;
    font-weight: 400;
    letter-spacing: 0.55px;
}
.alert-action{
    display: flex;
}
.alert-btn{
    width: 50%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 21px;
    font-weight: 400;
    letter-spacing: 0.55px;
    transition: 0.2s;
}
.alert-btn:hover{
    background: rgb(10, 29, 61);
}
.alert-btn:active{
    background: rgba(10, 29, 61, 0.562);
}
.btn-ok{
    border-bottom-left-radius: 10px;
    background: rgb(16, 56, 103)
}
.btn-no{
    border-bottom-right-radius: 10px;
    background: rgba(14, 42, 90, 0.712)
}
</style>