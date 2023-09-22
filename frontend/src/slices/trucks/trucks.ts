import { addTruck, findAllTrucksForBusiness, setTrucks } from './actions.js';
import { actions } from './trucks.slice.js';

const allActions = {
  ...actions,
  addTruck,
  findAllTrucksForBusiness,
  setTrucks,
};

export { allActions as actions };
export { reducer } from './trucks.slice.js';
