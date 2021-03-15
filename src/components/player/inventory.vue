<template>
	<div class="wrapperInv" @click="hideContextMenu()">
		<transition name="fade">
			<div class="modal" v-if="modalPage === 'split'">
				<div class="modal-header">Выберите как разделить</div>
				<div class="modal-body">
					<div class="row modal-btns">
						<div class="modal-btn" @click="split('one')">по 1</div>
						<div class="modal-btn" @click="split('half')">50%</div>
					</div>
					<div class="modal-input">
						<label for="">
							Кол-во:
							<input v-model.number="systemData.splitCount" type="number" />
						</label>
					</div>
				</div>
				<div class="modal-footer row">
					<div class="modal-footer-btn" @click="split('input')">Разделить</div>
					<div class="modal-footer-btn" @click="modalPage = ''">Отменить</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="overlay" v-if="modalPage != ''"></div>
		</transition>
		<ul id="useItem" class="context-menu" ref="contextRef">
			<li @click="equipCloth(systemData.itemEvent.guid)" v-if="systemData.contextOwned">Надеть</li>
			<li @click="useItem(systemData.itemEvent)" v-if="systemData.contextUse">Использовать</li>
			<li @click="fuelThrow(systemData.itemEvent)" v-if="systemData.contextFilling">Вылить</li>
			<li @click="useItem(systemData.itemEvent)" v-if="systemData.contextEat">Сьесть</li>
			<li @click="useItem(systemData.itemEvent)" v-if="systemData.contextDrink">Выпить</li>
			<li @click="fishing(systemData.itemEvent)" v-if="systemData.contextFishing">Рыбачить</li>
			<li @click="equipCloth(systemData.itemEvent.guid)" v-if="systemData.contextEquip">Экипировать</li>
			<li @click="equipEcholot(systemData.itemEvent)" v-if="systemData.contextEquipEcho">Использовать</li>
			<li @click="unEquipEcholot(systemData.itemEvent)" v-if="systemData.contextUnEquipEcho">Убрать</li>
			<li @click="modalPage = 'split'" v-if="systemData.contextSplit">Разделить</li>
			<li @click="dropItem(systemData.itemEvent.guid)" v-if="systemData.contextMenuDrop">Выбросить</li>
			<li @click="unEquipCloth('simcard')" v-if="systemData.contextUnOwnedSIM">Вытащить SIM</li>
			<li @click="viewDoc('passport')" v-if="systemData.contextViewPassport">Посмотреть паспорт</li>
			<li v-for="license in playerLicense" @click="viewDoc(license.menu, license.type)" v-if="systemData.contextViewLicense">{{ license.btnText }}</li>
		</ul>
		<!-- Превью переносимого предмета(копия которая перемешается за мышкой)  -->
		<div class="previewItem" v-if="systemData.dragItem.guid" :style="previewPosition()">
			<img :src="'/img/player/inv/' + systemData.dragItem.img" :style="'width:' + systemData.dragItem.cell * 4.17 + 'vw;height:' + systemData.dragItem.row * 4.17 + 'vw;'" />
		</div>
		<!--Предметы персонажа  -->
		<div class="itemsShow">
			<div
				v-for="(i, index) in systemData.inventoryItems"
				v-tooltip="getTitle(i)"
				:key="i.guid + 'player'"
				:style="'top:' + i.params.top + 'px;left:' + i.params.left + 'px;'"
				:class="{ dragging: systemData.dragItem.guid === i.guid }"
				:id="'userItem' + i.id"
			>
				<img v-if="i.data.baitId" class="baitImg" :src="'img/player/inv/' + getBaitImg(i.data.baitId)" />
				<img
					:src="'img/player/inv/' + i.img"
					:style="'width:' + (i.cell * 4.17 + (i.cell * 0.25 - 0.25)) + 'vw;height:' + (i.row * 4.17 + (i.row * 0.25 - 0.25)) + 'vw;'"
					@mousedown.left="handleStartDrag(i, $event)"
					@contextmenu.prevent="showUseItem(i)"
					@mouseover="handleOverItem(i)"
				/>
				<p class="count" v-if="i.count > 1">{{ itemCount(i) }}</p>
			</div>
			<!-- Предметы в транспорте или хранилище  -->
			<div
				v-for="(i, index) in systemData.storageItems"
				v-tooltip="getTitle(i)"
				:key="i.guid + 'store'"
				:style="'top:' + i.params.top + 'px;left:' + i.params.left + 'px;'"
				:class="{ dragging: systemData.dragItem.guid === i.guid }"
				:id="'userItem' + i.id"
			>
				<img v-if="i.data.baitId" class="baitImg" :src="'img/player/inv/' + getBaitImg(i.data.baitId)" />
				<img
					:src="'img/player/inv/' + i.img"
					:style="'width:' + (i.cell * 4.17 + (i.cell * 0.25 - 0.25)) + 'vw;height:' + (i.row * 4.17 + (i.row * 0.25 - 0.25)) + 'vw;'"
					@mousedown.left="handleStartDrag(i, $event)"
					@mouseover="handleOverItem(i)"
				/>
				<p class="count" v-if="i.count > 1">{{ itemCount(i) }}</p>
			</div>
		</div>
		<div class="player-inventory">
			<div class="col">
				<div class="row">
					<div class="card card-item" v-if="storageItems.options" :style="'width:' + calcWidth(storageItems.options.width) + 'vw'">
						<div class="card-name">
							<span class="name-text">{{ getStorageTitle() }}</span>
						</div>
						<div class="card-body" ref="vehicleBox">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell(typeStorage + index)"
								:id="typeStorage + index"
								:key="index"
								v-for="(i, index) in Math.ceil(storageItems.options.height * storageItems.options.width)"
								@mouseover="handleOver(index, typeStorage)"
							></div>
						</div>
					</div>
				</div>
			</div>

			<div class="col">
				<div class="card inv-card" @mouseover="handleOver(0, false)">
					<div class="card-name">
						<span class="name-text">Инвентарь</span>
					</div>
					<div class="card-body">
						<div class="row jc-sb m-b-lg">
							<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('glass')" @click="unEquipCloth('glass')" /></div>
							<div class="cell-2x1 head-slots">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('hats')" @click="unEquipCloth('hats')" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('mask')" @click="unEquipCloth('mask')" /></div>
							</div>
							<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/trink.png" alt="" /></div>
						</div>
						<div class="row jc-sb m-b-lg">
							<div class="cell-grp">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/tie.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/clock.png" alt="" /></div>
							</div>
							<div class="cell m-b-5 cell-2x2 hasSwitch notOverItem">
								<div class="switch">
									<div @click="isShirt" :class="{ active: showJaket === 'shirt' }" class="switch-item">1</div>
									<div @click="isUnderwear" :class="{ active: showJaket === 'underwear' }" class="switch-item">2</div>
									<div @click="isArmor" :class="{ active: showJaket === 'armor' }" class="switch-item">3</div>
								</div>
								<img v-if="showJaket === 'shirt'" :src="isOwned('undershirt')" @click="unEquipCloth('undershirt')" alt="" />
								<img v-if="showJaket === 'underwear'" :src="isOwned('jacket')" @click="unEquipCloth('jacket')" alt="" />
								<img v-if="showJaket === 'armor'" :src="isOwned('armor')" @click="unEquipCloth('armor')" alt="" />
							</div>
							<div class="cell-grp">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('backpack')" @click="unEquipCloth('backpack')" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/bracer.png" alt="" /></div>
							</div>
						</div>
						<div class="row jc-sb">
							<div class="cell-grp">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/glow.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem">
									<img v-tooltip="getPhoneNumber()" :src="isOwned('phone')" @click="unEquipCloth('phone')" @contextmenu.prevent="showUnOwnedItem('phone')" alt="" />
								</div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="factionData.guid ? 'img/player/ownedSlot/radio.png' : 'img/player/freeSlot/radio.png'" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/jailBracer.png" alt="" /></div>
							</div>
							<div class="col-grp">
								<div class="cell m-b-5 cell-2x3 m-b-lg notOverItem"><img :src="isOwned('pants')" @click="unEquipCloth('pants')" /></div>
								<div class="cell m-b-5 cell-2x1 notOverItem"><img :src="isOwned('feet')" @click="unEquipCloth('feet')" /></div>
							</div>
							<div class="cell-grp m-b-xlg">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/ownedSlot/money.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem" @contextmenu.prevent="showUseItem('passport')"><img src="img/player/ownedSlot/passport.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem" @contextmenu.prevent="showUseItem('license')"><img src="img/player/ownedSlot/license.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img v-tooltip="getCardNumber()" src="img/player/ownedSlot/card.png" alt="" /></div>
							</div>
						</div>
						<div class="row footer-row">
							<div class="cell cell-1x1 notOverItem" @click="unEquipCloth('stungun')" @mouseover="handleOver('stungun')"><img :src="isOwnedGun('stungun')" alt="" /></div>
							<div class="cell cell-1x1 notOverItem" v-tooltip="getAmmoTooltip('pistol')" @click="unEquipCloth('pistol')" @mouseover="handleOver('pistol')">
								<img :src="isOwnedGun('pistol')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" v-tooltip="getAmmoTooltip('rifle')" @click="unEquipCloth('rifle')" @mouseover="handleOver('rifle')">
								<img :src="isOwnedGun('rifle')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" v-tooltip="getAmmoTooltip('shotgun')" @click="unEquipCloth('shotgun')" @mouseover="handleOver('shotgun')">
								<img :src="isOwnedGun('shotgun')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" @click="unEquipCloth('melee')"><img :src="isOwnedGun('melee')" alt="" /></div>
						</div>
					</div>
				</div>
			</div>
			<div class="equip">
				<div class="row mb">
					<div class="card card-item m-r" :style="'width:' + calcWidth(playerEqip.undershirt.width) + 'vw'" v-if="playerEqip.undershirt">
						<div class="card-name">
							<span class="name-text">Футболка | Рубашка</span>
						</div>
						<div class="card-body">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell('undershirt' + index)"
								:id="'undershirt' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.undershirt.height * playerEqip.undershirt.width)"
								@mouseover="handleOver(index, 'undershirt')"
							></div>
						</div>
					</div>
					<div class="card card-item m-r" :style="'width:' + calcWidth(playerEqip.jacket.width) + 'vw'" v-if="playerEqip.jacket">
						<div class="card-name">
							<span class="name-text">Куртка</span>
						</div>
						<div class="card-body" ref="jacketBox">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell('jacket' + index)"
								:id="'jacket' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.jacket.height * playerEqip.jacket.width)"
								@mouseover="handleOver(index, 'jacket')"
							></div>
						</div>
					</div>
					<div class="card card-item m-r" v-if="playerEqip.armor" :style="'width:' + calcWidth(playerEqip.armor.width) + 'vw'">
						<div class="card-name">
							<span class="name-text">Бронежилет</span>
						</div>
						<div class="card-body">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell('armor' + index)"
								:id="'armor' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.armor.width * playerEqip.armor.height)"
								@mouseover="handleOver(index, 'armor')"
							></div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="card card-item m-r" v-if="playerEqip.pants" :style="'width:' + calcWidth(playerEqip.pants.width) + 'vw'">
						<div class="card-name">
							<span class="name-text">Штаны</span>
						</div>
						<div class="card-body">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell('pants' + index)"
								:id="'pants' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.pants.width * playerEqip.pants.height)"
								@mouseover="handleOver(index, 'pants')"
							>
								<div class="overItem" width="100%" height="100%" v-if="systemData.overEvent.classActiveArray.indexOf('pants' + index) > -1"></div>
							</div>
						</div>
					</div>
					<div class="card card-item m-r" v-if="playerEqip.backpack" :style="'width:' + calcWidth(playerEqip.backpack.width) + 'vw'">
						<div class="card-name">
							<span class="name-text">Сумка</span>
						</div>
						<div class="card-body">
							<div
								ref="cells"
								class="cell cellStyle"
								:class="isOverCell('backpack' + index)"
								:id="'backpack' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.backpack.width * playerEqip.backpack.height)"
								@mouseover="handleOver(index, 'backpack')"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			showJaket: "shirt",
			modalPage: "",
			systemData: {
				inventoryItems: [],
				storageItems: [],
				previewPos: { x: 0, y: 0 },
				overEvent: {
					// пусто если не нашлось места
					idActive: -1, //id Index'a над которым находится мышка, при дропе уходит на сервер для проверки и сохранения изменения положения
					typeActive: "", // тип контейнера в который можно положить предмет, при дропе уходит на сервер для проверки и сохранения изменения положения
					classActiveArray: [], // для активации отображения предположительного места для предмета
				},
				dragItem: {}, // перетаскиваемый обьект, после дропа уходит на сервер
				contextMenuDrop: false,
				contextMenuWidth: null,
				contextMenuHeight: null,
				contextOwned: false,
				contextUse: false,
				contextEquip: false,
				contextEquipEcho: false,
				contextUnEquipEcho: false,
				contextFilling: false,
				contextEat: false,
				contextDrink: false,
				contextFishing: false,
				contextUnOwnedSIM: false,
				contextViewPassport: false,
				contextViewLicense: false,
				itemEvent: {},
				storageId: -1,
				splitCount: "",
			},
			equipAmmoPrevClick: false,
			overItem: false,
			license: {
				weapon: { btnText: "Посмотреть лицензию на оружие", menu: "weaponLicense" },
				driver: { btnText: "Посмотреть водительские права", menu: "driverLicense" },
				med: { btnText: "Посмотреть медицинскую карту", menu: "medLicense" },
			},
			weaponTypes: ["pistol", "rifle", "shotgun"],
		};
	},
	computed: {
		...mapGetters({
			playerEqip: "eqipData",
			playerItems: "inventoryData",
			blackListIndex: "blackListData",
			storageItems: "getStorageInv",
			typeStorage: "getTypeStorage",
			factionData: "getFactionData",
			cardNumber: "getCardNumber",
			ammo: "getPlayerAmmo",
			echolot: "getEcholot",
		}),
		playerLicense: function() {
			let license = this.$store.getters.getPlayerLicense;
			license.forEach(lic => {
				lic.btnText = this.license[lic.type].btnText;
				lic.menu = this.license[lic.type].menu;
			});
			// удалить дубликаты лицензий(так как лицензий с типом drive может быть несколько)
			license = license.filter((thing, index, self) => index === self.findIndex(t => t.type === thing.type));
			return license;
		},
	},
	watch: {
		playerItems: {
			handler() {
				this.systemData.dragItem = {};
				this.$nextTick(() => {
					this.loadItems();
				});
			},
			deep: true,
		},
		storageItems: {
			handler() {
				this.systemData.dragItem = {};
				this.$nextTick(() => {
					this.loadStorageItems();
				});
			},
			deep: true,
		},
	},
	mounted() {
		setTimeout(() => {
			this.loadItems();
			this.loadStorageItems();
		}, 100);
	},
	methods: {
		calcWidth(cells) {
			return cells * 4.17 + 0.25 * cells - 0.25;
		},
		isOwned: function(type) {
			if (this.playerEqip[type]) {
				return `img/player/ownedSlot/${type}.png`;
			} else {
				return `img/player/freeSlot/${type}.png`;
			}
		},
		isOwnedGun: function(type) {
			if (this.playerEqip[type]) {
				return `img/player/inv/${this.playerEqip[type].img}`;
			} else {
				return `img/player/freeSlot/${type}.png`;
			}
		},
		isShirt: function() {
			this.showJaket = "shirt";
		},
		isUnderwear: function() {
			this.showJaket = "underwear";
		},
		isArmor: function() {
			this.showJaket = "armor";
		},
		isOverCell: function(slot) {
			return this.systemData.overEvent.classActiveArray.indexOf(slot) > -1 ? "overItem" : "notOverItem";
		},
		previewPosition() {
			return "top:" + (Number.parseFloat(this.systemData.previewPos.y) + 10) + "px;left:" + (Number.parseFloat(this.systemData.previewPos.x) + 10) + "px;";
		},
		handleOverItem(item) {
			if (!this.systemData.dragItem.guid) return;
			if (this.systemData.dragItem.guid === item.guid) return;
			this.overItem = item;
		},
		handleOver(id, type) {
			this.overItem = false;
			//навели мышку на новую ячейку, считаем может ли занять такое положение предмет, если может обновляем данные overEvent
			if (!this.systemData.dragItem.guid) return;
			/*если навели мышку на слоты для экипированного оружия*/
			if (typeof id === "string" && this.playerEqip[id]) {
				this.systemData.overEvent = {
					idActive: id,
					typeActive: "ammoLoad",
					classActiveArray: [],
				};
				return;
			}
			if (this.systemData.overEvent.idActive === id && this.systemData.overEvent.typeActive === type) return;
			let newTarget = {
				idActive: id,
				typeActive: type,
				classActiveArray: [],
			};
			if (type === "owned" || type === "copStorage") {
				return (this.systemData.overEvent = newTarget);
			}

			if (type === "vehicle" || type === "house") {
				if (this.storageItems) {
					if (id !== this.systemData.overEvent.idActive || type !== this.systemData.overEvent.typeActive) {
						if (this.getIndexCells(this.systemData.dragItem, this.storageItems.options, newTarget)) {
							//getIndexCells вернул true значит есть место
							this.systemData.overEvent = newTarget;
						}
					}
				}
				return;
			}

			if (this.playerEqip[type]) {
				if (this.getIndexCells(this.systemData.dragItem, this.playerEqip[type], newTarget)) {
					this.systemData.overEvent = newTarget;
				}
			}
		},
		handleStartDrag(item, e) {
			if (item.type === -2) return;
			if (this.systemData.dragItem.guid === item.guid) return (this.systemData.dragItem = {});
			if (this.systemData.dragItem.guid) return;
			if (item.itemId === 120) storage.setEcholot(false);
			this.systemData.dragItem = item;
			this.takeItem = true;
			setTimeout(() => {
				this.takeItem = false;
			}, 100);
		},
		handleEndDrag(e) {
			if (this.takeItem) return;
			if (e.which != 1) return;
			let storageType = "user";
			if (this.systemData.storageItems.findIndex(item => item.guid === this.systemData.dragItem.guid) !== -1) {
				storageType = this.typeStorage;
			}
			if (this.overItem) {
				let storageTypeOverItem = "user";
				if (this.systemData.storageItems.findIndex(item => item.guid === this.overItem.guid) !== -1) {
					storageTypeOverItem = this.typeStorage;
				}
				if (storageType === "user" && storageTypeOverItem === "user") {
					if (this.systemData.dragItem.type === 28 && this.overItem.type === 26) {
						mp.trigger("cMisc-CallServerEvent", "sInventoryUseFishbait", this.systemData.dragItem.guid, this.overItem.guid);
						this.clearDragItemData();
						return;
					}
					if (this.systemData.dragItem.itemId === 121 && this.overItem.itemId === 120) {
						mp.trigger("cMisc-CallServerEvent", "sInventoryUseEchoCard", this.systemData.dragItem.guid, this.overItem.guid);
						this.clearDragItemData();
						return;
					}
				}
				if (this.systemData.dragItem.itemId === this.overItem.itemId && this.overItem.countMax > 1 && this.overItem.count !== this.overItem.countMax) {
					let stackType = "";
					if (storageType === "user" && storageTypeOverItem === "user") {
						stackType = "userToUser";
					} else if (storageType === storageTypeOverItem) {
						stackType = "storageToStorage";
					} else if (storageType === "user" && storageTypeOverItem !== "user") {
						stackType = "userToStorage";
					} else if (storageType !== "user" && storageTypeOverItem === "user") {
						stackType = "storageToUser";
					}
					mp.trigger("cMisc-CallServerEvent", "sInventoryStackItems", this.systemData.dragItem.guid, this.overItem.guid, stackType, this.typeStorage, this.systemData.storageId);
					this.systemData.overEvent = {
						idActive: -1,
						typeActive: "",
						classActiveArray: [],
					};
					return;
				}
			}
			if (this.systemData.overEvent.idActive < 0) return;
			if (this.systemData.overEvent.typeActive === "copStorage") {
				mp.trigger("cMisc-CallServerEvent", "sPoliceRemoveItem", JSON.stringify({ id: this.systemData.dragItem.guid, count: this.systemData.dragItem.count }));
				this.clearDragItemData();
				return;
			}
			if (this.systemData.overEvent.typeActive === "ammoLoad") {
				if (storageType !== "user") return;
				const sendData = {
					weaponType: this.systemData.overEvent.idActive,
					guid: this.systemData.dragItem.guid,
					itemId: this.systemData.dragItem.itemId,
					itemCount: this.systemData.dragItem.count,
				};
				this.equipAmmoPrevClick = true;
				if (this.systemData.dragItem.type === 16) mp.trigger("cPlayerLoadAmmo", sendData.weaponType, sendData.guid, sendData.itemId, sendData.itemCount);
				this.clearDragItemData();
				return;
			}

			const sendData = {
				type: this.systemData.overEvent.typeActive,
				storageId: this.systemData.storageId,
				newSlot: this.systemData.overEvent.idActive,
				itemGuid: this.systemData.dragItem.guid,
				storeType: storageType,
			};

			if (!sendData.itemGuid) {
				this.clearDragItemData();
				return;
			}

			/*тест на дроп в тот же слот откуда и взяли*/
			if (this.systemData.dragItem.slot === this.systemData.overEvent.idActive) {
				if (this.typeStorage === storageType) this.clearDragItemData();
				if (this.typeStorage && !this.playerEqip[this.systemData.overEvent.typeActive] && this.systemData.dragItem.user === -1) {
					this.clearDragItemData();
					return;
				}
				if (this.playerEqip[this.systemData.overEvent.typeActive] && this.playerEqip[this.systemData.overEvent.typeActive].guid === this.systemData.dragItem.parent) {
					this.clearDragItemData();
					return;
				}
			}

			if (sendData.type) {
				this.systemData.inventoryItems = this.systemData.inventoryItems.filter(i => i.guid !== sendData.itemGuid);
				this.systemData.storageItems = this.systemData.storageItems.filter(i => i.guid !== sendData.itemGuid);
				mp.trigger("cMisc-CallServerEvent", "sInventoryUpdatePos", JSON.stringify(sendData));
				this.clearDragItemData();
			}
		},
		clearDragItemData() {
			this.systemData.dragItem = {};
			this.overItem = false;
			this.systemData.overEvent = {
				idActive: -1,
				typeActive: "",
				classActiveArray: [],
			};
		},
		getIndexCells(item, box, target) {
			const maxIndex = box.height * box.width - 1;
			const itemSize = item.row * item.cell;
			let calcStartRow = target.idActive;
			let calcEndRow = target.idActive + item.cell - 1;
			let calcIndex = target.idActive;
			let chekBlack = [];
			let newRow = false;
			// Получаем данные об окончании ряда ячеек в зависимости от того контейнер транспорт или инвентарь игрока
			let containerEndRow = [];
			if (target.typeActive === "vehicle" || target.typeActive === "house") {
				containerEndRow = this.storageItems.endRow;
			} else {
				containerEndRow = this.playerEqip[target.typeActive].endRow;
			}
			if (!containerEndRow) return false;
			for (let i = 0; i < itemSize; i++) {
				if (this.testBlackList(item.guid, target.typeActive, calcIndex)) {
					//занято
					return false;
				}

				if (calcIndex > maxIndex) {
					//выходит за пределы контейнера
					return false;
				}

				chekBlack.push(calcIndex);
				target.classActiveArray.push(target.typeActive + calcIndex);

				//считаем индекс следующей клетки и проверяем не выходит ли за пределы контейнера обьект пока у нас есть данные о текущем индексе
				if (calcIndex + 1 > calcEndRow) {
					//следующий индекс на другой строке
					if (containerEndRow.indexOf(calcIndex) >= 0 && item.cell > 1) {
						return false;
					}
					newRow = true;
					var oldIndex = calcIndex;
					//calcIndex++;

					calcIndex = box.width + oldIndex + 1 - item.cell;
					calcEndRow = calcIndex + item.cell - 1;
					calcStartRow = calcIndex + 1;
				} else {
					//следующий индекс инкремент
					if (containerEndRow.indexOf(calcIndex + 1) >= 0 && !newRow) {
						return false;
					}
					calcIndex++;
				}
			}
			return true;
		},
		testBlackList(itemId, parent, slot) {
			let black;
			if (parent === "vehicle" || parent === "house") {
				black = this.storageItems.BlackList;
			} else {
				black = this.blackListIndex[parent];
			}
			if (!black) return false;
			for (let i = 0; i < black.length; i++) {
				if (black[i].slot === slot && black[i].guid != itemId) return true;
			}

			return false;
		},
		showUnOwnedItem(slot) {
			if (slot === "phone") {
				this.systemData.contextUnOwnedSIM = true;
			}
			this.updateContextPos();
		},
		showUseItem(item) {
			this.systemData.itemEvent = item;
			this.resetContextMenu();
			this.systemData.contextMenuDrop = true;

			const ownedArray = [0, 1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 25];
			const weaponArray = [17, 18, 19, 20, 21];
			const useItems = [14];
			const fillingItems = [22];

			if (ownedArray.indexOf(item.type) > -1) {
				this.systemData.contextOwned = true;
			}
			if (useItems.indexOf(item.type) > -1) {
				this.systemData.contextUse = true;
			}
			if (weaponArray.indexOf(item.type) > -1) {
				this.systemData.contextEquip = true;
			}
			if (item.type === 24) {
				this.systemData.contextEat = true;
			}
			if (item.type === 23) {
				this.systemData.contextDrink = true;
			}
			if (item.type === 26) {
				this.systemData.contextFishing = true;
			}
			if (item.count > 1) {
				this.systemData.contextSplit = true;
			}
			if (fillingItems.indexOf(item.type) > -1) {
				if (item.data.typeF !== "none") {
					this.systemData.contextFilling = true;
				}
			}
			if (item === "passport") {
				this.systemData.contextViewPassport = true;
				this.systemData.contextMenuDrop = false;
			}
			if (item === "license") {
				this.systemData.contextMenuDrop = false;
				if (this.playerLicense.length) {
					this.systemData.contextViewLicense = true;
				} else {
					return storage.addNotification({ text: "У вас нет лицензий", theme: "error" });
				}
			}
			if (item.itemId === 120) {
				if (this.echolot) {
					this.systemData.contextUnEquipEcho = true;
				} else {
					this.systemData.contextEquipEcho = true;
				}
			}

			this.updateContextPos();
		},
		showUseEquip() {
			this.systemData.contextUse = true;
			this.updateContextPos();
		},
		updateContextPos() {
			var menu = document.getElementById("useItem");
			if (!this.systemData.contextMenuWidth || !this.systemData.contextMenuHeight) {
				this.systemData.contextMenuWidth = menu.offsetWidth;
				this.systemData.contextMenuHeight = menu.offsetHeight;
				menu.removeAttribute("style");
			}

			if (this.systemData.contextMenuWidth + this.systemData.previewPos.x >= window.innerWidth) {
				menu.style.left = this.systemData.previewPos.x - this.systemData.contextMenuWidth + "px";
			} else {
				menu.style.left = this.systemData.previewPos.x + "px";
			}

			if (this.systemData.contextMenuHeight + this.systemData.previewPos.y >= window.innerHeight) {
				menu.style.top = this.systemData.previewPos.y - this.systemData.contextMenuHeight + "px";
			} else {
				menu.style.top = this.systemData.previewPos.y + "px";
			}
			menu.classList.add("active");
		},
		hideContextMenu() {
			this.resetContextMenu();

			document.getElementById("useItem").classList.remove("active");
		},
		resetContextMenu() {
			this.systemData.contextMenuDrop = false;
			this.systemData.contextOwned = false;
			this.systemData.contextUse = false;
			this.systemData.contextEquip = false;
			this.systemData.contextEquipEcho = false;
			this.systemData.contextUnEquipEcho = false;
			this.systemData.contextSplit = false;
			this.systemData.contextFilling = false;
			this.systemData.contextEat = false;
			this.systemData.contextDrink = false;
			this.systemData.contextFishing = false;
			this.systemData.contextUnOwnedSIM = false;
			this.systemData.contextViewPassport = false;
			this.systemData.contextViewLicense = false;
		},
		equipCloth(itemGuid) {
			mp.trigger("cMisc-CallServerEvent", "sInventoryEquip", itemGuid);
			this.hideContextMenu();

			const itemIndex = this.playerItems.findIndex(i => i.guid === itemGuid);
			this.playerItems.splice(itemIndex, 1);
		},
		equipEcholot(item) {
			if (!item.data.sdCard) return storage.addNotification({ text: "Вставте карту памяти в эхолот", theme: "error" });
			mp.trigger("cMisc-CallServerEvent", "sInventoryUseEcho", item.guid);
			this.exit();
		},
		unEquipEcholot(item) {
			storage.setEcholot(false);
			mp.trigger("cFishingDestroyZones");
			mp.trigger("cMisc-CallServerEvent", "sInventoryEcholotOff");
			this.exit();
		},
		dropItem(itemGuid) {
			mp.trigger("cMisc-CallServerEvent", "sInventoryDrop", itemGuid);
			this.hideContextMenu();

			const itemIndex = this.playerItems.findIndex(i => i.guid === itemGuid);
			if (this.playerItems[itemIndex].itemId === 120) storage.setEcholot(false);
			this.playerItems.splice(itemIndex, 1);
		},

		unEquipCloth(type) {
			if (this.equipAmmoPrevClick) return (this.equipAmmoPrevClick = false);
			if (this.playerEqip[type]) {
				if (this.weaponTypes.includes(type)) return mp.trigger("cPlayerUnequipWeapon", type);
				mp.trigger("cMisc-CallServerEvent", "sInventoryUnEquip", type);
			}
		},
		useItem(item) {
			mp.trigger("cMisc-CallServerEvent", "sInventoryUse", item.guid);
			this.exit();
		},
		fishing(item) {
			mp.trigger("cFishingStart", item.guid, item.itemId);
			this.exit();
		},
		fuelThrow(item) {
			const audio = new Audio("/audio/fuelThrow.ogg");
			audio.play();
			mp.trigger("cMisc-CallServerEvent", "sInventoryFuelTrow", item.guid);
		},
		loadItems() {
			// обнуляем данные
			if (!this.isAlive) return;

			this.systemData.inventoryItems = [];
			for (let key in this.playerEqip) {
				if (this.playerEqip[key].height > 0 || this.playerEqip[key].width > 0) {
					for (let i = 0; i < this.playerItems.length; i++) {
						if (this.playerItems[i].parent === this.playerEqip[key].guid) {
							const indexObj = document.getElementById(key + this.playerItems[i].slot);
							if (!indexObj) console.error("indexObj no found: ", key + this.playerItems[i].slot);
							const params = {
								params: {
									top: indexObj.getBoundingClientRect().top,
									left: indexObj.getBoundingClientRect().left,
								},
							};
							this.systemData.inventoryItems.push(Object.assign({}, this.playerItems[i], params));
						}
					}
				}
			}
		},
		loadStorageItems() {
			if (!this.isAlive) return;
			this.systemData.storageItems = [];
			if (this.storageItems.options) {
				this.systemData.storageId = this.storageItems.storageId;
				let itemsStorage = this.storageItems.items;

				for (let i = 0; i < itemsStorage.length; i++) {
					const indexObj = document.getElementById(this.typeStorage + itemsStorage[i].slot);
					if (!indexObj) console.error("indexObj in storage no found: ", this.typeStorage + itemsStorage[i].slot);
					itemsStorage[i].params = {
						top: indexObj.getBoundingClientRect().top,
						left: indexObj.getBoundingClientRect().left,
					};
					//После того как все данные подготовленны загружаем в массив для отображения.
					this.systemData.storageItems.push(itemsStorage[i]);
				}
			}
		},
		dragMove(e) {
			this.systemData.previewPos = { x: e.clientX, y: e.clientY };
		},
		getTitle(item) {
			let title = item.title;
			if (item.data.serialNumber) {
				title += " - " + item.data.serialNumber;
			}
			if (item.data.phoneNumber) {
				title += " - № " + item.data.phoneNumber;
			}
			if (item.data.typeF) {
				let fuelType = "";
				if (item.data.typeF === "diesel") {
					fuelType = "Дизель";
				} else if (item.data.typeF === "benzin") {
					fuelType = "Бензин";
				}
				title += " " + item.data.liters + "л. " + fuelType;
			}
			if (item.type === 26) {
				const bait = item.data.baitTitle;
				const baitPercent = item.data.baitPercent;
				title += " " + item.durability + "%";
				if (bait) {
					title += ` Наживка: ${bait}`;
					if (baitPercent) title += ` ${baitPercent}%`;
				}
			}
			return title;
		},
		split(type) {
			this.systemData.splitCount = Math.round(this.systemData.splitCount);
			const data = {
				itemGuid: this.systemData.itemEvent.guid,
				type: type,
				inputSplit: this.systemData.splitCount,
			};
			if (type === "input" && (this.systemData.splitCount < 1 || this.systemData.splitCount >= this.systemData.itemEvent.count)) {
				return;
			}
			mp.trigger("cMisc-CallServerEvent", "sInventorySplitItem", JSON.stringify(data));
			this.modalPage = "";
		},
		exit() {
			mp.trigger("cSetPage", "none");
		},
		onKeyUp(e) {
			if (e.keyCode === 27 || e.keyCode === 73) {
				this.exit();
			}
		},
		getStorageTitle() {
			switch (this.typeStorage) {
				case "house":
					return "Хранилище";
					break;
				case "copStorage":
					return "Склад вещдоков";
					break;
				default:
					return "Багажник";
					break;
			}
		},
		viewDoc(type, license = false) {
			this.hideContextMenu();
			mp.trigger("cMisc-CallServerEvent", "sPlayerViewDoc", type, license);
		},
		getPhoneNumber() {
			const sim = this.playerEqip["simcard"];
			if (sim) {
				return this.$options.filters.divideNumber(sim.data.phoneNumber, " ");
			} else {
				return false;
			}
		},
		getCardNumber() {
			var parts = this.cardNumber.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{4})+(?!\d))/g, " ");
			return parts.join(",");
		},
		getAmmoTooltip(type) {
			if (this.playerEqip[type]) {
				const ammoCount = this.ammo[this.playerEqip[type].itemId];
				if (ammoCount !== undefined) {
					return `Патроны: ${ammoCount} шт.`;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		itemCount(item) {
			if (item.type === 27) {
				const kg = this.$options.filters.roundNum(item.count / 10, 1);
				return kg + " кг";
			}
			return item.count;
		},
		getBaitImg(itemId) {
			const baitItem = this.$store.getters.getItem(itemId);
			return baitItem.img;
		},
	},
	created() {
		this.isAlive = true;
		document.addEventListener("keyup", this.onKeyUp);
		document.addEventListener("mousemove", this.dragMove);
		document.addEventListener("mouseup", this.handleEndDrag);
	},
	beforeDestroy() {
		this.isAlive = false;
		document.removeEventListener("keyup", this.onKeyUp);
		document.removeEventListener("mousemove", this.dragMove);
		document.removeEventListener("mouseup", this.handleEndDrag);
		var data = { type: this.typeStorage, id: this.storageItems.storageId };
		mp.trigger("cMisc-CallServerEvent", "sInventoryStorageEndUse", JSON.stringify(data));
		storage.setStorageInv({});
		storage.setTypeStorage("none");
	},
};
</script>

<style scoped>
@font-face {
	font-family: "Century Gothic";
	src: url("/fonts/CenturyGothic.ttf");
}
@font-face {
	font-family: "Bookman Old Style";
	src: url("/fonts/bookos.ttf");
}
img {
	max-width: 100%;
	max-height: 100%;
}
::selection {
	background-color: transparent;
}
.count {
	font-family: "Century Gothic";
	color: #fff;
	position: absolute;
	bottom: 0.1vw;
	left: 0.1vw;
}
.baitImg {
	height: 2.5vw;
	width: 2.5vw;
	position: absolute;
	bottom: 0.1vw;
	right: 0.1vw;
}
.m-r {
	margin-right: 0.5vw;
}
.m-b-5 {
	margin-bottom: 0.26vw;
}
.m-b-lg {
	margin-bottom: 0.68vw;
}
.m-b-xlg {
	margin-bottom: 1.67vw;
}
.col-sb {
	display: flex;
	flex-flow: column;
}
.jc-sb {
	justify-content: space-between;
}
.row {
	display: flex;
	align-items: flex-start;
	width: 100%;
}
.dn {
	display: none;
}
.equip {
	display: block;
}
.wrapperInv {
	height: 100vh;
	width: 100%;
	position: relative;
	overflow: hidden;
}
.player-inventory {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
}
.mb {
	margin-bottom: 1vw;
}

.inv-card {
	width: 22.81vw;
	background-color: rgba(0, 41, 76, 0.945);
	margin: 0 1vw;
}
.card {
	border-top-left-radius: 0.26vw;
	border-top-right-radius: 0.26vw;
}
.inv-card .card-body {
	padding: 0.94vw 0.57vw;
}
.card-item .card-body {
	padding: 0;
	display: flex;
	justify-content: space-between;
}
.card-item {
	height: auto;
	background-color: rgba(1, 32, 62, 0.89);
	border: 1px solid rgb(4, 21, 36);
}
.inv-card .card-name {
	text-align: center;
	width: 100%;
	padding: 0.52vw 0;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	background-color: rgb(1, 33, 62);
	border: 1px solid rgb(4, 21, 36);
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
	border-top-left-radius: 0.26vw;
	border-top-right-radius: 0.26vw;
}
.card-item .card-name {
	text-align: center;
	width: 100%;
	padding: 0.52vw 0;
	padding-top: 0.82vw;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	background-color: rgba(1, 31, 62, 0.103);
	font-size: 18px;
	box-shadow: 0px 3px 3px 0px rgb(9, 37, 60);
	border-top-left-radius: 0.26vw;
	border-top-right-radius: 0.26vw;
}
.inv-card .name-text {
	color: #ffffff;
	font-size: 1.15vw;
	color: #ffffff;
	font-family: "Century Gothic";
	font-weight: 700;
}
.card-item .name-text {
	color: #ffffff;
	font-size: 0.94vw;
	color: #ffffff;
	font-family: "Century Gothic";
	font-weight: 700;
}
.inv-card .card-body {
	display: flex;
	flex-wrap: wrap;
	border-bottom: 1px solid rgb(4, 21, 36);
	border-right: 1px solid rgb(4, 21, 36);
	border-left: 1px solid rgb(4, 21, 36);
}
.card-item .card-body {
	display: flex;
	flex-wrap: wrap;
	background-color: rgba(1, 31, 62, 0);
}
.card-body {
	display: flex;
	flex-wrap: wrap;
}

.overItem {
	background-color: RGB(76, 0, 235, 0.5);
}
.notOverItem {
	background-color: rgba(0, 49, 95, 0.596);
}

.inv-card .cell {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(3, 32, 59);
	padding: 0.5vw;
	border: 1px solid #041524;
	transition: 0.1s;
	box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.24);
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
}
.card-item .cell {
	outline: 0.05vw solid rgb(2, 21, 40);
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.17) 0%, rgba(0, 0, 0, 0) 100%);
	opacity: 0.95;
	margin-top: 0.25vw;
}

.cell-1x1 {
	width: 4.17vw;
	height: 4.17vw;
}
.cellStyle {
	width: 4.17vw;
	height: 4.17vw;
}
.cell-2x1 {
	width: calc(4.17vw * 2);
	height: 4.17vw;
}
.cell-2x2 {
	width: calc(4.17vw * 2);
	height: calc(4.17vw * 2);
}
.cell-2x3 {
	width: calc(4.17vw * 2);
	height: calc(4.17vw * 3);
}
.footer-row {
	display: flex;
	justify-content: space-between;
}

/* переключалка куртки и футболки */
.hasSwitch {
	position: relative;
}
.switch {
	position: absolute;
	top: -1px;
	left: -1.3vw;
}
.switch-item {
	color: #fff;
	font-family: "Bookman Old Style";
	padding: 0.45vw 0.16vw;
	font-size: 1vw;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(1, 29, 54, 0.952);
	border: 1px solid #041524;
	transition: 0.1s;
	box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.24);
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
	margin-bottom: 0.2vw;
}
.switch-item:hover,
.switch-item:focus,
.switch-item:active {
	background-color: #1065b3;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
}
.switch-item.active {
	background-color: #1065b3;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
}
/* класс для выделения ячейки дропа */
.dropField {
	background: rgba(85, 60, 201, 0.288);
}
.overlay {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 99;
}
.modal {
	background-color: rgba(1, 29, 54, 0.952);
	min-width: 20vw;
	display: block;
	position: absolute;
	font-family: "Century Gothic";
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
	color: #ffffff;
	padding: 1vw;
	border-radius: 0.3vw;
	box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.24);
}
.modal-header {
	color: #ffffff;
	text-transform: uppercase;
	text-align: center;
	font-size: 0.94vw;
	padding: 0.5vw;
}
.modal-body {
	padding: 0.5vw;
}
.modal-btn {
	color: #ffffff;
	font-size: 0.83vw;
	background: rgb(2, 21, 40);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5vw;
	height: 2vw;
	margin: 0.5vw 0.3vw;
	transition: 0.3s;
}
.modal-btn:hover {
	background: rgba(0, 49, 95, 0.596);
}
.modal-btns {
	justify-content: center;
	margin-bottom: 0.5vw;
}
.modal-input {
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-input input {
	background: rgb(255, 255, 255);
	border: none;
	width: 4vw;
	font-size: 0.83vw;
	padding: 0.2vw 0.5vw;
	font-family: "Century Gothic";
	text-align: center;
	font-weight: bold;
}
.modal-footer {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 1vw;
}
.modal-footer-btn {
	color: #ffffff;
	font-size: 0.83vw;
	background: #1065b3;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5vw;
	height: 2vw;
	transition: 0.3s;
}
.modal-footer-btn:hover {
	background: rgba(0, 49, 95, 0.74);
}
.row {
	display: flex;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
.item-tooltip {
	color: #ffffff;
	font-size: 0.93vw;
	background: rgba(1, 29, 54, 0.952);
	position: absolute;
	padding: 0.5vw 0.7vw;
	font-weight: bold;
	font-family: "Century Gothic";
	border-radius: 0.2vw;
	z-index: 98;
	box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.24);

	top: 18vw;
	right: 31vw;
}

.previewItem {
	outline: 0.05vw solid rgb(2, 21, 40);
	background-color: rgba(0, 49, 95, 0.596);
	opacity: 0.95;
	position: absolute;
	z-index: 67;
}
.previewItem img {
	max-width: unset;
	max-height: unset;
}

.itemsShow div img {
	display: block;
}

.itemsShow div {
	position: absolute;
	z-index: 66;
	//box-shadow: inset 0 0 0.05vw 0.05vw #041524;
	border-bottom: 0.05vw solid #041524;
	background: linear-gradient(#01213e, #01192f);
}

.context-menu {
	top: 0;
	left: 0;
	margin: 0;
	padding: 0;
	list-style: none;
	position: absolute;
	z-index: 999;
	color: rgb(255, 255, 255);
	font-family: "Century Gothic";
	font-size: 15px;
	font-weight: 400;
	letter-spacing: 0.73px;
	border-radius: 10px;
	box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.192);
}

.context-menu.active {
	background-color: rgb(2, 40, 74);
}

.context-menu li {
	display: flex;
	cursor: pointer;
	padding: 10px 25px;
	align-items: center;
	border-bottom: 1px solid rgb(1, 33, 62);
}
.context-menu li:first-child {
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
}
.context-menu li:last-child {
	border-bottom-right-radius: 10px;
	border-bottom-left-radius: 10px;
	border-bottom: none;
}
.context-menu li:hover {
	background-color: #01213e;
}
.dragging {
	z-index: 0 !important;
}
.head-slots {
	display: flex;
}
</style>
