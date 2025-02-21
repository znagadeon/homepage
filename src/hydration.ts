import { loadPosts } from './apis/loadPosts';
import type { Post } from './components/PostItem';
import { postsAtom } from './stores';

type Key = 'postsAtom';

export type ServerState = Map<Key, unknown>;

export const dehydrate = async (url: string) => {
  const state: ServerState = new Map();

  if (/\/$/.test(url)) {
    state.set('postsAtom', await loadPosts({ limit: 5 }));
  }

  const tag = url.match(/\/tag\/(.+)$/);
  if (tag) {
    state.set('postsAtom', await loadPosts({ tag: tag[1] }));
  }

  if (/\/archive$/.test(url)) {
    state.set('postsAtom', await loadPosts());
  }

  return state;
};

export const hydrate = (state: ServerState) => {
  const entries = Array.from(state.entries());

  return entries.map(([key, value]) => {
    switch (key) {
      case 'postsAtom':
        return [postsAtom, value as Post[]] as const;
      default:
        throw new Error('Not Implemented');
    }
  });
};
