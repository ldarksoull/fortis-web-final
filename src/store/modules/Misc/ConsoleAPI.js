const ConsoleAPI = {
	state: {
		consoleData: {
			data: [],
			history: [],
		},
		showAdminConsole: false,
		adminConsoleLogs: [
			/*
			{
				msg:
					"test logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_log",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg:
					"test logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_log",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg:
					"test logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_log",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_log",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_warn",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_warn",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CEF_warn",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "SERVER_error",
				date: "24.11.2020, 15:39:09",
			},
			{
				msg: "test logs  logs from ceftest logs from ceftest logs from ceftest logs from cef",
				type: "CLIENT_error",
				date: "24.11.2020, 15:39:09",
			},
		*/
		],
	},
	mutations: {
		consolePush(state, { type, msg }) {
			state.consoleData.data.push({ type, msg });
		},
		historyPush(state, msg) {
			state.consoleData.history.push(msg);
		},
		toggleAdminConsole(state) {
			state.showAdminConsole = !state.showAdminConsole;
		},
		setAdminConsoleLogs(state, data) {
			state.adminConsoleLogs = data;
		},
		pushAdminConsoleLog(state, data) {
			if (Array.isArray(data.msg)) {
				let string = "";
				for (let i = 0, length = data.msg.length; i < length; i++) {
					const argument = data.msg[i];
					if (typeof argument === "object") {
						string += `\n${JSON.stringify(argument, "", 4)}\n`;
					} else {
						string += argument + " ";
					}
				}
				data.msg = string;
			}
			state.adminConsoleLogs.push(data);
		},
	},
	actions: {
		consolePush({ commit }, data) {
			const { type, msg } = JSON.parse(data);
			commit("consolePush", { type, msg });
		},

		historyPush({ commit }, data) {
			commit("historyPush", data);
		},
		toggleAdminConsole({ commit }, data) {
			commit("toggleAdminConsole", data);
		},
		setAdminConsoleLogs({ commit }, data) {
			commit("setAdminConsoleLogs", data);
		},
		pushAdminConsoleLog({ commit }, data) {
			commit("pushAdminConsoleLog", data);
		},
	},
	getters: {
		consoleData: state => {
			return state.consoleData.data;
		},
		historyData: state => {
			return state.consoleData.history;
		},
		getAdminConsoleState: state => {
			return state.showAdminConsole;
		},
		getAdminConsoleLogs: state => {
			return state.adminConsoleLogs;
		},
	},
};

export default ConsoleAPI;
