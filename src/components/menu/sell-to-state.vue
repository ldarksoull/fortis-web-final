<template>
	<div class="wrapper">
		<div class="base">
			<div class="header">Продажа государству</div>
			<div class="main">
				<div class="col">
					<div class="col-header">
						Транспорт
					</div>
					<div class="items-wrapper">
						<div class="items">
							<div class="item" v-for="car in playerProperty.vehicle">
								<div class="item-title">{{ car.title }}</div>
								<div class="item-numplate">{{ car.numberPlate }}</div>
								<div class="item-price">{{ car.govPrice | divideNumber }}$</div>
								<div class="item-btn" @click="sell('veh', car.id)">Продать</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="col-header">
						Бизнес
					</div>
					<div class="items-wrapper" v-if="playerProperty.business">
						<div class="items">
							<div class="item">
								<div class="item-title">{{ playerProperty.business.title }}</div>
								<div class="item-price">{{ playerProperty.business.govPrice | divideNumber }}$</div>
								<div class="item-btn" @click="sell('business', playerProperty.business.id)">Продать</div>
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
		return {};
	},
	computed: {
		...mapGetters({
			playerProperty: "getPlayerProperty",
		}),
	},
	methods: {
		exit: function() {
			mp.trigger("cSetPage", "none");
		},
		onKeyUp: function(e) {
			if (e.keyCode === 27) {
				this.exit();
			}
		},
		sell(type, id) {
			if (type === "veh") mp.trigger("cMisc-CallServerEvent", "sVehicle-SellToGovernment", id);
			if (type === "business") mp.trigger("cMisc-CallServerEvent", "sBusinessSellToGov", id);
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
<style lang="scss" scoped>
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}
.base {
	width: 59.9vw;
	height: 34.64vw;
	background-color: #19619a;
	border-radius: 0.52vw;
	overflow: hidden;
	font-family: "Century Gothic";
}
.header {
	font-size: 2.92vw;
	color: #ffffff;
	height: 13%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #2d83c7;
}
.main {
	display: flex;
	justify-content: space-between;
	padding: 3%;
	height: 87%;
}
.col {
	background: #4092d2;
	border-radius: 0.52vw;
	overflow: hidden;
	width: 48%;
	max-height: 100%;
}
.col-header {
	background: rgba(119, 177, 223, 0.65);
	font-size: 2.34vw;
	height: 4.17vw;
	color: #ffffff;
	text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
}
.items-wrapper {
	padding: 1.04vw 0.52vw;
	height: calc(100% - 4.43vw);
}
.items {
	padding: 0 0.52vw;
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 0.52vw;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #fffbfb;
		border-radius: 0.52vw;
	}
	&::-webkit-scrollbar-track {
		background: #2c7ab7;
		border-radius: 0.52vw;
	}
}
.item {
	background: rgba(39, 121, 185, 0.5);
	border-radius: 0.26vw;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.04vw;
	margin-top: 1.56vw;
	&:first-child {
		margin-top: 0;
	}
}
.item-title {
	font-weight: bold;
	text-align: center;
	font-size: 1.4vw;
	color: #fffcfc;
	margin-bottom: 0.52vw;
}
.item-numplate {
	padding: 0.2vw 0.7vw;
	border-radius: 0.26vw;
	font-size: 1vw;
	background-color: #4092d2;
	color: #ffffff;
	margin-bottom: 0.52vw;
}
.item-price {
	font-size: 1.67vw;
	color: #fffcfc;
	margin-bottom: 0.52vw;
}
.item-btn {
	background: #1d70b0;
	border-radius: 0.26vw;
	padding: 0.26vw 2.6vw;
	font-size: 1.46vw;
	color: #ffffff;
	transition: 0.15s;
	&:hover {
		background: #fafdff;
		color: #1d70b0;
	}
	&:active {
		background: #fafdff;
		color: #1d70b0;
		box-shadow: inset 0 0.16vw 0.26vw 0.1vw rgba(39, 121, 185, 0.5);
	}
}
</style>
