import Vue from 'vue';
import VueMeta from 'vue-meta';

import App from './App.vue';

import '../styles/master.scss';

Vue.use(VueMeta);

new Vue({
	el: '#app',
	render: (h) => h(App),
});
