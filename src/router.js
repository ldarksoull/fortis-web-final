import Vue from 'vue';
import Router from 'vue-router';

import home from './components/App';
import chat from './components/Chat';

//import Hud from './components/player/hud';
//import MainMenu from './views/MainMenu';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: home
		},
		{
			path: '/chat',
			component: chat,
			ref: 'chat',
			refs: 'chat'
		},
	]
});
