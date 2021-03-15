<template>
	<div class="wrapperInv" @click="hideContextMenu()">
		<ul id="useItem" class="context-menu" ref="contextRef">
			<li @click="takeItem(systemData.itemEvent)" v-if="systemData.contextTake">Изъять</li>
			<li @click="viewDoc('passport')" v-if="systemData.contextViewPassport">Посмотреть паспорт</li>
			<li v-for="license in playerLicense" @click="viewDoc(license.menu)" v-if="systemData.contextViewLicense">{{license.btnText}}</li>
		</ul>
		<!--Предметы персонажа  -->
		<div class="itemsShow">
			<div
				v-for="(i, index) in systemData.inventoryItems"
				v-tooltip="getTitle(i.title, i.data)"
				:key="index"
				:style="'top:' + i.params.top + 'px;left:' + i.params.left + 'px;'"
				:id="'userItem' + i.id"
			>
				<img :src="'img/player/inv/' + i.img" :style="'width:'+(i.cell*4.17 + (i.cell*0.25-0.25))+'vw;height:'+(i.row*4.17 + (i.row*0.25-0.25))+'vw;'"  @contextmenu.prevent="showUseItem(i)" />
				<p class="count" v-if="i.count > 1">{{ i.count }}</p>
			</div>
		</div>
		<div class="player-inventory">
			<div class="col">
				<div class="card inv-card">
					<div class="card-name">
						<span class="name-text">Инвентарь {{playerData.name}}</span>
					</div>
					<div class="card-body">
						<div class="row jc-sb m-b-lg">
							<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('glass')"></div>
							<div class="cell m-b-5 cell-2x1 notOverItem"><img :src="isOwned('hats')"></div>
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
								<img v-if="showJaket === 'shirt'" :src="isOwned('undershirt')" alt="" />
								<img v-if="showJaket === 'underwear'" :src="isOwned('jacket')" alt="" />
								<img v-if="showJaket === 'armor'" :src="isOwned('armor')" alt="" />
							</div>
							<div class="cell-grp">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('backpack')" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/bracer.png" alt="" /></div>
							</div>
						</div>
						<div class="row jc-sb">
							<div class="cell-grp">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/glow.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img :src="isOwned('phone')"alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem">
									<img :src="playerData.factionId ? 'img/player/item/radio.png' : 'img/player/freeSlot/radio.png'" alt="" />
								</div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/freeSlot/jailBracer.png" alt="" /></div>
							</div>
							<div class="col-grp">
								<div class="cell m-b-5 cell-2x3 m-b-lg notOverItem"><img :src="isOwned('pants')"></div>
								<div class="cell m-b-5 cell-2x1 notOverItem"><img :src="isOwned('feet')"></div>
							</div>
							<div class="cell-grp m-b-xlg">
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/ownedSlot/money.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem" @contextmenu.prevent="showUseItem('passport')"><img src="img/player/ownedSlot/passport.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem" @contextmenu.prevent="showUseItem('license')"><img src="img/player/ownedSlot/license.png" alt="" /></div>
								<div class="cell m-b-5 cell-1x1 notOverItem"><img src="img/player/ownedSlot/card.png" alt="" /></div>
							</div>
						</div>
						<div class="row footer-row">
							<div class="cell cell-1x1 notOverItem" @contextmenu.prevent="showUseGun('stungun')" v-tooltip="gunTooltip('stungun')">
								<img :src="isOwnedGun('stungun')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" @contextmenu.prevent="showUseGun('pistol')" v-tooltip="gunTooltip('pistol')">
								<img :src="isOwnedGun('pistol')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" @contextmenu.prevent="showUseGun('rifle')" v-tooltip="gunTooltip('rifle')">
								<img :src="isOwnedGun('rifle')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" @contextmenu.prevent="showUseGun('shotgun')" v-tooltip="gunTooltip('shotgun')">
								<img :src="isOwnedGun('shotgun')" alt="" />
							</div>
							<div class="cell cell-1x1 notOverItem" @contextmenu.prevent="showUseGun('melee')" v-tooltip="gunTooltip('melee')">
								<img :src="isOwnedGun('melee')" alt="" />
							</div>
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
								:id="'undershirt' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.undershirt.height * playerEqip.undershirt.width)"
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
								:id="'jacket' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.jacket.height * playerEqip.jacket.width)"
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
								:id="'armor' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.armor.width * playerEqip.armor.height)"
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
								:id="'pants' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.pants.width * playerEqip.pants.height)"
							></div>
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
								:id="'backpack' + index"
								:key="index"
								v-for="(i, index) in Math.ceil(playerEqip.backpack.width * playerEqip.backpack.height)"
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
			systemData: {
				inventoryItems: [],
				previewPos: { x: 0, y: 0 },
				contextMenuWidth: null,
				contextMenuHeight: null,
				itemEvent: {},
				contextTake: false,
				contextViewPassport: false,
				contextViewLicense: false,
			},
			license: {
				weapon: {btnText: "Посмотреть лицензию на оружие", menu:"weaponLicense"},
				driver:  {btnText:"Посмотреть водительские права", menu:"driverLicense"},
				med:  {btnText:"Посмотреть медицинскиую лицензию", menu:"medLicense"},
			},
		};
	},
	computed: {
		...mapGetters({
			playerEqip: "getSearchPlayerEquip",
			playerItems: "getSearchPlayerItem",
			playerData: "getSearchPlayerData",
		}),
		playerLicense: function () {
	        let license = this.$store.getters.getPlayerLicense;
			license.forEach(lic => {
				lic.btnText = this.license[lic.type].btnText;
				lic.menu = this.license[lic.type].menu;
			})
			// удалить дубликаты лицензий(так как лицензий с типом drive может быть несколько)
			license = license.filter((thing, index, self) =>
			  index === self.findIndex((t) => (
			    t.type === thing.type
			  ))
			)
            return license;
        },
	},
	watch: {
		playerItems: {
			handler() {
				setTimeout(() => { this.loadItems(); }, 50);
			},
			deep: true,
		},
	},
	mounted() {
		setTimeout(() => {
			this.loadItems();
			// this.loadStorageItems();
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
		gunTooltip: function(type) {
			const gun = this.playerEqip[type];
			if (gun) {
				return gun.title + " - " + gun.data.serialNumber;
			} else {
				return false;
			}
		},
		showUseGun: function(type) {
			const item = this.playerEqip[type];
			if (!item) return;
			this.showUseItem(item, type);
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
		showUseItem(item, weaponOwnedType) {
			this.systemData.contextTake = true;
			this.systemData.contextViewPassport = false;
			this.systemData.contextViewLicense = false;
			this.systemData.itemEvent = item;
			this.systemData.weaponOwnedType = weaponOwnedType;

			if (item === "passport") {
				this.systemData.contextViewPassport = true;
				this.systemData.contextTake = false;
			}
			if (item === "license") {
				this.systemData.contextTake = false;
				if (this.playerLicense.length) {
					this.systemData.contextViewLicense = true;
				} else {
					return storage.addNotification({text: "У этого человека нет лицензий",theme: "error"});
				}
			}

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
			this.systemData.contextTake = false;
			this.systemData.itemEvent = false;
			this.systemData.weaponOwnedType = false;
			this.systemData.contextViewPassport = false;
			this.systemData.contextViewLicense = false;
			document.getElementById("useItem").classList.remove("active");
		},
		loadItems() {
			// обнуляем данные
			this.systemData.inventoryItems = [];
			for (let key in this.playerEqip) {
				if (this.playerEqip[key].height > 0 && this.playerEqip[key].width > 0) {
					for (let i = 0; i < this.playerItems.length; i++) {
						if (this.playerItems[i].parent === this.playerEqip[key].guid) {
							const indexObj = document.getElementById(key + this.playerItems[i].slot);
							this.playerItems[i].params = {
								top: indexObj.getBoundingClientRect().top,
								left: indexObj.getBoundingClientRect().left,
							};
							/* После того как все данные подготовленны загружаем в массив для отображения.*/
							this.systemData.inventoryItems.push(this.playerItems[i]);
						}
					}
				}
			}
		},

		dragMove(e) {
			this.systemData.previewPos = { x: e.clientX, y: e.clientY };
		},
		getTitle(title, data) {
			if (data.serialNumber) {
				title += " - " + data.serialNumber;
			}
			return title;
		},
		takeItem(item) {
			const sendData = {
				itemGuid: item.guid,
				playerGuid: this.playerData.guid,
				ownedType: this.systemData.weaponOwnedType
			}
			mp.trigger("cMisc-CallServerEvent", 'sPoliceSearchInvTake', JSON.stringify(sendData));
			this.hideContextMenu();
		},
		exit() {
			mp.trigger("cSetPage", 'none');
		},
		onKeyUp(e) {
			if (e.keyCode === 27){
				mp.trigger("cMisc-CallServerEvent", "sPoliceSearchInvStop", this.playerData.guid)
				this.exit();
			}
		},
		viewDoc(type) {
			this.hideContextMenu();
			mp.trigger("cMisc-CallServerEvent", "sPoliceSearchDocView", this.playerData.guid, type);
			this.exit();
		},
	},
	created() {
		document.addEventListener("mousemove", this.dragMove);
		document.addEventListener("keyup", this.onKeyUp);
	},
	beforeDestroy() {
		document.removeEventListener("mousemove", this.dragMove);
		document.removeEventListener("keyup", this.onKeyUp);
	},
};
</script>

<style scoped>
.previewItem{
	position: absolute;
	z-index: 3;
}

.itemsShow{

}

.itemsShow div img{
	display:block;
}

.itemsShow div{
	position: absolute;
	z-index: 66;
	box-shadow: inset 0 0 0.05vw 0.05vw #041524;
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
  border-bottom: none
}
.context-menu li:hover {
  background-color: #01213e;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
*{
    box-sizing: border-box;
	-webkit-touch-callout: none;
    -webkit-user-select: none; 
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
	user-select: none;
}
@font-face{
    font-family: "Century Gothic";
    src: url('/fonts/CenturyGothic.ttf')
}
@font-face{
    font-family: "Bookman Old Style";
    src: url('/fonts/bookos.ttf')
}
img{
    max-width: 100%;
    max-height: 100%;
}
.count{
	font-family: "Century Gothic";
	color: #fff;
	position: absolute;
	bottom: 0.2vw;
	left: 0.2vw;
}
.m-r{
	margin-right: 0.5vw;
}
.m-b-5{
	margin-bottom: 0.26vw;
}
.m-b-lg{
    margin-bottom:  0.68vw;
}
.m-b-xlg{
	margin-bottom:  1.67vw;
}
.col-sb{
    display: flex;
    flex-flow: column;
}
.jc-sb{
    justify-content: space-between;
}
.row{
    display: flex;
	align-items: flex-start;
	width: 100%;
}
.dn{
    display: none;
}
.equip{
	display: block;
}
.wrapperInv{
    height: 100vh;
    width: 100%;
    overflow: hidden;
}
.player-inventory{
    display: flex;   
    justify-content: center;
	align-items: flex-start;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%)      
}
.mb{
    margin-bottom: 1vw;
}

.inv-card{
    width: 22.81vw;
	background-color: rgba(0, 41, 76, 0.945);
	margin: 0 1vw;
}
.card{
	border-top-left-radius: 0.26vw;
	border-top-right-radius: 0.26vw;
}
.inv-card .card-body{
	padding: 0.94vw 0.57vw;
}
.card-item .card-body{
	padding: 0;
	display: flex;
	justify-content: space-between;
}
.card-item{
	height: auto;
	background-color: rgba(1, 32, 62, 0.89);
	border: 1px solid rgb(4, 21, 36);
}
.inv-card .card-name{
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
.card-item .card-name{
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
.inv-card .name-text{
    color: #ffffff;
    font-size: 1.15vw;
	color: #ffffff;
	font-family: "Century Gothic";
	font-weight: 700;
}
.card-item .name-text{
	color: #ffffff;
    font-size: 0.94vw;
	color: #ffffff;
	font-family: "Century Gothic";
	font-weight: 700;
}
.inv-card .card-body{
    display: flex;
    flex-wrap: wrap;
	border-bottom: 1px solid rgb(4, 21, 36);
	border-right: 1px solid rgb(4, 21, 36);
	border-left: 1px solid rgb(4, 21, 36);
}
.card-item .card-body{
	display: flex;
    flex-wrap: wrap;
	background-color: rgba(1, 31, 62, 0);
}
.card-body{
    display: flex;
    flex-wrap: wrap;
}


.overItem{
	background-color: RGB(76,0,235,0.5);
}
.notOverItem{
	background-color: rgba(0, 49, 95, 0.596);
}

.inv-card .cell{
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
.card-item .cell{
	outline: 0.05vw solid rgb(2, 21, 40);
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.17) 0%, rgba(0, 0, 0, 0) 100%);
	opacity: 0.95;
	margin-top: 0.25vw;
}

.cell-1x1{
    width: 4.17vw;
    height: 4.17vw;
}
.cellStyle{
    width: 4.17vw;
    height: 4.17vw;
}
.cell-2x1{
    width: calc(4.17vw * 2);
    height: 4.17vw;
}
.cell-2x2{
    width: calc(4.17vw * 2);
    height: calc(4.17vw * 2);
}
.cell-2x3{
    width: calc(4.17vw * 2);
    height: calc(4.17vw * 3);
}
.footer-row{
    display: flex;
	justify-content: space-between;
}

/* переключалка куртки и футболки */
.hasSwitch{
    position: relative;
}
.switch{
    position: absolute;
    top: -1px;
    left: -1.3vw;
}
.switch-item{
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
.switch-item:hover,.switch-item:focus,.switch-item:active {
    background-color: #1065b3;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
}
.switch-item.active {
    background-color: #1065b3;
	background-image: linear-gradient(to top, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0) 100%);
}
/* класс для выделения ячейки дропа */
.dropField{
    background: rgba(85, 60, 201, 0.288)
}
.overlay{
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 99;
}
.modal{
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
.modal-header{
	color: #ffffff;
	text-transform: uppercase;
	text-align: center;
	font-size: 0.94vw;
	padding: 0.5vw;
}
.modal-body{
	padding: 0.5vw;
}
.modal-btn{
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
.modal-btn:hover{
	background: rgba(0, 49, 95, 0.596);
}
.modal-btns{
	justify-content: center;
	margin-bottom: 0.5vw;
}
.modal-input{
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-input input{
	background:rgb(255, 255, 255);
	border: none;
	width: 4vw;
	font-size: 0.83vw;
	padding: 0.2vw 0.5vw;
	font-family: "Century Gothic";
	text-align: center;
	font-weight: bold;
}
.modal-footer{
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 1vw;
}
.modal-footer-btn{
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
.modal-footer-btn:hover{
	background: rgba(0, 49, 95, 0.74)
}
.row{
	display: flex;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.item-tooltip{
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

</style>