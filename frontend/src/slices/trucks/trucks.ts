import {
  addTruck,
  addTrucksByUserId,
  getTrucksByBusinessId,
} from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  getTrucksByBusinessId,
  addTrucksByUserId,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
