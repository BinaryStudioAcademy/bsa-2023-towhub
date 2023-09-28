import {
  authorizeDriverSocket,
  editBusiness,
  editCustomer,
  getCurrent,
  logOut,
  resetAuthorizedDriverSocket,
  signIn,
  signUp,
} from './actions.js';
import { actions } from './auth.slice.js';

const allActions = {
  ...actions,
  editBusiness,
  editCustomer,
  signIn,
  authorizeDriverSocket,
  resetAuthorizedDriverSocket,
  signUp,
  getCurrent,
  logOut,
};

export { allActions as actions };
export { reducer } from './auth.slice.js';
export { useAuthServerError, useAuthUser } from './libs/hooks/hooks.js';
