import {
  type TruckAddRequestDto,
  truckAddValidationSchema,
} from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';

import { ADD_TRUCK_FIELDS } from './libs/add-truck.fields.js';
import { DEFAULT_TRUCK_PAYLOAD } from './libs/constants.js';

type Properties = {
  onSubmit: (payload: TruckAddRequestDto) => void;
};

const AddTruckForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  return (
    <div>
      <Form
        fields={ADD_TRUCK_FIELDS}
        defaultValues={DEFAULT_TRUCK_PAYLOAD}
        validationSchema={truckAddValidationSchema}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export { AddTruckForm };
