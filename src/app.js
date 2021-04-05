import Vue from 'vue';
import VueMeta from 'vue-meta';

import App from './App.vue';

import '../styles/master.scss';

Vue.use(VueMeta);

export default () => {
	return new Vue({
		render: (h) => h(App),
	});
}
