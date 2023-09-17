import { name as sliceName } from '~/slices/trucks/trucks.slice.js';

const ActionNames = {
  SOCKET: {
    UPDATE_TRUCK_LOCATION: `${sliceName}/socket/update-truck-location`,
    LISTEN_TRUCK_UPDATES: `${sliceName}/listen-truck-updates`,
    STOP_LISTEN_TRUCK_UPDATES: `${sliceName}/stop-listen-truck-updates`,
  },
  CALCULATE_ARRIVAL_TIME: `${sliceName}/calculate-arrival-time`,
};

export { ActionNames };
