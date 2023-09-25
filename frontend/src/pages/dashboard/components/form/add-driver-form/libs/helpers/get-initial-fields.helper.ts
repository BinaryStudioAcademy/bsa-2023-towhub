import { FormName } from '~/libs/enums/enums.js';
import { type FormField, type TruckEntityT } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';
import { type FileObject } from '~/slices/files/libs/types/types.js';

import { addDriverFields as initialAddDriverFields } from '../fields.js';

const getInitialFields = (
  trucks: TruckEntityT[],
): FormField<DriverCreateUpdateRequestDto & { files: FileObject[] }>[] => {
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
