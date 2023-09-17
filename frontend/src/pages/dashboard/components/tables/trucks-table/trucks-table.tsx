import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus, IconName } from '~/libs/enums/enums.js';
import {
  useAppSelector,
  useAppTable,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import { type PaginationParameters } from '~/libs/types/types.js';
import { type TruckGetAllResponseDto } from '~/packages/trucks/libs/types/types.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';

import { AddTruckForm } from '../../form/form.js';
import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const TrucksTable: React.FC = () => {
  const { trucks, total, dataStatus } = useAppSelector(({ trucks }) => ({
    trucks: trucks.trucks,
    total: trucks.total,
    dataStatus: trucks.dataStatus,
  }));

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { pageSize, pageIndex, changePageSize, changePageIndex, updatePage } =
    useAppTable<TruckGetAllResponseDto, PaginationParameters>({
      tableFetchCall: findAllTrucksForBusiness,
    });

  const handleAddTruckModalVisibility = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Trucks</h2>
        <Button
          label="Add a truck"
          frontIcon={IconName.PLUS}
          className={styles.btn}
          onClick={handleAddTruckModalVisibility}
        />
        {trucks.length > 0 ? (
          <Table
            data={trucks}
            columns={columns}
            totalRow={total}
            pageIndex={pageIndex}
            pageSize={pageSize}
            isLoading={dataStatus === DataStatus.PENDING}
            changePageSize={changePageSize}
            changePageIndex={changePageIndex}
          />
        ) : (
          // TODO: Ask QA on Monday what text and styles should be
          <div> Some text </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        isCentered={true}
        onClose={handleAddTruckModalVisibility}
      >
        <div className={styles.formWrapper}>
          <AddTruckForm
            updatePage={updatePage}
            onClose={handleAddTruckModalVisibility}
          />
        </div>
      </Modal>
    </>
  );
};

export { TrucksTable };
