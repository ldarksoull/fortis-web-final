const Chat = {
	state: {
		dataChat: [
			/*
			{name:'name',tag:0,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:1,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:2,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:3,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:1},
			{name:'name',tag:0,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:1,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:2,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:3,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:1},
			{name:'name',tag:0,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:1,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:2,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:3,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:0},
			{name:'name',tag:4,playerId:0,msg:'test msg',value:1},
			*/
		],
		active: false,
		show: false,
		selectChannel: 0,
		channel:[
			'Say',
			'OOC',
			'Me',
			'Do',
			'Try',
		],
		chatMessageShow: true,
	},
	mutations: {
		pushChat(state, data) {
			state.dataChat.push(data);
		},
		setActive(state, boolean) {
			state.active = boolean;
		},
		setChatShow(state, boolean) {
			state.show = boolean;
		},
		setChatSelectChannel(state, data) {
			state.selectChannel = data;
		},
		setChatMessageShow(state, data) {
			state.chatMessageShow = data;
		},

	},
	actions: {
		pushChat({ commit }, data) {
			commit('pushChat', data);
		},
		setChatActive({ commit }, boolean) {
			commit('setActive', boolean);
		},
		setChatShow({ commit }, boolean) {
			commit('setChatShow', boolean);
		},
		setChatSelectChannel({ commit }, data) {
			commit('setChatSelectChannel', data);
		},
		setChatMessageShow({ commit }, data) {
			commit('setChatMessageShow', data);
		},
	},
	getters: {
		getChat: state => { return state.dataChat; },
		getChatActive: state => { return state.active; },
		getChatShow: state => { return state.show; },
		getSelectChannel: state => { return state.selectChannel; },
		getChatCannels: state => { return state.channel; },
		getChatMessageShow: state => { return state.chatMessageShow; },
	}
};

export default Chat;