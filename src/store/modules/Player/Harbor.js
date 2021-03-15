const Harbor = {
	state: {
		haveBoatPlace: false,
		boatPlaces: [
			{ id: 1, free: true, x: -765.43505859375, y: -1378.50927734375, z: 0.11805132031440735, rot: 230.82850646972656 },
			{ id: 2, free: true, x: -770.9429931640625, y: -1385.6224365234375, z: 0.11997413635253906, rot: 229.69241333007812 },
			{ id: 3, free: true, x: -776.8917236328125, y: -1392.4080810546875, z: 0.12292337417602539, rot: 229.5012969970703 },
			{ id: 4, free: true, x: -782.7789916992188, y: -1399.1876220703125, z: 0.12527692317962646, rot: 229.9447784423828 },
			{ id: 5, free: true, x: -788.4885864257812, y: -1406.153564453125, z: 0.14378803968429565, rot: 230.7755584716797 },
			{ id: 6, free: true, x: -794.2947387695312, y: -1413.01318359375, z: 0.11867374181747437, rot: 229.68875122070312 },
			{ id: 7, free: true, x: -831.2332153320312, y: -1408.2845458984375, z: 0.1240679919719696, rot: 110.32101440429688 },
			{ id: 8, free: true, x: -834.0908203125, y: -1399.7357177734375, z: 0.12170791625976562, rot: 111.02288818359375 },
			{ id: 9, free: true, x: -837.2759399414062, y: -1391.351318359375, z: 0.12331557273864746, rot: 109.70159912109375 },
			{ id: 10, free: true, x: -839.9971923828125, y: -1382.7425537109375, z: 0.11983966827392578, rot: 111.0682373046875 },
			{ id: 11, free: true, x: -843.827392578125, y: -1374.55419921875, z: 0.12721151113510132, rot: 109.14724731445312 },
			{ id: 12, free: true, x: -847.2972412109375, y: -1364.6405029296875, z: 0.1126876175403595, rot: 111.83355712890625 },
			{ id: 13, free: true, x: -851.41650390625, y: -1356.5362548828125, z: 0.11290448904037476, rot: 108.72259521484375 },
			{ id: 14, free: true, x: -854.079833984375, y: -1347.9798583984375, z: 0.10870981216430664, rot: 109.34197998046875 },
			{ id: 15, free: true, x: -856.2193603515625, y: -1339.1473388671875, z: 0.12402155995368958, rot: 110.7847900390625 },
			{ id: 16, free: true, x: -859.3963623046875, y: -1330.762451171875, z: 0.1169840395450592, rot: 109.34716796875 },
		],
		boatTitle: "У вас нет лодки",
	},
	mutations: {
		setPlayerHaveBoatPlace(state, data) {
			state.haveBoatPlace = data;
		},
		setBoatPlaces(state, data) {
			state.boatPlaces = data;
		},
		setBoatTitle(state, data) {
			state.boatTitle = data;
		},
	},
	actions: {
		setPlayerHaveBoatPlace({ commit }, data) {
			commit("setPlayerHaveBoatPlace", data);
		},
		setBoatPlaces({ commit }, data) {
			commit("setBoatPlaces", data);
		},
		setBoatTitle({ commit }, data) {
			commit("setBoatTitle", data);
		},
	},
	getters: {
		getPlayerHaveBoat: state => {
			return state.haveBoatPlace;
		},
		getBoatPlaces: state => {
			return state.boatPlaces;
		},
		getBoatTitle: state => {
			return state.boatTitle;
		},
	},
};

export default Harbor;
