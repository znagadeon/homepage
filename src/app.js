import Vue from 'vue';

import App from './App.vue';
import createStore from './store';

import '../styles/master.scss';

export default (context) => {
	let type, title, tag, query;
	if (context) {
		type = context.type;
		title = context.title;
		tag = context.tag;
		query = context.query;
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
		} else if (/^\/search/.test(location.pathname)) {
			type = 'Search';
			query = location.search.slice(1).split('&')
				.map(v => v.slice('='))
				.find(v => v[0] === 'q')[1];
		}
	}

	const store = createStore({
		type,
		title,
		tag,
		query,
	});
	const app = new Vue({
		render: (h) => h(App),
		store,
	});

	return { app, store };
}
