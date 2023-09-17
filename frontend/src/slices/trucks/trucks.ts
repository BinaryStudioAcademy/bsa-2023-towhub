import {
  addTruck,
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
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
