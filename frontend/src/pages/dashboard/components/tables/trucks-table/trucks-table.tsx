import { Button, Modal, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppSelector,
  useAppTable,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import { type PaginationPayload } from '~/libs/types/types.js';
import { type TruckGetAllResponseDto } from '~/packages/trucks/libs/types/types.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';

import { AddTruckForm } from '../../form/form.js';
import { columns } from './columns/columns.js';
import styles from './styles.module.scss';

const TrucksTable: React.FC = () => {
  const trucks = useAppSelector((state) => state.trucks.trucks);
  const total = useAppSelector((state) => state.trucks.total);
  const status = useAppSelector((state) => state.trucks.dataStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pageSize, pageIndex, changePageSize, changePageIndex, updatePage } =
    useAppTable<TruckGetAllResponseDto, PaginationPayload>({
      tableFetchCall: findAllTrucksForBusiness,
    });

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Trucks Table</h2>
        <Button
          label=""
          frontIcon={'plus'}
          className={styles.btn}
          onClick={openModal}
        />
        <Table
          data={trucks}
          columns={columns}
          totalRow={total}
          pageIndex={pageIndex}
          pageSize={pageSize}
          isLoading={status === DataStatus.PENDING}
          changePageSize={changePageSize}
          changePageIndex={changePageIndex}
        />
      </div>

      <Modal isOpen={isModalOpen} isCentered={true} onClose={closeModal}>
        <div className={styles.formWrapper}>
          <AddTruckForm updatePage={updatePage} onClose={closeModal} />
        </div>
      </Modal>
    </>
  );
};

export { TrucksTable };