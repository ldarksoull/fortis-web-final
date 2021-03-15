import Vue from "vue";
import store from "./store";
import router from "./router";
import { mapActions } from "vuex";
import * as ModalDialogs from "vue-modal-dialogs";
import template from "./template.vue";
import VTooltip from "v-tooltip";
import TrendChart from "vue-trend-chart";

if (typeof mp !== "undefined") {
	Vue.config.errorHandler = function(error, vm, info) {
		const str = `error: ${error}\ninfo: ${info}`;
		mp.trigger("cMisc-CallServerEvent", "sConsoleErrorVue", str);
	};
	Vue.config.warnHandler = function(msg, vm, trace) {
		const str = `message: ${msg}\ntrace: ${trace}`;
		mp.trigger("cMisc-CallServerEvent", "sConsoleErrorVue", str);
		return false;
	};
	window.onerror = function(message, source, line, column, error) {
		if (message === "Script error.") message = "Script error. (npm run build)";
		const str = `message: ${message}\nsource: ${source}\nline: ${line}\ncolumn: ${column}\nerror: ${error}`;
		mp.trigger("cMisc-CallServerEvent", "sConsoleErrorVue", str);
		return true;
	};
	console.info = function(...args) {
		const info = "CEF_info";
		const str = args.join(" ");
		mp.trigger("cMisc-CallServerEvent", "sConsoleLog", str, info);
	};
	console.log = function(...args) {
		const info = "CEF_log";
		const str = args.join(" ");
		mp.trigger("cMisc-CallServerEvent", "sConsoleLog", str, info);
	};
	console.warn = function(...args) {
		const info = "CEF_warn";
		const str = args.join(" ");
		mp.trigger("cMisc-CallServerEvent", "sConsoleLog", str, info);
	};
	console.error = function(...args) {
		const info = "CEF_error";
		const str = args.join(" ");
		mp.trigger("cMisc-CallServerEvent", "sConsoleLog", str, info);
	};
}

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.use(TrendChart);
Vue.use(ModalDialogs);
/*defaultContainer задает в каком контейне будет появляться tooltip*/
Vue.use(VTooltip, { defaultContainer: ".wrapperInv" });

Vue.directive("uppercase", {
	update: function(el) {
		el.value = el.value.toUpperCase();
		el.dispatchEvent(new Event("input"));
	},
});

Vue.filter("divideNumber", (x, separator = '.') => {
	if (!x) return x;
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
	return parts.join(",");
});
Vue.filter("roundNum", (number, ends = 0) => {
	return parseFloat(number.toFixed(ends));
});
Vue.filter("formatDate", (dateStr, type) => {
	if (!dateStr) return "";
	let date = new Date(Date.parse(dateStr));
	let day = date.getDate();
	let month = date.getMonth() + 1;
	const year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (day < 10) day = "0" + day;
	if (month < 10) month = "0" + month;
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	switch (type) {
		case "date":
			return `${day}.${month}.${year}`;
		case "time":
			return `${hours}:${minutes}`;
		case "dateTime":
			return `${hours}:${minutes} ${day}.${month}`;
		default:
			return `${hours}:${minutes} ${day}.${month}`;
	}
});

const app = new Vue({
	router,
	store,
	render: h => h(template),
	methods: {
		...mapActions([
		/* base fnc */
		'setPage',
		'setHud',
		'setProgress',
		'setProgressData',
		'setDialog',
		'showConsole',
		'consolePush',
		'historyPush',
		'toggleAdminConsole',
		'setAdminConsoleLogs',
		'pushAdminConsoleLog',
		'addNotification',
		'setDate',
		'setPlayersNumber',
		'setFullHudShow',
		/* OTHER */
		'setPosInteraction',
		'setShowDocument',
		'setShowLicense',
		'setVehSpeedData',
		'setVehOpenSound',
		'setVehCloseSound',
		'setVehPenalty',
		'setShowTestHUD',
		/* account & characters fnc*/
		'CharactersList',
		'setSlotsOpen',
		'setSelectCatacter',
		'setAccountLogin',
		/* Player */
		'setAuthData',
		'setGUID',
		'updateMoney',
		'setNeeds',
		'setAdress',
		'setDistrict',
		'setActions',
		'setActionEnity',
		'setBlackScreen',
		'setCaptureData',
		'setCapturePlayerDead',
		'changeCaptureTime',
		'setDeathTime',
		'increaseDeathTime',
		'setMinigameData',
		'setPlayerFines',
		'setPrisonTime',
        'setPrDecr',
		'setRadioChannels',
		'pushRadioChannel',
		'removeRadioChannel',
		'removePlayerFromRadioChList',
		'addPlayerToChannel',
		'setSelectRadioChannel',
		'setMainData',
		'setPlayerSkills',
		'setShowNametags',
		'setTaxes',
		'setPlayerProperty',
		'setPlayerLicense',
		'setSellingData',
        'setTacoSellData',
        'setVoiceState',
        'setMicType',
        'setCardNumber',
        'setCodeSended',
        'setFortisCoin',
        'setChangeAppearance',
        'setVipStatus',
        'setPlayerNewbie',
        'setDialogData',
        'setDialogPedId',
        'setFishPrice',
        'setFishMargin',
        'setEcholot',
        'setEcholotFish',
        'setEcholotSound',
        'setQuestData',
        'setRegistration',
        'setShowLastQuest',
        'setCarRentId',
		/* Inventory*/
		'updateEqip',
		'updateInventory',
		'updateInventoryBlackList',
		'setStorageInv',
		'setStorageBlackList',
		'setTypeStorage',
		'setSearchPlayerEquip',
		'setSearchPlayerItem',
		'setSearchPlayerData',
		'setJacketUnderTypes',
		'setPlayerAmmo',
		'loadItemList',
		'updateItemPos',
		'updateStorageItemPos',
		'addItem',
		'addEquip',
		'removeItem',
		'removeItemArray',
		'removeEquip',
		'addItemStorage',
		'updateItemCountStorage',
		'removeItemStorage',
		'updateItemCount',
		'updateItemData',
		'updateItemDurability',
		/*Phone*/
		'setPhoneNumber',
		'setPhoneBook',
		'setPhoneSMS',
		'setPhoneCall',
		'setPhoneCallReject',
		'setPhoneCallConfirm',
		'setPhoneCallTimer',
		'setReadNewSMS',
		'setPushSMS',
		'setAlertSMS',
		'setAlertCall',
		'setAdsList',
		'pushNewAd',
		'removeAd',
		'setAdNotif',
		'setBgIndex',
		'addCallLog',
		'delSms',
		'setPhoneBlackList',
		'setPhoneSMSLoad',
		/* factions */
		'setFactionData',
		'setFactionActions',
		'setFactionRanks',
		'setFactionPlayers',
		'setFactionSettAdmin',
		'setFactionStorage',
		'setBizWar',
        'setOnBoardComputer',
		'setFactionStorageHistory',
		'pushFactionStorageHistory',
		'setFactionMoneyHistory',
		'pushFactionMoneyHistory',
		'setFactionCalls',
		'addFactionCall',
		'removeFactionCall',
		'setFactionSosCallAccepted',
		'setFactionDeclinedCalls',
		'setFactionFinesList',
		'setFactionWantedList',
		'setFactionSearchResult',
		'setFactionSearchResultDb',
		'setFactionPoliceDb',
		'setFactionPoliceCase',
		'setFactionPrisonersList',
		'setFactionVehicles',
		'pushFactionVehicles',
		'removeFactionVehicles',
		'updateFactionVehicleNumber',
		'setFactionAnnouncement',
		'addFactionAnnouncement',
		'setWeazelAds',
		'pushWeazelAd',
		'updateWeazelAdState',
		'removeWeazelAd',
		'setFactionUniform',
		'setFactionUniformKits',
		'setFactionCurrentUniform',
		'setContrabandTime',
		'setFactionResource',
		'setFactionMoney',
		'setStorageCount',
		'addFactionPlayer',
		'removeFactionPlayer',
		'setPlayerOnline',
		'setPlayerOffline',
		'setPlayerRank',
		'setPlayerFactionData',
		'setAdminWatchTablet',
		/*house*/
		'setHouseData',
		/* SHOP */
		'setBisinessTitle',
		'setBusinessId',
		'setFirstObj',
		'setSecondObj',
		'setArrayFirst',
		'setArraySecond',
		'setBusinessBalance',
		'setBusinesMargin',
		'setBusinesRes',
		'setBusinesType',
		'setBisinessStat',
		'setBusinesDelivery',
		"setMarginLimit",
		'cancelFillingGas',
		/* lscustoms */
		'setVehPrimaryColor',
		'setVehSecondaryColor',
		'setVehNeonColor',
		'setVehicleMods',
		'setVehicleAdditionalPrice',
		/*chat*/
		'pushChat',
		'setChatActive',
		'setChatShow',
		'setChatSelectChannel',
		'setChatMessageShow',
		/*jobs*/
		/*taxi*/
		'setTaxiOrders',
		'setTaxiPushOrder',
		'setTaxiRemoveOrder',
		'setTaxiAddToBlackList',
		'setTaxiRemoveFromBlackList',
		'setTaxiAddToDeclineList',
		'setTaxiTabletPage',
		'setTaxiPushLastOrder',
		'setTaxiDriverPay',
		'setTaxiBlackList',
		'setTaxiLastOrderList',
		/*Trucker*/
		'setTruckerOrders',
		'setTruckerJobData',
		'setJobRadio',
		'addJobRadioMember',
		'removeJobRadioMember',
		/*cashCollector*/
		'setCashCollectorAtmCount',
		'setCashCollectorTotalDistance',
		'setCashCollectorPay',
		'setCashCollectorMate',
		/*report*/
		'addTicket',
		'setSelectedTicketId',
		'setTicketList',
		'setAdminTicketList',
		'pushAdminTicket',
		'updateAdminTicket',
		'pushMessage',
		'pushAdminMessage',
		'setTicketMessages',
		'setClosedTickets',
		/*government tablet*/
		'setFactionsData',
		'setPremiumList',
		'setServicesList',
		'setGovMoney',
		'setBudgetLog',
		'setTaxValues',
		/*hotel*/
		'setHotelRoom',
		'setHotelRoomPrice',
		/*Harbor*/
		'setPlayerHaveBoatPlace',
		'setBoatPlaces',
		'setBoatTitle',
		])
	}
}).$mount('#app');

export default app;

global.storage = app;
global.consoleAPI = function(data){
	app.$store.dispatch("consolePush",JSON.stringify(data));
}
global.cef = app.$children[0];


global.chatAPI = {
	push:(playerName, playerId, text, tag, value) =>{
		//
	},
	show:(enable) =>{
		if(chatAPI.cacheChatStatus != enable){ 
			storage.setChatShow(enable); 
			chatAPI.cacheChatStatus = enable;
		}
	},
	cacheChatStatus: false,
}
