import { createStore } from 'vuex';
import { loadPost } from './apis/loadPost';
import { loadPosts } from './apis/loadPosts';

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
        state.posts = await loadPosts({
          limit: params?.length,
          tag: params?.tag,
        });
      },

      async loadPost({ state }, title) {
        state.post = await loadPost({ title });
      },
    },
  });
};
