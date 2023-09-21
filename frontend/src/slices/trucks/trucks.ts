import {
  addTruck,
  calculateArrivalTime,
  findAllTrucksForBusiness,
  setTrucks,
  subscribeTruckUpdates,
  unsubscribeTruckUpdates,
  updateTruckLocationFromSocket,
} from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  subscribeTruckUpdates,
  unsubscribeTruckUpdates,
  updateTruckLocationFromSocket,
  calculateArrivalTime,
  findAllTrucksForBusiness,
  setTrucks,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
