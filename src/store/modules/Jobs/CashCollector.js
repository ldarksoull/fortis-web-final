const CashCollectorData = {
	state: {
		atmCount: 0,
		totalDistance: 0,
		pay: 0,
		mate: null
	},
	mutations: {
		setCashCollectorAtmCount(state, count) {
			state.atmCount = count;
		},
		setCashCollectorTotalDistance(state, dist) {
			state.totalDistance = dist;
		},
		setCashCollectorPay(state, pay) {
			state.pay = pay;
		},
		setCashCollectorMate(state, mate) {
			state.mate = mate;
		}
	},
	actions: {
		setCashCollectorAtmCount({ commit }, data) {
			commit("setCashCollectorAtmCount", data);
		},
		setCashCollectorTotalDistance({ commit }, data) {
			commit("setCashCollectorTotalDistance", data);
		},
		setCashCollectorPay({ commit }, data) {
			commit("setCashCollectorPay", data);
		},
		setCashCollectorMate({ commit }, mate) {
			commit("setCashCollectorMate", JSON.parse(mate));
		}
	},
	getters: {
		getCashCollectorAtmCount: state => {
			return state.atmCount;
		},
		getCashCollectorTotalDistance: state => {
			return state.totalDistance;
		},
		getCashCollectorPay: state => {
			return state.pay;
		},
		getCashCollectorMate: state => {
			return state.mate;
		}
	}
};

export default CashCollectorData;
