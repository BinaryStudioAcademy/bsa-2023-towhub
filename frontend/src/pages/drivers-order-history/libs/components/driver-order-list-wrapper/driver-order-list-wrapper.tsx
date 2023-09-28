import { Pagination } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppSelector, useCallback } from '~/libs/hooks/hooks.js';

import { DriverOrderList } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  emptyListMessage?: JSX.Element;
  pageSize: number;
  pageIndex: number;
  onChangePageIndex: React.Dispatch<React.SetStateAction<number>>;
  onChangePageSize: React.Dispatch<React.SetStateAction<number>>;
};

const DriverOrderListWrapper: React.FC<Properties> = ({
  pageIndex,
  pageSize,
  emptyListMessage,
  onChangePageIndex,
  onChangePageSize,
}: Properties) => {
  const { orders, total: totalElements } = useAppSelector(
    (state) => state.orders,
  );
  const pagesRange = Math.ceil(totalElements / pageSize);

  const handleChangePageSize = useCallback(
    (value: number) => {
      onChangePageIndex(0);
      onChangePageSize(value);
    },
    [onChangePageSize, onChangePageIndex],
  );

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
