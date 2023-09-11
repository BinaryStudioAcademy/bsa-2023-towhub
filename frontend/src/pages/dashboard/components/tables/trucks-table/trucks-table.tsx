import { Button, Modal, Table } from '~/libs/components/components.js';
import { capitalizeFirstLetter } from '~/libs/helpers/helpers.js';
import {
  useAppSelector,
  useAppTable,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import { type ColumnDef, type TruckEntity } from '~/libs/types/types.js';
import { AddTruckForm } from '~/pages/trucks/components/add-truck-form/add-truck-form.js';
import { findAllTrucksForBusiness } from '~/slices/trucks/actions.js';

import styles from './styles.module.scss';

const columns: ColumnDef<TruckEntity>[] = [
  {
    id: 'manufacturer',
    header: 'Manufacturer',
    cell: (row) => capitalizeFirstLetter(row.row.original.manufacturer),
  },
  {
    id: 'towType',
    header: 'Tow Type',
    cell: (row) => capitalizeFirstLetter(row.row.original.towType),
  },
  {
    id: 'year',
    header: 'Year',
    cell: (row) => row.row.original.year,
  },
  {
    id: 'licensePlateNumber',
    header: 'Plate Number',
    cell: (row) => row.row.original.licensePlateNumber,
  },
  {
    id: 'capacity',
    header: 'Capacity',
    cell: (row) => row.row.original.capacity,
  },
  {
    id: 'pricePerKm',
    header: 'Price Per Km',
    cell: (row) => row.row.original.pricePerKm,
  },
];

type Properties = {
  businessId: number;
};

const TrucksTable: React.FC<Properties> = ({ businessId }: Properties) => {
  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    TruckEntity[],
    Pick<TruckEntity, 'businessId'>
  >({
    tableFetchCall: findAllTrucksForBusiness,
    payload: { businessId },
  });

  const trucks = useAppSelector((state) => state.trucks.trucks);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <Button label="+" className={styles.btn} onClick={openModal} />
        <Table
          data={trucks}
          columns={columns}
          totalRow={15}
          pageIndex={pageIndex}
          pageSize={pageSize}
          changePageSize={changePageSize}
          changePageIndex={changePageIndex}
        />
      </div>

      <Modal isOpen={isModalOpen} isCentered={true} onClose={closeModal}>
        <AddTruckForm onClose={closeModal} businessId={businessId} />
      </Modal>
    </>
  );
};

export { TrucksTable };
