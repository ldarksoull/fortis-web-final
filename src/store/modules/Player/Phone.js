const Phone = {
	state: {
		phoneNumber: 100000,
		phoneBook:[
			{name:'Misha',number:'666111'},
			{name:'Misha2',number:'222532'},
			{name:'Misha3',number:'332532'},
			{name:'Misha4',number:'442532'},
			{name:'Misha5',number:'552532'},
			{name:'Misha6',number:'662532'},
		],
		phoneSMS:[
			{
				number:'666111',
				data:[
					{type: 'to', msg: 'Здрасьте я по объявлению',time:'2020-04-29T19:04:57.000Z'},
					{type: 'to', msg: 'Куда подъехать?',time:'2020-04-29T19:04:57.000Z'},
					{type: 'from', msg: 'На авторынок',time:'2020-04-29T19:04:57.000Z'},
					{type: 'to', msg: 'Через 2 минуты буду',time:'2020-04-29T19:04:57.000Z'},
				]
			},
			{
				number:'772532',
				data:[
					{type: 'to', msg: 'Здарова, ты где?',time:'2020-04-29T19:04:57.000Z'},
					{type: 'from', msg: 'Я в пд приедешь?',time:'2020-04-29T19:04:57.000Z'},
					{type: 'from', msg: 'Реще приезжай',time:'2020-04-29T19:04:57.000Z'},
				]
			}
		],
		phoneCall:'0',
		phoneCallConfirm:false,
		phoneCallTimer:'0:00',
		alertSMS:false,
		alertCall:false,
		adsList: [
			{text: "ad text1",phone:"123456"},
			{text: "ad text2",phone:"123456"},
			{text: "ad text3",phone:"123456"},
		],
		adNotif: true,
		bgIndex: 0,
		callLog: [
			{number:'123456',type:"outgoing",time:'10:30'},
			{number:'123456',type:"incoming",time:'10:30'},
			{number:'123456',type:"missed",time:'10:30'},
		],
		blackList: ['123456','123123'],
		phoneCallReject: false,
	},
	mutations: {
		setPhoneNumber(state , data) {
			state.phoneNumber = data;
		},
		setPhoneBook(state , data) {
			state.phoneBook = data;
		},
		setPhoneSMS(state , data) {
			data.sort((a, b) => Date.parse(b.data[b.data.length - 1].time) - Date.parse(a.data[a.data.length - 1].time));
			state.phoneSMS = data;
		},
		setPhoneCall(state , data) {
			state.phoneCall = data.toString();
		},
		setPhoneCallConfirm(state , data) {
			state.phoneCallConfirm = data;
		},
		setPhoneCallReject(state , data) {
			state.phoneCallReject = data;
		},
		setPhoneCallTimer(state , data) {
			state.phoneCallTimer = data;
		},
		setAlertSMS(state , data) {
			state.alertSMS = data;
		},
		setAlertCall(state , data) {
			state.alertCall = data;
		},
		setReadNewSMS(state , data) {
			state.phoneSMS[data].unread = 0;
			state.alertSMS = false;
		},
		setPushSMS(state , data) {
			for (var key in state.phoneSMS) {
				if (data.number === state.phoneSMS[key].number) {
					if (data.type === "from") {
						state.phoneSMS[key].unread++;
					}

					state.phoneSMS[key].data.push({ type: data.type, msg: data.msg, time: data.time });
					/*передвинуть смску в начало массива*/
					const temp = state.phoneSMS[key];
					state.phoneSMS.splice(key, 1);
					state.phoneSMS.unshift(temp);
					return;
				}
			}
			const unread = data.type === "from" ? 1 : 0;

			const addNew = {
				number: data.number,
				data: [{ type: data.type, msg: data.msg, time: data.time }],
				unread: unread,
			};

			state.phoneSMS.unshift(addNew);
		},
		delSms(state, data) {
			state.phoneSMS = state.phoneSMS.filter(sms => sms.number !== data);
		},
		setAdsList(state , data) {
			state.adsList = data;
		},
		pushNewAd(state , data) {
			state.adsList.push(data);
		},
		removeAd(state , data) {
			state.adsList = state.adsList.filter(ad => ad.id != data);
		},
		setAdNotif(state , data) {
			state.adNotif = data;
		},
		setBgIndex(state , data) {
			state.bgIndex = data;
		},
		addCallLog(state , data) {
			state.callLog.unshift(data);
		},
		setPhoneBlackList(state , data) {
			state.blackList = data;
		},
		setPhoneSMSLoad(state, data) {
			const sms = state.phoneSMS.find(s => s.number === data.number);
			if (sms) sms.data = data.smsList;
		}
	},
	actions: {
		setPhoneNumber({ commit }, data) {
			commit('setPhoneNumber', data);
		},
		setPhoneBook({ commit }, data) {
			commit('setPhoneBook', data);
		},
		setPhoneSMS({ commit }, data) {
			commit('setPhoneSMS', data);
		},
		setPhoneCall({ commit }, data) {
			commit('setPhoneCall', data);
		},
		setPhoneCallConfirm({ commit }, data) {
			commit('setPhoneCallConfirm', data);
		},
		setPhoneCallReject({ commit }, data) {
			commit('setPhoneCallReject', data);
		},
		setPhoneCallTimer({ commit }, data) {
			commit('setPhoneCallTimer', data);
		},
		setReadNewSMS({ commit }, data) {
			commit('setReadNewSMS', data);
		},
		setPushSMS({ commit }, data) {
			commit('setPushSMS', data);
		},
		delSms({ commit }, data) {
			commit('delSms', data);
		},
		setAlertSMS({ commit }, data) {
			commit('setAlertSMS', data);
		},
		setAlertCall({ commit }, data) {
			commit('setAlertCall', data);
		},
		setAdsList({ commit }, data) {
			commit('setAdsList', data);
		},
		pushNewAd({ commit }, data) {
			commit('pushNewAd', data);
		},
		removeAd({ commit }, data) {
			commit('removeAd', data);
		},
		setAdNotif({ commit }, data) {
			commit('setAdNotif', data);
		},
		setBgIndex({ commit }, data) {
			commit('setBgIndex', data);
		},
		addCallLog({ commit }, data) {
			commit('addCallLog', data);
		},
		setPhoneBlackList({ commit }, data) {
			commit('setPhoneBlackList', data);
		},
		setPhoneSMSLoad({ commit }, data) {
			commit('setPhoneSMSLoad', data);
		},
	},
	getters: {
		getPhoneNumber: state => {
			return state.phoneNumber;
		},
		getPhoneBook: state => {
			return state.phoneBook;
		},
		getPhoneSMS: state => {
			return state.phoneSMS;
		},
		getPhoneCallConfirm: state => {
			return state.phoneCallConfirm;
		},
		getPhoneCallReject: state => {
			return state.phoneCallReject;
		},
		getPhoneCallTimer: state => {
			return state.phoneCallTimer;
		},
		getPhoneCall: state => {
			return state.phoneCall;
		},
		getAlertSMS: state => {
			return state.alertSMS;
		},
		getAlertCall: state => {
			return state.alertCall;
		},
		getAdsList: state => {
			return state.adsList;
		},
		getAdNotif: state => {
			return state.adNotif;
		},
		getBgIndex: state => {
			return state.bgIndex;
		},
		getCallLog: state => {
			return state.callLog;
		},
		getPhoneBlackList: state => {
			return state.blackList;
		},
	}
};

export default Phone;
