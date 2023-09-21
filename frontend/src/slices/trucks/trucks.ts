import {
  addTruck,
  getAllTrucksByUserId,
  getTrucksForBusiness,
} from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getTrucksForBusiness,
  getAllTrucksByUserId,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
