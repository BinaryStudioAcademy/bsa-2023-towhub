import { addTruck, getAllTrucksByUserId } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getAllTrucksByUserId,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
