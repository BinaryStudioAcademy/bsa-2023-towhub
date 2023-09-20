import {
  addTruck,
  calculateArrivalTime,
  getTrucksForBusiness,
  listenTruckUpdates,
  stopListenTruckUpdates,
  updateTruckLocationFromSocket,
} from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  listenTruckUpdates,
  stopListenTruckUpdates,
  updateTruckLocationFromSocket,
  calculateArrivalTime,
  getTrucksForBusiness,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
