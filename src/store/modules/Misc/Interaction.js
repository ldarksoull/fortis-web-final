const Interaction = {
	state: {
		posInteraction: {
			x: '50',
			y: '50',
		},
		showDocument: {
			guid: 10,
			id: 0,
			n: 'name',
			f: 'family',
			rank: 'rankTitle',
			dateOfBirth: '01011999',
			passportId: "000001562",
			gender: 0,
			creationDate: "2020-07-31T03:17:40.385Z",
			factionID: 11,
			job: 'taxi',
			factionTitle: "FIB",
		},
		showLicense: [
			{ id: 1, type: "driver", title: "B", dateFrom: "2016-04-30T01:19:45.000Z", dateTo: "2016-04-30T01:19:45.000Z" },
			{ id: 2, type: "driver", title: "A", dateFrom: "2016-04-30T01:19:45.000Z", dateTo: "2016-04-30T01:19:45.000Z" },
			{ id: 3, type: "med", title: "A", dateFrom: "2016-04-30T01:19:45.000Z", dateTo: "2016-04-30T01:19:45.000Z" },
		]
	},
	mutations: {
		setPosInteraction(state, data) {
			state.posInteraction = data;
		},
		setShowDocument(state, data) {
			state.showDocument = data;
		},
		setShowLicense(state, data) {
			state.showLicense = data;
		},
	},
	actions: {
		setPosInteraction({ commit }, data) {
			commit('setPosInteraction',  data);
		},
		setShowDocument({ commit }, data ) {
			commit('setShowDocument', data);
		},
		setShowLicense({ commit }, data ) {
			commit('setShowLicense',  data);
		},
	},
	getters: {
		getPosInteraction: state => {
			return state.posInteraction;
		},
		getShowDocument: state => {
			return state.showDocument;
		},
		getShowLicense: state => {
			return state.showLicense;
		},
	}
};

export default Interaction;
