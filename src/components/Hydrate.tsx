import { useHydrateAtoms } from 'jotai/utils';
import { postsAtom } from '../stores';
import type { Post } from './PostItem';

type Props = {
  serverState: Map<string, unknown>;
};

export const Hydrate = ({ serverState }: Props) => {
  const entries = Array.from(serverState.entries());
  const state = entries.map(([key, value]) => {
    if (key === 'postsAtom') return [postsAtom, value as Post[]] as const;
    throw new Error('Impossible');
  });

  useHydrateAtoms(state);

  return null;
};
