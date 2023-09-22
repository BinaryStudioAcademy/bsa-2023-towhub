import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useQueryParameters,
  useToggle,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import {
  type DriverGetAllResponseDto,
  type PaginationParameters,
} from '~/libs/types/types.js';
import { type DriverCreateRequestDto } from '~/packages/drivers/drivers.js';
import { getDriversPage } from '~/slices/drivers/actions.js';
import { actions } from '~/slices/drivers/drivers.js';

import { AddDriverForm } from '../../form/form.js';
import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const DriverTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { getQueryParameters, searchParameters } = useQueryParameters();
  const [isToggled, handleToggle] = useToggle();

  const { drivers, total, dataStatus } = useAppSelector(({ drivers }) => ({
    drivers: drivers.drivers,
    total: drivers.total,
    dataStatus: drivers.dataStatus,
  }));
  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    DriverGetAllResponseDto,
    PaginationParameters
  >({
    tableFetchCall: getDriversPage,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
  });

  const handleSubmit = useCallback(
    (payload: DriverCreateRequestDto) => {
      void dispatch(
        actions.addDriver({
          payload,
          queryString: searchParameters.toString(),
        }),
      );
      handleToggle();
    },
    [dispatch, searchParameters, handleToggle],
  );

  const message = (
    <div>
      There are no data here yet. Please,{' '}
      <span className={styles.red}>add new driver</span>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={getValidClassNames('h3', styles.title)}>
          Company Drivers
        </h2>
        <Button
          label="Add a Driver"
          className={styles.btn}
          onClick={handleToggle}
        />
      </div>
      <Table
        data={drivers}
        totalRow={total}
        isTableEditable
        columns={columns}
        isLoading={dataStatus === DataStatus.PENDING}
        pageIndex={pageIndex}
        pageSize={pageSize}
        changePageIndex={changePageIndex}
        changePageSize={changePageSize}
        emptyTableMessage={message}
      />
      <Modal isOpen={isToggled} isCentered onClose={handleToggle}>
        <div className={styles.formWrapper}>
          <AddDriverForm onSubmit={handleSubmit} />
        </div>
      </Modal>
    </div>
  );
};

export { DriverTable };
