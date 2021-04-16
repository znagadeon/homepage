import Vue from 'vue';

import App from './App.vue';
import createStore from './store';
import createRouter from './router';

import '../styles/master.scss';

export default () => {
	const store = createStore();
	const router = createRouter();
	const app = new Vue({
		render: (h) => h(App),
		store,
		router,
	});

	return { app, store, router };
}
