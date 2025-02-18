import { createStore } from 'vuex';

import axios from 'axios';
import { loadPosts } from './apis/loadPosts';
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
        state.posts = await loadPosts({
          limit: params?.length,
          tag: params?.tag,
        });
      },

      async loadPost({ state }, title) {
        if (import.meta.env.SSR) {
          const { PostRepository } = await import(
            '@src/repositories/PostRepository'
          );
          const repository = new PostRepository(`${process.cwd()}/posts`);
          state.post = repository.getPostById(title);
          return;
        }

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
