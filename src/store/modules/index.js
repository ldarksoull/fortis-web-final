/* base modules and misc*/
import App from './App.js';
import Notifications from './Misc/Notifications.js';
import ConsoleAPI from './Misc/ConsoleAPI.js';
import Interaction from './Misc/Interaction.js';
import Chat from './Misc/Chat.js';
import Time from './Misc/Time.js';
/* account & caracters*/
import CharactersList from './account/CharactersList.js';
import Report from './account/Report.js';
/* Player */
import Player from './Player/Player.js';
import Inventory from './Player/Inventory.js';
import House from './Player/House.js';
import Phone from './Player/Phone.js';
import Hotel from './Player/Hotel.js';
import Harbor from './Player/Harbor.js';
/* Vehicle*/
import Vehicle from './Vehicle/Vehicle.js';
/*Faction*/
import Faction from './Faction/Faction.js';
import Government from './Faction/Government.js';
/* Shop */
import Shop from './Business/shop.js';
import BusinesMenu from './Business/businessMenu.js';
/*lsCustoms*/
import lsCustoms from './Business/lscustoms.js';
/* Job */
import Taxi from './Jobs/Taxi.js';
import CashCollector from './Jobs/CashCollector.js'
import Trucker from './Jobs/Trucker.js'

const modules = {
	App,
	Notifications,
	ConsoleAPI,
	Interaction,
	Chat,
	Time,
	CharactersList,
	Player,
	Inventory,
	House,
	Phone,
	Faction,
	Shop,
	BusinesMenu,
	Taxi,
	CashCollector,
	Trucker,
	Vehicle,
	Report,
	Government,
	Hotel,
	Harbor,
	lsCustoms,
};

export default modules;
