<template>
	<div class="wrapper">
		<div class="center full-width">
			<div class="w-store">
				<div class="close" @click="exit()"></div>
				<div class="header"></div>
				<div class="menu">
					<div class="menu-item" @click="(tab = 'melee'), (itemActive = false)" :class="{ active: tab === 'melee' }">Холодное оружие</div>
					<div class="menu-item" @click="(tab = 'gun'), (itemActive = false)" :class="{ active: tab === 'gun' }">Огнестрельное оружие</div>
					<div class="menu-item" @click="(tab = 'ammo'), (itemActive = false)" :class="{ active: tab === 'ammo' }">Патроны</div>
				</div>
				<div class="content">
					<div class="content-inner">
						<div class="content-item" v-for="(item, index) in assortment" :class="{ active: itemActive === item.id }">
							<div class="c-item-header">{{ item.price | divideNumber }} $</div>
							<div class="c-item-body">
								<div class="medium-img center">
									<img :src="itemImg(item.img)" alt="" />
								</div>
							</div>
							<div class="c-item-footer">{{ itemTitle(item) }}</div>
							<div class="layerForClick" @click="itemActive = item.id"></div>
						</div>
					</div>
				</div>
				<div class="footer center" @click="buyItem()">
					Купить
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
			tab: "melee",
			itemActive: false,
		};
	},
	computed: {
		assortment: function() {
			return this.$store.getters.getArrayFirst.filter(item => item.type === this.tab);
		},
		...mapGetters({
			allAssortment: "getArrayFirst",
			id: "enterBusiness",
		}),
	},
	methods: {
		exit() {
			mp.trigger("cSetPage", "none");
		},
		itemImg(img) {
			return "/img/player/inv/" + img;
		},
		itemTitle(item) {
			switch (item.type) {
				case "gun":
					return `${item.title} (${item.caliber})`;
					break;
				case "ammo":
					return `${item.title} (${item.countMax} шт.)`;
					break;
				default:
					return item.title;
					break;
			}
		},
		buyItem() {
			if (!this.itemActive) return storage.addNotification({ text: "Выберите предмет для покупки", theme: "error" });
			mp.trigger("cMisc-CallServerEvent", "sStoreBuyItem", this.id, this.itemActive);
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
<style scoped lang="scss">
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.full-width {
	width: 100%;
	height: 100%;
}
.w-store {
	width: 47vw;
	height: 35vw;
	border-radius: 0.89vw;
	background-color: rgba(5, 5, 5, 0.87);
	position: relative;
	overflow: hidden;
}
.close {
	position: absolute;
	right: 1vw;
	top: 1vw;
	width: 1vw;
	height: 1vw;
	background: url("/img/weapon-store/close.png") no-repeat;
	background-size: contain;
}
.header {
	height: 17.5%;
	background: url("/img/weapon-store/ammunation-logo.png") no-repeat;
	background-size: 30%;
	background-position: center center;
}
.menu {
	height: 5%;
	display: flex;
	background-color: #360101;
}
.footer {
	height: 10%;
	background-color: #360101;
	color: #ffffff;
	font-family: "Century Gothic";
	font-size: 1.15vw;
	font-weight: 400;
	transition: 0.1s;
	&:hover {
		background-color: #440302;
	}
}
.menu-item {
	color: #ffffff;
	font-family: "Century Gothic";
	font-size: 0.89vw;
	font-weight: 400;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex: 1 33.33%;
	transition: 0.1s;
	&:hover,
	&.active {
		background-color: #440302;
	}
}
.content {
	height: 67.5%;
	width: 100%;
	display: flex;
	justify-content: center;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0.4vw;
	}
	&::-webkit-scrollbar-track {
		background-color: #080808;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #440302;
	}
}
.content-inner {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 2vw 1vw;
}
.content-item {
	position: relative;
	flex-basis: 32%;
	height: 9.11vw;
	border-radius: 0.52vw;
	border: 0.1vw solid #430302;
	background-color: rgba(5, 5, 5, 0.77);
	margin-right: 2%;
	margin-bottom: 3.8%;
	transition: 0.1s;
	&:nth-child(3n) {
		margin-right: 0;
	}
	&.active {
		background-color: #360101;
	}
}
.c-item-header {
	height: 22.5%;
	color: #ffffff;
	font-family: "Century Gothic";
	font-size: 1.15vw;
	font-style: italic;
	text-align: right;
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	padding-right: 5%;
}
.c-item-body {
	height: 55%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.c-item-footer {
	height: 22.5%;
	text-align: center;
	color: #ffffff;
	font-family: "Century Gothic";
	font-size: 0.94vw;
	font-style: italic;
}
.x-small-img {
	max-width: 10%;
}
.small-img {
	max-width: 30%;
}
.medium-img {
	height: 6vw;
}
.large-img {
	max-width: 55%;
}
img {
	max-width: 100%;
	max-height: 100%;
}
.layerForClick {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
}
</style>
