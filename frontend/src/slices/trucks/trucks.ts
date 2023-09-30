import {
  addTruck,
  calculateArrivalTime,
  findAllTrucksForBusiness,
  getAllTrucksByUserId,
  restartWatchTruckLocation,
  setTrucks,
  startWatchTruckLocation,
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
  startWatchTruckLocation,
  calculateArrivalTime,
  getAllTrucksByUserId,
  findAllTrucksForBusiness,
  setTrucks,
  restartWatchTruckLocation,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
