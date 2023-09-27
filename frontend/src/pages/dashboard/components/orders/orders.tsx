import {
  OrderFilter,
  OrderList,
  Pagination,
  Spinner,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum';
import {
  getValidClassNames,
  jsonToLatLngLiteral,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppMap,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useQueryParameters,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '~/libs/hooks/use-app-table/libs/constant.js';
import { type PlaceLatLng } from '~/libs/packages/map/libs/types/types.js';
import {
  type OrderResponseDto,
  type OrderStatusValues,
} from '~/libs/types/types.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';
import { selectOrdersBusiness } from '~/slices/orders/selectors.js';

import styles from './styles.module.scss';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const { orders, total, dataStatus } = useAppSelector(selectOrdersBusiness);

  const { setQueryParameters, removeQueryParameters, searchParameters } =
    useQueryParameters();

  const [endPointMarkers, setEndPointMarkers] = useState<
    google.maps.LatLngLiteral[]
  >([]);

  const [shownRoute, setShownRoute] = useState<PlaceLatLng>();

  const [filter, setFilter] = useState<{
    status: OrderStatusValues | null;
  }>({
    status: null,
  });

  const [pageIndex, setPageIndex] = useState<number>(DEFAULT_PAGE_INDEX);
  const mapReference = useRef<HTMLDivElement>(null);

  useAppMap({
    mapReference: mapReference,
    points: endPointMarkers,
    shownRoute,
    center: null,
    destination: null,
  });

  useEffect(() => {
    setQueryParameters({
      size: DEFAULT_PAGE_SIZE,
      page: pageIndex,
    });
  }, [pageIndex, setQueryParameters]);

  useEffect(() => {
    if (filter.status) {
      setQueryParameters({
        size: DEFAULT_PAGE_SIZE,
        page: DEFAULT_PAGE_INDEX,
        status: filter.status,
      });
    } else {
      removeQueryParameters('status');
    }
  }, [filter.status, removeQueryParameters, setQueryParameters]);

  useEffect(() => {
    void dispatch(ordersActions.getBusinessOrders(searchParameters.toString()));
  }, [dispatch, searchParameters]);

  useEffect(() => {
    setEndPointMarkers(
      orders.map((order) => jsonToLatLngLiteral(order.endPoint)),
    );
  }, [orders]);

  const totalPages = useMemo(
    () => Math.ceil(total / DEFAULT_PAGE_SIZE),
    [total],
  );

  const handleChangePage = useCallback((pageIndex: number) => {
    setPageIndex(pageIndex);
  }, []);

  const handleChangeFilter = useCallback(
    (filter: { status: OrderStatusValues | null }) => {
      setFilter(filter);
      setPageIndex(DEFAULT_PAGE_INDEX);
    },
    [],
  );

  const sortOrders = useMemo(
    () =>
      [...orders].sort(
        (a: OrderResponseDto, b: OrderResponseDto) =>
          new Date(a.scheduledTime).getTime() -
          new Date(b.scheduledTime).getTime(),
      ),
    [orders],
  );

  const isLoading = dataStatus === DataStatus.PENDING;

  if (isLoading) {
    return (
      <div className={styles.orders}>
        <Spinner />
      </div>
    );
  }

  if (orders.length === 0 && !filter.status) {
    return (
      <div className={styles.orders}>
        <p className={getValidClassNames(styles.textSign, 'textMdBold')}>
          There is not any orders yet
        </p>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      <div className={styles.orderlistArea}>
        <OrderFilter
          onChange={handleChangeFilter}
          label={filter.status ?? 'all'}
        />
        <OrderList orders={sortOrders} onSelect={setShownRoute} />
        <Pagination
          pageCount={totalPages}
          pageIndex={pageIndex}
          pageSize={DEFAULT_PAGE_SIZE}
          onClick={handleChangePage}
        />
      </div>
      <div className={styles.mapArea}>
        <div className={styles.mapWrapper}>
          <div className={styles.map} ref={mapReference} id="map" />
        </div>
      </div>
    </div>
  );
};

export { Orders };
