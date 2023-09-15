import { useAppDispatch, useAppSelector } from '~/libs/hooks/hooks.js';
import { type RootState } from '~/libs/packages/store/store.js';

import { type name, actions } from '../../auth.slice.js';
import { selectAuthServerError } from '../../selectors.js';

const useAuthServerError = (): [
  serverError: RootState[typeof name]['error'],
  setServerError: () => void,
] => {
  const dispatch = useAppDispatch();

  return [
    useAppSelector(selectAuthServerError),
    dispatch(actions.clearAuthServerError),
  ];
};

export { useAuthServerError };
