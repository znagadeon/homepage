import { atom } from 'jotai';
import type { Post } from './components/PostItem';

export const postsAtom = atom<Post[]>([]);
export const postAtom = atom<Post>({
  meta: {
    title: '',
  },
  content: '',
} as Post);
