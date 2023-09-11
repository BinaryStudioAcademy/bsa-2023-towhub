import { addTruck, chooseTruck, getAllTrucksByUserId } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  chooseTruck,
  getAllTrucksByUserId,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
