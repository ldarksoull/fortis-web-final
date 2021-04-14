const Government = {
	state: {
		factions: [
			{
				id: 1,
				title: "Los-Santos Police Department",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Курсант10", payment: 1000 },
				],
			},
			{
				id: 2,
				title: "Blaine County Sheriff Department",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Курсант10", payment: 1000 },
				],
			},
			{
				id: 3,
				title: "National Guard",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Курсант10", payment: 1000 },
				],
			},
			{
				id: 4,
				title: "Federal Investigation Bureau",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Курсант10", payment: 1000 },
				],
			},
			{
				id: 5,
				title: "Los Santos News",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Курсант10", payment: 1000 },
				],
			},
			{
				id: 6,
				title: "Government",
				ranks: [
					{ rank: 1, rankTitle: "Курсант1", payment: 1000 },
					{ rank: 2, rankTitle: "Курсант2", payment: 1000 },
					{ rank: 3, rankTitle: "Курсант3", payment: 1000 },
					{ rank: 4, rankTitle: "Курсант4", payment: 1000 },
					{ rank: 5, rankTitle: "Курсант5", payment: 1000 },
					{ rank: 6, rankTitle: "Курсант6", payment: 1000 },
					{ rank: 7, rankTitle: "Курсант7", payment: 1000 },
					{ rank: 8, rankTitle: "Курсант8", payment: 1000 },
					{ rank: 9, rankTitle: "Курсант9", payment: 1000 },
					{ rank: 10, rankTitle: "Губернатор", payment: 1000 },
				],
			},
		],
		premiumList: [
			{ id: 1, factionTitle: "Government", playerGuid: 1, suggestName: "Lex Anyway", playerName: "Test Test", reason: "premia reason text1", amount: 1000 },
			{ id: 2, factionTitle: "Government", playerGuid: 1, suggestName: "Lex Anyway", playerName: "Test Test", reason: "premia reason text2", amount: 2000 },
			{ id: 3, factionTitle: "Los Santos News", playerGuid: 1, suggestName: "Lex Anyway", playerName: "Test Test", reason: "premia reason text3", amount: 3000 },
			{ id: 4, factionTitle: "Federal Investigation Bureau", playerGuid: 1, suggestName: "Lex Anyway", playerName: "Test Test", reason: "premia reason text4", amount: 5000 },
		],
		servicesList: [
			{ title: "Проезд на автобусе(Черный маршрут)", type: "busTicketPrice", data: "black", price: 10 },
			{ title: "Проезд на автобусе(Красный маршрут)", type: "busTicketPrice", data: "red", price: 10 },
			{ title: "Проезд на автобусе(Синий маршрут)", type: "busTicketPrice", data: "blue", price: 10 },
		],
		govMoney: 0,
		budgetLog: [
			{ id: 1, type: "plus", title: "nazvanie dohoda1", value: 11230000, date: "2020-03-28T13:56" },
			{ id: 2, type: "plus", title: "nazvanie dohoda2", value: 10012300, date: "2016-04-30T01:19:45.000Z" },
			{ id: 3, type: "plus", title: "nazvanie dohoda3", value: 101000, date: "2016-04-30T01:19:45.000Z" },
			{ id: 4, type: "plus", title: "nazvanie dohoda4", value: 100200, date: "2016-04-30T01:19:45.000Z" },
			{ id: 5, type: "plus", title: "nazvanie dohoda5", value: 100, date: "2016-04-30T01:19:45.000Z" },
			{ id: 6, type: "minus", title: "nazvanie rashoda1", value: 100, date: "2016-04-30T01:19:45.000Z" },
			{ id: 7, type: "minus", title: "nazvanie rashoda2", value: 100, date: "2016-04-30T01:19:45.000Z" },
			{ id: 8, type: "minus", title: "nazvanie rashoda3", value: 22100, date: "2016-04-30T01:19:45.000Z" },
		],
		taxValues: [
			{ type: "vehicle", title: "Транспортный налог", value: 1, percent: 0 },
			{ type: "house", title: "Налог на имущество", value: 2, percent: 0 },
			{ type: "business", title: "Налог на бизнес", value: 4, percent: 0 },
		],
	},
	mutations: {
		setFactionsData(state, data) {
			state.factions = data;
		},
		setPremiumList(state, data) {
			state.premiumList = data;
		},
		setServicesList(state, data) {
			state.servicesList = data;
		},
		setGovMoney(state, data) {
			state.govMoney = data;
		},
		setBudgetLog(state, data) {
			state.budgetLog = data;
		},
		setTaxValues(state, data) {
			state.taxValues = data;
		},
	},
	actions: {
		setFactionsData({ commit }, data) {
			commit("setFactionsData", data);
		},
		setPremiumList({ commit }, data) {
			commit("setPremiumList", data);
		},
		setServicesList({ commit }, data) {
			commit("setServicesList", data);
		},
		setGovMoney({ commit }, data) {
			commit("setGovMoney", data);
		},
		setBudgetLog({ commit }, data) {
			commit("setBudgetLog", data);
		},
		setTaxValues({ commit }, data) {
			commit("setTaxValues", data);
		},
	},
	getters: {
		getFactions: state => state.factions,
		getPremiumList: state => state.premiumList,
		getServicesList: state => state.servicesList,
		getGovMoney: state => state.govMoney,
		getBudgetLogPlus: state => state.budgetLog.filter(log => log.value > 0),
		getBudgetLogMinus: state => state.budgetLog.filter(log => log.value < 0),
		getTaxValues: state => state.taxValues,
	},
};

export default Government;
