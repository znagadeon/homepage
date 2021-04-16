import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import format from 'date-fns/format';

Vue.use(Vuex);

const host = 'http://localhost:1337';

export default () => {
	return new Vuex.Store({
		state: () => ({
			posts: [],
			post: {},
		}),

		actions: {
			async loadPosts({ state }, params) {
				state.posts = (await axios.get(`${host}/api/posts`, { params })).data;
			},

			async loadPost({ state }, title) {
				const { data } = (await axios.get(`${host}/api/post/${title}`));
				state.post = {
					content: data.content,
					meta: {
						...data.meta,
						published: format(new Date(data.meta.published), 'yyyy-MM-dd')
					},
				};
			},
		},
	})
}
