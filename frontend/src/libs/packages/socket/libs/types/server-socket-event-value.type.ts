import { type ValueOf } from '~/libs/types/types.js';

import { type ClientToServerEvent } from '../enums/enums.js';

type ServerSocketEventValue = ValueOf<typeof ClientToServerEvent>;

export { type ServerSocketEventValue };
