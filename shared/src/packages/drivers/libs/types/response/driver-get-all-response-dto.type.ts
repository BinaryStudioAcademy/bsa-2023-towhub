import { type EntityPagination } from '~/libs/types/entity-pagination.type.js';

import { type DriverWithUserData } from '../driver-with-user-data.type.js';

type DriverGetAllResponseDto = EntityPagination<DriverWithUserData>;

export { type DriverGetAllResponseDto };
