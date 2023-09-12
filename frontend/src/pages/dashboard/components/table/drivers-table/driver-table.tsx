import { type DriverCreateUpdateRequestDto } from 'shared/build/index.js';

import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useMemo,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  type DriverGetAllResponseDto,
  type UserEntityObjectWithGroupAndBusinessT,
} from '~/libs/types/types.js';
import { AddDriverForm } from '~/pages/business/components/add-driver-form/add-driver-form.js';
import { selectUser } from '~/slices/auth/selectors.js';
import { getDriversPage } from '~/slices/driver-table/actions.js';
import { actions } from '~/slices/driver-table/driver-table.js';

import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const DriverTable: React.FC = () => {
  const user = useAppSelector(
    selectUser,
  ) as UserEntityObjectWithGroupAndBusinessT;

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.driversTable.drivers);
  const total = useAppSelector((state) => state.driversTable.total);
  const status = useAppSelector((state) => state.driversTable.dataStatus);

  const payload = useMemo(() => ({ businessId: user.business.id }), [user]);
  const [isActiveModal, setIsActiveModal] = useState(false);

  const tableHook = useAppTable<
    DriverGetAllResponseDto,
    { businessId: number }
  >({
    payload,
    tableFetchCall: getDriversPage,
  });

  const handleOpenModal = useCallback(() => {
    setIsActiveModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsActiveModal(false);
  }, []);

  const handleSubmit = useCallback(
    (payload: DriverCreateUpdateRequestDto) => {
      void dispatch(
        actions.addDriver({ businessId: user.business.id, payload }),
      ).then(tableHook.updatePage);
      setIsActiveModal(false);
    },
    [dispatch, tableHook, user.business.id],
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Drivers Table</h2>
      <Button
        label=""
        frontIcon={'plus'}
        className={styles.btn}
        onClick={handleOpenModal}
      />
      <Table
        {...tableHook}
        data={data}
        totalRow={total}
        columns={columns}
        isLoading={status === DataStatus.PENDING}
      />
      <Modal
        isOpen={isActiveModal}
        isCentered={true}
        onClose={handleCloseModal}
      >
        <div className={styles.formWrapper}>
          <AddDriverForm onSubmit={handleSubmit} />
        </div>
      </Modal>
    </div>
  );
};

export { DriverTable };
