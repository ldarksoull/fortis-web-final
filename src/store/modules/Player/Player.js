const Player = {
	state: {
		authData:{},
		guid: 1,
		money: {
			cash: 0,
			bank: 0,
		},
		needs:{
			food: 100,
			water: 100,
		},
		adress:{
			street: '',
			district: '',
		},
		actions:{
			
			'houseInt':[
				{title:'Продать дом игроку'},
				{title:'Продать дом в гос'},
				{title:'Лицензии на оружие'},
			],
			'docInt':[
				{title:'Показать паспорт'},
				{title:'Показать вод. права'},
				{title:'Лицензии на оружие'},
			],
			'moneyInt':[
				{title:'Продать транспорт', key: "int_sellVehicle"},
				{title:'Продать дом', key: "int_sellHouse"},
			],
			'famillInt':[
				{title:'Пожать руку'},
			],
			'factionInt':[
				{title:'Выписать штраф'},
				{title:'Надеть наручники'},
				{title:'Вести за собой'},
				{title:'Провести обыск'},
				{title:'Выдать розыск'},
				{title:'Посадить в КПЗ'},
				{title:'Посадить в ТС'},
				{title:'Вытащить из  ТС'},

			],
			
			'emoInt':[
				{title:'Название эмоции1'},
				{title:'Название эмоции2'},
				{title:'Название эмоции3'},
				{title:'Название эмоции4'},
				{title:'Название эмоции5'},
				{title:'Название эмоции6'},
				{title:'Название эмоции7'},
				{title:'Название эмоции8'},
				{title:'Название эмоции9'},
				{title:'Название эмоции10'},
				{title:'Название эмоции11'},
				{title:'Название эмоции12'},
				{title:'Название эмоции13'},
				{title:'Название эмоции14'},
				{title:'Название эмоции15'},
				{title:'Название эмоции16'},
				{title:'Название эмоции17'},
				{title:'Название эмоции18'},
				{title:'Название эмоции19'},
				{title:'Название эмоции20'},
				{title:'Название эмоции21'},
			],
			
			'keyVeh':[
				{title:'Открыть'},
				{title:'Закрыть'},
			],
			
			'mnp':[],
			'ani':[],
			'veh':[],
			'cus':[],
		},
		actionEnity:{
			id:-1,
			type:'player',
		},
		blackScreen: false,
		captureData: {
			isStarted: true,
			title: "Захват территории №10",
			attackName: "банда 1",
			defenseName: "банда 2",
			attackPlayers: 10,
			defensePlayers: 20,
			time: 120
		},
		deathTime: 0,
		increaseDeathTime: 0,
		minigameData: {
			isStart: false,
			width: 0,
			left: 0
		},
		fines: [
			{id:1 ,reason:"FINE REASON", price: 100},
			{id:2 ,reason:"FINE REASON", price: 100},
		],
		prisonTime: 0,
        prDecr: 0,
		radioChannels: [
			{freq: "ALL",players: []},
			{freq: "GOV",players: []},
			{freq: 70,players: [{guid:0, name:"Lex Anyway"}]},
			{freq: 70.1,players: [{guid:0, name:"Lex asdasd"}]},
			{freq: 70.2,players: []},
		],
		selectedRadioChannel: null,
		mainData: {
			name: "Test Name",
			gender: 0,
			dateOfBirth: '01011999',
			factionTitle: "",
			rank: '',
			rankTitle: "",
			job: "",
		},
		skills: {
			carHack: 10,
			addiction: 0,
			fishing: 20,
			farm: 100,
		},
		showNametags: true,
		taxes: {
			vehicle: [
			{
				id: 1, 
				money: 10, 
				price: 100,
				title: "CAR TITLE",
				number: "12345678",
			},
			{
				id: 2, 
				money: 10, 
				price: 100,
				title: "CAR TITLE",
				number: "HL412SF2",
			},
			{
				id: 3, 
				money: 10, 
				price: 100,
				title: "CAR TITLE",
				number: "ASDASD12",
			},
			{
				id: 1, 
				money: 10, 
				price: 100,
				title: "CAR TITLE",
				number: "12345678",
			},
			],
			house: [
				{
					id: 1,
					money: 15,
					price: 10000,
				},
				{
					id: 2,
					money: 15,
					price: 30000,
				},
			],
			business: {
				money: 10,
				price:100
			},
		},
		property: {
			vehicle: [
				{
					title: 'Title VEHICLE0',
					numberPlate: 'SQ23FE32',
					id:1,
				},
				{
					title: 'Title VEHICLE1',
					numberPlate: 'SQ23FE32',
					id:2,
				},
				{
					title: 'Title VEHICLE2',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE3',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE4',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE5',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE6',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE7',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE8',
					numberPlate: 'SQ23FE32',
					id:3,
				},
				{
					title: 'Title VEHICLE9',
					numberPlate: 'SQ23FE32',
					id:3,
				},
			],
			house: 
				[
					{id: 1,
					price: 100000,
					class: "econom",
					lodger: 1,
					maxCar: 10,},
					{id: 1,
					hotelTitle: "Hotel Title",
					class: "hotel",
					rentPrice: 400,}
				],
			business: {
				id: 1,
				title: 'Title',
			},
		},
		license: [
			{title:"A",type:"driver",id:0},
			{title:"B",type:"driver",id:0},
			{title:"C",type:"driver",id:0},
			{title:"weapon",type:"weapon",id:0},
			{title:"med",type:"med",id:0},
		],
		sellingData: {
			id:1,
			buyerGuid:1,
      notice:""
		},
    tacoSellData:  {},
		voiceState: false,
		cardNumber: "123456789012",
		codeSended: false,
		fortisCoin: 0,
		changeAppearence: false,
		vipStatus: false,
		isNewbie: false,
		micType: "default",
		dialogData: {
	    type: "goldenFish",
			name: "George",
			text: "Приветствую тебя, путник! Любишь рыбу ловить? Если поймаешь золотую рыбку - срочно неси мне! Я тебя за это очень хорошо отблагодарю.",
			answers: [
				{
					text: "Если поймаю, привезу тебе",
					action: "next",
					nextDialog: {
						type: "goldenFish",
						name: "George",
						text: "Спасибо! Я буду здесь тебя ждать.",
						answers: [
							{ text: "Хорошо, удачи", action: "exit" },
						],
					},
				},
				{ text: "Я принёс тебе золотую рыбку", action: "sFishingGoldenFish" },
			],
			cam: { x: 900.7865600585938, y: 3618.0625, z: 32.82281494140625, rot: 185.5, dim: 0 },
		},
		dialogPedId: 0,
	    fishPrice: 0,
	    fishMargin: 0,
	    echolot: 0,
	    echolotFish: false,
	    echolotSound: false,
	    questData: [
	    	{ title: "Поговорить с лысым незнакомцем", icon: "question", reward: [{title:"100$", icon:"dollars"}], steps: [{ title: "Поговорить с лысым незнакомцем", complete: false, dark: false }] }
	    ],
	    registration: false,
	    showLastQuest: true,
	    carRentId: 0,
	},
	mutations: {
		setAuthData(state , data) {
			state.authData = data;
		},
		setGUID(state , data) {
			state.guid = data;
		},
		updateMoney(state , data) {
			state.money = data;
		},
		setNeeds(state, data ) {
			state.needs = data;
		},
		setAdress(state, data ) {
			state.adress.street = data;
		},
		setDistrict(state, data ) {
			state.adress.district = data;
		},
		setActions(state, data ) {
			state.actions = data;
		},
		setActionEnity(state, data ) {
			state.actionEnity = {
				id:data.id,
				type:data.type,
			};
		},
		setBlackScreen(state, data) {
			state.blackScreen = data;
		},
		setCaptureData(state, data) {
			state.captureData = data;
		},
		setCapturePlayerDead(state, data) {
			if (data === "attack") {
				state.captureData.attackPlayers--
			} else {
				state.captureData.defensePlayers--
			}
		},
		changeCaptureTime(state, data) {
			if (state.captureData.isStarted) {
				state.captureData.time = data;
			}
		},
		setDeathTime(state, data) {
			state.deathTime	= data;		
		},
		increaseDeathTime(state, data) {
			state.increaseDeathTime = data;		
		},
		setMinigameData(state, data) {
			state.minigameData = data;
		},
		setPlayerFines(state, data) {
			state.fines = data;
		},
		setPrisonTime(state, data) {
			state.prisonTime = data;
		},
		setPrDecr(state, data) {
				state.prDecr = data;
		},
		setRadioChannels(state, data) {
			state.radioChannels = data;
		},
		pushRadioChannel(state, data) {
			state.radioChannels.push(data);
		},
		removeRadioChannel(state, data) {
			const index = state.radioChannels.findIndex(ch => ch.freq === data);
			if (index !== -1) state.radioChannels.splice(index, 1);
		},
		addPlayerToChannel(state, data) {
			const channel = state.radioChannels.find(ch => ch.freq === data.freq);
			if (channel) {
				const isAlreadyAdd = channel.players.findIndex(p => p.guid === data.playerData.guid);
				if (isAlreadyAdd === -1) channel.players.push(data.playerData);
			}
		},
		removePlayerFromRadioChList(state, data) {
			const channel = state.radioChannels.find(ch => ch.freq === data.freq);
			if (channel) {
				const index = channel.players.findIndex(p => p.guid === data.playerGuid);
				if (index !== -1) channel.players.splice(index, 1);
			}
		},
		setSelectRadioChannel(state, data) {
			state.selectedRadioChannel = data;
		},
		setMainData(state, data) {
			state.mainData = data;
		},
		setPlayerSkills(state, data) {
			state.skills = data;
		},
		setShowNametags(state, data) {
			state.showNametags = data;
		},
		setTaxes(state, data) {
			state.taxes = data;
		},
		setPlayerProperty(state, data) {
			state.property = data;
		},
		setPlayerLicense(state, data) {
			state.license = data;
		},
		setSellingData(state, data) {
			state.sellingData = data;
		},
		setTacoSellData(state, data) {
				state.tacoSellData = data;
		},
		setVoiceState(state, data) {
				state.voiceState = data;
		},
		setMicType(state, data) {
				state.micType = data;
		},
		setCardNumber(state, data) {
				state.cardNumber = data;
		},
		setCodeSended(state, data) {
				state.codeSended = data;
		},
		setFortisCoin(state, data) {
				state.fortisCoin = data;
		},
		setChangeAppearance(state, data) {
				state.changeAppearence = data;
		},
		setVipStatus(state, data) {
				state.vipStatus = data;
		},
		setPlayerNewbie(state, data) {
				state.isNewbie = data;
		},
		setDialogData(state, data) {
				state.dialogData = data;
		},
		setDialogPedId(state, data) {
				state.dialogPedId = data;
		},
		setFishPrice(state, data) {
				state.fishPrice = data;
		},
		setFishMargin(state, data) {
				state.fishMargin = data;
		},
		setEcholot(state, data) {
				state.echolot = data;
		},
		setEcholotFish(state, data) {
				state.echolotFish = data;
		},
		setEcholotSound(state, data) {
			if (data) {
				if (state.echolot) state.echolotSound = data;
			} else {
				state.echolotSound = data;
			}
		},
		setQuestData(state, data) {
			state.questData = data;
		},
		setRegistration(state, data) {
			state.registration = data;
		},
		setShowLastQuest(state, data) {
			state.showLastQuest = data;
		},
		setCarRentId(state, data) {
			state.carRentId = data;
		},
	},
	actions: {
		setAuthData({ commit }, data) {
			commit('setAuthData', data);
		},
		setGUID({ commit }, data) {
			commit('setGUID', data);
		},
		updateMoney({ commit }, data) {
			commit('updateMoney', data);
		},
		setNeeds({ commit}, data) {
			commit('setNeeds', data );
		},
		setAdress({ commit}, data) {
			commit('setAdress', data );
		},
		setDistrict({ commit}, data) {
			commit('setDistrict', data );
		},
		setActions({ commit}, data) {
			commit('setActions', data );
		},
		setActionEnity({ commit}, data) {
			commit('setActionEnity', data );
		},
		setBlackScreen({ commit}, data) {
			commit('setBlackScreen', data);
		},
		setCaptureData({ commit}, data) {
			commit('setCaptureData', data);
		},
		setCapturePlayerDead({ commit}, data) {
			commit('setCapturePlayerDead', data );
		},
		changeCaptureTime({ commit}, data) {
			commit('changeCaptureTime', data );
		},
		setDeathTime({commit}, data) {
			commit('setDeathTime', data );
		},
		increaseDeathTime({commit}, data) {
			commit('increaseDeathTime', data );
		},
		setMinigameData({commit}, data) {
			commit('setMinigameData', JSON.parse(data) );
		},
		setPlayerFines({ commit}, data) {
			commit('setPlayerFines', data)
		},
		setPrisonTime({ commit}, data) {
			commit('setPrisonTime', data)
		},
		setPrDecr({ commit}, data) {
			commit('setPrDecr', data)
		},
		setRadioChannels({ commit}, data) {
			commit('setRadioChannels', data)
		},
		pushRadioChannel({ commit}, data) {
			commit('pushRadioChannel', data)
		},
		removeRadioChannel({ commit}, data) {
			commit('removeRadioChannel', data)
		},
		addPlayerToChannel({ commit}, data) {
			commit('addPlayerToChannel', data)
		},
		removePlayerFromRadioChList({ commit}, data) {
			commit('removePlayerFromRadioChList', data)
		},
		setSelectRadioChannel({ commit}, data) {
			commit('setSelectRadioChannel', JSON.parse(data));
		},
		setMainData({ commit}, data) {
			commit('setMainData', data);
		},
		setPlayerSkills({ commit}, data) {
			commit('setPlayerSkills', data);
		},
		setShowNametags({ commit}, data) {
			commit('setShowNametags', data);
		},
		setTaxes({ commit}, data) {
			commit('setTaxes', data);
		},
		setPlayerProperty({ commit}, data) {
			commit('setPlayerProperty', data);
		},
		setPlayerLicense({ commit}, data) {
			commit('setPlayerLicense', data);
		},
		setSellingData({ commit}, data) {
			commit('setSellingData', data);
		},
		setTacoSellData({ commit}, data) {
				commit('setTacoSellData', data);
		},
		setVoiceState({ commit}, data) {
				commit('setVoiceState', data);
		},
		setMicType({ commit}, data) {
				commit('setMicType', data);
		},
		setCardNumber({ commit}, data) {
				commit('setCardNumber', data);
		},
		setCodeSended({ commit}, data) {
				commit('setCodeSended', data);
		},
		setFortisCoin({ commit}, data) {
				commit('setFortisCoin', data);
		},
		setChangeAppearance({ commit}, data) {
				commit('setChangeAppearance', data);
		},
		setVipStatus({ commit}, data) {
				commit('setVipStatus', data);
		},
		setPlayerNewbie({ commit}, data) {
				commit('setPlayerNewbie', data);
		},
		setDialogData({ commit}, data) {
				commit('setDialogData', data);
		},
		setDialogPedId({ commit}, data) {
				commit('setDialogPedId', data);
		},
		setFishPrice({ commit}, data) {
				commit('setFishPrice', data);
		},
		setFishMargin({ commit}, data) {
				commit('setFishMargin', data);
		},
		setEcholot({ commit}, data) {
				commit('setEcholot', data);
		},
		setEcholotFish({ commit}, data) {
				commit('setEcholotFish', data);
		},
		setEcholotSound({ commit}, data) {
				commit('setEcholotSound', data);
		},
		setQuestData({ commit}, data) {
				commit('setQuestData', data);
		},
		setRegistration({ commit}, data) {
				commit('setRegistration', data);
		},
		setShowLastQuest({ commit}, data) {
				commit('setShowLastQuest', data);
		},
		setCarRentId({ commit}, data) {
				commit('setCarRentId', data);
		},
	},
	getters: {
		getAuthData: state => {
			return state.authData;
		},
		getGUID: state => {
			return state.guid;
		},
		moneyData: state => {
			return state.money;
		},
		getNeeds: state =>{
			return state.needs;
		},
		getAdress: state =>{
			return state.adress;
		},
		getActions: state =>{
			return state.actions;
		},
		getActionEnity: state =>{
			return state.actionEnity;
		},
		getBlackScreen: state => {
			return state.blackScreen;
		},
		getCaptureData: state => {
			return state.captureData;
		},
		getDeathTime: state => {
			return state.deathTime;
		},
		getIncreaseDeathTime: state => {
			return state.increaseDeathTime;
		},
		getMinigameData: state => {
			return state.minigameData;
		},
		getRadioChannels: state => {
			return state.radioChannels;
		},
		getSelectedRadioChannel: state => {
			return state.selectedRadioChannel;
		},
		getMainData: state => {
			return state.mainData;
		},
		getPlayerSkills: state => {
			return state.skills;
		},
		getShowNametags: state => {
			return state.showNametags;
		},
		getTaxes: state => {
			return state.taxes;
		},
		getPlayerProperty: state => {
			return state.property;
		},
		getPlayerCars: state => {
			return state.property.vehicle.filter(veh => veh.type === "car");
		},
		getPlayerLicense: state => {
			return state.license;
		},
		getSellingData: state => {
			return state.sellingData;
		},
		getTacoSellData: state => {
				return state.tacoSellData;
		},
		getVoiceState: state => {
				return state.voiceState;
		},
		getCardNumber: state => {
				return state.cardNumber;
		},
		getCodeSended: state => {
				return state.codeSended;
		},
		getFortisCoin: state => {
				return state.fortisCoin;
		},
		getChangeAppearance: state => {
				return state.changeAppearence;
		},
		getVipStatus: state => {
				return state.vipStatus;
		},
		getPlayerNewbie: state => {
				return state.isNewbie;
		},
		getMicType: state => {
				return state.micType;
		},
		getDialogData: state => {
				return state.dialogData;
		},
		getDialogPedId: state => {
				return state.dialogPedId;
		},
		getFishPrice: state => {
				return state.fishPrice;
		},
		getFishMargin: state => {
				return state.fishMargin;
		},
		getEcholot: state => {
				return state.echolot;
		},
		getEcholotFish: state => {
				return state.echolotFish;
		},
		getEcholotSound: state => {
				return state.echolotSound;
		},
		getQuestData: state => {
				return state.questData;
		},
		getRegistration: state => {
				return state.registration;
		},
		getShowLastQuest: state => {
				return state.showLastQuest;
		},
		getLastQuestData: state => {
			const lastQuest = state.questData[0];
			if (!lastQuest) return false;
			const data = {
				title: lastQuest.title,
				icon: lastQuest.icon,
				currentStep: lastQuest.steps[lastQuest.steps.length - 1].title,
			};
			return data;
		},
		getCarRentId: state => {
			return state.carRentId;
		},
	}
};

export default Player;
