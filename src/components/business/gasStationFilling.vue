<template>
<div class="gasFilling">
    <div>Заправить автомобиль:</div>
    <div>
        <select v-model="selectType">
            <option disabled selected  value="">Выберите тип двигателя</option>
            <option value="petroleum">Бензин</option>
            <option value="disel">Дизель</option>
            <option value="electro">Электро</option>
        </select>
    </div>
    <div>
        <range-slider
            class="slider"
            min="1"
            max="100"
            step="1"
            v-model="sliderValue">
        </range-slider>
        <span class="btn" @click="full()">Полностью</span>
    </div>
    <div v-if="selectType!=''">
        <div>Вы выбрали: <span>{{selectTypeAndPrice()}}</span></div>
        <div>Заправить на: <span>{{calcLiters()}}</span></div>
        <div>Стоимость заправки: <span>{{needPrice}}$</span></div>
        <div class="btn" @click="filling()">Заправить</div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'


export default {
	data(){
		return {
            sliderValue: 50,
            selectType: '',
            needLiters: 0,
            needPrice: 0,
            priceData:{
                petroleum: {
                    title: 'Бензин',
                    price: 4,
                },
                disel: {
                    title: 'Дизель',
                    price: 3,
                },
                electro: {
                    title: 'Электричество',
                    price: 2,
                },
            },
            vehicle:{
                title: 'Benefacrot',
                fuelTank: 50,
                fuel: 20,
            },
        }
	},
	computed: {
		...mapGetters({
				id: "enterBusiness",
				stationData: "getFirstObj",
			}),
	},
	watch: {
	
	},
	mounted () {
	
	},
	methods: {
        ,,
        full(){
            this.sliderValue = 100;
        },
        exit(){
            //mp.trigger("cCloseCefAndDestroyCam");
			//mp.trigger("cCloseCef");
            //mp.trigger("cMisc-CallServerEvent", "sCarDealership-Exit");
            
		},

	},
	components: {
        RangeSlider,
    }

}
</script>

<style scoped>
.gasFilling{
	position: absolute;
	top: 20vh;
	left: 30vw;
	width: 40vw;
	height: 60vh;
	background-color: #fff;
	border: 1px solid black;
	padding: 5px;
}
.slider {
  width: 200px;
}

.btn{
	background-color: #009900;
	border-radius: 4px;
	color: #fff;
	float: left;
    padding: 10px;
}
</style>