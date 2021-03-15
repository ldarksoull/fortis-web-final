<template>
	<div class="wrapper">
		<div class="table-wrapper">
			<div class="table">
				<div class="table-header">
					<div class="title">Список заключенных</div>
				</div>
				<div class="table-body">
					<div class="row main-row">
						<div class="col">Имя Фамилия</div>
						<div class="col">Оставшийся срок</div>
						<div class="col">Выпустить</div>
					</div>
					<div class="table-content">
						<div class="row" v-for="(item, i) in prisoners" :key="i">
							<div class="col">{{ item.name }}</div>
							<div class="col">{{ item.time }}</div>
							<div class="col out" @click="freePlayer(item.id)">
								Выпустить
							</div>
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
import { mapGetters } from "vuex";

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters({
			prisoners: "getPrisonersList",
		}),
	},
	methods: {
		freePlayer(id) {
			mp.trigger("cMisc-CallServerEvent", "sPoliceFreePlayer", id);
		},
		exit() {
			mp.trigger("cSetPage", "none");
			mp.trigger("cMisc-CallServerEvent", "sPoliceClosePrisonersList");
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
.table-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.table {
	width: 40vw;
	padding: 0.5vw 2vw;
	padding-top: 0;
	border-radius: 1vw;
	background: rgba(0, 41, 80, 0.897);
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
	padding: 0.4vw 0;
	margin: 0 0.2%;
	background: rgba(0, 0, 0, 0.231);
	border-bottom: 1px solid rgba(255, 255, 255, 0.39);
	transition: 0.1s;
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
</style>
