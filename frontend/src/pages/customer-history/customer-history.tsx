import { Button, Dropdown } from '~/libs/components/components.js';
import { CustomerOrderList } from '~/libs/components/customer-order-list/customer-order-list.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { IconName } from '~/libs/enums/icon-name.enum';
import {
  useAppDispatch,
  useAppSelector,
  useAppTable,
  useCallback,
  useEffect,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type SingleValue } from '~/libs/types/types.js';
import { type OrderFindAllUserOrdersResponse } from '~/packages/orders/orders.js';
import { getUserOrdersPage } from '~/slices/orders/actions.js';

import { options } from './libs/enums/options.js';
import { getFilterByName } from './libs/helpers/helpers.js';
import { type CustomerOrderStatus } from './libs/types/types.js';
import styles from './styles.module.scss';

const CustomerHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    setQueryParameters,
    getQueryParameters,
    searchParameters,
    removeQueryParameters,
  } = useQueryParameters();

  const { orders, total, dataStatus } = useAppSelector((state) => state.orders);
  const filterName = getQueryParameters('status') as string | null;

  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const listHook = useAppTable<
    OrderFindAllUserOrdersResponse,
    { status?: typeof CustomerOrderStatus }
  >({
    tableFetchCall: getUserOrdersPage,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
    filterName: 'status',
  });

  useEffect(() => {
    void dispatch(getUserOrdersPage(searchParameters.toString()));
  }, [dispatch, searchParameters]);

  const handleChangeFilter = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (option?.value) {
        setQueryParameters({
          size: listHook.pageSize,
          page: listHook.pageIndex,
          status: option.value,
        });
      } else {
        removeQueryParameters('status');
      }
    },
    [
      listHook.pageIndex,
      listHook.pageSize,
      removeQueryParameters,
      setQueryParameters,
    ],
  );

  return (
    <div className={styles.container}>
      <Button
        label="Back"
        frontIcon={IconName.CHEVRON_LEFT}
        className={styles.btn}
      />
      <h2 className={styles.title}>Orders History</h2>
      <div className={styles.filter}>
        <label htmlFor="status">Filter by status:</label>
        <Dropdown
          onChange={handleChangeFilter}
          options={options}
          defaultValue={getFilterByName(filterName)}
        />
      </div>
      <CustomerOrderList
        {...listHook}
        orders={orders}
        totalElements={total}
        isLoading={dataStatus === DataStatus.PENDING}
      />
    </div>
  );
};

export { CustomerHistory };
