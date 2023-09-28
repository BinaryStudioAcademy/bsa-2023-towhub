import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
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
  onChangePageIndex: React.Dispatch<React.SetStateAction<number>>;
  onChangePageSize: React.Dispatch<React.SetStateAction<number>>;
};

const CustomerOrderList: React.FC<Properties> = ({
  orders,
  isLoading,
  pageIndex,
  pageSize,
  emptyListMessage,
  totalElements,
  onChangePageIndex,
  onChangePageSize,
}: Properties) => {
  const pagesRange = Math.ceil(totalElements / pageSize);

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
      <ul>
        {orders.map((order) => (
          <li key={order.id} className={styles.item}>
            <CustomerOrderCard order={order} />
          </li>
        ))}
      </ul>
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

export { CustomerOrderList };
