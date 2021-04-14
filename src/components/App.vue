/* Главный файл отвечающий за отображение тех или инных меню и игровых
интерфейсов Идея заключается в следующем, если значение page совпадает
отображается модуль меню. Удобно при тестировании не обязательно запускать GTA ,
ставим тестируемуму модулю значение Page='namePage' и запускаем npm run serve
(должна открыться страница в браузере, но не всегда http://localhost:8080/) */

<template>
  <div id="cef" ref="cef">
		<div class="select">
			<select v-model="selected">
				<option v-for="(page, i) in pages" :key="i" :value="page">
					{{ page }}
				</option>
			</select>
		</div>
    <cAudio></cAudio>
    <pHUD v-if="page === 'hud'"></pHUD>
    <pTestHUD v-if="showTestHud"></pTestHUD>
    <pProgress v-if="showProgressBar"></pProgress>
    <pAdminConsole v-if="adminConsole"></pAdminConsole>
    <pTestMenu v-if="page === 'testMenu'"></pTestMenu>
    <pConfirmationMenu v-if="dialog.title"></pConfirmationMenu>
    <pPassport v-if="page === 'passport'"></pPassport>
    <pInteractionMenu v-if="page === 'interactionMenu'"></pInteractionMenu>
    <pFactionSettingsAdmin
      v-if="page === 'factionSettingsAdmin'"
    ></pFactionSettingsAdmin>
    <pLogin v-if="page === 'login'"></pLogin>
    <pRegistration v-if="page === 'registration'"></pRegistration>
    <pRecovery v-if="page === 'recovery'"></pRecovery>
    <pCharactersList v-if="page === 'charsList'"></pCharactersList>
    <pSpawn v-if="page === 'charSpawn'"></pSpawn>
    <pCreateCharacter v-if="page === 'charsCreate'"></pCreateCharacter>
    <pInventory ref="pInventory" v-if="page === 'playerInventory'"></pInventory>
    <pPhone v-if="page === 'phone'"></pPhone>
    <pTablet v-if="page === 'factionTablet'"></pTablet>
    <pStorage v-if="page === 'storageMenu'"></pStorage>
    <pBusinessMenu v-if="page === 'bussnesMenu'"></pBusinessMenu>
    <pClothShop v-if="page === 'clothShop'"></pClothShop>
    <pVehicleShop v-if="page === 'vehShop'"></pVehicleShop>
    <pGasStationFilling
      v-if="page === 'gasStationFilling'"
    ></pGasStationFilling>
    <pStore v-if="page === 'storeMenu'"></pStore>
    <pTattoSalone v-if="page === 'tattoSalone'"></pTattoSalone>
    <pBarberShop v-if="page === 'barberShop'"></pBarberShop>
    <pWeaponStore v-if="page === 'weaponStore'"></pWeaponStore>
    <pATMmenu v-if="page === 'ATMmenu'"></pATMmenu>
    <pHouse v-if="page === 'houseMenu'"></pHouse>
    <pConsole v-if="page === 'showConsole'" ref="console"></pConsole>
    <pTruckerMenu v-if="page === 'truckerMenu'"></pTruckerMenu>
    <pTruckerTablet v-if="page === 'truckerTablet'"></pTruckerTablet>
    <pTaxiMenu v-if="page === 'taxiMenu'"></pTaxiMenu>
    <pTacoMenu v-if="page === 'tacoMenu'"></pTacoMenu>
    <pTacoJobMenu v-if="page === 'tacoJobMenu'"></pTacoJobMenu>
    <pTaxiTablet v-if="page === 'taxiTablet'"></pTaxiTablet>
    <pBusMenu v-if="page === 'busMenu'"></pBusMenu>
    <pButcherMenu v-if="page === 'butcherMenu'"></pButcherMenu>
    <pPrisonMenu v-if="page === 'prisonMenu'"></pPrisonMenu>
    <pInkassMenu v-if="page === 'inkassMenu'"></pInkassMenu>
    <pInkassTablet v-if="page === 'inkassTablet'"></pInkassTablet>
    <pFarmMenu v-if="page === 'farmMenu'"></pFarmMenu>
    <pDrugFarm v-if="page === 'drugFarm'"></pDrugFarm>
    <pBizWarMenu v-if="page === 'bizWarMenu'"></pBizWarMenu>
    <pOnBoardComputer v-if="page === 'onBoardComputer'"></pOnBoardComputer>
    <pFinesPayMenu v-if="page === 'finesPayMenu'"></pFinesPayMenu>
    <pPrisonersList v-if="page === 'prisonersList'"></pPrisonersList>
    <pDocsFbi v-if="page === 'docsFbi'"></pDocsFbi>
    <pDocsLsmc v-if="page === 'docsLsmc'"></pDocsLsmc>
    <pDocsGov v-if="page === 'docsGov'"></pDocsGov>
    <pDocsNg v-if="page === 'docsNg'"></pDocsNg>
    <pDocsBcsd v-if="page === 'docsBcsd'"></pDocsBcsd>
    <pDocsLspd v-if="page === 'docsLspd'"></pDocsLspd>
    <pDocsLsn v-if="page === 'docsLsn'"></pDocsLsn>
    <pInventorySearch v-if="page === 'inventorySearch'"></pInventorySearch>
    <pMainMenu v-if="page === 'mainMenu'"></pMainMenu>
    <pElectricJob v-if="page === 'electricJob'"></pElectricJob>
    <pDriverLicense v-if="page === 'driverLicense'"></pDriverLicense>
    <pMedLicense v-if="page === 'medLicense'"></pMedLicense>
    <pWeaponLicense v-if="page === 'weaponLicense'"></pWeaponLicense>
    <pFishLicense v-if="page === 'fishLicense'"></pFishLicense>
    <pGoverTablet v-if="page === 'goverTablet'"></pGoverTablet>
    <pFleeca v-if="page === 'fleeca'"></pFleeca>
    <pSafe v-if="page === 'safe'"></pSafe>
    <pBahamaMamas v-if="page === 'Bahama Mamas'"></pBahamaMamas>
    <pGalaxy v-if="page === 'Galaxy'"></pGalaxy>
    <pSplitsideswest v-if="page === 'Split Sides West'"></pSplitsideswest>
    <pVanillaUnicorn v-if="page === 'Vanilla Unicorn'"></pVanillaUnicorn>
    <pTequila v-if="page === 'Tequila'"></pTequila>
    <pDrivingSchool v-if="page === 'drivingSchool'"></pDrivingSchool>
    <pHotel v-if="page === 'hotel'"></pHotel>
    <pLscustoms v-if="page === 'lscustoms'"></pLscustoms>
    <pTransportEvacuation v-if="page === 'transportEvacuation'"></pTransportEvacuation>
    <pSumInput v-if="page === 'sumInput'"></pSumInput>
    <pSellToState v-if="page === 'sellToState'"></pSellToState>
    <pUniformConstructor
      v-if="page === 'uniformConstructor'"
    ></pUniformConstructor>
    <pMasksStore v-if="page === 'masksStore'"></pMasksStore>
    <pNotification></pNotification>
    <pFishingInfo v-if="page === 'fishingInfo'"></pFishingInfo>
    <pFishingStart v-if="page === 'fishingStart'"></pFishingStart>
    <pFishingGame v-if="page === 'fishingGame'"></pFishingGame>
    <pFishMarket v-if="page === 'fishMarket'"></pFishMarket>
    <pNpcDialog v-if="page === 'npcDialog'"></pNpcDialog>
    <pBoatRent v-if="page === 'boatRent'"></pBoatRent>
    <pCarRent v-if="page === 'carRent'"></pCarRent>
    <pFortisHarbor v-if="page === 'fortisHarbor'"></pFortisHarbor>
    <pVehiclePenalty v-if="page === 'vehiclePenalty'"></pVehiclePenalty>
    <pQuestMenu v-if="page === 'questMenu'"></pQuestMenu>
    <pQuiz v-if="page === 'quiz'"></pQuiz>
    <pUniformSelect v-if="page === 'uniformSelect'"></pUniformSelect>
    <pVoting v-if="page === 'voting'"></pVoting>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/* 
========Загрузка модулей страниц и интерфесов==========
После загрузки прописать ниже в  components:{}
*/

/* base - базовые компоненты которым сложно давать класификацию */
import cAudio from "./Audio.vue";
import pNotification from "./misc/notification.vue";
import pProgress from "./misc/progress.vue";
import pAdminConsole from "./misc/adminConsole.vue";
import pConsole from "./misc/console.vue";
import pInteractionMenu from "./player/interactionMenu.vue";
import pConfirmationMenu from "./misc/confirmationDialog.vue";
import pPassport from "./player/id-card.vue";
import pMainMenu from "./menu/main-menu.vue";
/*ADMIN*/
import pFactionSettingsAdmin from "./admin/settingFaction.vue";
/* account */
import pLogin from "./account/login.vue";
import pRegistration from "./account/registration.vue";
import pCharactersList from "./account/selectCharacter.vue";
import pSpawn from "./account/spawn.vue";
import pRecovery from "./account/recovery.vue";
import pCreateCharacter from "./account/createCharacter.vue";
/* player */
import pTestHUD from "./menu/testHud.vue";
import pHUD from "./player/hud.vue";
import pATMmenu from "./player/ATM.vue";
import pInventory from "./player/inventory.vue";
import pPhone from "./player/phone.vue";
import pFleeca from "./player/fleeca.vue";
import pSafe from "./player/safe.vue";
import pTransportEvacuation from "./player/transport-evacuation.vue";
/* faction */
import pTablet from "./factions/tablet.vue";
import pStorage from "./factions/storage.vue";
import pBizWarMenu from "./factions/bizWarMenu.vue";
import pOnBoardComputer from "./factions/onBoardComputer.vue";
import pUniformConstructor from "./factions/uniformConstructor.vue";
/* bissnes */
import pBusinessMenu from "./business/bizMenu.vue";
import pClothShop from "./business/clothShop.vue";
import pVehicleShop from "./business/vehShop.vue";
import pGasStationFilling from "./business/gasStation.vue";
import pStore from "./business/store.vue";
import pTattoSalone from "./business/tatoo.vue";
import pBarberShop from "./business/barber.vue";
import pBahamaMamas from "./business/bahama-mamas.vue";
import pGalaxy from "./business/galaxy.vue";
import pSplitsideswest from "./business/splitsideswest.vue";
import pVanillaUnicorn from "./business/vanilla-unicorn.vue";
import pTequila from "./business/tequilala.vue";
import pLscustoms from "./business/lscustoms.vue";
import pWeaponStore from "./business/weapon-store.vue";
/* work */
import pElectricJob from "./jobs/electricMenu.vue";
/* house */
import pHouse from "./player/house.vue";
/* taxi */
import pTaxiMenu from "./jobs/taxiMenu.vue";
import pTacoMenu from "./jobs/tacoMenu.vue";
import pTacoJobMenu from "./jobs/tacoJobMenu.vue";
import pTaxiTablet from "./jobs/taxiTablet.vue";
/*trucker*/
import pTruckerMenu from "./jobs/truckerMenu.vue";
import pTruckerTablet from "./jobs/truckerTablet.vue";
/* bus */
import pBusMenu from "./jobs/busMenu.vue";
/* butcher */
import pButcherMenu from "./jobs/butcher-menu.vue";
/* prison */
import pPrisonMenu from "./jobs/prison-menu.vue";
/* cash collector work */
import pInkassMenu from "./jobs/inkass-menu.vue";
import pInkassTablet from "./jobs/inkass-tablet.vue";
/* farm */
import pFarmMenu from "./jobs/farmMenu.vue";
/* drug farm*/
import pDrugFarm from "./menu/drugFarm.vue";
/* оплата штрафов */
import pFinesPayMenu from "./menu/finesPayMenu.vue";
/*отель*/
import pHotel from "./menu/hotel.vue";
/* список заключенных в тюрьме */
import pPrisonersList from "./factions/prisonersList.vue";
/* удостоверения гос фракций*/
import pDocsFbi from "./factions/docs/docs-fbi.vue";
import pDocsLsmc from "./factions/docs/docs-lsmc.vue";
import pDocsGov from "./factions/docs/docs-gov.vue";
import pDocsNg from "./factions/docs/docs-ng.vue";
import pDocsBcsd from "./factions/docs/docs-bcsd.vue";
import pDocsLspd from "./factions/docs/docs-lspd.vue";
import pDocsLsn from "./factions/docs/docs-lsn.vue";
import pInventorySearch from "./player/inventorySearch.vue";
/*лицензии*/
import pDriverLicense from "./player/licenses/driver-license.vue";
import pMedLicense from "./player/licenses/med-license.vue";
import pWeaponLicense from "./player/licenses/weapon-license.vue";
import pFishLicense from "./player/licenses/fish-license.vue";
/*планшет говермента*/
import pGoverTablet from "./factions/gover-tablet.vue";
/* автошкола */
import pDrivingSchool from "./player/driving-school.vue";
/*окно для ввода цены продажи авто/биза/дома*/
import pSumInput from "./menu/sumInput.vue";
/*меню продажи бизнесов и машин по госу*/
import pSellToState from "./menu/sell-to-state.vue";
/*магазин масок*/
import pMasksStore from "./business/masks-store.vue";
/*рыбалка*/
import pFishingInfo from "./jobs/fishingInfo.vue";
import pFishingStart from "./jobs/fishingStart.vue";
import pFishingGame from "./jobs/fishingGame.vue";
import pFishMarket from "./menu/fish-market.vue";
/*меню диалога с npc*/
import pNpcDialog from "./player/NpcDialog.vue";
/*аренда лодок*/
import pBoatRent from "./player/boatRent.vue";
/*лодочные места*/
import pFortisHarbor from "./menu/fortis-harbor.vue";
/*меню штрафстоянки*/
import pVehiclePenalty from "./menu/vehiclePenalty.vue";
/*меню квестов*/
import pQuestMenu from "./menu/questMenu.vue";
/*меню квестов*/
import pCarRent from "./player/carRent.vue";

import pQuiz from "./menu/quiz.vue";
import pVoting from "./menu/voting.vue";

export default {
  name: "cef",
  data() {
    return {
			selected: '',
			pages: [
				// 'passport',
        'hud',
				'interactionMenu',
				'login',
				'registration',
				'recovery',
				'charsList',
				'charSpawn',
				'charsCreate',
				'playerInventory',
				'phone',
				'factionTablet',
				'storageMenu',
				'bussnesMenu',
				'clothShop',
				'vehShop',
				'gasStationFilling',
				'storeMenu',
				'tattoSalone',
				'barberShop',
				'weaponStore',
				'ATMmenu',
				'houseMenu',
				'showConsole',
				'truckerMenu',
				'truckerTablet',
				'taxiMenu',
				'tacoMenu',
				'tacoJobMenu',
				'taxiTablet',
				'busMenu',
				'butcherMenu',
				'prisonMenu',
				'inkassMenu',
				'inkassTablet',
				'farmMenu',
				'drugFarm',
				'bizWarMenu',
				'onBoardComputer',
				'finesPayMenu',
				'prisonersList',
				'docsFbi',
				'docsLsmc',
				'docsGov',
				'docsNg',
				'docsBcsd',
				'docsLspd',
				'docsLsn',
				'inventorySearch',
				'mainMenu',
				'electricJob',
				'driverLicense',
				'medLicense',
				'weaponLicense',
				'fishLicense',
				'goverTablet',
				'fleeca',
				'safe',
				'Bahama Mamas',
				'Galaxy',
				'Split Sides West',
				'Vanilla Unicorn',
				'Tequila',
				'drivingSchool',
				'hotel',
				'lscustoms',
				'transportEvacuation',
				'sumInput',
				'sellToState',
				'uniformConstructor',
				'masksStore',
				'fishingInfo',
				'fishingStart',
				'fishingGame',
				'fishMarket',
				'npcDialog',
				'boatRent',
				'carRent',
				'fortisHarbor',
				'vehiclePenalty',
				'questMenu',
				'quiz',
				'uniformSelect',
				'voting'
			]
		};
  },
  computed: {
    ...mapGetters({
      dialog: "getDialog",
      page: "page",
      hud: "hud",
      showProgressBar: "getProgress",
      showTestHud: "getShowTestHud",
			adminConsole: "getAdminConsoleState",
		}),
	},
	watch: {
		selected(){
			storage.setPage(this.selected)
		}
	},
  methods: {
	
    updateTime() {
      // const serverTime = +new Date() + this.timeOffset;
      var cd = new Date();
      cd.setUTCHours(cd.getUTCHours() + 3);
      var forSend = {
        time: {
          hour: this.zeroPadding(cd.getUTCHours(), 2),
          mins: this.zeroPadding(cd.getUTCMinutes(), 2),
        },
        weekday: cd.getDay(),
        date: {
          day: this.zeroPadding(cd.getUTCDate(), 2),
          month: this.zeroPadding(cd.getUTCMonth() + 1, 2),
          year: this.zeroPadding(cd.getUTCFullYear(), 4),
        },
      };

      storage.setDate(forSend);
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },

  mounted() {
    //setInterval(this.updateTime, 1000);
    setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  components: {
    cAudio,
    pTestHUD,
    pHUD,
    pProgress,
    pAdminConsole,
    pNotification,
    pConsole,
    pInteractionMenu,
    pConfirmationMenu,
    pPassport,
    pFactionSettingsAdmin,
    pLogin,
    pRegistration,
    pRecovery,
    pCharactersList,
    pSpawn,
    pCreateCharacter,
    pATMmenu,
    pTablet,
    pStorage,
    pInventory,
    pPhone,
    pBusinessMenu,
    pClothShop,
    pVehicleShop,
    pGasStationFilling,
    pStore,
    pTattoSalone,
    pBarberShop,
    pHouse,
    pTaxiMenu,
    pTacoMenu,
    pTacoJobMenu,
    pTaxiTablet,
    pTruckerMenu,
    pTruckerTablet,
    pBusMenu,
    pButcherMenu,
    pPrisonMenu,
    pInkassMenu,
    pInkassTablet,
    pFarmMenu,
    pDrugFarm,
    pBizWarMenu,
    pOnBoardComputer,
    pFinesPayMenu,
    pPrisonersList,
    pDocsFbi,
    pDocsLsmc,
    pDocsGov,
    pDocsNg,
    pDocsBcsd,
    pDocsLspd,
    pDocsLsn,
    pInventorySearch,
    pMainMenu,
    pElectricJob,
    pDriverLicense,
    pMedLicense,
    pWeaponLicense,
    pFishLicense,
    pGoverTablet,
    pFleeca,
    pSafe,
    pBahamaMamas,
    pGalaxy,
    pSplitsideswest,
    pVanillaUnicorn,
    pTequila,
    pWeaponStore,
    pDrivingSchool,
    pHotel,
    pLscustoms,
    pTransportEvacuation,
    pSumInput,
    pSellToState,
    pUniformConstructor,
    pMasksStore,
    pFishingInfo,
    pFishingStart,
    pFishingGame,
    pFishMarket,
    pNpcDialog,
    pBoatRent,
    pFortisHarbor,
    pVehiclePenalty,
    pQuestMenu,
    pCarRent,
    pQuiz,
    pVoting,
  },
};
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
* {
  padding: 0;
  margin: 0;
  outline: 0;
  text-decoration: none;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
li {
  list-style: none;
}
html,
body {
  height: 100%;
  width: 100%;
}
.wrapper {
  width: 100%;
  height: 100vh;
  background: url(https://wallpaperscave.ru/images/original/18/10-13/games-grand-theft-auto-v-91590.jpg) no-repeat;
  background-size: cover;
}
button,a{
  cursor: pointer;
}
.button {
  background-color: #009900;
  border-radius: 4px;
  height: 30px;
  font-size: 25px;
  line-height: 25px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
@font-face {
  font-family: "Century Gothic";
  src: url("/fonts/CenturyGothic.ttf");
}
@font-face {
  font-family: "Century Gothic Bold";
  src: url("/fonts/CenturyGothic-bold.ttf");
}
@font-face {
  font-family: "10221";
  src: url("/fonts/10221.ttf");
}

@font-face {
  font-family: "LCDnova";
  src: url("/fonts/LCDnova.ttf");
}
@font-face {
  font-family: "Bahnschrift";
  src: url("/fonts/bahnschrift.ttf");
}

@font-face {
  font-family: "Myriad Pro";
  src: url("/fonts/MyriadPro-Regular.ttf");
}
@font-face {
  font-family: "Gotham Pro";
  src: url("/fonts/GothamPro.ttf");
}
@font-face {
  font-family: "NewYorkNineteenSixty";
  src: url("/fonts/NEWYORKSIXTY.ttf");
}
@font-face {
  font-family: "ParisNineteenSixty";
  src: url("/fonts/PARISSIXTY.ttf");
}
@font-face {
  font-family: "LondonNineteenSixty";
  src: url("/fonts/LONDONSIXTY.ttf");
}
@font-face {
  font-family: "arialbd";
  src: url("/fonts/arialbd.ttf");
}
@font-face {
  font-family: "BookAntiqua";
  src: url("/fonts/BOOKOS.TTF");
}

.vue-slider-rail {
  background-color: #09244b !important;
  width: 100%;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.42);
}
.vue-slider-dot-handle {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #1765c7 !important;
}
.vue-slider-process {
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.42);
  background-color: #1765c7 !important;
}
.vue-slider {
  padding: 0 !important;
}
.gas-station .vue-slider-rail {
  background-color: #ffffff !important;
  width: 100%;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.42);
}
.gas-station .vue-slider-dot-handle::after {
  content: "";
  display: block;
  width: 0.68vw;
  height: 0.68vw;
  border-radius: 50%;
  background-color: #0079fe;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.gas-station .vue-slider-dot-handle {
  width: 1.56vw;
  height: 1.56vw;
  position: relative;
  background-color: #fff !important;
}
.gas-station .vue-slider-process {
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.42);
  background-color: #0079fe !important;
}
.vc-chrome {
  width: auto !important;
  background: transparent !important;
  background-color: transparent !important;
  box-shadow: none;
}
.vc-chrome-body {
  background: transparent !important;
  background-color: transparent !important;
  padding-top: 1vw;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}
.vc-chrome-fields-wrap {
  padding-top: 0.83vw;
}
.vc-chrome-fields .vc-input__label {
  font-size: 1.04vw;
  font-weight: 700;
  font-family: "Century Gothic";
  color: #ffffff;
  margin-top: 0.57vw;
  line-height: 0.58vw;
}
.vc-chrome-fields .vc-input__input {
  color: rgb(0, 0, 0);
  font-size: 1.04vw;
  font-weight: 700;
  font-family: "Century Gothic";
  background: #fff;
  border: none;
  box-shadow: 0px 0px 1px 1px #fff;
  height: 1.39vw !important;
}
.vc-editable-input {
  height: auto;
}
.vc-chrome-field {
  padding-left: 0;
}
.vc-chrome-color-wrap {
  display: none;
  visibility: hidden;
  height: 0;
}
.vc-chrome-alpha-wrap {
  display: none;
  visibility: hidden;
  height: 0;
}
.vc-chrome-hue-wrap {
  height: 1vw;
}
.vc-chrome-hue-wrap .vc-hue-picker,
.vc-chrome-alpha-wrap .vc-alpha-picker {
  height: 1.1vw;
  width: 0.5vw;
  transform: translate(-0.2vw, -0.1vw);
  border-radius: 0.1vw;
}
.vc-chrome-active-color {
  width: 1.57vw;
  height: 1.57vw;
  border-radius: 50%;
}
.vc-chrome-color-wrap .vc-checkerboard {
  width: 1.56vw;
  height: 1.56vw;
  border-radius: 50%;
}
.vc-alpha {
  display: none;
}
.vc-chrome-saturation-wrap .vc-saturation-circle {
  width: 0.63vw;
  height: 0.63vw;
}
.vc-chrome-fields {
  margin: 0;
}
.vc-chrome-toggle-icon {
  margin-right: 0;
  margin-top: 0;
  height: 1.39vw !important;
}
.vc-chrome-toggle-btn {
  width: 1.67vw;
  height: 1.39vw !important;
}
.vc-chrome-toggle-icon-highlight {
  right: 0 !important;
  left: auto;
  top: 0;
  border-radius: 4px;
  width: 1.25vw;
  height: 1.39vw !important;
  background: #eee url("/img/car-shop/icon.png") no-repeat;
  background-size: contain;
  background-position: 0 50%;
  display: block !important;
}
.vc-chrome-toggle-icon svg {
  display: none;
}
.vc-chrome-fields-wrap {
  position: relative;
  display: flex;
  align-items: flex-start;
}
.vc-chrome-field:nth-child(4) {
  display: none;
}

.tooltip {
  z-index: 100;
}
.tooltip-arrow {
  position: absolute;
}
.tooltip-inner {
  color: #ffffff;
  font-size: 0.93vw;
  background: rgba(1, 29, 54, 0.952);
  padding: 0.5vw 0.7vw;
  font-weight: bold;
  font-family: "Century Gothic";
  border-radius: 0.2vw;
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.24);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.select{
	position: fixed;
	z-index: 999999;
}
.select select{
	background: rgb(245, 245, 245);
	font-size: 24px;
	font-family: "Century Gothic";
	box-shadow: 0 2px 10px 5px rgba(0, 0, 0, 0.5) ;
}
</style>
