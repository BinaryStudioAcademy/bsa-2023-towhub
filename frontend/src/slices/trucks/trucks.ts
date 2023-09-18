import { addTruck, getTruckForBusiness } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getTruckForBusiness,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
