import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useQueryParameters,
  useState,
} from '~/libs/hooks/hooks.js';
import { type DriverGetAllResponseDto } from '~/libs/types/types.js';
import { type DriverCreateUpdateRequestDto } from '~/packages/drivers/drivers.js';
import { AddDriverForm } from '~/pages/business/components/add-driver-form/add-driver-form.js';
import { getDriversPage } from '~/slices/drivers/actions.js';
import { actions } from '~/slices/drivers/drivers.js';

import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const DriverTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { getQueryParameters } = useQueryParameters();
  const data = useAppSelector((state) => state.drivers.drivers);
  const total = useAppSelector((state) => state.drivers.total);
  const status = useAppSelector((state) => state.drivers.dataStatus);
  const initialSize = getQueryParameters('size') as string | null;
  const initialPage = getQueryParameters('page') as string | null;

  const [isActiveModal, setIsActiveModal] = useState(false);

  const tableHook = useAppTable<DriverGetAllResponseDto>({
    tableFetchCall: getDriversPage,
    initialPageIndex: initialPage ? +initialPage : undefined,
    initialPageSize: initialSize ? +initialSize : undefined,
  });

  const handleOpenModal = useCallback(() => {
    setIsActiveModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsActiveModal(false);
  }, []);

  const handleSubmit = useCallback(
    (payload: DriverCreateUpdateRequestDto) => {
      void (async (): Promise<void> => {
        const size = getQueryParameters('size') as string;
        const page = getQueryParameters('page') as string;
        await dispatch(actions.addDriver({ payload }));
        await dispatch(actions.getDriversPage({ page: +page, size: +size }));
      })();
      setIsActiveModal(false);
    },
    [dispatch, getQueryParameters],
  );

  return (
    <div className={styles.container}>
      <h2 className={getValidClassNames('h3', styles.title)}>Drivers Table</h2>
      <Table
        {...tableHook}
        data={data}
        totalRow={total}
        columns={columns}
        isLoading={status === DataStatus.PENDING}
        emptyTableMessage="add new driver"
      />
      <Button
        label="Add a driver"
        frontIcon="plus"
        className={styles.btn}
        onClick={handleOpenModal}
      />
      <Modal isOpen={isActiveModal} isCentered onClose={handleCloseModal}>
        <div className={styles.formWrapper}>
          <AddDriverForm onSubmit={handleSubmit} />
        </div>
      </Modal>
    </div>
  );
};

export { DriverTable };
