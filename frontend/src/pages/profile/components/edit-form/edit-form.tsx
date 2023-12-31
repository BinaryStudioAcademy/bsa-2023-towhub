import { Form } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector, useCallback } from '~/libs/hooks/hooks.js';
import {
  type ServerErrorHandling,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';
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
  serverError: ServerErrorHandling;
};

const EditForm: React.FC<Properties> = ({
  onSubmit,
  serverError,
}: Properties) => {
  const { firstName, lastName, phone, email, business, group } = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const getScreen = useCallback((): React.ReactNode => {
    switch (group.key) {
      case UserGroupKey.CUSTOMER: {
        return (
          <Form
            defaultValues={{ firstName, lastName, phone, email }}
            validationSchema={customerEditValidationSchema}
            onSubmit={onSubmit}
            btnLabel="Save"
            fields={editCustomerFields}
            serverError={serverError}
          />
        );
      }
      case UserGroupKey.BUSINESS: {
        {
          return (
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
              serverError={serverError}
            />
          );
        }
      }
    }
  }, [
    business,
    email,
    firstName,
    group.key,
    lastName,
    onSubmit,
    phone,
    serverError,
  ]);

  return (
    <div className={styles.formWrapper}>
      <h3 className={getValidClassNames('h3', 'uppercase', styles.title)}>
        Edit profile
      </h3>
      {getScreen()}
    </div>
  );
};

export { EditForm };
