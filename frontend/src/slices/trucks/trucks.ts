import {
  addTruck,
  findAllTrucksForBusiness,
  getAllTrucksByUserId,
  setTrucks,
} from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getAllTrucksByUserId,
  findAllTrucksForBusiness,
  setTrucks,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
