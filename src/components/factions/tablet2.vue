<template>
	<div class="factionTablet">
		<div v-if="select === 'main'">
			<h3>Планшет организации</h3>
			<div class="btns" @click="selectPage('players')">Состав</div>
			<div class="btns" @click="selectPage('ranks')" v-if="playerGUID === factionData.leader">Настройка рангов</div>
			<div class="btns" @click="selectPage('storage')">Склад/Доходы</div>
		</div>
		<div v-if="select === 'players'">
			<h3>Состав</h3>
			<ul class="playerList">
				<li v-for="(item,index) in players" :key='index'> 
					<div class="playerName">
						{{item.nFirst}} {{item.nSecond}} ({{ranks[item.rank].title}}) 
						<span v-if="item.pid === factionData.leader">[Лидер]</span>
						<span v-if="item.pid === factionData.assistant">[Заместитель]</span>
					</div>
					<div class="btns" @click="playerKick(item.pid)" v-if="playerGUID === factionData.leader || playerGUID === factionData.assistant">&#128711;</div>
					<div class="btns" @click="playerUp(item.pid)" v-if="playerGUID === factionData.leader || playerGUID === factionData.assistant">&#9650;</div>
					<div class="btns" @click="playerDown(item.pid)" v-if="playerGUID === factionData.leader || playerGUID === factionData.assistant">&#9660;</div>
					<div class="btns" @click="playerСredit(item.pid)" v-if="playerGUID === factionData.leader || playerGUID === factionData.assistant">&#128396;</div>
					<div style="clear:both;"></div>
				</li>
			</ul>
			<div style="clear:both;"></div>
			<div class="btns" @click="selectPage('main')"> &#9668;Back</div>
		</div>
		<div v-if="select === 'ranks' && playerGUID === factionData.leader">
			<h3>Настройка рангов</h3>
			<div class="rangs">
				<ul>
					<li v-for="(item,index) in ranks" :key='index' @click="rangOpenSetting(index)">
						<span v-if="item.title">{{item.title}}</span>
						<span v-if="!item.title">У ранга нет названия</span>
					</li>
				</ul>
			</div>
			<div class="actions" v-if="settingRank.rank>-1">
				<input v-model.trim='ranks[settingRank.rank].title' @keyup="updateName">
				<ul>
					<li v-for="(item,index) in actions" :class="actionStyle(item.key)" :key='index' @click="switchActionRank(item.key)">{{item.title}}</li>
				</ul>
			</div>
			<div style="clear:both;"></div>
			<div class="btns" @click="selectPage('main')"> &#9668;Back</div>
		</div>
		<div v-if="select === 'storage'">
			<h3>Склад/Доходы</h3>
			<div class="summary">
				<div class="btns" @click="secondPage('resouces')">Ресурсы</div>
				<div class="btns" @click="secondPage('finance')">Финансы</div>
			</div>
			<div class="btns" @click="selectPage('main')"> &#9668;Back</div>
		</div>
		<div class="btns" v-if="needSaveRangSetting" @click="saveRankSettings()">Сохранить изменения настроек рангов</div>
		<div class="btns" @click="exit()">Закрыть</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
	data(){
		return {
			select:'main',
			selectSecond:'main',
			settingRank:[],
			needSaveRangSetting: false,
		}
	},
    computed: {
		...mapGetters({
				playerGUID: "getGUID",
				factionData: "getFactionData",
				players: "getFactionPlayers",
				ranks: "getFactionRanks",
				actions: "getFactionActions",
			}),
	},
    methods: {
		selectPage(p){
			this.select = p;
		},
		secondPage(p){
			this.selectSecond = p;
		},
		rangOpenSetting(index){
			this.settingRank = this.ranks[index];
		},
		actionStyle(key){
			if(this.settingRank.actions.indexOf(key)>-1) return 'actionOn';
			else return 'actionOff';
		},
		playerUp(id){
			mp.trigger("cMisc-CallServerEvent", "sFactionNewRank", id,"up");
		},
		playerDown(id){
			mp.trigger("cMisc-CallServerEvent", "sFactionNewRank", id,"down");
		},
		switchActionRank(key){
			this.needSaveRangSetting = true;
			let newRanks = this.ranks;
			let indexRank = this.settingRank.rank;
			let searchIndex = newRanks[indexRank].actions.indexOf(key);
			if(searchIndex>-1){
				delete newRanks[indexRank].actions[searchIndex];
				newRanks[indexRank].actions = newRanks[indexRank].actions.filter(function(e){return e}); 
			}else{
				newRanks[indexRank].actions.push(key);
			}
			storage.setFactionRanks(newRanks);
		},
		updateName(event){
			this.needSaveRangSetting = true;
			storage.setFactionRanks(this.ranks);
		},
		saveRankSettings(){
			var sendData = {
				factionData: this.factionData,
				ranks: this.ranks
			}
			mp.trigger("cMisc-CallServerEvent", "sFactionSave", JSON.stringify(sendData));
			this.needSaveRangSetting = false;
		},
		exit: function() {
			mp.trigger("cCloseCefAndDestroyCam");
		},
    },
	mounted() {
	/*
	playerGUID
				factionData
				players
				ranks
				actions
	*/
		
	},
    components:{
    },
}

</script>

<style scoped>
.factionTablet{
	background-color: #fff;
	position: absolute;
	top: 30vh;
	left: 35vw;
	border: 1px solid black;
	padding: 5px;
	width: 30vw;
}

.factionTablet ul{
	list-style: none;
}
.rangs,.actions{
	float:left;
}
.btns{
	margin: 1px;
	border: 1px solid red;
	background-color: #c0c0c0;
	padding: 2px 5px;
}
.playerName{
	padding: 2px 5px;
}
.playerList li div{
	float: left;
	line-height: 24px;
}
.actionOn{
	background-color: green;
	margin: 2px;
}
.rangs ul li{
	border: 1px solid red;
	margin: 2px;
	padding: 2px 5px;
}
.actions ul li{
	padding: 2px 5px;
}
.actionOff{
	background-color: red;
	margin: 2px;
}
</style>