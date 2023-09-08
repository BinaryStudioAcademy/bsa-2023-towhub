import { addTruck, findAllTrucksForBusiness } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  findAllTrucksForBusiness,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
