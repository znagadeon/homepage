import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';

import App from './App.vue';
import Home from './components/Home.vue';
import Post from './components/Post.vue';

import '../styles/home.scss';

Vue.use(VueMeta);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App),
    router: new VueRouter({
        routes: [
            { path: '/', component: Home },
            { path: '/:path([A-Za-z0-9\\-\\.\\/]+)', component: Post },
        ],
    }),
});
