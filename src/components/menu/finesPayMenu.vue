<template>
	<div class="wrapper">
		<div class="table-wrapper">
			<div class="table">
				<div class="table-header">
					<div class="title">Оплата штрафов</div>
				</div>
				<div class="table-body">
					<div class="row main-row">
						<div class="col w-10">№</div>
						<div class="col w-50">Причина</div>
						<div class="col w-20">Сумма</div>
						<div class="col">Оплата</div>
					</div>
					<div class="preloader" v-if="preloaderActive">
						<div class="sk-circle-bounce">
							<div class="sk-child sk-circle-1"></div>
							<div class="sk-child sk-circle-2"></div>
							<div class="sk-child sk-circle-3"></div>
							<div class="sk-child sk-circle-4"></div>
							<div class="sk-child sk-circle-5"></div>
							<div class="sk-child sk-circle-6"></div>
							<div class="sk-child sk-circle-7"></div>
							<div class="sk-child sk-circle-8"></div>
							<div class="sk-child sk-circle-9"></div>
							<div class="sk-child sk-circle-10"></div>
							<div class="sk-child sk-circle-11"></div>
							<div class="sk-child sk-circle-12"></div>
						</div>
					</div>
					<div class="no-fines" v-if="noFines">У ВАС НЕТ НЕОПЛAЧЕНЫХ ШТРАФОВ</div>
					<div class="table-content">
						<div class="row" v-for="item in filteredFines" :key="item.id">
							<div class="col w-10">{{ item.id }}</div>
							<div class="col w-50">{{ item.reason }}</div>
							<div class="col w-20">{{ item.price }}</div>
							<div class="col out" @click="payFine(item)">Оплатить</div>
						</div>
					</div>
				</div>
				<div class="table-footer">
					<div class="btn-close" @click="exit">Закрыть</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			preloaderActive: true,
			noFines: false,
		};
	},
	computed: {
		filteredFines: function() {
			this.noFines = false;
			const fines = this.$store.state.Player.fines;
			if (fines === false) {
				this.preloaderActive = false;
				this.noFines = true;
				return;
			}
			if (fines.length > 0) {
				this.preloaderActive = false;
				return fines;
			}
		},
	},
	methods: {
		exit() {
			mp.trigger("cSetPage", "none");
		},
		payFine(data) {
			mp.trigger("cMisc-CallServerEvent", "sPolicePayFine", JSON.stringify(data));
		},
		onKeyUp(e) {
			if (e.keyCode === 27) {
				this.exit();
			}
		},
	},
	created() {
		this.$store.state.Player.fines = [];
		mp.trigger("cMisc-CallServerEvent", "sPoliceGetPlayerFines");
		document.addEventListener("keyup", this.onKeyUp);
	},
	beforeDestroy() {
		this.$store.state.Player.fines = [];
		document.removeEventListener("keyup", this.onKeyUp);
	},
};
</script>

<style scoped lang="scss">
.table-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.table {
	width: 40vw;
	padding: 0.5vw 1vw;
	padding-top: 0;
	border-radius: 1vw;
	background: rgba(0, 41, 80, 0.897);
	// min-height: 25vw;
	display: flex;
	flex-direction: column;
}
.table-header {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3vw;
	.title {
		font-family: "NewYorkNineteenSixty";
		text-align: center;
		font-size: 1.5vw;
		color: #ffffff;
	}
}
.table-body {
	color: #fff;
	max-height: 18vw;
	overflow-y: auto;
	padding: 0 0.5vw;
	font-family: "Century Gothic";
	&::-webkit-scrollbar {
		width: 0.3vw;
	}
	&::-webkit-scrollbar-track {
		border-radius: 0.3vw;
		background: rgba(0, 0, 0, 0.308);
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 0.3vw;
		background: rgba(255, 255, 255, 0.863);
	}
}
.main-row {
	font-weight: bold;
	padding-bottom: 0.5%;
	font-family: "NewYorkNineteenSixty";
}
.main-row {
	position: sticky;
	top: 0;
	border-bottom: none !important;
	&:hover .col {
		background: rgb(39, 123, 191) !important;
	}
	.col {
		background: rgb(39, 123, 191);
		font-size: 1vw;
	}
}
.row {
	display: flex;
	&:hover .col {
		background: rgba(0, 0, 0, 0.397);
	}
}
.col {
	font-size: 0.8vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	flex-basis: 33.3%;
	text-align: center;
	padding: 0.4vw 0.3vw;
	margin: 0 0.2%;
	background: rgba(0, 0, 0, 0.231);
	border-bottom: 1px solid rgba(255, 255, 255, 0.39);
	transition: 0.1s;
}
.col.w-10 {
	flex-basis: 10%;
}
.col.w-20 {
	flex-basis: 20%;
}
.col.w-50 {
	flex-basis: 50%;
}
.col + .col.out:hover {
	background: rgba(0, 245, 94, 0.397);
}
.table-footer {
	padding: 0.5vw;
	padding-bottom: 0;
}
.btn-close {
	width: 100%;
	padding: 0.5vw 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "NewYorkNineteenSixty";
	font-size: 1vw;
	color: #fff;
	background: #a7232e;
	border-radius: 0.2vw;
	&:hover {
		background: lighten(#a7232e, 10%);
	}
}
.no-fines {
	font-family: "NewYorkNineteenSixty";
	text-align: center;
	margin: 4vw;
}

.sk-circle-bounce {
	width: 10vw;
	height: 10vw;
	position: relative;
	margin: auto;
	width: 6vw;
	height: 6vw;
	position: relative;
	margin: 2vw auto;
}
.sk-circle-bounce .sk-child {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}
.sk-circle-bounce .sk-child:before {
	content: "";
	display: block;
	margin: 0 auto;
	width: 15%;
	height: 15%;
	background-color: #fff;
	border-radius: 100%;
	-webkit-animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
	animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
}
.sk-circle-bounce .sk-circle-2 {
	-webkit-transform: rotate(30deg);
	transform: rotate(30deg);
}
.sk-circle-bounce .sk-circle-3 {
	-webkit-transform: rotate(60deg);
	transform: rotate(60deg);
}
.sk-circle-bounce .sk-circle-4 {
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}
.sk-circle-bounce .sk-circle-5 {
	-webkit-transform: rotate(120deg);
	transform: rotate(120deg);
}
.sk-circle-bounce .sk-circle-6 {
	-webkit-transform: rotate(150deg);
	transform: rotate(150deg);
}
.sk-circle-bounce .sk-circle-7 {
	-webkit-transform: rotate(180deg);
	transform: rotate(180deg);
}
.sk-circle-bounce .sk-circle-8 {
	-webkit-transform: rotate(210deg);
	transform: rotate(210deg);
}
.sk-circle-bounce .sk-circle-9 {
	-webkit-transform: rotate(240deg);
	transform: rotate(240deg);
}
.sk-circle-bounce .sk-circle-10 {
	-webkit-transform: rotate(270deg);
	transform: rotate(270deg);
}
.sk-circle-bounce .sk-circle-11 {
	-webkit-transform: rotate(300deg);
	transform: rotate(300deg);
}
.sk-circle-bounce .sk-circle-12 {
	-webkit-transform: rotate(330deg);
	transform: rotate(330deg);
}
.sk-circle-bounce .sk-circle-2:before {
	-webkit-animation-delay: -1.1s;
	animation-delay: -1.1s;
}
.sk-circle-bounce .sk-circle-3:before {
	-webkit-animation-delay: -1s;
	animation-delay: -1s;
}
.sk-circle-bounce .sk-circle-4:before {
	-webkit-animation-delay: -0.9s;
	animation-delay: -0.9s;
}
.sk-circle-bounce .sk-circle-5:before {
	-webkit-animation-delay: -0.8s;
	animation-delay: -0.8s;
}
.sk-circle-bounce .sk-circle-6:before {
	-webkit-animation-delay: -0.7s;
	animation-delay: -0.7s;
}
.sk-circle-bounce .sk-circle-7:before {
	-webkit-animation-delay: -0.6s;
	animation-delay: -0.6s;
}
.sk-circle-bounce .sk-circle-8:before {
	-webkit-animation-delay: -0.5s;
	animation-delay: -0.5s;
}
.sk-circle-bounce .sk-circle-9:before {
	-webkit-animation-delay: -0.4s;
	animation-delay: -0.4s;
}
.sk-circle-bounce .sk-circle-10:before {
	-webkit-animation-delay: -0.3s;
	animation-delay: -0.3s;
}
.sk-circle-bounce .sk-circle-11:before {
	-webkit-animation-delay: -0.2s;
	animation-delay: -0.2s;
}
.sk-circle-bounce .sk-circle-12:before {
	-webkit-animation-delay: -0.1s;
	animation-delay: -0.1s;
}

@-webkit-keyframes sk-circle-bounce-delay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

@keyframes sk-circle-bounce-delay {
	0%,
	80%,
	100% {
		-webkit-transform: scale(0);
		transform: scale(0);
	}
	40% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}
</style>
