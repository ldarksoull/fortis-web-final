const clothShopData = {
	state: {
		title: '',
		balance: 0,
        margin: 0,
		deliveryData: {
			/*matType: 'material',
			matCount:1000,
			matSum:10000,
			deliveryPrice:165*/
		},
		type: 'auto',
		resources: [
			/*
			{type:"material",title:"Материалы",value:10,price:10},
			{type:"prodict",title:"Продукты",value:100,price:1}
			*/
			 { id: 1,
    model: 'peyote',
    brend: 'vapid',
    fuelTank: 50,
    fuelRate: 10,
    title: 'Peyote',
    engineType: 0,
    price: 20000,
    trunkAttach: null,
    count: 0 },
  { id: 2,
    model: 'emperor2',
    brend: 'albany',
    fuelTank: 50,
    fuelRate: 10,
    title: 'Emperor',
    engineType: 0,
    price: 20000,
    trunkAttach: null,
    count: 0 },
  { id: 3,
    model: 'dloader',
    brend: 'bravado',
    fuelTank: 80,
    fuelRate: 25,
    title: 'Duneloader',
    engineType: 0,
    price: 20000,
    trunkAttach: null,
    count: 0 },
  { id: 5,
    model: 'dilettante',
    brend: 'karin',
    fuelTank: 40,
    fuelRate: 2,
    title: 'Dilettante',
    engineType: 0,
    price: 25000,
    trunkAttach: { offX: -0.5, offY: 0.1, offZ: 0.6, rotX: 0, rotY: -280 },
    count: 0 } 
		],
		bisinessStat:{
day:{"turnover":[{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":0},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"00","addTitle":"","value":0},{"title":"01","addTitle":"","value":44000},{"title":"02","addTitle":"","value":0},{"title":"03","addTitle":"","value":0},{"title":"04","addTitle":"","value":0},{"title":"05","addTitle":"","value":0},{"title":"06","addTitle":"","value":0},{"title":"07","addTitle":"","value":0},{"title":"08","addTitle":"","value":0},{"title":"09","addTitle":"","value":0}],"expenditure":[{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":0},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"00","addTitle":"","value":0},{"title":"01","addTitle":"","value":40000},{"title":"02","addTitle":"","value":0},{"title":"03","addTitle":"","value":0},{"title":"04","addTitle":"","value":0},{"title":"05","addTitle":"","value":0},{"title":"06","addTitle":"","value":0},{"title":"07","addTitle":"","value":0},{"title":"08","addTitle":"","value":0},{"title":"09","addTitle":"","value":0}],"saldo":[{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":0},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"00","addTitle":"","value":0},{"title":"01","addTitle":"","value":4000},{"title":"02","addTitle":"","value":0},{"title":"03","addTitle":"","value":0},{"title":"04","addTitle":"","value":0},{"title":"05","addTitle":"","value":0},{"title":"06","addTitle":"","value":0},{"title":"07","addTitle":"","value":0},{"title":"08","addTitle":"","value":0},{"title":"09","addTitle":"","value":0}],"topSells":[{"guid":"peyote","title":"Peyote","count":2}]},
week:{"turnover":[{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":44000},{"title":"28","addTitle":"","value":0}],"expenditure":[{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":40000},{"title":"28","addTitle":"","value":0}],"saldo":[{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":4000},{"title":"28","addTitle":"","value":0}],"topSells":[{"guid":"peyote","title":"Peyote","count":2}]},
month:{"turnover":[{"title":"30","addTitle":"","value":0},{"title":"31","addTitle":"","value":0},{"title":"1","addTitle":"","value":0},{"title":"2","addTitle":"","value":0},{"title":"3","addTitle":"","value":0},{"title":"4","addTitle":"","value":0},{"title":"5","addTitle":"","value":0},{"title":"6","addTitle":"","value":0},{"title":"7","addTitle":"","value":0},{"title":"8","addTitle":"","value":0},{"title":"9","addTitle":"","value":0},{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":132000},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":44000},{"title":"28","addTitle":"","value":0}],"expenditure":[{"title":"30","addTitle":"","value":0},{"title":"31","addTitle":"","value":0},{"title":"1","addTitle":"","value":0},{"title":"2","addTitle":"","value":0},{"title":"3","addTitle":"","value":0},{"title":"4","addTitle":"","value":0},{"title":"5","addTitle":"","value":0},{"title":"6","addTitle":"","value":0},{"title":"7","addTitle":"","value":0},{"title":"8","addTitle":"","value":0},{"title":"9","addTitle":"","value":0},{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":120000},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":40000},{"title":"28","addTitle":"","value":0}],"saldo":[{"title":"30","addTitle":"","value":0},{"title":"31","addTitle":"","value":0},{"title":"1","addTitle":"","value":0},{"title":"2","addTitle":"","value":0},{"title":"3","addTitle":"","value":0},{"title":"4","addTitle":"","value":0},{"title":"5","addTitle":"","value":0},{"title":"6","addTitle":"","value":0},{"title":"7","addTitle":"","value":0},{"title":"8","addTitle":"","value":0},{"title":"9","addTitle":"","value":0},{"title":"10","addTitle":"","value":0},{"title":"11","addTitle":"","value":0},{"title":"12","addTitle":"","value":0},{"title":"13","addTitle":"","value":0},{"title":"14","addTitle":"","value":0},{"title":"15","addTitle":"","value":0},{"title":"16","addTitle":"","value":0},{"title":"17","addTitle":"","value":0},{"title":"18","addTitle":"","value":0},{"title":"19","addTitle":"","value":0},{"title":"20","addTitle":"","value":0},{"title":"21","addTitle":"","value":12000},{"title":"22","addTitle":"","value":0},{"title":"23","addTitle":"","value":0},{"title":"24","addTitle":"","value":0},{"title":"25","addTitle":"","value":0},{"title":"26","addTitle":"","value":0},{"title":"27","addTitle":"","value":4000},{"title":"28","addTitle":"","value":0}],"topSells":[{"guid":"peyote","title":"Peyote","count":8}]}
		},
	marginLimit: 0

	},
	mutations: {
		setBusinessBalance(state, data) {
			state.balance = data;
		},
        setBusinesMargin(state, data) {
			state.margin = data;
		},
		setBusinesDelivery(state, data) {
			state.deliveryData = data;
		},
		setBusinesRes(state, data) {
			state.resources = data;
		},
		setBusinesType(state, data) {
			state.type = data;
		},
		setBisinessStat(state, data) {
			state.bisinessStat = data;
		},
		setBisinessTitle(state, data) {
			state.title = data;
		},
		setMarginLimit(state, data) {
			state.marginLimit = data;
		},

	},
	actions: {
		setBusinessBalance({ commit }, data) {
			commit('setBusinessBalance', data);
		},
        setBusinesMargin({ commit }, data) {
			commit('setBusinesMargin', data);
		},
		setBusinesDelivery({ commit }, data) {
			commit('setBusinesDelivery', data);
		},
		setBusinesRes({ commit }, data) {
			commit('setBusinesRes', data);
		},
		setBusinesType({ commit }, data) {
			commit('setBusinesType', data);
		},
		setBisinessStat({ commit }, data) {
			commit('setBisinessStat', data);
		},
		setBisinessTitle({ commit }, data) {
			commit('setBisinessTitle', data);
		},
		setMarginLimit({ commit }, data) {
			commit('setMarginLimit', data);
		},
	},
	getters: {
		getBusinessBalance: state => { 
			return state.balance; 
		},
        getBusinesMargin: state => { 
			return state.margin; 
		},
		getBusinesDelivery: state => { 
			return state.deliveryData; 
		},
		getBusinesRes: state => { 
			return state.resources; 
		},
		getBusinesType: state => { 
			return state.type; 
		},
		getBusinesStat: state => { 
			return state.bisinessStat; 
		},
		getBusinesTitle: state => { 
			return state.title; 
		},
		getMarginLimit: state => { 
			return state.marginLimit; 
		},
	}
};

export default clothShopData;