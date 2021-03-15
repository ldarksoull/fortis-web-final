<template>
	<div class="wrapper">
		<div class="base">
			<div class="centered" v-if="bizWar.owner === 'null'">
				<div class="owner-title">
					{{ text.neutral[bizWar.type] }}
					<div>Купить за <span class="bold">5000$ ?</span></div>
				</div>
				<div class="btn mt" @click="buyBizWar()">Купить</div>
			</div>
			<div class="centered" v-else>
				<div class="owner-title">
					{{ text.controlledBy[bizWar.type] }}
					<div class="bold">{{ bizWar.owner }}</div>
				</div>
				<div class="centered mt" v-if="bizWar.owner != factionData.title">
					<div class="btn" @click="attackBiz">{{ text.conquer[bizWar.type] }}</div>
					<div class="centered mt" v-if="bizWar.moneyTakeTime >= 48">
						<div class="info-text">{{ text.canTakeMoney[bizWar.type] }}</div>
						<div class="btn centered" @click="takeMoney()">Собрать деньги</div>
					</div>
					<div class="mt" v-else-if="bizWar.moneyTakeTime < 48">
						<div class="info-text">
							{{ text.moneyTakeAfter48h[bizWar.type] }}
							<div class="bold">{{ (48 - bizWar.moneyTakeTime) | timePretty }}</div>
						</div>
					</div>
				</div>
				<div class="centered mt" v-if="bizWar.owner === factionData.title">
					<div v-if="bizWar.moneyTakeTime >= 24">
						<div class="info-text">{{ text.canTakeMoney24h[bizWar.type] }}</div>
						<div class="btn centered takeMoney" @click="takeMoney()">Собрать деньги</div>
					</div>
					<div class="centered" v-else-if="bizWar.moneyTakeTime < 24">
						<div class="info-text">
							Вы сможете собрать деньги через
							<div class="bold">{{ (24 - bizWar.moneyTakeTime) | timePretty }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="centered">
				<div class="btn" @click="exit">Закрыть</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			text: {
				neutral: {
					mafia: "Этот бизнес нейтральный.",
					band: "Эта территория нейтральная.",
				},
				controlledBy: {
					mafia: "Этот бизнес контролирует",
					band: "Эту территорию контролирует",
				},
				conquer: {
					mafia: "Захватить бизнес",
					band: "Захватить территорию",
				},
				canTakeMoney: {
					mafia: "С этого бизнеса не собирали деньги более 48 часов теперь вы можете это сделать",
					band: "С этой территории не собирали деньги более 48 часов теперь вы можете это сделать",
				},
				moneyTakeAfter48h: {
					mafia: "Вы сможете собрать деньги если мафия контролирующая этот бизнес не соберет деньги через",
					band: "Вы сможете собрать деньги если банда контролирующая эту территорию не соберет деньги через",
				},
				canTakeMoney24h: {
					mafia: "Вы можете собрать деньги с этого бизнеса",
					band: "Вы можете собрать деньги с этой территории",
				},
			},
		};
	},
	computed: {
		...mapGetters({
			bizWar: "getBizWar",
			factionData: "getFactionData",
		}),
	},
	methods: {
		buyBizWar() {
			if (this.bizWar.type === "mafia") {
				mp.trigger("cMisc-CallServerEvent", "sBizWar-buy", this.bizWar.id);
			} else {
				mp.trigger("cMisc-CallServerEvent", "sGangWar-buyTerritory", this.bizWar.id);
			}
		},
		attackBiz() {
			if (this.bizWar.type === "mafia") {
				mp.trigger("cMisc-CallServerEvent", "sBizWar-attack", this.bizWar.id);
			} else {
				mp.trigger("cMisc-CallServerEvent", "sGangWar-askToStartCapture", this.bizWar.id);
			}
		},
		takeMoney() {
			if (this.bizWar.type === "mafia") {
				mp.trigger("cMisc-CallServerEvent", "sBizWar-moneyTake", this.bizWar.id);
			} else {
				mp.trigger("cMisc-CallServerEvent", "sGangWar-moneyTake", this.bizWar.id);
			}
		},
		exit() {
			mp.trigger("cCloseCef");
		},
		onKeyUp: function(e) {
			if (e.keyCode === 27) this.exit();
		},
	},
	created() {
		document.addEventListener("keyup", this.onKeyUp);
	},
	beforeDestroy() {
		document.removeEventListener("keyup", this.onKeyUp);
	},
	filters: {
		timePretty: h => {
			let hours = Math.trunc(h);
			let minutes = Math.trunc((h - hours) * 60);
			if (minutes < 10) minutes = "0" + minutes;
			if (hours < 10) hours = "0" + hours;
			return hours + ":" + minutes;
		},
	},
};
</script>

<style scoped lang="scss">
.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Century Gothic";
}
.base {
	background-color: rgba(28, 51, 94, 0.945);
	max-width: 33vw;
	border-radius: 0.52vw; //10px
	padding: 2.08vw 1.56vw; //40px 30px
}
.owner-title {
	color: #fff;
	font-size: 1.25vw; //24px;
	text-align: center;
}
.bold {
	font-weight: bold;
}
.btn {
	background-color: #1b81d0;
	color: #fff;
	padding: 0.52vw 0.78vw; //10px 15px;
	border-radius: 0.26vw; //5px;
	display: inline-block;
	transition: 0.2s;
	font-size: 1.04vw; //20px;
	box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25); //4px
	margin-top: 1.04vw; //20px
	&:hover {
		box-shadow: none;
		background-color: rgb(6, 120, 207);
	}
}
.info-text {
	color: #fff;
	text-align: center;
	font-size: 0.94vw; //18px;
	padding: 0 1.56vw; //30px
}
.mt {
	margin-top: 1.56vw; //30px
}
.centered {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.takeMoney {
	width: 10vw;
	margin: 0.5vw auto;
}
</style>
