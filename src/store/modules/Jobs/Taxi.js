const TaxiData = {
	state: {
		tabletPage: "welcome",
		orderList: [],
		blackList: [],
		declineList: [],
		lastOrderList: [],
		driverPay: 0
	},
	mutations: {
		setTaxiOrders(state, data) {
			state.orderList = data;
		},
		setTaxiPushOrder(state, order) {
			const index = state.declineList.findIndex(x => x === order.guid);
			if (index !== -1) {
				state.declineList.splice(index, 1);
			}
			state.orderList.push(order);
		},
		setTaxiRemoveOrder(state, guid) {
			const index = state.orderList.findIndex(x => x.guid === guid);
			if (index !== -1) {
				state.orderList.splice(index, 1);
			}
		},
		setTaxiAddToBlackList(state, data) {
			state.blackList.push(data);
		},
		setTaxiRemoveFromBlackList(state, guid) {
			const index = state.blackList.findIndex(x => x.guid === guid);
			state.blackList.splice(index, 1);
		},
		setTaxiAddToDeclineList(state, data) {
			state.declineList.push(data);
		},
		setTaxiTabletPage(state, page) {
			state.tabletPage = page;
		},
		setTaxiPushLastOrder(state, data) {
			state.lastOrderList.push(data);
		},
		setTaxiDriverPay(state, data) {
			state.driverPay = data;
		},
		setTaxiBlackList(state, data) {
			state.blackList = data;
		},
		setTaxiLastOrderList(state, data) {
			state.lastOrderList = data;
		}
	},
	actions: {
		setTaxiOrders({ commit }, data) {
			commit("setTaxiOrders", JSON.parse(data));
		},
		setTaxiPushOrder({ commit }, order) {
			commit("setTaxiPushOrder", JSON.parse(order));
		},
		setTaxiRemoveOrder({ commit }, guid) {
			commit("setTaxiRemoveOrder", guid);
		},
		setTaxiAddToBlackList({ commit }, data) {
			commit("setTaxiAddToBlackList", data);
		},
		setTaxiRemoveFromBlackList({ commit }, data) {
			commit("setTaxiRemoveFromBlackList", data);
		},
		setTaxiAddToDeclineList({ commit }, data) {
			commit("setTaxiAddToDeclineList", data);
		},
		setTaxiTabletPage({ commit }, page) {
			commit("setTaxiTabletPage", page);
		},
		setTaxiPushLastOrder({ commit }, data) {
			commit("setTaxiPushLastOrder", data);
		},
		setTaxiDriverPay({ commit }, data) {
			commit("setTaxiDriverPay", data);
		},
		setTaxiBlackList({ commit }, data) {
			commit("setTaxiBlackList", JSON.parse(data));
		},
		setTaxiLastOrderList({ commit }, data) {
			commit("setTaxiLastOrderList", JSON.parse(data));
		}
	},
	getters: {
		getTaxiFilteredOrderList: state => {
			let blacklist = state.blackList;
			let declinelist = state.declineList;
			let filtered = state.orderList;
			blacklist.forEach(person => {
				filtered = filtered.filter(order => {
					return order.guid !== person.guid;
				});
			});
			declinelist.forEach(guid => {
				filtered = filtered.filter(order => {
					return order.guid !== guid;
				});
			});
			return filtered;
		},
		getTaxiBlockedPassengerList: state => {
			return state.blackList;
		},
		getTaxiTabletPage: state => {
			return state.tabletPage;
		},
		getTaxiLastOrderList: state => {
			return state.lastOrderList;
		},
		getTaxiDriverPay: state => {
			return state.driverPay;
		}
	}
};

export default TaxiData;
