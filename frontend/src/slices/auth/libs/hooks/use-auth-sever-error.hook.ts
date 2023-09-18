import { useServerErrorFromThunk } from '~/libs/hooks/hooks.js';
import { type ServerErrorHandling } from '~/libs/types/types.js';

import { actions } from '../../auth.slice.js';
import { selectAuthServerError } from '../../selectors.js';

const useAuthServerError = (): ServerErrorHandling => {
  return useServerErrorFromThunk(
    selectAuthServerError,
    actions.clearAuthServerError,
  );
};

export { useAuthServerError };
