import { createSSRApp } from 'vue';

import App from './App.vue';
import createStore from './store';
import createRouter from './router';

import '../styles/master.scss';

export default () => {
	const store = createStore();
	const router = createRouter();
	const app = createSSRApp(App);

	app.use(store);
	app.use(router);

	return { app, store, router };
};
