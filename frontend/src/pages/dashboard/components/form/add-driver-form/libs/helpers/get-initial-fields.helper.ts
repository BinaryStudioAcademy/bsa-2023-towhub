import { FormName } from '~/libs/enums/enums.js';
import { type FormField, type TruckEntity } from '~/libs/types/types.js';
import { type DriverCreateRequestDto } from '~/packages/drivers/drivers.js';

import { addDriverFields as initialAddDriverFields } from '../fields.js';

const getInitialFields = (
  trucks: TruckEntity[],
): FormField<DriverCreateRequestDto>[] => {
  const truckOptions = trucks.map((truck) => ({
    label: truck.licensePlateNumber,
    value: truck.id.toString(),
  }));

  return initialAddDriverFields.map((field) =>
    field.name === FormName.DRIVER_POSSIBLE_TRUCKS
      ? {
          ...field,
          options: truckOptions,
        }
      : field,
  );
};

export { getInitialFields };
