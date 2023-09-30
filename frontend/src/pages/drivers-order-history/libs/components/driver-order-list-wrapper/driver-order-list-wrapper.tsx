import { Pagination, Spinner } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector, useCallback } from '~/libs/hooks/hooks.js';

import { DriverOrderList } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  emptyListMessage?: JSX.Element;
  pageSize: number;
  pageIndex: number;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
};

const DriverOrderListWrapper: React.FC<Properties> = ({
  pageIndex,
  pageSize,
  emptyListMessage,
  changePageIndex: onChangePageIndex,
  changePageSize: onChangePageSize,
}: Properties) => {
  const {
    orders,
    total: totalElements,
    dataStatus,
    routeAddresses,
  } = useAppSelector((state) => state.orders);
  const pagesRange = Math.ceil(totalElements / pageSize);

  const isLoading =
    dataStatus === DataStatus.PENDING &&
    Object.values(routeAddresses).length === orders.length;

  const handleChangePageSize = useCallback(
    (value: number) => {
      onChangePageIndex(0);
      onChangePageSize(value);
    },
    [onChangePageSize, onChangePageIndex],
  );

  if (isLoading) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={getValidClassNames('h4', styles.message)}>
        {emptyListMessage ?? 'There are no data here yet.'}
      </div>
    );
  }

  return (
    <div>
      <DriverOrderList orders={orders} />
      <Pagination
        pageCount={pagesRange}
        onClick={onChangePageIndex}
        onChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export { DriverOrderListWrapper };
