const Vehicle = {
	state: {
		data: {
			/*engine: false,
			door: false,
			speed: 0,
			rpm: 0,
			fuel: 0,
			gear: 0,
			fuelRate: 0,
			fuelRateCalc: 0,
			fuelSum: 0,
			km: 101,*/
		},
		soundOpen: false,
		soundClose: false,
		penaltyList: [
			/*{
				vehicleId: 100,
				ownerId: 7,
				title: "Ruiner",
				number: "TESTTEST",
				penaltyPrice: 10000,
				vehiclePrice: 100000,
				reason: "tax",
				hours: 100,
			},
			{
				vehicleId: 101,
				ownerId: 7,
				title: "Ruiner2",
				number: "TESTTEST",
				penaltyPrice: 1000000,
				vehiclePrice: 100000,
				reason: "tax",
				hours: 100,
			},*/
		],
	},
	mutations: {
		setVehSpeedData(state, data) {
			state.data = data;
		},
		setVehOpenSound(state, data) {
			state.soundOpen = data;
		},
		setVehCloseSound(state, data) {
			state.soundClose = data;
		},
		setVehPenalty(state, data) {
			state.penaltyList = data;
		},
	},
	actions: {
		setVehSpeedData({ commit }, data) {
			commit("setVehSpeedData", data);
		},
		setVehOpenSound({ commit }, data) {
			commit("setVehOpenSound", data);
		},
		setVehCloseSound({ commit }, data) {
			commit("setVehCloseSound", data);
		},
		setVehPenalty({ commit }, data) {
			commit("setVehPenalty", data);
		},
	},
	getters: {
		getVehSpeedData: state => state.data,
		getVehOpenSound: state => state.soundOpen,
		getVehCloseSound: state => state.soundClose,
		getVehPenalty: state => state.penaltyList,
	},
};

export default Vehicle;
