import { type ColumnSort } from '@tanstack/react-table';

import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  getSortingMethodValue,
  getValidClassNames,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useQueryParameters,
  useState,
  useToggle,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type PaginationWithSortingParameters } from '~/libs/types/types.js';
import {
  type TruckAddRequestDto,
  type TruckGetAllResponseDto,
} from '~/packages/trucks/libs/types/types.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { AddTruckForm } from '../../form/form.js';
import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const TruckTable: React.FC = () => {
  const { trucks, total, dataStatus } = useAppSelector(({ trucks }) => ({
    trucks: trucks.trucks,
    total: trucks.total,
    dataStatus: trucks.dataStatus,
  }));
  const { getQueryParameters, searchParameters } = useQueryParameters();

  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const [sorting, setSorting] = useState<ColumnSort | null>(null);
  const dispatch = useAppDispatch();
  const [isToggled, handleToggle] = useToggle();

  const sortMethod = getSortingMethodValue(sorting);

  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    TruckGetAllResponseDto,
    PaginationWithSortingParameters
  >({
    tableFetchCall: findAllTrucksForBusiness,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
    sort: sortMethod,
  });

  const handleSubmit = useCallback(
    (payload: TruckAddRequestDto) => {
      void dispatch(
        truckActions.addTruck({
          ...payload,
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
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={getValidClassNames('uppercase', styles.title)}>
            Company Trucks
          </h2>
          <Button
            label="Add a truck"
            className={styles.btn}
            onClick={handleToggle}
          />
        </div>
        <Table
          data={trucks}
          columns={columns}
          totalRow={total}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setSorting={setSorting}
          sorting={sorting}
          isLoading={dataStatus === DataStatus.PENDING}
          changePageSize={changePageSize}
          changePageIndex={changePageIndex}
          emptyTableMessage={message}
        />
      </div>
      <Modal isOpen={isToggled} isCentered onClose={handleToggle}>
        <div className={styles.formWrapper}>
          <AddTruckForm onSubmit={handleSubmit} onClose={handleToggle} />
        </div>
      </Modal>
    </>
  );
};

export { TruckTable };
