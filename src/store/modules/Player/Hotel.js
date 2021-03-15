const Hotel = {
	state: {
		hotelRoom: [
			/*{ guid: 1, title: "Номер 1", ownerId: 1, hoursLeft: 25, isClosed: 1 },
			{ guid: 2, title: "Номер 2", ownerId: 20, hoursLeft: 1, isClosed: 1 },
			{ guid: 3, title: "Номер 3", ownerId: 30, hoursLeft: 1, isClosed: 1 },
			{ guid: 4, title: "Номер 4", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 5, title: "Номер 5", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 6, title: "Номер 6", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 7, title: "Номер 7", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 8, title: "Номер 8", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 9, title: "Номер 9", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 10, title: "Номер 10", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 11, title: "Номер 11", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 12, title: "Номер 12", ownerId: 0, hoursLeft: 1, isClosed: 1 },
			{ guid: 13, title: "Номер 13", ownerId: 0, hoursLeft: 1, isClosed: 1 },*/
		],
		price: 100,
	},
	mutations: {
		setHotelRoom(state, data) {
			state.hotelRoom = data;
		},
		setHotelRoomPrice(state, data) {
			state.price = data;
		},
	},
	actions: {
		setHotelRoom({ commit }, data) {
			commit("setHotelRoom", data);
		},
		setHotelRoomPrice({ commit }, data) {
			commit("setHotelRoomPrice", data);
		},
	},
	getters: {
		getHotelRoom: state => state.hotelRoom,
		getHotelRoomPrice: state => state.price,
	},
};

export default Hotel;
