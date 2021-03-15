const Time = {
	state: {
		dataTime: {
			time: {
					hour: '15',
					mins: '45',
				},
			weekday: 0,
			date: {
					day: '02',
					month: '02',
					year: '2002',
			},
		},
	},
	mutations: {
		setDate(state, data) {
			state.dataTime = data;
		},
	},
	actions: {
		setDate({ commit }, data) {
			commit('setDate', data);
		},
	},
	getters: {
		getDataTime: state => { return state.dataTime; },
		getDate: state => { 
			const date = state.dataTime.date;
			return `${date.day}.${date.month}.${date.year}`; 
		},
		getTime: state => { 
			const time = state.dataTime.time;
			return `${time.hour}:${time.mins}`; 
		},


	}
};

export default Time;