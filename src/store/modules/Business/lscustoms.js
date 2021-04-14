const lscustoms = {
	state: {
		primaryColorDefault: { r: 0, g: 0, b: 0 },
		secondaryColorDefault: { r: 0, g: 0, b: 0 },
		neonColorDefault: { r: 0, g: 0, b: 0 },
		vehicleMods: [
			{
				title: "Engine",
				modType: 0,
				modTypes: [
					{ itemName: "Engine №0", modIndex: -1, price: 1000 },
					{ itemName: "Engine №1", modIndex: 0, price: 1000 },
					{ itemName: "Engine №2", modIndex: 1, price: 1000 },
					{ itemName: "Engine №3", modIndex: 2, price: 1000 },
					{ itemName: "Engine №4", modIndex: 3, price: 1000 },
				],
				selectedType: 0,
			},
			{
				title: "Transmission",
				modType: 1,
				modTypes: [
					{ itemName: "Transmission №0", modIndex: -1, price: 1000 },
					{ itemName: "Transmission №1", modIndex: 0, price: 1000 },
					{ itemName: "Transmission №2", modIndex: 1, price: 1000 },
					{ itemName: "Transmission №3", modIndex: 2, price: 1000 },
				],
				selectedType: -1,
			},
			{
				title: "Suspension",
				modType: 2,
				modTypes: [
					{ itemName: "Suspension №0", modIndex: -1, price: 1000 },
					{ itemName: "Suspension №1", modIndex: 0, price: 1000 },
					{ itemName: "Suspension №2", modIndex: 1, price: 1000 },
					{ itemName: "Suspension №3", modIndex: 2, price: 1000 },
					{ itemName: "Suspension №4", modIndex: 3, price: 1000 },
				],
				selectedType: -1,
			},
			{
				title: "Bumper",
				modType: 3,
				modTypes: [
					{ itemName: "Bumper №0", modIndex: -1, price: 1000 },
					{ itemName: "Bumper №1", modIndex: 0, price: 1000 },
					{ itemName: "Bumper №2", modIndex: 1, price: 1000 },
					{ itemName: "Bumper №3", modIndex: 2, price: 1000 },
				],
				selectedType: -1,
			},
		],
		additionalPrice: {},
	},
	mutations: {
		setVehPrimaryColor(state, data) {
			state.primaryColorDefault = data;
		},
		setVehSecondaryColor(state, data) {
			state.secondaryColorDefault = data;
		},
		setVehNeonColor(state, data) {
			state.neonColorDefault = data;
		},
		setVehicleMods(state, data) {
			state.vehicleMods = data;
		},
		setVehicleAdditionalPrice(state, data) {
			state.additionalPrice = data;
		},
	},
	actions: {
		setVehPrimaryColor({ commit }, data) {
			commit("setVehPrimaryColor", data);
		},
		setVehSecondaryColor({ commit }, data) {
			commit("setVehSecondaryColor", data);
		},
		setVehNeonColor({ commit }, data) {
			commit("setVehNeonColor", data);
		},
		setVehicleMods({ commit }, data) {
			commit("setVehicleMods", data);
		},
		setVehicleAdditionalPrice({ commit }, data) {
			commit("setVehicleAdditionalPrice", data);
		},
	},
	getters: {
		getVehPrimaryColor: state => state.primaryColorDefault,
		getVehSecondaryColor: state => state.secondaryColorDefault,
		getNeonColor: state => state.neonColorDefault,
		getVehicleMods: state => state.vehicleMods,
		getVehicleAditionalPrice: state => state.additionalPrice,
	},
};

export default lscustoms;
