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
        if (import.meta.env.SSR) {
          const { PostRepository } = await import(
            '@src/repositories/PostRepository'
          );
          const repository = new PostRepository(`${process.cwd()}/posts`);
          state.posts = repository
            .getPosts({ limit: params?.length, tag: params?.tag })
            .map((post) => {
              return {
                ...post,
                content: post.content
                  .replace(/<pre class="hljs">.+?<\/pre>/g, '')
                  .replace(/<.+?>/g, ''),
              };
            });
          return;
        }

        state.posts = (await axios.get(`${host}/api/posts`, { params })).data;
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
