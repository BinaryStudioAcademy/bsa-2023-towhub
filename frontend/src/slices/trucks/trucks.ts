import {
  addTruck,
  calculateArrivalTime,
  findAllTrucksForBusiness,
  getAllTrucksByUserId,
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
  getAllTrucksByUserId,
  findAllTrucksForBusiness,
  setTrucks,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
