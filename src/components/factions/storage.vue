<template>
	<div class="wrapper">
		<div class="warehouse-wrapper">
			<div class="warehouse">
				<div class="header">
					<div class="title">Склад организации</div>
				</div>
				<div class="main">
					<ul class="sidemenu">
						<li class="menu-item" v-for="(value, name) in storage" @click="selectCat(name)" :class="{ active: selectedCat === name }">{{ getTitleCategory(name) }}</li>
						<li class="menu-item" @click="exit()">Закрыть</li>
					</ul>
					<div class="content-wrapper">
						<div class="content">
							<div class="content-item" v-if="selectedCat !== 'Contraband'" v-for="item in storage[selectedCat]">
								<div class="item-name">{{ item.title }}</div>
								<p v-if="item.count >= 0" class="item-descr">На складе {{ item.count }} шт.</p>
								<p v-else class="item-descr">Материалов для изготовления: {{ item.materials }} шт.</p>
								<div class="item-amount">
									<input v-if="selectedCat !== 'Weapon'" v-model.number="item.change" @change="changeValue(item)" type="number" />
								</div>
								<div class="item-btns">
									<div @click="action(item, 'take')" class="item-btn">Взять</div>
									<div @click="action(item, 'put')" class="item-btn">Положить</div>
								</div>
							</div>
							<div class="contraband-item" v-if="selectedCat === 'Contraband'">
								<div class="item-name center" v-if="storage.Contraband.time > 0">
									Заказ контрабанды будет доступен в {{ new Date(storage.Contraband.time).toLocaleTimeString("en-GB") }}
								</div>
								<div v-else class="order-contraband">
									<div class="item-name">Стоимость заказа контрабанды: {{ storage.Contraband.price }} $</div>
									<div class="order-btn" @click="orderContraband()">Заказать контрабанду</div>
								</div>
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
	data() {
		return {
			selectedCat: null,
			titlesCategory: {
				Weapon: "Оружие",
				Ammo: "Патроны",
				Drug: "Наркотики",
				Other: "Другое",
				Medecine: "Медикаменты",
				Equipment: "Экипировка",
				Contraband: "Контрабанда",
			},
		};
	},
	computed: {
		...mapGetters({
			storage: "getFactionStorage",
			factionData: "getFactionData",
		}),
	},
	methods: {
		selectCat(type) {
			this.selectedCat = type;
		},
		action(item, type) {
			if (!item.change) {
				item.change = 1;
			}
			if (item.change >= 1) {
				if (type === "take" && !item.materials && item.change > item.count) {
					return storage.addNotification({ text: "На складе нет столько предметов", theme: "error" });
				}
				const data = { itemId: item.id, change: item.change, type: type, materials: item.materials * item.change || null };
				if (type === "take" && item.materials && data.materials > this.factionData.materials) {
					return storage.addNotification({ text: "Недостаточно материалов на складе", theme: "error" });
				}
				mp.trigger("cMisc-CallServerEvent", "sFactionInteractStorage", JSON.stringify(data));
			}
		},
		exit: function() {
			mp.trigger("cCloseCef");
		},
		changeValue: item => {
            item.change = Math.round(item.change);
			if (item.change < 1) {
				item.change = 1;
			}
		},
		orderContraband: () => {
			mp.trigger("cMisc-CallServerEvent", "sContraband-order");
		},
		getTitleCategory(key) {
			if (this.titlesCategory[key]) return this.titlesCategory[key];
			else return key;
		},
        onKeyUp(e) {
            if( e.keyCode === 27){
                this.exit();
            }
        },
	},
    created() {
        document.addEventListener('keyup', this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener('keyup',this.onKeyUp);
    },
};
</script>
<style lang="scss" scoped>
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
.wrapper{
	width: 100%;
	height: 100vh;
}
$item-btn-color: #2c326c;

    .warehouse-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .warehouse{
        width: 50vw;
        height: 34vw;
        box-shadow: 0.47vw -0.16vw 2.08vw rgba(0, 0, 0, 0.38);
        border-radius: 0.52vw;
        background-color: rgba(43, 48, 100, 0.9);
        padding-top: 1.41vw;
    }
    .header{
        height: 4.4vw;
        width: 100%;
        padding-left: 1.09vw;
        display: flex;
        align-items: center;

	    background: #6c8ca7 url(/img/driver-license/header-bg.png) no-repeat;
	    background-size: cover;
	    color: #ffffff;
	    font-family: "Chalet - New York Nineteen Sixty";
	    font-size: 1.98vw;
	    font-weight: 400;
	    text-transform: uppercase;
	    letter-spacing: 0.1px;
	    width: 100%;
	    height: 3.85vw;
    }
    .title{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.72vw;
        font-weight: 700;
        letter-spacing: -0.07vw;
    }
    .main{
        display: flex;
    }
    .sidemenu{
        width: 29%;
    }
    .menu-item{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.25vw;
        font-weight: 300;
        letter-spacing: -1.2px;
        width: 100%;
        height: 2.45vw;
        background-color: #232751;
        border-top-right-radius: 0.52vw;
        border-bottom-right-radius: 0.52vw;
        margin-bottom: 0.57vw;
        display: flex;
        align-items: center;
        padding-left: 1.09vw;
        transition: 0.2s;
    }
    .menu-item:hover,.menu-item.active{
        background: #78254c;
    }
    .content-wrapper{
        width: 71%;
        padding: 0 2.5vw;
        max-height: 26.55vw;
    }
    .content{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        overflow-y: auto; 
        justify-content: flex-start;
        align-items: flex-start;
        &::-webkit-scrollbar{
            width: 0.42vw;
        }
        &::-webkit-scrollbar-track{
            background-color: #2c305c;
            border-radius: 0.52vw
        }
        &::-webkit-scrollbar-thumb{
            background-color: #333a77;
            border-radius: 0.52vw
        }
    }
    .content-item{
        width: 13.91vw;
        height: 10vw;
        border-radius: 0.52vw;
        background-color: #272b59;
        margin: 0 0.5vw;
        margin-bottom: 1vw;
        padding: 1vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &.without-amount{
            padding-top: 2.3vw;
        }
    }
    .contraband-item{
    	width: 30vw;
        height: 8vw;
        border-radius: 0.52vw;
        background-color: #272b59;
        margin: 0 0.5vw;
        margin-bottom: 1vw;
        padding: 1vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &.without-amount{
            padding-top: 2.3vw;
        }
    }
    .item-name{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.99vw;
        font-weight: bold;
        letter-spacing: -0.03vw;
        text-align: center;
        height: 2vw;
    }
    .item-descr{
    	color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.99vw;
        text-align: center;
    }
    .item-amount{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-amount.price{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.99vw;
        font-weight: 300;
    }
    .item-amount input{
        border: none;
        text-align: center;
        padding: 0 0.5vw;
        width: 10.31vw;
        height: 1.09vw;
        border-radius: 10px;
        background-color: #373e80;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: 300;
        letter-spacing: -0.7px;
    }
    .item-btns{
        display: flex;
        justify-content: space-between;
    }
    .item-btn{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 5.42vw;
        height: 1.51vw;
        border-radius: 0.52vw;
        background-color: $item-btn-color;
        transition: 0.1s;
    }
    .order-btn{
		color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 15vw;
        height: 2vw;
        border-radius: 0.52vw;
        background-color: $item-btn-color;
        transition: 0.1s;
		margin-top: 2vw;
    }
    .order-btn:hover,
    .item-btn:hover{
        background-color: lighten($item-btn-color, 10%)
    }
    .center{
        justify-content: center!important;
    }
    .order-contraband{
    	display: flex;
	    flex-direction: column;
	    align-items: center;
    }
</style>