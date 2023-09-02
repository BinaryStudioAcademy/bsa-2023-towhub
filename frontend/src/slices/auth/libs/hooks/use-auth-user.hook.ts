import { useAppSelector } from '~/libs/hooks/hooks.js';

import { selectUser } from '../../auth.slice.js';
import { type AuthUserT } from '../types/types.js';

const useAuthUser: () => AuthUserT | null = () => {
  return useAppSelector(selectUser);
};

export { useAuthUser };
