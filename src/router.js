import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@src/pages/Home.vue';

import Post from '@src/pages/Post.vue';
import Archive from '@src/pages/Archive.vue';
import Tag from '@src/pages/Tag.vue';

import Search from '@src/pages/Search.vue';

export default () => {
	return new Router({
		mode: 'history',
		routes: [
			{ path: '/index.html', component: Home, alias: '/' },

			{ path: '/post/:title/index.html', component: Post },
			{ path: '/post/:title', redirect: '/post/:title/index.html' },
			{ path: '/archive/index.html', component: Archive, alias: '/archive' },
			{ path: '/tag/:tag/index.html', component: Tag, alias: '/tag/:tag' },

			{
				path: '/search/index.html',
				component: Search,
				props: (route) => ({ query: route.query.q }),
				alias: '/search',
			},
		],
	});
}
