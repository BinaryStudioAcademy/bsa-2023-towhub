import { type UserEntityObjectWithGroupAndBusinessT } from 'shared/build';

import { Form } from '~/libs/components/components.js';
import { AuthMode } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type BusinessEditDto,
  type CustomerEditDto,
  businessEditValidationSchema,
  customerEditValidationSchema,
} from '~/packages/users/users.js';
import { selectUser } from '~/slices/auth/selectors.js';

import { editBusinessFields, editCustomerFields } from './libs/fields.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: CustomerEditDto | BusinessEditDto) => void;
  mode: ValueOf<typeof AuthMode>;
};

const EditForm: React.FC<Properties> = ({ onSubmit, mode }: Properties) => {
  const { firstName, lastName, phone, email, business } = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h4', 'uppercase', styles.title)}>
        Edit profile
      </h3>
      {mode === AuthMode.CUSTOMER && (
        <Form
          defaultValues={{ firstName, lastName, phone, email }}
          validationSchema={customerEditValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Save"
          fields={editCustomerFields}
        />
      )}
      {mode === AuthMode.BUSINESS && (
        <Form
          defaultValues={{
            firstName,
            lastName,
            phone,
            email,
            taxNumber: business.taxNumber,
            companyName: business.companyName,
          }}
          validationSchema={businessEditValidationSchema}
          onSubmit={onSubmit}
          btnLabel="Save"
          fields={editBusinessFields}
        />
      )}
    </div>
  );
};

export { EditForm };
