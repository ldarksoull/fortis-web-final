<template>
	<div class="progressBar">
		<div class="container">
			<div class="msg">{{progressData.title}} {{ percent() }}%</div>
			<div class="loading-bar">
				<div class="percentage" :style="{'width' : percentage + '%'}"></div>
			</div>
		</div>
		<audio loop="innerLoop" ref="audioFill" src='/audio/fillUpMid.ogg' preload="auto" style="display: none;"></audio>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default{
	data: () => {
		return {
		  percentage: 0,
		  intval:{},
		  audioEndFill: new Audio('/audio/fillUpEnd.mp3'),
		}
	},
	computed: {
		...mapGetters({
				progressData: "getProgressData",
				showProgressBar: "getProgress",
				cancelFilling: "getCancelFillingGas",
		}),
	},
	methods: {
		percent() {
		  return this.percentage.toFixed();
		},
		endProgress(){
			if(this.progressData.type){
				if(this.progressData.type === 'filling'){
					this.progressData.percentage = this.percentage;
					mp.trigger("cMisc-CallServerEvent", "sGasStationFillDone", JSON.stringify(this.progressData));
					this.$refs.audioFill.pause();
					this.audioEndFill.play();
				}
				if(this.progressData.type === 'fillingJerrican'){
					this.progressData.percentage = this.percentage;
					mp.trigger("cMisc-CallServerEvent", "sInventoryFilling", JSON.stringify(this.progressData));
				}
				if(this.progressData.type === 'fillingArmyTanker'){
					mp.trigger("cArmyTankerFilled", this.percentage < 100);
				}
				if(this.progressData.type === 'fillingArmyStorage'){
					mp.trigger("cArmyStorageFilled", this.percentage < 100);
				}
				if(this.progressData.type === 'fillingArmy' || this.progressData.type === 'fillingHeli'){
					this.progressData.percentage = this.percentage;
					mp.trigger("cMisc-CallServerEvent", "sArmyFillUpCarEnd", JSON.stringify(this.progressData));
					this.$refs.audioFill.pause();
					this.audioEndFill.play();
				}
				if (this.progressData.type === 'loadTrucker') {
					if (this.percentage < 100) {
						storage.addNotification({ text: "Погрузка прервана", theme: "error" });
					} else {
						mp.trigger("cTruckerLoadEnd", JSON.stringify(this.progressData));
					}
				}
				if (this.progressData.type === 'unloadTrucker') {
					if (this.percentage < 100) {
						storage.addNotification({ text: "Разгрузка прервана", theme: "error" });
					} else {
						mp.trigger("cMisc-CallServerEvent", "sTruckerEndPoint");
					}
				}
			}
			storage.setProgress(false);
			storage.setProgressData({});
		}
	},
	created() {
		storage.cancelFillingGas(false);
		if (this.progressData.type === 'filling' || this.progressData.type === 'fillingArmy'  || this.progressData.type === 'fillingHeli') {
			this.audioStartFill = new Audio('/audio/fillUpStart.mp3');
			this.audioStartFill.play();
			setTimeout(()=>{
				if (this.$refs.audioFill) this.$refs.audioFill.play();
			}, 1000)
		}
		this.intval = setInterval(() => {
			if(this.percentage < 100) {
				this.percentage += this.progressData.intervalValue;
				if (this.cancelFilling) {
					clearInterval(this.intval);
					this.endProgress();
		        	storage.cancelFillingGas(false);
				}
			} else{
				clearInterval(this.intval);
				this.endProgress();
			}
		}, 10);
	},
}
</script>

<style lang="scss" scoped>
.container {
	text-align: right;
	
	position: absolute;
	top: 70vh;
	width: 30vw;
	left: 40vw;
}

.msg{
	font-size: 1.5rem;
	color: #fff;
	text-shadow: -1px 0 rgba(0, 41, 80, 1), 0 1px rgba(0, 41, 80, 1), 1px 0 rgba(0, 41, 80, 1), 0 -1px rgba(0, 41, 80, 1);
	font-family: Century Gothic;
}

.loading-bar {
  position: relative;
  width: 400px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba($color: #000, $alpha: .4), 
    0 -1px 1px #fff, 0 1px 0 #fff;
}

.percentage {
    position: absolute;
    top: 1px; left: 1px; right: 1px;
    display: block;
    height: 100%;
    border-radius: 15px;
    background-color: rgba(0, 41, 80, 1);
    background-size: 30px 30px;
    background-image: linear-gradient(135deg, rgba($color: #fff, $alpha: .15) 25%, transparent 25%, transparent 50%, rgba($color: #fff, $alpha: .15) 50%, rgba($color: #fff, $alpha: .15) 75%, transparent 75%, transparent); 
    animation: animate-stripes 0.6s linear infinite;
} 


@keyframes animate-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 60px 0; }
}
</style>
