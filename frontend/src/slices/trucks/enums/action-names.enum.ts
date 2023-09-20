import { name as sliceName } from '~/slices/trucks/trucks.slice.js';

const ActionNames = {
  SOCKET: {
    UPDATE_TRUCK_LOCATION: `${sliceName}/socket/update-truck-location`,
    SUBSCRIBE_TRUCK_UPDATES: `${sliceName}/subscribe-truck-updates`,
    UNSUBSCRIBE_TRUCK_UPDATES: `${sliceName}/unsubscribe-truck-updates`,
  },
  CALCULATE_ARRIVAL_TIME: `${sliceName}/calculate-arrival-time`,
};

export { ActionNames };
