import { type ValueOf } from 'shared/build';

import img1 from '~/assets/img/truck/type-1.svg';
import img2 from '~/assets/img/truck/type-2.svg';
import img3 from '~/assets/img/truck/type-3.svg';

import { TowTruckType } from '../enum.js';

const getTowTruckImage = (type: ValueOf<typeof TowTruckType>): string => {
  switch (type) {
    case TowTruckType.FLATBED_OR_ROLLBACK: {
      return img3;
    }
    case TowTruckType.HOOK_AND_CHAIN: {
      return img3;
    }
    case TowTruckType.INTEGRATED: {
      return img1;
    }
    case TowTruckType.WHEEL_LIFT: {
      return img2;
    }
  }
};

export { getTowTruckImage };
