import { createStore } from 'vuex';

import axios from 'axios';
import { fetchPost } from '@src/api';

export default () => {
  return createStore({
    state: () => ({
      posts: [],
      post: {},
    }),

    actions: {
      async loadPosts({ state }, params) {
        state.posts = (await axios.get('/api/posts', { params })).data;
      },

      async loadPost({ state }, title) {
        state.post = await fetchPost(title);
      },
    },
  });
};
