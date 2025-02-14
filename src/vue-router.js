import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

import Home from '@src/pages/Home.vue';

import Archive from '@src/pages/Archive.vue';
import Post from '@src/pages/Post.vue';
import Tag from '@src/pages/Tag.vue';

import Search from '@src/pages/Search.vue';

export default () => {
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      { path: '/', component: Home, alias: '/' },

      {
        path: '/post/:title',
        component: Post,
      },
      { path: '/archive', component: Archive },
      { path: '/tag/:tag', component: Tag },

      {
        path: '/search',
        component: Search,
        props: (route) => ({ query: route.query.q }),
      },
    ],
  });
};
