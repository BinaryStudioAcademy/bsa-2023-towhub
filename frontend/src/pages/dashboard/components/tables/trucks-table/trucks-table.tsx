import { type SortingState } from '@tanstack/react-table';

import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus, IconName } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useEffect,
  useQueryParameters,
  useState,
} from '~/libs/hooks/hooks.js';
import { type PaginationParameters } from '~/libs/types/types.js';
import {
  type TruckAddRequestDto,
  type TruckGetAllResponseDto,
} from '~/packages/trucks/libs/types/types.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';
import { actions as truckActions } from '~/slices/trucks/trucks.js';

import { AddTruckForm } from '../../form/form.js';
import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const TrucksTable: React.FC = () => {
  const { trucks, total, dataStatus } = useAppSelector(({ trucks }) => ({
    trucks: trucks.trucks,
    total: trucks.total,
    dataStatus: trucks.dataStatus,
  }));
  const { getQueryParameters } = useQueryParameters();

  const initialSize = getQueryParameters('size') as string | null;
  const initialPage = getQueryParameters('page') as string | null;

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'Year', desc: true },
  ]);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    TruckGetAllResponseDto,
    PaginationParameters
  >({
    tableFetchCall: findAllTrucksForBusiness,
    initialPageIndex: initialPage ? +initialPage : undefined,
    initialPageSize: initialSize ? +initialSize : undefined,
    sorting: sorting[0].desc,
  });

  const handleAddTruckModalVisibility = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleSubmit = useCallback(
    (payload: TruckAddRequestDto) => {
      void dispatch(
        truckActions.addTruck({
          ...payload,
          page: pageIndex,
          size: pageSize,
          sorting: sorting[0].desc,
        }),
      );

      handleAddTruckModalVisibility();
    },
    [dispatch, handleAddTruckModalVisibility, pageIndex, pageSize, sorting],
  );

  return (
    <>
      <div className={styles.container}>
        <h2 className={getValidClassNames('uppercase', styles.title)}>
          Company Trucks
        </h2>
        <Button
          label="Add a truck"
          frontIcon={IconName.PLUS}
          className={styles.btn}
          onClick={handleAddTruckModalVisibility}
        />
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
          emptyTableMessage="add new truck"
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        isCentered
        onClose={handleAddTruckModalVisibility}
      >
        <div className={styles.formWrapper}>
          <AddTruckForm
            onSubmit={handleSubmit}
            onClose={handleAddTruckModalVisibility}
          />
        </div>
      </Modal>
    </>
  );
};

export { TrucksTable };
