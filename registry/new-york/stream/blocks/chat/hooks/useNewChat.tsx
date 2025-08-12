import { useSetAtom } from 'jotai';

import {
  brainstormingAtom,
  isBrainstormingActiveAtom,
  brandkitIdAtom,
} from '../store/atoms';

export function useNewChat() {
  /* Atoms */
  const setBrainstormingData = useSetAtom(brainstormingAtom);
  const setBrandKitStateId = useSetAtom(brandkitIdAtom);
  const setIsBrainstormingActive = useSetAtom(isBrainstormingActiveAtom);

  return (): void => {
    setBrandKitStateId('');
    setIsBrainstormingActive(false);
    setBrainstormingData(undefined);
  };
}
