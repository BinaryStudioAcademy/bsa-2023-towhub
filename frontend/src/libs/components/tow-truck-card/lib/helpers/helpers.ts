import { type ValueOf, TruckTowType } from 'shared/build';

import img1 from '~/assets/img/truck/type-1.svg';
import img2 from '~/assets/img/truck/type-2.svg';
import img3 from '~/assets/img/truck/type-3.svg';

const getTowTruckImage = (type: ValueOf<typeof TruckTowType>): string => {
  switch (type) {
    case TruckTowType.FLATBED_OR_ROLLBACK: {
      return img3;
    }
    case TruckTowType.HOOK_AND_CHAIN: {
      return img3;
    }
    case TruckTowType.INTEGRATED: {
      return img1;
    }
    case TruckTowType.WHEEL_LIFT: {
      return img2;
    }
  }
};

export { getTowTruckImage };
