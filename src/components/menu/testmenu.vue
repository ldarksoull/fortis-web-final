<template>
	<div class="testMenu">
		<div class="testBtn" v-on:click="callTaxi">Вызвать такси</div>
		<div class="testBtn" v-on:click="showATM">Ближайший банкомат</div>
		<div class="testBtn" v-on:click="exit">Закрыть</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
    computed: {
	},
    methods: {
		showATM(){
			mp.trigger("cGPSsearchATM");
			this.exit();
		},
		callTaxi(){
			mp.trigger("cTaxi-NewOrder")
			this.exit();
		}
		,
		exit(){
			mp.trigger("cSetPage", 'none');
		},
    },
	mounted() {
	},
    components:{
    },
}

</script>

<style scoped>
.testMenu{
	position:absolute;
	top: 30vh;
	left: 40vw;
	background-color: #fff;
	width: 40vh;
}

.testBtn{
	background-color: #c0c0c0;
	width: 100%;
	text-align: center;
	font-size: 3vh;
	line-height: 3vh;
	padding: 10px;
	margin: 4px;
}
</style>