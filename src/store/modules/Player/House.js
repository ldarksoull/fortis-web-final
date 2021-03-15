const House = {
	state: {
		houseData:{ id: 1,
  price: 10000,
  cars: 5,
  owner: 1,
  type: 'Econom',
  playerGUID: 1,
  lodger:[2,3],
  price: 1000000,
  lodgerNames:["Loadger Name","Loadger Name2"],
   },
	},
	mutations: {
		setHouseData(state , data) {
			state.houseData = data;
		},
	},
	actions: {
		setHouseData({ commit }, data) {
			commit('setHouseData', JSON.parse(data));
		},
	},
	getters: {
		getHouseData: state => {
			return state.houseData;
		},
	}
};

export default House;
