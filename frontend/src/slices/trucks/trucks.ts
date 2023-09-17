import {
  addTruck,
  calculateArrivalTime,
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
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
