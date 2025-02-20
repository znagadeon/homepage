import { atom } from 'jotai';
import type { Post } from './components/PostItem';

export const postsAtom = atom<Post[]>([]);
