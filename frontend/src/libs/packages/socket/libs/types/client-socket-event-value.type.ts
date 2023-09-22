import { type ValueOf } from '~/libs/types/types.js';

import { type ServerToClientEvent } from '../enums/enums.js';

type ClientSocketEventValue = ValueOf<typeof ServerToClientEvent>;

export { type ClientSocketEventValue };
