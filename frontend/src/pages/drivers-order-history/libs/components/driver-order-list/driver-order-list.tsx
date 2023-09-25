import {
  DriverOrderCard,
  Pagination,
  Spinner,
} from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import styles from './styles.module.scss';

type Properties = {
  orders: OrderResponseDto[];
  isLoading?: boolean;
  emptyListMessage?: JSX.Element;
  pageSize: number;
  totalElements: number;
  pageIndex: number;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
};

const DriverOrderList: React.FC<Properties> = ({
  orders,
  isLoading,
  pageIndex,
  pageSize,
  emptyListMessage,
  totalElements,
  changePageIndex,
  changePageSize,
}: Properties) => {
  const pagesRange = Math.ceil(totalElements / pageSize);

  const createDriverOrderCards = (): JSX.Element[] => {
    return orders.map((order) => (
      <li key={order.id} className={styles.item}>
        <DriverOrderCard order={order} />
      </li>
    ));
  };

  const handleChangePageSize = useCallback(
    (value: number) => {
      changePageIndex(0);
      changePageSize(value);
    },
    [changePageSize, changePageIndex],
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
      <ul>{createDriverOrderCards()}</ul>
      <Pagination
        pageCount={pagesRange}
        onClick={changePageIndex}
        onChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export { DriverOrderList };
