import { Button, Table } from '~/libs/components/components.js';
import { useAppSelector, useAppTable, useMemo } from '~/libs/hooks/hooks.js';
import {
  type DriverGetAllResponseDto,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { getDriversPage } from '~/slices/driver-table/actions.js';

import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const DriverTable: React.FC = () => {
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const data = useAppSelector((state) => state.driversTable.drivers);
  const total = useAppSelector((state) => state.driversTable.total);

  const payload = useMemo(() => ({ businessId: user.business.id }), [user]);

  const tableHook = useAppTable<
    DriverGetAllResponseDto,
    { businessId: number }
  >({
    payload,
    tableFetchCall: getDriversPage,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Drivers Table</h2>
      <Button label="+" className={styles.btn} />
      <Table {...tableHook} data={data} totalRow={total} columns={columns} />
    </div>
  );
};

export { DriverTable };
