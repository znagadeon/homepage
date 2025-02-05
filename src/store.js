import { createStore } from 'vuex';

import axios from 'axios';
import { formatDate } from './utils/format';

const host = 'http://localhost:1337';

export default () => {
  return createStore({
    state: () => ({
      posts: [],
      post: {},
      meta: {},
    }),

    mutations: {
      setMeta(state, meta) {
        state.meta = meta;
      },
    },

    actions: {
      async loadPosts({ state }, params) {
        state.posts = (await axios.get(`${host}/api/posts`, { params })).data;
      },

      async loadPost({ state }, title) {
        const { data } = await axios.get(`${host}/api/post/${title}`);
        state.post = {
          content: data.content,
          meta: {
            ...data.meta,
            updated: formatDate(new Date(data.meta.updated)),
          },
        };
      },
    },
  });
};
