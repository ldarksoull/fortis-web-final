<template>
	<div>
		<audio loop="innerLoop" ref="audiofile" src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Ring_X-Mod.ogg" preload="auto" style="display: none;"></audio>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default{
	data(){
        return{
            callStatus : false,
			playAudioFile: '',
			sms: new Audio('/audio/sms.mp3'),
			timer: false,
			timerData:{},
			echolotSound: new Audio('/audio/echolot.ogg'),
			openCar: new Audio('/audio/openCar.mp3'),
			closeCar: new Audio('/audio/closeCar.mp3'),
        }
    },
	computed: {
			...mapGetters({
				alertSMS: "getAlertSMS",
				alertCall: "getAlertCall",
				phoneCallConfirm: "getPhoneCallConfirm",
				echolot: "getEcholotSound",
				vehOpenSound: "getVehOpenSound",
				vehCloseSound: "getVehCloseSound",
			})
		},
	watch: {
		alertCall: {
			handler() {
				if(this.alertCall && !this.callStatus){
					this.startCallRing();
				}
				
				if(!this.alertCall && this.callStatus){
					this.stopPlayRing();
				}
				
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
		phoneCallConfirm: {
			handler() {
				if(this.phoneCallConfirm){
					this.startCallTimer();
				}else{
					this.endCallTimer();
				}	
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
		echolot: {
			handler(value) {
				if(value){
					this.echolotSound.play();
					storage.setEcholotSound(false);
				}
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
		vehOpenSound: {
			handler(value) {
				if(value){
					this.openCar.play();
					storage.setVehOpenSound(false);
				}
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
		vehCloseSound: {
			handler(value) {
				if(value){
					this.closeCar.play();
					storage.setVehCloseSound(false);
				}
			},
			deep: true, //если нужно отслеживать изменение свойств
		},
	},
    methods:{
		startCallRing(){
			if(this.callStatus) return;
			this.callStatus = true;
			this.$refs.audiofile.play();
		},
		stopPlayRing(){
			this.callStatus = false;
			this.$refs.audiofile.pause();
			this.$refs.audiofile.currentTime = 0.0;
		},
		startCallTimer(){
			if(this.timer) return;
			this.timerData = {
				min: 0,
				sec: 0,
			};
			this.timer = setInterval(() => {
						if(this.timerData.sec === 59) {
							this.timerData.sec = 0;
							this.timerData.min = this.timerData.min+1;
							
						}else{
							this.timerData.sec = this.timerData.sec+1;
						}
						
						var view = '';
						view +=this.timerData.min+':';
						if(this.timerData.sec<10) view +='0';
						view +=this.timerData.sec;
						storage.setPhoneCallTimer(view);
					}, 1000);
		},
		endCallTimer(){
			clearInterval(this.timer);
			storage.setPhoneCallTimer("0:00");
			this.timer = null;
			this.timerData = {
				min: 0,
				sec: 1,
			};
		},
    },
	mounted () {
	
		setInterval(() => {
				
				if(this.alertCall){
					this.startCallRing();
				}

				if(this.alertSMS && !this.callStatus){
					this.sms.play();
					storage.setAlertSMS(false);
				}
		}, 1000);
		/*
		if(this.alertCall){
			this.startCallRing();
		}*/
		
    }, 
}
</script>

<style scoped>
</style>
