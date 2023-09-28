import { useServerErrorFromThunk } from '~/libs/hooks/hooks.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';

import { selectTruckServerError } from '../../selectors.js';
import { actions } from '../../trucks.slice.js';

const useTruckServerError = (): ServerErrorHandling => {
  return useServerErrorFromThunk(
    selectTruckServerError,
    actions.clearTruckServerError,
  );
};

export { useTruckServerError };
