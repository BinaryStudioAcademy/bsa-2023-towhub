import { useAppSelector } from '~/libs/hooks/hooks.js';

import { selectUser } from '../../selectors.js';

const useAuthUser: () => ReturnType<typeof selectUser> = () => {
  return useAppSelector(selectUser);
};

export { useAuthUser };
