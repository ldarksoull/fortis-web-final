const App = {
	state: {
		page: 'phone',
		hud: false,
		progress: false,
		progressData: {
			/*title: 'test',
			intervalValue: 0.1,
			percentage: 0,*/
		},
    dialog: {},
		showTestHud: false,
		playersNumber: 0,
		fullHudShow: true,
	},
	mutations: {
		setPage(state, page) {
			state.page = page;
		},
		setHud(state, boolean) {
			state.hud = boolean;
		},
		setProgress(state, boolean) {
			state.progress = boolean;
		},
		setProgressData(state, data) {
			state.progressData = data;
		},
		setDialog(state, data) {
			state.dialog = data;
		},
		setShowTestHUD(state, boolean) {
			state.showTestHud = !state.showTestHud;
		},
		setPlayersNumber(state, data) {
			state.playersNumber = data;
		},
		setFullHudShow(state, data) {
			state.fullHudShow = data;
		},
	},
	actions: {
		setPage({ commit }, page) {
			commit('setPage', page);
		},
		setHud({ commit }, boolean) {
			commit('setHud', boolean);
		},
		setProgress({ commit }, boolean) {
			
			commit('setProgress', boolean);
		},
		setProgressData({ commit }, data) {
			commit('setProgressData', data);
		},
		setDialog({ commit }, data) {
			commit('setDialog', data);
		},
		setShowTestHUD({ commit }, boolean) {
			commit('setShowTestHUD', boolean);
		},
		setPlayersNumber({ commit }, data) {
			commit('setPlayersNumber', data);
		},
		setFullHudShow({ commit }, data) {
			commit('setFullHudShow', data);
		},
	},
	getters: {
		getDialog: state => { return state.dialog; },
		page: state => { return state.page; },
		hud: state => { return state.hud; },
		getProgress: state => { return state.progress; },
		getProgressData: state => { return state.progressData; },
		getShowTestHud: state => { return state.showTestHud; },
		getPlayersNumber: state => { return state.playersNumber; },
		getFullHudShow: state => { return state.fullHudShow}
	}
};

export default App;
