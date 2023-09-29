import {
  Button,
  CustomerOrderList,
  Dropdown,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import {
  useAppSelector,
  useAppTable,
  useCallback,
  useNavigate,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { type SingleValue } from '~/libs/types/types.js';
import {
  type OrderFindAllUserOrdersResponseDto,
  type OrderStatus,
} from '~/packages/orders/orders.js';
import { getUserOrdersPage } from '~/slices/orders/actions.js';

import { orderStatusOptions } from './libs/options/order-status-options.js';
import styles from './styles.module.scss';

const CustomerHistory: React.FC = () => {
  const navigate = useNavigate();
  const { setQueryParameters, getQueryParameters, removeQueryParameters } =
    useQueryParameters();

  const { orders, total, dataStatus } = useAppSelector((state) => state.orders);

  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const { pageIndex, pageSize, changePageIndex, changePageSize } = useAppTable<
    OrderFindAllUserOrdersResponseDto,
    { status?: typeof OrderStatus },
    HttpError
  >({
    tableFetchCall: getUserOrdersPage,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
    filterName: 'status',
  });

  const handleChangeFilter = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (option?.value) {
        changePageIndex(0);
        setQueryParameters({
          size: pageSize,
          page: 0,
          status: option.value,
        });
      } else {
        removeQueryParameters('status');
        changePageIndex(0);
      }
    },
    [changePageIndex, pageSize, removeQueryParameters, setQueryParameters],
  );

  const onClickBack = useCallback(() => {
    navigate(AppRoute.ROOT);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Button
        label="Back"
        frontIcon={IconName.CHEVRON_LEFT}
        className={styles.btn}
        onClick={onClickBack}
      />
      <h2 className={styles.title}>Orders History</h2>
      <div className={styles.filter}>
        <label htmlFor="status">Filter by status:</label>
        <Dropdown onChange={handleChangeFilter} options={orderStatusOptions} />
      </div>
      <CustomerOrderList
        pageIndex={pageIndex}
        pageSize={pageSize}
        onChangePageIndex={changePageIndex}
        onChangePageSize={changePageSize}
        orders={orders}
        totalElements={total}
        isLoading={dataStatus === DataStatus.PENDING}
      />
    </div>
  );
};

export { CustomerHistory };
