import Vue from "vue";
function calcBoxEndRows(width, height) {
	let arrayEndRow = [];
	for (let i = 1; i <= height; i++) {
		if (i > 1) {
			const endIndex = i * width;
			arrayEndRow.push(endIndex);
		} else {
			const endIndex = width;
			arrayEndRow.push(endIndex);
		}
	}
	return arrayEndRow;
}
const Inventory = {
	state: {
		playerEqip: {
			/*
			"pants":{"guid":125,"img":"pants.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":3,"slot":-1,"count":1,"row":1,"cell":2,"type":4,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_jeans_01","underType":-1,"underStyles":{},"endRow":[3,6]},
			"feet":{"guid":126,"img":"feet.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":5,"slot":-1,"count":1,"row":1,"cell":1,"type":6,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_ld_jeans_01"},
			"undershirt":{"guid":127,"img":"undershirt.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":7,"slot":-1,"count":1,"row":1,"cell":2,"type":8,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":-1,"underStyles":[0,1],"endRow":[3,6]},
			"jacket":{"guid":195,"img":"jacket.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":-1,"count":1,"row":1,"cell":2,"type":11,"style":10,"color":0,"sex":0,"countMax":2,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{},"endRow":[3,6]},
			"hats":{"guid":200,"img":"hats.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":1,"slot":-1,"count":1,"row":1,"cell":1,"type":0,"style":20,"color":5,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_proxy_hat_01","underType":-1,"underStyles":{}},
			"backpack":{"guid":2002,"img":"bag.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":4,"slot":-1,"count":1,"row":1,"cell":3,"type":5,"style":0,"color":0,"sex":0,"countMax":3,"owned":1,"durability":100,"data":"{}","width":5,"height":5,"model":"prop_michael_backpack","endRow":[5,10,15,20,25]},
			"phone":{"guid":219,"img":"sim-card.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":14,"slot":-1,"count":1,"row":1,"cell":1,"type":13,"style":5,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{\"number\":666999}","width":0,"height":0,"model":"prop_food_bs_juice01"},
			"rifle" : {"title":"Штурмовая винтовка", "guid":1732,"img":"assaultRifle.png","parent":2002,"user":89,"vehicle":-1,"house":-1,"itemId":26,"slot":1,"count":1,"row":2,"cell":3,"type":18,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":{"serialNumber":"XXXXXXXXXX"},"width":0,"height":0,"model":"prop_food_bs_juice01"},
		*/
		},
		playerItems: [
			/*
			{"title":"Куртка", "guid":140,"img":"cloth.png","parent":127,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":3,"count":1,"row":1,"cell":2,"type":11,"style":3,"color":0,"sex":0,"countMax":2,"owned":0,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{}},
			{"title":"Куртка", "guid":193,"img":"cloth.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":3,"count":1,"row":1,"cell":2,"type":11,"style":28,"color":0,"sex":0,"countMax":2,"owned":0,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{}},
			{"title":"Штурмовая винтовка", "guid":1732,"img":"assaultRifle.png","parent":2002,"user":89,"vehicle":-1,"house":-1,"itemId":26,"slot":0,"count":1,"row":3,"cell":2,"type":18,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":{"serialNumber":"XXXXXXXXXX"},"width":0,"height":0,"model":"prop_food_bs_juice01"},
			{"title":"Шляпа", "guid":199,"img":"hats.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":1,"slot":5,"count":1,"row":1,"cell":1,"type":0,"style":5,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_proxy_hat_01","underType":-1,"underStyles":{}},
			{"title":"9mm", "guid":1995,"img":"9mm.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":14,"slot":0,"count":15,"row":1,"cell":1,"type":13,"style":0,"color":0,"sex":0,"countMax":30,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_food_bs_juice01"},
			{"title":"9mm", "guid":1996,"img":"9mm.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":14,"slot":1,"count":10,"row":1,"cell":1,"type":-1,"style":0,"color":0,"sex":0,"countMax":30,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_food_bs_juice01"}
		*/
		],
		blackList: {
			/*"pants":[{"slot":3,"guid":193},{"slot":4,"guid":193},{"slot":5,"guid":199},{"slot":0,"guid":1995},{"slot":1,"guid":1996}],
			"feet":[],
			"undershirt":[{"slot":3,"guid":140},{"slot":4,"guid":140}],
			"jacket":[],
			"backpack":[{"slot":0,"guid":1732},{"slot":1,"guid":1732},{"slot":5,"guid":1732},{"slot":6,"guid":1732},{"slot":10,"guid":1732},{"slot":11,"guid":1732}],
			"phone":[]*/
		},
		storageInv: {
			/*storageId:1,
			options: {rows:10, cell:7, height:10, width:7},
			items:[
				{"title":"Куртка", "guid":140,"img":"cloth.png","parent":127,"user":-1,"vehicle":-1,"house":-1,"itemId":9,"slot":5,"count":1,"row":1,"cell":2,"type":11,"style":3,"color":0,"sex":0,"countMax":2,"owned":0,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{}},
			],
			BlackList:[]*/
		},
		typeStorage: "none",
		searchPlayerEquip: {
			/*
			"pants":{"guid":125,"img":"pants.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":3,"slot":-1,"count":1,"row":1,"cell":2,"type":4,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_jeans_01","underType":-1,"underStyles":{},"endRow":[3,6]},
			"feet":{"guid":126,"img":"feet.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":5,"slot":-1,"count":1,"row":1,"cell":1,"type":6,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_ld_jeans_01"},
			"undershirt":{"guid":127,"img":"undershirt.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":7,"slot":-1,"count":1,"row":1,"cell":2,"type":8,"style":0,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":-1,"underStyles":[0,1],"endRow":[3,6]},
			"jacket":{"guid":195,"img":"jacket.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":-1,"count":1,"row":1,"cell":2,"type":11,"style":10,"color":0,"sex":0,"countMax":2,"owned":1,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{},"endRow":[3,6]},
			"hats":{"guid":200,"img":"hats.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":1,"slot":-1,"count":1,"row":1,"cell":1,"type":0,"style":20,"color":5,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_proxy_hat_01","underType":-1,"underStyles":{}},
			"backpack":{"guid":2002,"img":"bag.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":4,"slot":-1,"count":1,"row":1,"cell":3,"type":5,"style":0,"color":0,"sex":0,"countMax":3,"owned":1,"durability":100,"data":"{}","width":5,"height":5,"model":"prop_michael_backpack","endRow":[5,10,15,20,25]},
			"phone":{"guid":219,"img":"sim-card.png","parent":0,"user":89,"vehicle":-1,"house":-1,"itemId":14,"slot":-1,"count":1,"row":1,"cell":1,"type":13,"style":5,"color":0,"sex":0,"countMax":1,"owned":1,"durability":100,"data":"{\"number\":666999}","width":0,"height":0,"model":"prop_food_bs_juice01"},
			"rifle" : {"title":"Штурмовая винтовка", "guid":1732,"img":"assaultRifle.png","parent":2002,"user":89,"vehicle":-1,"house":-1,"itemId":26,"slot":1,"count":1,"row":2,"cell":3,"type":18,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":{"serialNumber":"XXXXXXXXXX"},"width":0,"height":0,"model":"prop_food_bs_juice01"},
		*/
		},
		searchPlayerItem: [
			/*
			{"title":"Куртка", "guid":140,"img":"jacket.png","parent":127,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":3,"count":1,"row":1,"cell":2,"type":11,"style":3,"color":0,"sex":0,"countMax":2,"owned":0,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{}},
			{"title":"Куртка", "guid":193,"img":"jacket.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":9,"slot":3,"count":1,"row":1,"cell":2,"type":11,"style":28,"color":0,"sex":0,"countMax":2,"owned":0,"durability":100,"data":"{}","width":3,"height":2,"model":"prop_ld_tshirt_01","underType":0,"underStyles":{}},
			{"title":"Штурмовая винтовка", "guid":1732,"img":"assaultRifle.png","parent":2002,"user":89,"vehicle":-1,"house":-1,"itemId":26,"slot":1,"count":1,"row":2,"cell":3,"type":18,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":{"serialNumber":"XXXXXXXXXX"},"width":0,"height":0,"model":"prop_food_bs_juice01"},
			{"title":"Шляпа", "guid":199,"img":"hats.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":1,"slot":5,"count":1,"row":1,"cell":1,"type":0,"style":5,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_proxy_hat_01","underType":-1,"underStyles":{}},
			{"title":"Симка", "guid":1995,"img":"sim-card.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":14,"slot":0,"count":1,"row":1,"cell":1,"type":13,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_food_bs_juice01"},
			{"title":"Канистра", "guid":1996,"img":"gas.png","parent":125,"user":89,"vehicle":-1,"house":-1,"itemId":32,"slot":1,"count":10,"row":1,"cell":1,"type":-1,"style":0,"color":0,"sex":0,"countMax":1,"owned":0,"durability":100,"data":"{}","width":0,"height":0,"model":"prop_food_bs_juice01"}
		*/
		],
		searchPlayerData: {
			name: "Test Test",
			guid: 0,
			factionId: 0,
		},
		jacketUnderTypes: [],
		ammo: {},
		itemList: [],
	},
	mutations: {
		updateEqip(state, data) {
			state.playerEqip = data;
		},
		addEquip(state, data) {
			state.playerEqip[data.ownedType] = data;
		},
		updateInventory(state, data) {
			state.playerItems = data;
		},
		updateInventoryBlackList(state, data) {
			state.blackList = data;
		},
		setStorageInv(state, data) {
			state.storageInv = data;
		},
		setStorageBlackList(state, data) {
			state.storageInv.BlackList = data;
		},
		setTypeStorage(state, data) {
			state.typeStorage = data;
		},
		setSearchPlayerEquip(state, data) {
			state.searchPlayerEquip = data;
		},
		setSearchPlayerItem(state, data) {
			state.searchPlayerItem = data;
		},
		setSearchPlayerData(state, data) {
			state.searchPlayerData = data;
		},
		setJacketUnderTypes(state, data) {
			state.jacketUnderTypes = data;
		},
		setPlayerAmmo(state, data) {
			state.ammo = data;
		},
		loadItemList(state, data) {
			state.itemList = data;
		},
		updateItemPos(state, data) {
			const item = state.playerItems.find(item => item.guid === data.guid);
			if (item) {
				item.parent = data.parent;
				item.slot = data.slot;
			}
		},
		updateStorageItemPos(state, data) {
			const item = state.storageInv.items.find(item => item.guid === data.guid);
			if (item) {
				item.slot = data.slot;
			}
		},
		addItem(state, data) {
			state.playerItems.push(data);
		},
		removeItem(state, data) {
			state.playerItems = state.playerItems.filter(item => item.guid !== data);
		},
		removeItemArray(state, data) {
			state.playerItems = state.playerItems.filter(item => !data.includes(item.guid));
		},
		removeEquip(state, data) {
			Vue.delete(state.playerEqip, data);
		},
		removeItemStorage(state, data) {
			state.storageInv.items = state.storageInv.items.filter(item => item.guid !== data);
		},
		addItemStorage(state, data) {
			state.storageInv.items.push(data);
		},
		updateItemCountStorage(state, data) {
			const item = state.storageInv.items.find(item => item.guid === data.guid);
			if (item) {
				item.count = data.count;
			}
		},
		updateItemCount(state, data) {
			const item = state.playerItems.find(item => item.guid === data.guid);
			if (item) {
				item.count = data.count;
			}
		},
		updateItemData(state, data) {
			const item = state.playerItems.find(item => item.guid === data.guid);
			if (item) {
				item.data = data.data;
			}
		},
		updateItemDurability(state, data) {
			const item = state.playerItems.find(item => item.guid === data.guid);
			if (item) {
				item.durability = data.durability;
			}
		},
	},
	actions: {
		updateEqip({ commit, getters }, data) {
			for (let key in data) {
				const config = getters.getItem(data[key].itemId);
				data[key] = Object.assign({}, config, data[key]);
			}
			commit("updateEqip", data);
		},
		updateInventory({ commit, getters }, data) {
			for (let i = 0, length = data.length; i < length; i++) {
				const config = getters.getItem(data[i].itemId);
				data[i] = Object.assign({}, config, data[i]);
			}
			commit("updateInventory", data);
		},
		updateInventoryBlackList({ commit }, data) {
			commit("updateInventoryBlackList", data);
		},
		setStorageInv({ commit, getters }, data) {
			if (data.items) {
				for (let i = 0, length = data.items.length; i < length; i++) {
					const config = getters.getItem(data.items[i].itemId);
					data.items[i] = Object.assign({}, config, data.items[i]);
				}
			}
			commit("setStorageInv", data);
		},
		setStorageBlackList({ commit }, data) {
			commit("setStorageBlackList", data);
		},
		setTypeStorage({ commit }, data) {
			commit("setTypeStorage", data);
		},
		setSearchPlayerEquip({ commit }, data) {
			commit("setSearchPlayerEquip", data);
		},
		setSearchPlayerItem({ commit }, data) {
			commit("setSearchPlayerItem", data);
		},
		setSearchPlayerData({ commit }, data) {
			commit("setSearchPlayerData", data);
		},
		setJacketUnderTypes({ commit }, data) {
			commit("setJacketUnderTypes", data);
		},
		setPlayerAmmo({ commit }, data) {
			commit("setPlayerAmmo", data);
		},
		loadItemList({ commit }, data) {
			data.forEach(item => {
				if (item.width || item.height) item.endRow = calcBoxEndRows(item.width, item.height);
			});
			commit("loadItemList", data);
		},
		updateItemPos({ commit }, data) {
			commit("updateItemPos", data);
		},
		updateStorageItemPos({ commit }, data) {
			commit("updateStorageItemPos", data);
		},
		addItem({ commit, getters }, data) {
			const config = getters.getItem(data.itemId);
			data = Object.assign({}, config, data);
			commit("addItem", data);
		},
		removeItem({ commit }, data) {
			commit("removeItem", data);
		},
		removeItemArray({ commit }, data) {
			commit("removeItemArray", data);
		},
		removeEquip({ commit }, data) {
			commit("removeEquip", data);
		},
		removeItemStorage({ commit }, data) {
			commit("removeItemStorage", data);
		},
		addItemStorage({ commit, getters }, data) {
			const config = getters.getItem(data.itemId);
			data = Object.assign({}, config, data);
			commit("addItemStorage", data);
		},
		updateItemCountStorage({ commit }, data) {
			commit("updateItemCountStorage", data);
		},
		addEquip({ commit, getters }, data) {
			const config = getters.getItem(data.itemId);
			data = Object.assign({}, config, data);
			commit("addEquip", data);
		},
		updateItemCount({ commit }, data) {
			commit("updateItemCount", data);
		},
		updateItemData({ commit }, data) {
			commit("updateItemData", data);
		},
		updateItemDurability({ commit }, data) {
			commit("updateItemDurability", data);
		},
	},
	getters: {
		eqipData: state => {
			return state.playerEqip;
		},
		inventoryData: state => {
			return state.playerItems;
		},
		blackListData: state => {
			return state.blackList;
		},
		getStorageInv: state => {
			return state.storageInv;
		},
		getTypeStorage: state => {
			return state.typeStorage;
		},
		getSearchPlayerEquip: state => {
			return state.searchPlayerEquip;
		},
		getSearchPlayerItem: state => {
			return state.searchPlayerItem;
		},
		getSearchPlayerData: state => {
			return state.searchPlayerData;
		},
		getJacketUnderTypes: state => {
			return state.jacketUnderTypes;
		},
		getPlayerAmmo: state => {
			return state.ammo;
		},
		getItem: state => itemId => {
			return state.itemList.find(item => item.id === itemId);
		},
	},
};

export default Inventory;
