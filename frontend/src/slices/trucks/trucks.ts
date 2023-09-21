import { addTruck, getTrucksForBusiness } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getTrucksForBusiness,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
