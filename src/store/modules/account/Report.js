const Report = {
	state: {
		ticketList: [
			{
				ticketName: "test ticket name",
				id: 1,
				isClosed: 1,
				messagesList: [
					{ from: "admin", name: "Lex Anyway", msg: "test message", date: "19.02.2019", time: "18:30" },
					{ from: "player", msg: "test message from me", date: "19.02.2019", time: "18:30" },
				],
			},
		],
		selectedTicketId: false,
		adminTicketList: [
			/*{
				ticketName: "test ticket name",
				playerName: "player name",
				id: 1,
				adminGuid: 0,
				isClosed: 0,
			},
			{
				ticketName: "another ticket name",
				playerName: "Lex Anyway",
				id: 2,
				adminGuid: 0,
				isClosed: 0,
			},*/
		],
		ticketMessages: [],
		closedTickets: [],
	},
	mutations: {
		addTicket(state, data) {
			state.ticketList.push(data);
		},
		setSelectedTicketId(state, data) {
			state.selectedTicketId = data;
		},
		setTicketList(state, data) {
			state.ticketList = data;
		},
		setAdminTicketList(state, data) {
			state.adminTicketList = data;
		},
		pushAdminTicket(state, data) {
			state.adminTicketList.unshift(data);
		},
		setClosedTickets(state, data) {
			data.forEach(ticket => {
				ticket.isClosed = 1;
			});
			state.closedTickets = data;
		},
		updateAdminTicket(state, data) {
			const ticket = state.adminTicketList.find(t => t.id === data.id);
			if (ticket) {
				ticket.isClosed = data.isClosed;
				ticket.adminGuid = data.adminGuid;
			}
		},
		pushMessage(state, data) {
			const ticket = state.ticketList.find(t => t.id === data.id);
			if (!ticket.messagesList) ticket.messagesList = [];
			ticket.messagesList.push(data.messageData);
		},
		pushAdminMessage(state, data) {
			const ticket = state.adminTicketList.find(t => t.id === data.id);
			if (!ticket.messagesList) ticket.messagesList = [];
			ticket.messagesList.push(data.messageData);
		},
		setTicketMessages(state, data) {
			const ticket = state.adminTicketList.find(t => t.id === data.id);
			if (ticket) {
				ticket.messagesList = data.msg;
				state.ticketMessages = data;
			}
			const ticketInClosedList = state.closedTickets.find(t => t.id === data.id);
			if (ticketInClosedList) {
				ticketInClosedList.messagesList = data.msg;
				state.ticketMessages = data;
			}
		},
	},
	actions: {
		addTicket({ commit }, data) {
			commit("addTicket", data);
		},
		setSelectedTicketId({ commit }, data) {
			commit("setSelectedTicketId", data);
		},
		setTicketList({ commit }, data) {
			commit("setTicketList", data);
		},
		setAdminTicketList({ commit }, data) {
			commit("setAdminTicketList", data);
		},
		pushAdminTicket({ commit }, data) {
			commit("pushAdminTicket", data);
		},
		updateAdminTicket({ commit }, data) {
			commit("updateAdminTicket", data);
		},
		pushMessage({ commit }, data) {
			commit("pushMessage", data);
		},
		pushAdminMessage({ commit }, data) {
			commit("pushAdminMessage", data);
		},
		setTicketMessages({ commit }, data) {
			commit("setTicketMessages", data);
		},
		setClosedTickets({ commit }, data) {
			commit("setClosedTickets", data);
		},
	},
	getters: {
		getAllTickets: state => state.ticketList,
		getSelectedTicketId: state => state.selectedTicketId,
		getAdminTicketList: state => state.adminTicketList,
		getTicketMessages: state => state.ticketMessages,
		getClosedTickets: state => state.closedTickets,
	},
};

export default Report;
