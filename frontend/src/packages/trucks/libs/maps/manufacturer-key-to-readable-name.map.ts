import { type ValueOf } from '~/libs/types/types.js';

import { TruckManufacturer } from '../enums/enums.js';

const manufacturerKeyToReadableName: Record<
  ValueOf<typeof TruckManufacturer>,
  string
> = {
  [TruckManufacturer.DAF]: 'DAF',
  [TruckManufacturer.FORD]: 'Ford',
  [TruckManufacturer.IVECO]: 'IVECO',
  [TruckManufacturer.KENWORTH]: 'Kenworth',
  [TruckManufacturer.MAN]: 'MAN',
  [TruckManufacturer.MERCEDES]: 'Mercedes Benz',
  [TruckManufacturer.MILLER_INDUSTRIES]: 'Miller Industries',
  [TruckManufacturer.RENAULT]: 'Renault',
  [TruckManufacturer.SCANIA]: 'Scania',
  [TruckManufacturer.VOLVO]: 'Volvo',
};

export { manufacturerKeyToReadableName };
