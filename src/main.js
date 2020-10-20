import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

import App from './App.vue';

import Home from './pages/Home.vue';
import Tag from './pages/Tags.vue';
import Archive from './pages/Archive.vue';

import Post from './pages/Post.vue';

import '../styles/master.scss';

Vue.use(VueMeta);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App),
    router: new VueRouter({
        mode: IS_DEV ? undefined : 'history',
        routes: [
            { path: IS_DEV ? '/': '/index.html', component: Home },
            { path: '/post/:path([A-Za-z0-9\\-\\.\\/]+)', component: Post },
            { path: '/tag/:tag', component: Tag },
            { path: '/archive', component: Archive },
        ],
    }),
});
