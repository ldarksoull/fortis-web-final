const CharactersList = {
	state: {
		characters: [{nFirst:'Name',nSecond:'Family',house:true,factionID:10,logOutMs:3600000},{nFirst:'Name2',nSecond:'Family'},{nFirst:'Name3',nSecond:'Family'}],
		slots: [false,false],
		selected: -1,
		accountLogin: "accountLogin",
	},
	mutations: {
		CharactersList(state, data) {
			state.characters = data;
		},
		SlotsOpen(state, data) {
			state.slots = data;
		},
		setSelectCatacter(state, data) {
			state.selected = data;
		},
		setAccountLogin(state, data) {
			state.accountLogin = data;
		},
	},
	actions: {
		CharactersList({ commit, state }, data) {
			commit('CharactersList', JSON.parse(data));
		},
		setSlotsOpen({ commit, state }, data) {
			commit('SlotsOpen', JSON.parse(data));
		},
		setSelectCatacter({ commit, state }, data) {
			commit('setSelectCatacter', data);
		},
		setAccountLogin({ commit, state }, data) {
			commit('setAccountLogin', data);
		},
	},
	getters: {
		CharactersList: state => {
			return state.characters;
		},
		GetSlotsOpen: state => {
			return state.slots;
		},
		getSelectCatacter: state => {
			return state.selected;
		},
		getAccountLogin: state => {
			return state.accountLogin;
		},
	}
};

export default CharactersList;
