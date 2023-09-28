import { type ValueOf } from '~/libs/types/types.js';

import { type SocketStatus } from '../enums/enums.js';

type SocketStatusValues = ValueOf<typeof SocketStatus>;

export { type SocketStatusValues };
