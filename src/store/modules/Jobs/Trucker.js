const truckerTablet = {
	state: {
		tabletData: [ 
			{ id: 1,
    type: 'material',
    count: 1400,
    businessId: 1,
    businessTitle: 'Магазин одежды',
    data: [] },
  { id: 2,
    type: 'material',
    count: 1000,
    businessId: 1,
    businessTitle: 'Магазин одежды',
    data: [] },
  { id: 3,
    type: 'material',
    count: 1000,
    businessId: 1,
    businessTitle: 'Магазин одежды',
    data: [] },
  { id: 4,
    type: 'material',
    count: 10000,
    businessId: 1,
    businessTitle: 'Магазин одежды',
    data: [] },
  { id: 9,
    type: 'auto',
    count: 3,
    businessId: 10,
    businessTitle: 'Автомобильный магазин',
				data: [
					{"id":1,"model":"peyote","brend":"vapid","fuelTank":50,"fuelRate":10,"title":"Peyote","engineType":0,"price":20000,"trunkAttach":null,"count":0},
					{"id":5,"model":"dilettante","brend":"karin","fuelTank":40,"fuelRate":2,"title":"Dilettante","engineType":0,"price":25000,"trunkAttach":{"offX":-0.5,"offY":0.1,"offZ":0.6,"rotX":0,"rotY":-280},"count":0},
					{"id":3,"model":"dloader","brend":"bravado","fuelTank":80,"fuelRate":25,"title":"Duneloader","engineType":0,"price":20000,"trunkAttach":null,"count":0}
				] 
			} 
	],
		jobData: {
			historyOrders: [],
			pay: 0,
		},
		jobRadio: false,
	},
	mutations: {
		setTruckerOrders(state, data) {
			state.tabletData = data;
		},
		setTruckerJobData(state, data) {
			state.jobData = data;
		},
		setJobRadio(state, data) {
			state.jobRadio = data;
		},
		addJobRadioMember(state, data) {
			state.jobRadio.players.push(data);
		},
		removeJobRadioMember(state, data) {
			state.jobRadio.players = state.jobRadio.players.filter(player => player.guid !== data);
		},
	},
	actions: {
		setTruckerOrders({ commit }, data) {
			commit("setTruckerOrders", data);
		},
		setTruckerJobData({ commit }, data) {
			commit("setTruckerJobData", data);
		},
		setJobRadio({ commit }, data) {
			commit("setJobRadio", data);
		},
		addJobRadioMember({ commit }, data) {
			commit("addJobRadioMember", data);
		},
		removeJobRadioMember({ commit }, data) {
			commit("removeJobRadioMember", data);
		},
	},
	getters: {
		getTruckerOrders: state => {
			return state.tabletData;
		},
		getTruckerJobData: state => {
			return state.jobData;
		},
		getJobRadio: state => {
			return state.jobRadio;
		},
	}
};

export default truckerTablet;
