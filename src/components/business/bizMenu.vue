<template>
    <div class="wrapper">
        <div class="tablet-wrapper">
            <div class="tablet">
                <div class="tablet-inner">
                    <div class="topline">
                        <div class="battery-icon center">
                            <img src="/img/bizmenu/battery-icon.png" alt="">
                        </div>
                    </div>
                    <div class="content">
					<transition name="fade">
                            <div class="modal" v-if="delivery.matType">
                                <div class="modal-body">
                                    <div class="modal-item">
                                        <div class="modal-item-name">Тип груза:</div>
                                        <div class="modal-item-data">{{getResName(delivery.matType)}}</div>
                                    </div>
                                    <div class="modal-item">
                                        <div class="modal-item-name">Кол-во:</div>
                                        <div class="modal-item-data">{{delivery.matCount}}</div>
                                    </div>
                                    <div class="modal-item">
                                        <div class="modal-item-name">Стоимость груза:</div>
                                        <div class="modal-item-data">{{delivery.matSum}}$</div>
                                    </div>
									<div class="modal-item">
                                        <div class="modal-item-name">Стоимость доставки:</div>
                                        <div class="modal-item-data">{{delivery.deliveryPrice}}$</div>
                                    </div>
									<div class="modal-item">
                                        <div class="modal-item-name">К оплате:</div>
                                        <div class="modal-item-data">{{delivery.matSum+delivery.deliveryPrice}}$</div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="modal-btn btn-accept" @click="createOrder">Подтвердить</div>
                                    <div class="modal-btn btn-error" @click="cancelOrder">Отменить</div>
                                </div>
                            </div>
                    </transition>
                        <div class="page">
                            <div class="content-page" v-if="page === 'stat'">
                                <div class="page-title">{{title}}</div>
                                <div class="stat-content row">
                                    <div class="left">
                                        <div class="top-clients row">
                                            <div class="top-clients-block borderR">
                                                <div class="block-title">
                                                    Самые активные покупатели:
                                                </div>
                                                <ul class="clients-list">
                                                    <li v-for="(item,key) in graphStats.activeBuyer" :key='key'>{{key+1}}. {{item}}</li>
                                                </ul>
                                            </div>
                                            <div class="top-clients-block">
                                                <div class="block-title">
                                                    Последние покупатели:
                                                </div>
                                                <ul class="clients-list">
                                                    <li v-for="(item,key) in graphStats.lastBuyers" :key='key'>{{key+1}}. {{item}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="total-clients">
                                            <div class="block-title">
                                                Всего покупателей за сутки:
                                            </div>
                                            <ul class="clients-list">
                                                <li v-for="(item,key) in graphStats.listDayBuyers" :key='key'>{{key+1}}. {{item}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="mid">
                                        <div class="selling-stat">
                                            <div class="selling-stat-title">
                                                Список проданных товаров <br>
                                                за 
                                                <span class="underline">{{ periodTextMain }}</span>
                                            </div>
                                            <ul class="selling-stat-list">
                                                <li v-for="(item,key) in graphStats[period].topSells" :key='key'>
                                                    <div class="item-name">{{item.title}}</div>
                                                    <div class="item-amount">{{item.count}}шт</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="graph">
<div class="frameworks" v-if="selectGrah">
<framework  :data="selectGrah.data" :slug="selectGrah.slug" :periodText="selectGrah.periodText"/>
</div>
										</div>
                                        <div class="graph-handling">
                                            <div class="graph-handling-title">График отчётности по бизнесу:</div>
                                            <div class="row">
                                                <div class="btns borderR">
                                                    <div class="button center" @click="period = 'day', setPeriodText()" :class="{ active: period === 'day' }">День</div>
                                                    <div class="button center" @click="period = 'week', setPeriodText()" :class="{ active: period === 'week' }">Неделя</div>
                                                    <div class="button center" @click="period = 'month', setPeriodText()" :class="{ active: period === 'month' }">Месяц</div>
                                                </div>
                                                <div class="btns">
                                                    <div class="button center" @click="graphType = 1" :class="{ active: graphType === 1 }">Доход</div>
                                                    <div class="button center" @click="graphType = 2" :class="{ active: graphType === 2 }">Расход</div>
                                                    <div class="button center" @click="graphType = 3" :class="{ active: graphType === 3 }">Сальдо</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer-content">
                                    <div class="row">
                                        <div class="block mr">
                                            <div class="row">
                                                <div class="nalog-text">Налоги в неделю:</div>
                                                <div class="nalog-num">{{tax.week | divideNumber}}$</div>
                                            </div>
                                            <div class="row">
                                                <div class="nalog-text">Налоги в день:</div>
                                                <div class="nalog-num">{{tax.day | divideNumber}}$</div>
                                            </div>
                                            <div class="row">
                                                <div class="nalog-text">Налоги в час:</div>
                                                <div class="nalog-num">{{tax.hour | divideNumber}}$</div>
                                            </div>
                                        </div>
                                        <div class="block center">
                                            <div class="row">
                                                <div class="nalog-text center">Наценка от закупочной цены:</div>
                                                <div class="nalog-num row center">
                                                    <input type="number" v-model.number="margin" min="0" max="100" step="0.1">
                                                    <div class="nalog-text ml">%</div>
                                                    <div class="button center save-margin" v-if="showSaveMargin" @click="saveMargin">Сохранить</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-page" v-if="biz === 'regular' && page === 'mats'">
                                <div class="mats-wrapper">
                                    <div class="mats-panel">
                                        <div class="mats-title center">Панель материалов</div>
                                        <div class="choose-mats">
                                            Выберите материал:
                                        </div>
                                        <div class="list">
											<div class="item" v-for="(item,key) in getBusinesRes" :key='key' :class="{active: activeItem === key+1}">
                                                <div class="item-name">
                                                    {{key+1}}. {{item.title}}
                                                </div>
                                                <div class="item-quantity">{{item.value}}ед.</div>
                                                <div class="item-select" @click="selectMat(key+1, item.type)">Выбрать</div>
                                            </div>
										<!--
                                            <div class="item" :class="{active: activeItem === 1}">
                                                <div class="item-name">
                                                    1. Фонарик
                                                </div>
                                                <div class="item-quantity">15000ед.</div>
                                                <div class="item-select" @click="activeItem = 1">Выбрать</div>
                                            </div>
                                            <div class="item" :class="{active: activeItem === 2}">
                                                <div class="item-name">
                                                    2. Канистра
                                                </div>
                                                <div class="item-quantity">1500ед.</div>
                                                <div class="item-select" @click="activeItem = 2">Выбрать</div>
                                            </div>
											<div class="item" :class="{active: activeItem === 2}">
                                                <div class="item-name">
                                                    2. Канистра
                                                </div>
                                                <div class="item-quantity">1500ед.</div>
                                                <div class="item-select" @click="activeItem = 2">Выбрать</div>
                                            </div>
                                            -->
                                        </div>
                                        <div class="mats-stat">
                                            <div class="stat-block">
                                                <div class="item">
                                                    <div class="item-name">Расходы за месяц:</div>
                                                    <div class="item-quantity">{{graphStats.month[matTypeStat] | divideNumber }}ед.</div>
                                                </div>
                                                <div class="item">
                                                    <div class="item-name">Расходы за неделю:</div>
                                                    <div class="item-quantity">{{graphStats.week[matTypeStat] | divideNumber}}ед.</div>
                                                </div>
                                                <div class="item">
                                                    <div class="item-name">Расходы за день:</div>
                                                    <div class="item-quantity">{{graphStats.day[matTypeStat] | divideNumber }}ед.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mats-order">
                                        <div class="mats-title center">Заказ</div>
                                        <div class="block" v-if="activeItem">
                                            <div class="item row center">
                                                <div class="item-text">
                                                    Сумма: {{matOrderValue}}$
                                                </div>
                                            </div>
                                            <div class="item center row">
                                                <div class="item-text">Введите количество:</div>
                                                <div class="item-input center">
                                                    <input type="text" v-model.number="matOrderCount">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row center order-btn-wrapper" v-if="activeItem">
                                            <div class="order-btn center" @click="calcDelivery()">Заказать</div>
                                        </div>
										<div class="block" v-if="!activeItem">
                                            <div class="item-text center">Выберите тип</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
							<div class="content-page" v-if="biz === 'auto' && page === 'mats'">
                                <div class="mats-wrapper">
                                    <div class="mats-panel auto-sklad">
                                        <div class="mats-title center">Транспорт в наличии</div>
                                        <div class="choose-mats">
                                            Выберите для просмотра статистики продаж:
                                        </div>
                                        <div class="list">
											<div class="item" v-for="(item,key) in getBusinesRes" :key='key' :class="{active: activeItem === key+1}">
                                                <div class="item-name">
                                                    {{key+1}}. {{item.type}}
                                                </div>
                                                <div class="item-quantity">{{item.count}}ед.</div>
                                                <div class="item-select" @click="selectMat(key+1, item.type)">Выбрать</div>
                                            </div>
                                            <!--
											<div class="item" :class="{active: activeItem === 1}">
                                                <div class="item-name">
                                                    1. Voodoo
                                                </div>
                                                <div class="item-quantity">15ед.</div>
                                                <div class="item-select" @click="activeItem = 1">Выбрать</div>
                                            </div>
                                            <div class="item" :class="{active: activeItem === 2}">
                                                <div class="item-name">
                                                    2. Issi3
                                                </div>
                                                <div class="item-quantity">1ед.</div>
                                                <div class="item-select" @click="activeItem = 2">Выбрать</div>
                                            </div>
                                            <div class="item" :class="{active: activeItem === 3}">
                                                <div class="item-name">
                                                    3. Glendale
                                                </div>
                                                <div class="item-quantity">1ед.</div>
                                                <div class="item-select" @click="activeItem = 3">Выбрать</div>
                                            </div>
                                            <div class="item" :class="{active: activeItem === 4}">
                                                <div class="item-name">
                                                    4. Virgo
                                                </div>
                                                <div class="item-quantity">1ед.</div>
                                                <div class="item-select" @click="activeItem = 4">Выбрать</div>
                                            </div>
                                            <div class="item" :class="{active: activeItem === 5}">
                                                <div class="item-name">
                                                    5. Virgo2
                                                </div>
                                                <div class="item-quantity">15ед.</div>
                                                <div class="item-select" @click="activeItem = 5">Выбрать</div>
                                            </div>
											-->
                                        </div>
                                        <div class="mats-stat">
                                            <div class="stat-block">
                                                <div class="item">
                                                    <div class="item-name">Продано за месяц:</div>
                                                    <div class="item-quantity">{{graphStats.month.vehSold[matTypeStat] || 0 | divideNumber }}ед.</div>
                                                </div>
                                                <div class="item">
                                                    <div class="item-name">Продано за неделю:</div>
                                                    <div class="item-quantity">{{graphStats.week.vehSold[matTypeStat] || 0 | divideNumber }}ед.</div>
                                                </div>
                                                <div class="item">
                                                    <div class="item-name">Продано за день:</div>
                                                    <div class="item-quantity">{{graphStats.day.vehSold[matTypeStat] || 0 | divideNumber }}ед.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="zakaz">
                                            <div class="btn-order" @click="page = 'order'">Заказать транспорт</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-page" v-if="biz === 'auto' && page === 'order'">
                                <div class="order-auto row">
                                    <div class="col">
                                        <div class="title center">
                                            Заказ автомобиля
                                        </div>
                                        <div class="help-text">Добавьте автомобиль в корзину:</div>
                                        <div class="order-auto-list-wrapper">
                                            <div class="order-auto-list auto-scroll">
												<div class="order-auto-item row" v-for="(item,key) in getBusinesRes">
                                                    <div class="auto-name">
                                                        {{key+1}}. {{item.type}}
                                                    </div>
                                                    <div class="auto-quantity">{{item.price}}$</div>
                                                    <div class="auto-order-btn center row">
                                                        <div class="cart-icon center"><img src="/img/bizmenu/cart.png" alt="" @click="addCarInBasket(key)"></div>
                                                    </div>
                                                </div>
												<!--
                                                <div class="order-auto-item row">
                                                    <div class="auto-name">
                                                        1. Verlierer2
                                                    </div>
                                                    <div class="auto-quantity">60 000$</div>
                                                    <div class="auto-order-btn center row">
                                                        <div class="cart-icon center"><img src="/img/bizmenu/cart.png" alt=""></div>
                                                    </div>
                                                </div>
												<div class="order-auto-item row">
                                                    <div class="auto-name">
                                                        1. Verlierer2
                                                    </div>
                                                    <div class="auto-quantity">60 000$</div>
                                                    <div class="auto-order-btn center row">
                                                        <div class="cart-icon center"><img src="/img/bizmenu/cart.png" alt=""></div>
                                                    </div>
                                                </div>
                                                <div class="order-auto-item row">
                                                    <div class="auto-name">
                                                        1. Verlierer2
                                                    </div>
                                                    <div class="auto-quantity">60 000$</div>
                                                    <div class="auto-order-btn center row">
                                                        <div class="cart-icon center"><img src="/img/bizmenu/cart.png" alt=""></div>
                                                    </div>
                                                </div>
                                                -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="title center">
                                            Корзина
                                        </div>
                                        <div class="help-text" v-if="basket.length === 0">Добавьте транспорт в заказ</div>
                                        <div class="help-text" v-if="basket.length>0">Подтвердите покупку автомобилей:</div>
                                        <div class="cart-auto-list auto-scroll" v-if="basket.length>0">
                                            <div class="order-auto-item row" v-for="(item,key) in basket">
                                                <div class="auto-name">
                                                    {{key+1}}. {{item.type}}
                                                </div>
                                                <div class="auto-price">{{item.price}}$</div>
                                                <div class="delete-item">
                                                    <div class="icon-delete center"><img src="/img/bizmenu/icons8-delete-bin-24.png" alt="" @click="delCarInBasket(key)"></div>
                                                </div>
                                            </div>
											<!--
											<div class="order-auto-item row">
                                                <div class="auto-name">
                                                    1. FELON
                                                </div>
                                                <div class="auto-price">260.000$</div>
                                                <div class="delete-item">
                                                    <div class="icon-delete center"><img src="/img/bizmenu/icons8-delete-bin-24.png" alt=""></div>
                                                </div>
                                            </div>
                                            <div class="order-auto-item row">
                                                <div class="auto-name">
                                                    1. FELON
                                                </div>
                                                <div class="auto-price">260.000$</div>
                                                <div class="delete-item">
                                                    <div class="icon-delete center"><img src="/img/bizmenu/icons8-delete-bin-24.png" alt=""></div>
                                                </div>
                                            </div>
                                            <div class="order-auto-item row">
                                                <div class="auto-name">
                                                    1. FELON
                                                </div>
                                                <div class="auto-price">260.000$</div>
                                                <div class="delete-item">
                                                    <div class="icon-delete center"><img src="/img/bizmenu/icons8-delete-bin-24.png" alt=""></div>
                                                </div>
                                            </div>
											-->
                                        </div>
                                        <div class="help-text">Макс. кол-во для одного заказа: 3</div>
                                        <div class="cart-footer" v-if="basket.length>0">
                                            <div class="row total-price">
                                                <div class="text">Общая сумма:</div><div class="text ml-auto">{{sumBasket()}}$</div>
                                            </div>
                                            <div class="row center"><div class="btn-buy center" @click="calcDeliveryAuto">ЗАКАЗАТЬ</div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer">
                        <div class="logo">
                            <div class="fortis-logo center"><img src="/img/bizmenu/ff.png" alt=""></div>
                        </div>
                        <div class="menu">
                            <div class="menu-item" @click="page = 'stat'" :class="{active: page === 'stat'}">
                                <div class="menu-item-icon center">
                                    <img :src="statIconChange()" alt="">
                                    <div class="layerForClick" @click="page = 'stat'"></div>
                                </div>
                            </div>
                            <div class="menu-item" :class="{active: page === 'mats'}">
                                <div class="menu-item-icon center">
                                    <img :src="matsIconChange()" alt="">
                                    <div class="layerForClick" @click="page = 'mats'"></div>
                                </div>
                            </div>
                        </div>
                        <div class="bizMoney">На счету: <span> {{balance | divideNumber}}$</span>
                            <div class="button center take-money" @click="takeBizMoney">Снять деньги</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Framework from "../framework.vue";

export default {
	components: { Framework },
    data(){
        return{
            //biz: 'auto',
            page: 'stat',
            statIcon: '/img/bizmenu/stat-icon.png',
            matsIcon: '/img/bizmenu/mats-icon.png',
            percent: 15,
            period: 'day',
            periodText: 'час',
            periodTextMain: "день",
            graphTypeArray: ['turnover','expenditure','saldo'],
            graphType: 1,
			matOrderCount: 0,
			matOrderValue: 0,
            activeItem: 1,
			frameworks: ["vue"],
			basket:[],
			data: null,
            showSaveMargin: false,
            matTypeStat: "meterial",
        }
    },
	watch:{
		matOrderCount(val){
			if(this.activeItem === null) return;
			if(!this.getBusinesRes[this.activeItem-1]) return;
			this.matOrderValue = val * this.getBusinesRes[this.activeItem-1].price;
		},
		activeItem(val){
			if(this.activeItem === null) return;
			if(!this.getBusinesRes[this.activeItem-1]) return;
			this.matOrderValue = this.matOrderCount * this.getBusinesRes[this.activeItem-1].price;

		}
	},
	computed: {
			...mapGetters({
				id: "enterBusiness",
				balance: "getBusinessBalance",
				biz: "getBusinesType",
				getBusinesRes: "getBusinesRes",
				graphStats: "getBusinesStat",
				delivery: "getBusinesDelivery",
                title: "getBusinesTitle",
                taxPercent: "getTaxValues",
                marginLimit :"getMarginLimit"
			}),
			
		selectGrah(){
			if (!this.graphStats) return null;
			return this.frameworks = {
				slug: 'koa',
				periodText: this.periodText,
				data: this.graphStats[this.period][this.graphTypeArray[this.graphType-1]],
			}
		},
		margin: {
            get: function () {
                return this.$store.getters.getBusinesMargin
            },
            set: function (n) {
                this.showSaveMargin = true;
                if (n < 0 || n > this.marginLimit) return storage.addNotification({text: "Некорректное значение наценки",theme: "error"});
                if (!n) n = 0;
                if (!Number.isInteger(n)) n = Math.floor(n);
                this.$store.dispatch("setBusinesMargin", n);
            }
		},
        tax: function () {
            const allTaxes = this.$store.getters.getTaxes;
            const bizTax = this.taxPercent.find(t => t.type === "business").value;
            const obj = {
                week: this.$options.filters.roundNum(allTaxes.business.price / 100 * bizTax),
                day: this.$options.filters.roundNum(allTaxes.business.price / 100 * bizTax / 7),
                hour: this.$options.filters.roundNum(allTaxes.business.price / 100 * bizTax / 168),
            }
            return obj
        },
	},
    methods:{
		priceBasket(){
		},
		sumBasket(){
			var summ = 0;
			for(var key in this.basket){
				summ+=this.basket[key].price;
			}
			return summ;
		},
		addCarInBasket(key){
			if(this.basket.length === 3) return;
			if(this.getBusinesRes[key]){
				this.basket.push(this.getBusinesRes[key]);
			}
		},
		delCarInBasket(key){
			this.basket.splice(key, 1);
		},
		getResName(type){
			if(type === 'material') return 'Материалы';
			if(type === 'product') return 'Продукты';
			if(type === 'fuel') return 'Топливо';
			if(type === 'auto') return 'Автомобили';
			//return this.getBusinesRes[this.activeItem-1].title;
		},
        statIconChange(){
            if(this.page === 'stat'){
                return this.statIcon = '/img/bizmenu/stat-icon_active.png'
            }
            else{
                return this.statIcon = '/img/bizmenu/stat-icon.png'
            }
        },
        matsIconChange(){
            if(this.page === 'mats'){
                return this.matsIcon = '/img/bizmenu/mats-icon_active.png'
            }
            else{
                return this.matsIcon = '/img/bizmenu/mats-icon.png'
            }
        },
        setPeriodText(){
            if(this.period === 'day'){
                this.periodText = 'час'
                this.periodTextMain = 'день'
            }
            else if(this.period === 'week'){
                this.periodText = 'день'
                this.periodTextMain = 'неделю'
            }
            else if(this.period === 'month'){
                this.periodText = 'день'
                this.periodTextMain = 'месяц'
            }
        },
		calcDelivery(){
            if (this.matOrderCount <= 0) return storage.addNotification({text: "Введите количество материалов для заказа",theme: "error"});
			mp.trigger("calcDelivery", this.getBusinesRes[this.activeItem-1].type,this.matOrderCount,this.matOrderValue,this.basket);
		},
		calcDeliveryAuto(){
            mp.trigger("calcDelivery", "auto", this.basket.length, this.sumBasket(), JSON.stringify(this.basket.map(car => car.model)));
		},
		cancelOrder(){
			//storage.setBusinessId(1); 
			storage.setBusinesDelivery({}); 
		},
		createOrder(){
            this.basket = [];
			mp.trigger("cMisc-CallServerEvent", "sBusinesCreateOrderMats",this.id,JSON.stringify(this.delivery));
		},
		selectMat(key, type){
			this.activeItem = key;
            this.matTypeStat = type;
		},
		exit() {
			mp.trigger("cCloseCefAndDestroyCam");
		},
		onKeyUp(e) {
			if( e.keyCode === 27){
				this.exit();
			}
		},
        saveMargin() {
            if (this.margin < 0 || this.margin > this.marginLimit) return storage.addNotification({text: "Некорректное значение наценки",theme: "error"});
            mp.trigger("cMisc-CallServerEvent", "sBusinessChangeMargin", this.margin);
            this.showSaveMargin = false;
        },
        takeBizMoney() {
            mp.trigger("cMisc-CallServerEvent", "sBusinessTakeBalanceMoney");
            this.$store.dispatch("setBusinessBalance", 0);
        }
    },
	created() {
        this.matTypeStat = this.getBusinesRes[0].type;
		document.addEventListener('keyup', this.onKeyUp);
	},
    beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyUp);
	}
}
</script>
<style scoped >
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
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.row{
    display: flex;
}
.underline{
    text-decoration: underline;
}
.left,.right{
    width: 15.57vw;
}
    .tablet-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .tablet{
        background: url('/img/lspd-tablet/tablet.png');
        background-size: contain;
        width: 55.83vw;
        height: 39.79vw;
        padding-top: 2.6vw;
        padding-left: 4.69vw;
        padding-bottom: 2.34vw;
        padding-right: 4.64vw;
        position: relative;
    }
    .tablet-inner{
        width: 100%;
        height: 100%;
        background-color: #e4e7ea;
        position: relative;
    }
    .home-btn{
        height: 3.8vw;
        width: 1.41vw;
        border: 0.1vw solid rgb(199, 199, 199);
        box-shadow: inset 0 0 0.63vw 0.1vw rgba(0, 0, 0, 0.486);
        border-radius: 0.78vw;
        position: absolute;
        right: 1.77vw;
        top: 45.5%;
    }
    .topline{
        width: 100%;
        height: 1.2vw;
        background-color: #2f519b;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 0;
        padding: 0 0.6vw;
    }
    .battery-icon{
        width: 1.72vw;
    }
    .footer{
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        bottom: 0;
        left: 0;
        height: 3.13vw;
        background-color: #2f519b;
    }
    .footer .menu{
        width: 15%;
        display: flex;
        justify-content: space-between;
    }
    .footer .menu-item.active{
        background: #fff;
    }
    .footer .menu-item{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.13vw;
        height: 100%;
        background-color: #163068;
        transition: 0.2s;
    }
    .footer .menu-item-icon{
        width: 1.98vw;
    }
    .footer .bizMoney{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1vw;
        color: #ffffff;
        font-family: "LondonNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .footer .logo{
        position: absolute;
        top: 50%;
        left: 1vw;
        transform: translateY(-50%);
    }
    .footer .fortis-logo{
        width: 2.08vw;
    }
    .layerForClick{
        position: absolute;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 11;
    }
    .content{
        background-color: #4f75c7;
        height: 100%;
        width: 100%;
        padding-bottom: 3.13vw;
        padding-top: 1.2vw;
    }
    .page-title{
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 2.45vw;
        font-weight: 400;
        height: 3.35vw;
        border-bottom: 0.05vw solid #fff;
        text-align: center;
        width: 80%;
        margin: 0 auto;
        margin-top: 1.04vw;
    }
    .top-clients{
        width: 100%;
        height: 11.25vw;
        background-color: #2f519b;
        border-radius: 0.52vw;
        padding: 0.52vw 0;
        overflow: hidden;
        margin-bottom: 0.21vw;
    }
    .top-clients-block{
        width: 50%;
        padding: 0 0.52vw;
    }
    .borderR{
        border-right: 1px solid #fff;
    }
    .stat-content{
        padding-top: 1.46vw;
        padding-left: 0.63vw;
        padding-right: 0.63vw;
    }
    .block-title{
        color: #ffffff;
        font-family: "LondonNineteenSixty";
        font-size: 0.73vw;
        font-weight: 400;
        line-height: 0.73vw;
        border-bottom: 0.05vw solid #fff;
        padding-bottom: 0.31vw;
    }
    .clients-list{
        padding-top: 0.63vw;
    }
    .clients-list li{
        color: #ffffff;
        font-family: "ParisNineteenSixty";
        font-size: 0.63vw;
        font-weight: 400;
        min-height: 1vw;
        margin-bottom: 0.2vw;
    }
    .total-clients{
        height: 8.65vw;
        width: 15.57vw;
        background-color: #2f519b;
        border-radius: 0.52vw;
        padding: 0.52vw;
    }
    .total-clients .block-title{
        text-align: center
    }
    .total-clients .clients-list li{
        font-size: 0.83vw;
    }
    .total-clients .clients-list{
        overflow-y: auto;
        max-height: 80%;
        padding: 0;
        margin-top: 0.52vw;
    }
    .total-clients .clients-list::-webkit-scrollbar{
        width: 0.31vw;
    }
    .total-clients .clients-list::-webkit-scrollbar-track{
        background-color: #fff;
        border-radius: 0.16vw;
    }
    .total-clients .clients-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        background-color: #4f75c7;
        box-shadow: inset 0 0 0px 0.05vw #fff;
    }
    .selling-stat{
        width: 12.92vw;
        height: 20.1vw;
        background-color: #ffffff;
        margin: 0 0.63vw;
        border-radius: 0.52vw;
        padding: 0.63vw;
        padding-right: 0.05vw;
    }
    .selling-stat-list::-webkit-scrollbar{
        width: 0.31vw;
        margin-left: 0.52vw;
    }
    .selling-stat-list::-webkit-scrollbar-track{
        background-color: #fff;
        border-radius: 0.16vw;
        box-shadow: inset 0 0 0px 0.05vw #4f75c7;
    }
    .selling-stat-list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        background-color: #4f75c7;
    }
    .selling-stat-title{
        color: #4f75c7;
        font-family: "LondonNineteenSixty";
        font-size: 0.78vw;
        font-weight: 400;
        margin-bottom: 0.52vw;
    }
    .selling-stat-list{
        max-height: 86%;
        overflow-y: auto;
        padding-right: 0.63vw;
    }
    .selling-stat-list li{
        color: #4f75c7;
        font-family: "ParisNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        display: flex;
        justify-content: space-between;
    }
    .selling-stat .item-amount::before{
        content: '-';
        margin-right: 0.52vw;
    }
    .graph{
        width: 15.57vw;
        height: 11.25vw;
        background-color: #2f519b;
        border-radius: 0.52vw;
        padding: 0.52vw 0;
        overflow: hidden;
        margin-bottom: 0.21vw;
    }
    .graph-handling-title{
        color: #ffffff;
        font-family: "ParisNineteenSixty";
        font-size: 0.83vw;
        font-weight: 400;
        text-align: center;
        margin: 0.42vw 0;
    }
    .graph-handling .button{
        width: 5.31vw;
        height: 1.77vw;
        border-radius: 0.52vw;
        background-color: #2f519b;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        margin-bottom: 0.80vw;
        transition: 0.3s;
    }
    .graph-handling .button.active{
        background: #fff;
        color: #4f75c7;
    }
    .graph-handling .button:last-child{
        margin: 0;
    }
    .graph-handling .btns{
        padding: 0.26vw 0.78vw;
    }
    .graph-handling .row{
        justify-content: center;
    }
    .nalog-text,.nalog-num{
        color: #ffffff;
        font-size: 0.99vw;
        font-weight: 400;
    }
    .nalog-text{
        font-family: "LondonNineteenSixty";
        /*min-width: 8.7vw;*/
        margin-right: 0.4vw;
    }
    .nalog-num{
        font-family: "ParisNineteenSixty";
    }
    .nalog-num input{
        border-radius: 10px;
        border: none;
        outline: none;
        background: #fff;
        padding: 0.2vw;
        font-family: "LondonNineteenSixty";
        color: #2f519b;
        font-size: 0.99vw;
        font-weight: 400;
        text-align: center;
        position: relative;
    }
    .footer-content{
        padding-left: 0.63vw;
        padding-right: 0.63vw;
    }
    .mr{
        margin-right: 1vw;
    }
    .ml{
        margin-left: 0.2vw;
    }

    /* материалы */
    
    .mats-wrapper{
        width: 22.34vw;
        margin: 0 auto;
    }
    .mats-panel{
        background-color: #2f519b;
        margin-top: 1.72vw;
        border-radius: 0.52vw;
        margin-bottom: 0.89vw;
    }
    .mats-title{
        width: 100%;
        height: 2.5vw;
        background-color: #ffffff;
        border-radius: 0.52vw;
        color: #4f75c7;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.35vw;
        font-weight: 400;
        text-align: center;
    }
    .choose-mats{
        color: #ffffff;
        font-family: "ParisNineteenSixty";
        font-size: 0.73vw;
        font-weight: 400;
        padding-left: 0.63vw;
        padding-top: 1.15vw;
        padding-bottom: 0.2vw;
    }
    .mats-panel .list{
        height: 5.95vw;
        overflow-y: auto;
        position: relative;
        padding: 0 0.63vw;
    }
    .auto-sklad .list{
        height: 11.5vw;
    }
    .mats-panel .list::-webkit-scrollbar{
        width: 0.31vw;
        margin-left: 0.52vw;
        border-radius: 0.16vw;
    }
    .mats-panel .list::-webkit-scrollbar-track{
        background-color: #2f519b;
        border-radius: 0.16vw;
    }
    .mats-panel .list::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        background-color: #fff;
    }
    .mats-panel .list .item{
        width: 100%;
        height: 2.4vw;
        box-shadow: 0 0.21vw 0.1vw rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        margin-bottom: 0.57vw;
        color: #4f75c7;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        display: flex;
        align-items: center;
        padding: 0 0.5vw;
        transition: 0.2s;
    }
    .mats-panel .list .item.active{
        background: #4f75c7;
        color: #fff;
    }
    .mats-panel .list .item-name{
        min-width: 40%;
    }
    .mats-panel .list .item-quantity{
        min-width: 20%;
        margin-left: 1vw;
    }
    .mats-panel .list .item-select{
        margin-left: auto;
        text-decoration: underline;
    }
    .mats-stat{
        width: 100%;
        height: 7.33vw;
    }
    .stat-block{
        padding: 0 0.63vw;
    }
    .mats-stat{
        display: flex;
        align-items: center;
    }
    .stat-block{
        width: 100%;
        position: relative;
    }
    .stat-block::before,.stat-block::after{
        content: '';
        display: block;
        position: absolute;
        width: 60%;
        height: 0.05vw;
        background: #fff;
    }
    .stat-block::before{
        left: 20%;
        top: -0.52vw;
    }
    .stat-block::after{
        left: 20%;
        bottom: -0.52vw;
    }
    .stat-block .item{
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        height: 1.6vw;
    }
    .mats-order{
        width: 100%;
        height: 8.96vw;
        background-color: #2f519b;
        border-radius: 0.52vw;
    }
    .mats-order .block{
        padding-top: 0.5vw;
    }
    .mats-order .block .item-text{
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
    }
    .mats-order .block .item-input{
        width: 6.51vw;
        height: 1vw;
        margin-left: 1vw;
    }
    .mats-order .block .item-input input{
        width: 100%;
        height: 100%;
        border-radius: 1vw;
        border: none;
        outline: none;
        text-align: center;
        padding: 0 1vw;
        color: #232323;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.73vw;
        font-weight: 400;
    }
    .mats-order .order-btn{
        width: 6.15vw;
        height: 1.3vw;
        background-color: #4f75c7;
        border-radius: 1vw;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        transition: 0.3s;
    }
    .mats-order .order-btn:hover{
        background-color: #5e8aeb;
    }
    .order-btn-wrapper{
        margin-top: 0.5vw;
    }
    .auto-sklad .zakaz{
        padding: 1vw 0.63vw;
        padding-top: 0.3vw;
        display: flex;
        justify-content: center;
    }
     .auto-sklad .btn-order{
        padding: 0.3vw 0.5vw;
        color: #2f519b;
        background: #fff;
        font-size: 0.83vw;
        font-family: "NewYorkNineteenSixty";
        transition: 0.2s;
     }
     .auto-sklad .btn-order:hover{
        color: #fff;
        background: #5e8aeb;
     }
/* заказ машин */

    .order-auto{
        width: 100%;
        padding: 0.94vw 1.5vw;
        justify-content: space-between;
    }
    .order-auto .col{
        width: 20.83vw;
        height: 100%;
        background-color: #fff;
        border-radius: 0.52vw;
    }
    .order-auto .title{
        width: 100%;
        height: 2.5vw;
        background-color: #2f519b;
        border-radius: 0.52vw;
        color: #fff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.35vw;
        font-weight: 400;
        text-align: center;
    }
    .order-auto .help-text{
        color: #2f519b;
        font-family: "ParisNineteenSixty";
        font-size: 0.73vw;
        font-weight: 400;
        padding-left: 0.63vw;
        padding-top: 0.63vw;
        padding-bottom: 0.2vw;
    }
    .order-auto-list-wrapper{
        height: 23.96vw;
    }
    .order-auto-list{
        height: 98%;
        overflow-y: auto;
        padding: 0 0.63vw;
    }
    .auto-scroll::-webkit-scrollbar{
        width: 0.31vw;
        margin-left: 0.52vw;
        border-radius: 0.16vw;
    }
    .auto-scroll::-webkit-scrollbar-track{
        background-color: #fff;
        border-radius: 0.16vw;
    }
    .auto-scroll::-webkit-scrollbar-thumb{
        border-radius: 0.16vw;
        background-color: #2f519b;
    }
    .order-auto-item{
        width: 100%;
        height: 2.4vw;
        background-color: #2f519b;
        margin-bottom: 1.09vw;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        align-items: center;
        padding: 0 0.63vw;
    }
    .auto-name{
        min-width: 60%;
    }
    .auto-quantity{
        min-width: 10%;
        margin-left: 0.2vw;
        text-align: center
    }
    .auto-order-btn{
        margin-left: auto;
    }
    .auto-price{
        margin-left: auto;
    }
    .auto-order-btn .text{
        border-bottom: 1px solid #fff;
        line-height: 1vw;
    }
    .cart-auto-list{
        max-height: 17.4vw;
        overflow-y: auto;
        padding: 0 0.63vw;
    }
    .cart-icon{
        width: 1.2vw;
    }
    .delete-item{
        margin-left: 1vw;
    }
    .icon-delete{
        width: 1.25vw;
    }
    .cart-footer{
        padding-bottom: 1vw;
    }
    .cart-footer .total-price{
        padding: 1vw 0.63vw;
        padding-top: 0;
        color: #2f519b;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
    }
    .cart-footer .btn-buy{
        width: 8.5vw;
        height: 1.5vw;
        background-color: #4f75c7;
        border-radius: 1vw;
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 0.99vw;
        font-weight: 400;
        transition: 0.3s;
    }
    .cart-footer .btn-buy:hover{
        background-color: #5e8aeb;
    }
    .ml-auto{
        margin-left: auto;
    }
    .modal{
        position: absolute;
        width: 18.03vw;
        box-shadow: 5px 8px 24px rgba(0, 0, 0, 0.28);
        background-color: #4f75c7;
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
.save-margin{
    width: 6.31vw;
    height: 1.77vw;
    border-radius: 0.52vw;
    background-color: #2f519b;
    color: #ffffff;
    font-family: "NewYorkNineteenSixty";
    font-size: 0.99vw;
    font-weight: 400;
    transition: 0.3s;
}
.take-money{
    float: right;
    width: 5.31vw;
    border-radius: 0.52vw;
    font-family: "NewYorkNineteenSixty";
    font-size: 0.99vw;
    font-weight: 400;
    transition: 0.3s;
    background: #fff;
    color: #4f75c7;
    margin-left: 0.6vw;
    height: auto;
}
</style>
<style lang="scss">
	/* test */
	
	
.frameworks {
  display: flex;
  flex-wrap: wrap;
  .vtc {
    width: 100%;
    height: 9vw;
    margin-right: -5px;
  }
  .stroke {
    stroke-width: 2;
  }
  .fill {
    opacity: 0.2;
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    display: none;
  }
  .point.is-active {
    display: block;
  }
}
.framework {
  width: 100%;
  @media (max-width: 699px) {
    &:nth-child(n + 2) {
      margin-top: 30px;
    }
    &:nth-child(n + 4) {
      display: none;
    }
  }
  @media (min-width: 700px) {
    width: 100%;
    &:nth-child(2n) {
      margin-left: 50px;
    }
    &:nth-child(n + 3) {
      margin-top: 50px;
    }
  }

  &__period {
    align-items: center;
    flex-shrink: 0;
    opacity: 0.5;
    &-text {
		padding-left: 0.5vw;
		float: left;
      font-size: 0.99vw;
      white-space: nowrap;
    }
  }
  &__data {
    justify-content: space-between;
    align-items: center;
    width: 100%;
	color: #fff;
  }
  &__downloads {
	padding-right: 0.5vw;
	float: right;
    font-size: 0.99vw;
	color: #fff;
  }
}

.curve-koa {
  .stroke {
    stroke: #fff;
  }
  .fill {
    fill: #fff;
  }
  .point {
    fill: #fff;
    stroke: #fff;
  }
}
</style>