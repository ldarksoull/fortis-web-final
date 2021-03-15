<template>
	<div class="wrapper">
		<div class="menu">
			<div class="menu-item centered" v-for="(item, i) in shopItems" :key="i">
				<div class="img">
					<img :src="'img/player/inv/' + item.image" />
				</div>
				<div class="item-name">{{ item.name }}</div>
				<div class="count">
					Количество: <span class="bold">{{ item.count }}</span>
				</div>
				<div class="count">
					Цена: <span class="bold">{{ item.price }}$</span>
				</div>
				<div class="buy" @click="buy(item)">Купить</div>
			</div>
			<div class="exit" @click="exit()"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			shopItems: [
				{ name: "Семена марихуаны", count: 5, price: 1500, image: "seed.png", id: 16 },
				{ name: "Семена марихуаны", count: 10, price: 2700, image: "seed.png", id: 16 },
				{ name: "Семена марихуаны", count: 25, price: 6600, image: "seed.png", id: 16 },
				{ name: "Удобрения", count: 1, price: 50, image: "fertilizers.png", id: 17 },
			],
		};
	},
	computed: {},
	methods: {
		buy(item) {
			mp.trigger("cMisc-CallServerEvent", "sDrugFarm-buyItem", JSON.stringify(item));
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

<style scoped lang="scss">
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}
.menu {
	background: #1c66a2;
	border-radius: 0.52vw; //10px;
	display: flex;
	padding: 2.08vw 1.56vw; // 40px 30px;
	color: #fff;
	font-family: "Century Gothic";
	letter-spacing: 0.05vw; // 1px
	position: relative;
	&-item {
		margin: 0 2.08vw; //40px
		width: 9.9vw; //190px;
	}
}
img {
	max-width: 100%;
	display: block;
}
.img {
	width: 7.81vw; //150px;
	height: 7.03vw; //135px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.buy {
	background: #1b81d0;
	box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25); //4px
	border-radius: 0.26vw; //5px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.67vw; //32px;
	color: #fef9f9;
	transition: 0.2s;
	width: 100%;
	margin-top: 0.52vw; //10px;
	&:hover {
		background-color: rgb(6, 120, 207);
		box-shadow: 0px 0.1vw 0.1vw rgba(0, 0, 0, 0.25); //2px
	}
}
.item-name {
	font-weight: bold;
	font-size: 1.3vw; //25px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	height: 3.39vw; //65px;
	margin-bottom: 0.52vw; //10px;
}
.count {
	margin-bottom: 0.52vw; //10px;
	font-size: 0.83vw; //16px
	text-align: center;
}
.centered {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.bold {
	font-weight: bold;
}
.exit {
	width: 0.78vw; //15px;
	height: 0.16vw; //3px;
	display: block;
	position: absolute;
	top: 1.04vw; //20px;
	right: 0.78vw; //15px;
	background: #fff;
	transform: rotate(45deg);
	&::after {
		content: "";
		position: absolute;
		background: #fff;
		width: 0.78vw; //15px;
		height: 0.16vw; //3px;
		display: block;
		transform: rotate(90deg);
		transform-origin: center;
	}
}
</style>
