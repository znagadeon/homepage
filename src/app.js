import Vue from 'vue';
import VueMeta from 'vue-meta';

import App from './App.vue';
import createStore from './store';

Vue.use(VueMeta);

import '../styles/master.scss';

export default (context) => {
	let type, title, tag;
    if (context) {
        type = context.type;
		title = context.title;
		tag = context.tag;
    } else {
		if (location.pathname === '/' || location.pathname === '/index.html') {
			type = 'Home';
		} else if (/^\/archive/.test(location.pathname)) {
			type = 'Archive';
		} else if (/^\/tag\//.test(location.pathname)) {
			type = 'Tag';
			tag = location.pathname.replace(/^\/tag\/(.+)\/index.html$/, '$1');
		} else if (/^\/post\//.test(location.pathname)) {
			type = 'Post';
			title = location.pathname.replace(/^\/post\/(.+)\/index.html$/, '$1');
		}
    }

	const store = createStore({
		type,
		title,
		tag,
	});
	const app = new Vue({
		render: (h) => h(App),
		store,
	});

	return { app, store };
}
