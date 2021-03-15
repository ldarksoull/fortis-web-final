const Notifications = {
	state: {
		notifications: {
			list: [],
			nextItemId: 1
		}
	},
	mutations: {
		addNotification(state, { id, text, theme, title, source, img }) {
			state.notifications.list.push({ id, text, theme, title, source, img });
		},

		removeNotification(state, id) {
			for (const item of state.notifications.list)
				if (item.id === id) return state.notifications.list.splice(state.notifications.list.indexOf(item), 1);
		},

		clearNotifications(state) {
			return state.notifications.list.splice(0, state.notifications.list.length);
		}
	},
	actions: {
		clearNotifications({ commit }) {
			commit('clearNotifications');
		},

		addNotification({ commit, state }, notification) {
			const { text, theme, time, title, source, img } = notification;
			const id = state.notifications.nextItemId++;
			commit('addNotification', { id, text, theme, title, source, img });
			setTimeout(() => {
				commit('removeNotification', id);
			}, time || 5000);
		}
	},
	getters: {
		notificationsList: state => {
			return state.notifications.list;
		}
	}
};

export default Notifications;
