<template>
    <div class="wrapper">
        <div class="gas-station">
            <div class="content-wrapper">
                <div class="header">
                <div class="menu" >
                    <div class="menu-item" @click="tab = 'benzin'" :class="{active: tab === 'benzin'}">БЕНЗИН</div>
                    <div class="menu-item" @click="tab = 'diesel'" :class="{active: tab === 'diesel'}">ДИЗЕЛЬ</div>
                    <div class="menu-item" @click="tab = 'electro'" :class="{active: tab === 'electro'}">Электричество</div>
                </div>
                </div>
                <div class="content" v-if="tab === 'benzin'">
                    <div class="body">
                        <div class="fill-control">
                            <div class="slider">
                                <vue-slider v-model="slider.value"
                                            ref="slider"
                                            v-bind="options">
                                </vue-slider>
                                <div class="max-btn" @click="slider.value = options.max">MAX</div>
                                <div class="tooltip">{{ calcLiters() + 'л' }}</div>
                            </div>
                            <div class="info">
                                <div class="info-block">
                                    <div class="info-text">Заправить на {{ calcLiters() }} литров</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость заправки</div>
                                    <div class="info-num">{{needPrice}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость за литр</div>
                                    <div class="info-num">{{this.stationData.priceData[this.tab].price}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">За счет счет государства</div>
                                    <label class="switch">
                                        <input type="checkbox" v-model="statePay">
                                        <span class="switch-slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="action">
                                <div class="main-btn" @click="startFilling(0)">{{ btnName() }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content" v-if="tab === 'diesel'">
                    <div class="body">
                        <div class="fill-control">
                            <div class="slider">
                                <vue-slider v-model="slider.value"
                                            ref="slider"
                                            v-bind="options">
                                </vue-slider>
                                <div class="max-btn" @click="slider.value = options.max">MAX</div>
                                <div class="tooltip">{{ calcLiters() + 'л' }}</div>
                            </div>
                            <div class="info">
                                <div class="info-block">
                                    <div class="info-text">Заправить на {{ calcLiters() }} литров</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость заправки</div>
                                    <div class="info-num">{{needPrice}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость за литр</div>
                                    <div class="info-num">{{this.stationData.priceData[this.tab].price}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">За счет счет государства</div>
                                    <label class="switch">
                                        <input type="checkbox" v-model="statePay">
                                        <span class="switch-slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="action">
                                <div class="main-btn"  @click="startFilling(1)">{{ btnName() }}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="content" v-if="tab === 'electro'">
                    <div class="body">
                        <div class="fill-control">
                            <div class="slider">
                                <vue-slider v-model="slider.value"
                                            ref="slider"
                                            v-bind="options">
                                </vue-slider>
                                <div class="max-btn" @click="slider.value = options.max">MAX</div>
                                <div class="tooltip">{{ slider.value + '%' }}</div>
                            </div>
                            <div class="info">
                                <div class="info-block">
                                    <div class="info-text">Зарядить на {{ calcLiters() }} %</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость зарядки</div>
                                    <div class="info-num">{{needPrice}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">Стоимость за %</div>
                                    <div class="info-num">{{this.stationData.priceData[this.tab].price}}$</div>
                                </div>
                                <div class="info-block">
                                    <div class="info-text">За счет счет государства</div>
                                    <label class="switch">
                                        <input type="checkbox" v-model="statePay">
                                        <span class="switch-slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="action">
                                <div class="main-btn" @click="startFilling(2)">{{ btnName() }}</div>
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

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
    data(){
        return{
            tab: '',
            slider:{
                value: 50
            },
            btnText: 'Заправить',
            options: {
                dotSize: 'auto',
                width: 'auto',
                height: "0.63vw",
                contained: false,
                direction: 'ltr',
                data: null,
                min: 0,
                max: 100,
                interval: 0.1,
                disabled: false,
                clickable: true,
                duration: 0.2,
                adsorb: false,
                lazy: false,
                tooltip: null,
                tooltipPlacement: 'top',
                tooltipFormatter: void 0,
                useKeyboard: true,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: false,
                dotOptions: void 0,
                process: true,
            },
			needPrice: 0,
			statePay: false,
        }
    },
	computed: {
		...mapGetters({
				id: "enterBusiness",
				stationData: "getFirstObj",
			}),
	},
    methods:{
        btnName(){
            if(this.tab === 'electro'){
                return this.btnText = 'Зарядить' 
            }
            else{
                if (this.stationData.vehicle.title === "Канистра") return this.btnText = 'Заправить в канистру' 
                return this.btnText = 'Заправить' 
            }
        },
		
		startFilling(fuelType){
            if (this.stationData.vehicle.fuelType !== fuelType && this.stationData.vehicle.title !== "Канистра") return storage.addNotification({text: "Неправильный тип топлива",theme: "error"});
            if (fuelType === 2 && this.stationData.vehicle.title === "Канистра") return storage.addNotification({text: "Ошибка",theme: "error"});
			var data = {
				id:this.id,
				typeFilling:this.tab,
				value:this.needLiters,
                statePay: this.statePay,
                canGuid: this.stationData.vehicle.id || 0,
			};
			mp.trigger("cMisc-CallServerEvent", "sGasStationFillUpStart", JSON.stringify(data));
			this.exit();
		},
		selectTypeAndPrice(){
            return this.stationData.priceData[this.tab].title;
        },
        calcLiters(){
            this.needLiters = Math.round((this.stationData.vehicle.fuelTank - this.stationData.vehicle.fuel) / 100 * this.slider.value);
            this.needPrice = this.needLiters * this.stationData.priceData[this.tab].price;
            return this.needLiters;
        },
		exit() {
			mp.trigger("cSetPage","none");
		},
		onKeyDown(e) {
			if( e.keyCode === 27){
				this.exit();
			}
		},
    },
    components: {
        VueSlider
    },
	created() {
		document.addEventListener('keyup', this.onKeyDown);
	},
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyDown);
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
.wrapper{
	width: 100%;
	height: 100vh;
}
.gas-station{
    width: 100%;
    height: 100%;
    background: url('/img/bg-auto.png');
    background-size: cover;
}
.content-wrapper{
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-image: linear-gradient(135deg, rgba(0, 20, 85, 0.8) 0%, rgba(0, 44, 90, 0) 60%);
}
.content{
    padding: 0 3.18vw;
    width: 40.9vw;
    transition: 0.2s;
}
.header{
    padding: 2vw 3.18vw;
}
.menu{
    display: flex;
}
.menu-item{
    color: #bdbdbd;
    font-size: 2.19vw;
    font-weight: 600;
    letter-spacing: -2.25px;
    font-family: "Century Gothic";
    margin-right: 5.1vw;
    position: relative;
    text-transform: uppercase;
}
.menu-item.active{
    color: #fff
}
.menu-item::after{
    position: absolute;
    display: block;
    bottom: -0.31vw;
    left: 0;
    content: '';
    width: 50%;
    height: 0.31vw;
    background-color: #0079fe;
    opacity: 0;
}
.menu-item.active::after {
    opacity: 1;
}
.alert{
    display: flex;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.3vw;
    font-weight: 300;
    letter-spacing: -1.35px;
}
.alert-text{
    background-color: #0079fe;
    padding: 0.1vw 0.2vw;
}
.slider{
    margin-top: 2vw;
    position: relative;
}
.fill-control{
    width: 20.83vw;
}
.info-block{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3vw;
}
.info{
    margin-top: 1vw;
}
.info-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.3vw;
    font-weight: 300;
    letter-spacing: -1.35px;
}
.info-num{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 600;
    letter-spacing: -0.5px;
}
.max-btn{
    position: absolute;
    right: -9.38vw;
    top: -0.8vw;
    width: 4.64vw;
    height: 2.34vw;
    border-radius: 0.78vw;
    background-color: rgba(255, 255, 255, 0.18);
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: -0.72px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;
}
.tooltip{
    position: absolute;
    right: -2.6vw;
    top: 0;
    color: rgba(172, 172, 172, 0.397);
    font-family: "Century Gothic";
    font-size: 0.78vw;
    font-weight: 300;
    letter-spacing: -0.82px;
}
.max-btn:hover{
    background-color: rgba(255, 255, 255, 0.301);
}
.main-btn{
    width: 12.81vw;
    height: 4.38vw;
    border-radius: 0.78vw;
    background-color: #0079fe;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.88vw;
    font-weight: 300;
    letter-spacing: -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    text-align: center;
}
.main-btn:hover{
    background-color: rgb(1, 103, 212);
}
.action{
    margin-top: 2.5vw;
    display: flex;
    justify-content: flex-end;
}

.switch {
    position: relative;
    display: inline-block;
    width: 3.7vw;
    height: 1.46vw;
}
.switch-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1.3vw;
    font-weight: 300;
    letter-spacing: -1.35px;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #EBE9F4;
    transition: .4s;
}
.switch-slider:before {
    position: absolute;
    content: "";
    left: 0px;
    bottom: 0.1vw;
    margin-left: 0.1vw;
    transition: .4s;
    width: 1.25vw;
    height: 1.25vw;
    box-shadow: inset 0px 0px 2px 0px rgba(0, 0, 0, 0.69);
    background: radial-gradient(rgb(1, 103, 212) 0%, rgb(1, 103, 212) 30%,  #fff 39%, #fff 100%);
}
.switch input:checked + .switch-slider {
    background-color: rgb(1, 103, 212);
}
.switch.purple input:checked + .switch-slider{
    background: url('/img/phone/base.png') no-repeat;
}

.switch input:focus + .switch-slider {
    box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.377);
}

.switch input:checked + .switch-slider:before {
    transform: translateX(2.24vw);
}
.switch-slider.round {
    border-radius: 1.77vw;
}

.switch-slider.round:before {
    border-radius: 50%;
}
</style>