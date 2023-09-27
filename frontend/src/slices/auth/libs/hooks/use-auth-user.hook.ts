import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserEntityObjectWithGroupT } from '~/libs/types/types.js';

import { selectUser } from '../../selectors.js';

const useAuthUser = <
  T extends ReturnType<typeof selectUser> = UserEntityObjectWithGroupT | null,
>(): T => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null as T;
  }

  return user as T;
};

export { useAuthUser };
