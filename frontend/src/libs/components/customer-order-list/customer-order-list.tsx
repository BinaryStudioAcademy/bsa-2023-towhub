import { useCallback } from 'react';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type OrderResponseDto } from '~/packages/orders/orders.js';

import { CustomerOrderCard } from '../customer-order-card/customer-order-card.jsx';
import { Pagination } from '../pagination/pagination.jsx';
import { Spinner } from '../spinner/spinner.jsx';
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

const CustomerOrderList: React.FC<Properties> = ({
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

  const createCustomerOrderCards = (): JSX.Element[] => {
    return orders.map((order) => (
      <li key={order.id} className={styles.item}>
        <CustomerOrderCard order={order} />
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
      <ul>{createCustomerOrderCards()}</ul>
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

export { CustomerOrderList };
