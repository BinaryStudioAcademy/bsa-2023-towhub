import { type UserEntityObjectWithGroupAndBusinessT } from 'shared/build/index.js';

import { Form } from '~/libs/components/components.js';
import { FormName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector, useEffect, useState } from '~/libs/hooks/hooks.js';
import {
  type DriverCreateUpdateRequestDto,
  driverCreateUpdateRequestBody,
} from '~/packages/drivers/drivers.js';
import { truckApi } from '~/packages/trucks/trucks.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { DEFAULT_ADD_DRIVER_PAYLOAD } from './libs/constants.js';
import { addDriverFields as initialAddDriverFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: DriverCreateUpdateRequestDto) => void;
};

const AddDriverForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const [addDriverFields, setAddDriverFields] = useState(
    initialAddDriverFields,
  );

  useEffect(() => {
    const setTrucksOptions = async (): Promise<void> => {
      const trucks = await truckApi.getTrucksByBusinessId(
        user.business.ownerId,
      );

      const truckOptions = trucks.map((truck) => ({
        label: truck.licensePlateNumber,
        value: truck.id.toString(),
      }));

      setAddDriverFields((previousFields) =>
        previousFields.map((field) =>
          field.name === FormName.DRIVER_POSSIBLE_TRUCKS
            ? {
                ...field,
                options: truckOptions,
              }
            : field,
        ),
      );
    };

    void setTrucksOptions();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Add driver
      </h3>
      <Form
        defaultValues={DEFAULT_ADD_DRIVER_PAYLOAD}
        validationSchema={driverCreateUpdateRequestBody}
        onSubmit={onSubmit}
        btnLabel="Add driver"
        fields={addDriverFields}
      />
    </div>
  );
};

export { AddDriverForm };
