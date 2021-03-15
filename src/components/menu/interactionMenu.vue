<template>
    <div class="Interaction">
		<ul>
			<li @click="selectCat('int')" v-if="enity.type === 'player'">Взаимодействия</li>
			<li @click="selectCat('mnp')" v-if="enity.type === 'player'">Манипуляции</li>
			<li @click="selectCat('ani')" v-if="enity.type === 'none'">Анимации</li>
			<li @click="selectCat('veh')" v-if="enity.type === 'vehicle'">Транспорт</li>
		</ul>
		
		<ul>
			<li v-for="(item,index) in select" :key='index' @click="action(item.key)">{{item.title}}</li>
		</ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data(){
		return {
			select:[],
		}
	},
    computed: {
			...mapGetters({
				actions: "getActions",
				enity: "getActionEnity",
				//page: "page",
			}),
	},
    methods: {
		selectCat(type){
			this.select = this.actions[type];
			//console.log(this.select);
		},
		action(k){
			mp.trigger("cActionCommand", k);
		},
		
		onKeyDown(e) {
			if( e.keyCode === 69){
				mp.trigger("cCloseCefAndDestroyCam");
			}
		},
    },
    components:{
    },
	mounted() {
		document.addEventListener('keyup', this.onKeyDown);
	},
	beforeDestroy() {
		document.removeEventListener('keyup',this.onKeyDown);
	},
}
</script>

<style scoped>
.Interaction{
	position: absolute;
	top: 35vh;
	left: 52vw;
}
ul{
float:left;
list-style: none;
}

li{
border: 1px solid red;
color: black;
padding: 3px 5px;
margin: 1px 3px;
background-color: #fff;
}

</style>
