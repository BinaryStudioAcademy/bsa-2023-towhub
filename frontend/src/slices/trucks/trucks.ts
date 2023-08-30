import { addTruck } from './actions.js';
import { actions } from './truck.slice.js';

const allActions = {
  ...actions,
  addTruck,
};

export { allActions as actions };
export { reducer } from './truck.slice.js';
