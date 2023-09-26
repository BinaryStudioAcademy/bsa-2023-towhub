import { Pagination } from '~/libs/components/components.js';
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
  changePageIndex,
  changePageSize,
}: Properties) => {
  const { orders, total: totalElements } = useAppSelector(
    (state) => state.orders,
  );
  const pagesRange = Math.ceil(totalElements / pageSize);

  const handleChangePageSize = useCallback(
    (value: number) => {
      changePageIndex(0);
      changePageSize(value);
    },
    [changePageSize, changePageIndex],
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
        onClick={changePageIndex}
        onChangePageSize={handleChangePageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
};

export { DriverOrderListWrapper };
