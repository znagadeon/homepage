import { useHydrateAtoms } from 'jotai/utils';
import { useMemo } from 'react';
import { type ServerState, hydrate } from '../hydration';

type Props = {
  serverState: ServerState;
};

export const HydrationWrapper = ({ serverState }: Props) => {
  const state = useMemo(() => hydrate(serverState), [serverState]);

  useHydrateAtoms(state);

  return null;
};
