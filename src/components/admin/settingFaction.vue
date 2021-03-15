<template>
	<div class="wrapper">
	<div class="settingFaction">
		<div class="menu">
			<div class='factionGUID'>Faction id: {{faction.guid}}</div>
			<div class="btn" @click="select='main'">Основные</div>
			<div class="btn" @click="select='actions'">Экшены</div>
			<div class="btn" @click="select='storage'">Склад</div>
			<div class="close" @click="exit">&#215;</div>
		</div>
		<div style="clear:both;"></div>
		<div class="actionSettings2">
			<div class="main" v-if="select==='main'">
				<input v-model.trim='faction.title'> - Название <br>
				<input v-model.trim='faction.blip'> - Блип <br>
				<input v-model.trim='faction.resources'> - Ресурсов <br>
				<input v-model.trim='faction.resourcesMax'> - Максимум ресурсов <br>
			</div>
			<div v-if="select==='actions'">
				<div class="allActions">
					<div class="actionsBlock" v-for="(category,key) in faction.allActions" :key='key' @click="openActionList(key)" >
						<div class="categoryAction">{{getTitleCategory(key)}}</div>
						<div class="categoryActionList" v-if="openList===key">
							<div v-for="(action,index) in faction.allActions[key]" :key='index' class="categoryActionItem" v-if="!chekSelect(key,action.key)">
								{{action.title}} - <span>{{action.description}}</span> <button @click="addAction(key,index)">&#187;</button>
							</div>
						</div>
					</div>
				</div>
				<div class="selectActions">
					<div class="actionsBlock" v-for="(category,key) in faction.selectActions" :key='key' @click="openActionSelect(key)" >
						<div class="categoryAction">{{getTitleCategory(key)}}</div>
						<div class="categoryActionList" v-if="openSelectList===key">
							<div v-for="(action,index) in faction.selectActions[key]" :key='index' class="categoryActionSelectItem">
								<button @click="delAction(key,index)">&#171;</button> {{action.title}} - <span>{{action.description}}</span> 
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="actionSettings" v-if="select==='storage'">
				<div class="allActions">
					<div class="actionsBlock" v-for="(category,key) in items" @click="openActionList(key)" >
						<div class="categoryAction">{{getTitleCategory(key)}}</div>
						<div class="categoryActionList" v-if="openList===key">
							<div v-for="action in items[key]" class="categoryActionItem" v-if="!chekSelectItem(action.title, key)">
								{{action.title}} <button @click="addItem(action, key)">&#187;</button>
							</div>
						</div>
					</div>
				</div>
				<div class="selectActions">
					<div class="actionsBlock" v-for="(category,key) in factionStorage" v-if="key!=='Contraband'" @click="openActionSelect(key)" >
						<div class="categoryAction">{{getTitleCategory(key)}}</div>
						<div class="categoryActionList" v-if="openSelectList===key">
							<div v-for="(action,index) in factionStorage[key]" class="categoryActionSelectItem">
								<input v-if="key === 'Weapon' || key === 'Ammo'" class="checkbox" :checked="action.count !== undefined" type="checkbox" @change="changeItemType($event, key, index)" >
								<button @click="delItem(key, index)">&#171;</button> {{action.title}} 
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div v-if="select!=='storage'" class="save" @click="save">Сохранить</div>
		<div v-else>
			<p>При обновлении количество предметов на складе обнулится и обнулится таймер заказа контрабанды(если она есть у этой фракции)</p>
			<p>Предметы с галочкой хранятся на складе поштучно(сколько сложили на склад столько и можно достать, а предметы без галочки крафтятся из матов)</p>
			<div class="save" @click="reloadStorage">Обновить</div>
		</div>
	</div>
	</div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
	data(){
		return {
			select:'main',
			openList: 'none',
			openSelectList: 'none',
			titlesCategory:{
				int:'Взаимодействия',
				mnp:'Манипуляции',
				ani:'Анимации',
				str_ammo:'[Хранилище] Амуниция',
				str_cloth:'[Хранилище] Форма',
				str_wpn:'[Хранилище] Оружие',
				Weapon: 'Оружие',
				Ammo: 'Патроны',
				Drug: 'Наркотики',
				Other: 'Другое',
				Medecine: 'Медикаменты',
				Equipment: 'Экипировка',
			},
		}
	},
    computed: {
		...mapGetters({
				faction: "getFactionSettingsAdmin",
				factionStorage: "getFactionStorage"
			}),
		items () {
			let type = this.$store.state.Faction.settings.type
			let availableCategories = this.$store.state.Faction.settings.allTypes[type]
			let allItems = this.$store.state.Faction.settings.allItems;
			let availableItems = {};
			availableCategories.forEach((title) => {
				availableItems[title] = this.$store.state.Faction.settings.allItems[title]
			})
			return availableItems
		}
	},
    methods: {
		addAction(category,index){
			var add = this.faction.allActions[category][index];
			if(!add) return;
			for(var key in this.faction.selectActions[category]){
				if(this.faction.selectActions[category][key].key === add.key){
					this.openActionSelect(category);
					return;
				}
			}
			if(this.faction.selectActions[category]){
				this.$set( this.faction.selectActions[category], this.faction.selectActions[category].length, add );
			}else{
				this.$set( this.faction.selectActions, category, [] );
				this.$set( this.faction.selectActions[category], this.faction.selectActions[category].length, add );
			}
			if(category!=this.openSelectList){
				this.openActionSelect(category);
			}
		},
		delAction(category,index){
			var del = this.faction.selectActions[category][index];
			if(!del) return;
			
			//delete this.faction.selectActions[category][index];
			this.$delete( this.faction.selectActions[category], index );
			
			this.faction.selectActions[category] = this.faction.selectActions[category].filter(function(e){return e}); 
			if(this.faction.selectActions[category].length === 0 ){
				//delete this.faction.selectActions[category];
				this.$delete( this.faction.selectActions, category );
			}
			this.openActionList(category);
		},
		addItem(item, category){
			if(this.factionStorage[category]){
				this.$set( this.factionStorage[category], this.factionStorage[category].length, item );
			}else{
				this.$set( this.factionStorage, category, [] );
				this.$set( this.factionStorage[category], this.factionStorage[category].length, item );
			}
		},
		delItem(category, index) {
			this.$delete( this.factionStorage[category], index );
			if(this.factionStorage[category].length === 0 ){
				this.$delete( this.factionStorage, category );
			}
		},
		chekSelect(category, key){
			for(var j in this.faction.selectActions[category]){
				if(key === this.faction.selectActions[category][j].key){
					return true;
				}
			}
			return false;
		},
		chekSelectItem(title, key) {
			for(var j in this.factionStorage[key]){
				if(title === this.factionStorage[key][j].title) {
					return true;
				}
			}
			return false;
		},
		getTitleCategory(key){
			if(this.titlesCategory[key]) return this.titlesCategory[key];
			else return key;
		},
		openActionList(key){
			this.openList = key;
		},
		openActionSelect(key){
			this.openSelectList = key;
		},
		save(){
			mp.trigger("cMisc-CallServerEvent", "sFactionAdminSave", JSON.stringify(this.faction));
		},
		reloadStorage() {
			mp.trigger("cMisc-CallServerEvent", "sFactionAdminReloadStorage", this.faction.guid, JSON.stringify(this.factionStorage));
		},
		exit(){
			mp.trigger("cCloseCefAndDestroyCam");
		},
		changeItemType({target}, key, index) {
			if (target.checked) {
				this.$delete(this.factionStorage[key][index], "materials");
				this.$set(this.factionStorage[key][index], "count", 0);
			} else {
				const itemConfig = this.items[key].find(i => i.id === this.factionStorage[key][index].id);
				this.$delete(this.factionStorage[key][index], "count");
				this.$set(this.factionStorage[key][index], "materials", itemConfig.materials);
			}
		}
    },
	
	watch: {

	},
	
	mounted() {
	},
    components:{
    },
}

</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
::-webkit-scrollbar {
    width: 5px;
}
 
::-webkit-scrollbar-track {
    background-color: transparent;
    background-repeat: repeat-x;
    background-attachment: fixed; 
    position: absolute;
    padding: 1px;
}
 
::-webkit-scrollbar-thumb {
    top: 2px;
    background-color: #c0c0c0;
    background-repeat: repeat-y;
    border-radius: 3px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.settingFaction{
	width: 60vw;
	height: 60vh;
	background-color: #fff;
	border: 1px solid black;
	padding: 5px;
}
.menu div{
	
	margin: 3px;
	padding: 3px 5px;
}
.factionGUID{
	float: left;
}
.btn{
	background-color: #009900;
	border-radius: 4px;
	color: #fff;
	float: left;
}
.close{
	background-color: red;
	border-radius: 4px;
	color: #fff;
	float: right;
}
.main,.allActions,.selectActions{
	float: left;
	height: 40vh;
}
.main input,
.main select{
	margin: 3px;
	width:20vw;
	height: 2vw;
}
input, select{
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.allActions,.selectActions{
	border: 1px solid black;
	margin: 5px;
	padding: 5px;
    width: 28vw;
	overflow-y: scroll;
}
.actionsBlock{
	margin: 3px;
}
span{
font-style:oblique;
}
.checkbox {
	float: right;
}
.categoryAction{
	background-color: #c0c0c0;
	border-radius: 4px;
	padding: 5px;
}
.categoryActionList{
	padding: 5px;
	border-left: 1px solid #c0c0c0;
	border-right: 1px solid #c0c0c0;
	border-bottom: 1px solid #c0c0c0;
	margin-left: 5px;
	margin-right: 5px;
	margin-bottom: 5px;
}
.categoryActionItem,.categoryActionSelectItem{
	margin: 4px;
}
.categoryActionItem button,.categoryActionSelectItem button{
	border: 0;
	border-radius: 4px;
	padding: 3px 6px;
	
}
.categoryActionItem button{
	background-color: #009900;
	float: right;
}
.categoryActionSelectItem button{
	background-color: #ff0000;
	float: left;
	margin-right: 5px;
}
.save {
    padding: 3px 5px;
	background-color: #009900;
    border-radius: 4px;
    color: #fff;
    width: fit-content;
}
</style>