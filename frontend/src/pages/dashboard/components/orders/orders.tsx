import { type Libraries, LoadScript } from '@react-google-maps/api';

import {
  Map,
  OrderFilter,
  OrderList,
  Pagination,
  Spinner,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum';
import { jsonToLatLngLiteral } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  useQueryParameters,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '~/libs/hooks/use-app-table/libs/constant.js';
import { config } from '~/libs/packages/config/config.js';
import {
  type OrderQueryParameters,
  type OrderResponseDto,
} from '~/libs/types/types.js';
import { actions as ordersActions } from '~/slices/orders/orders.js';
import { selectOrders } from '~/slices/orders/selectors.js';

import styles from './styles.module.scss';

const libraries: Libraries = ['places'];

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();

  const { orders, total, dataStatus } = useAppSelector(selectOrders);

  const { setQueryParameters, searchParameters } = useQueryParameters();

  const [endPointMarkers, setEndPointMarkers] =
    useState<google.maps.LatLngLiteral[]>();

  const [shownRoute, setShownRoute] = useState<{
    startPoint: google.maps.LatLngLiteral;
    endPoint: google.maps.LatLngLiteral;
  }>();

  const [filter, setFilter] = useState<{
    status: OrderQueryParameters['status'];
  }>({
    status: 'all',
  });

  const [pageIndex, setPageIndex] = useState<number>(DEFAULT_PAGE_INDEX);

  useEffect(() => {
    setQueryParameters({
      size: DEFAULT_PAGE_SIZE,
      page: pageIndex,
      status: filter.status,
    });
  }, [dispatch, filter.status, pageIndex, setQueryParameters]);

  useEffect(() => {
    void dispatch(ordersActions.getOrdersBusiness(searchParameters.toString()));
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
    (filter: { status: OrderQueryParameters['status'] }) => {
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

  return (
    <div className={styles.orders}>
      <LoadScript
        googleMapsApiKey={config.ENV.API.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.orderlistArea}>
            <OrderFilter onChange={handleChangeFilter} />
            <OrderList orders={sortOrders} select={setShownRoute} />
            <Pagination
              pageCount={totalPages}
              pageIndex={pageIndex}
              pageSize={DEFAULT_PAGE_SIZE}
              onClick={handleChangePage}
            />
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.mapArea}>
            <div className={styles.mapWrapper}>
              <Map
                zoom={10}
                className={styles.map}
                markers={endPointMarkers}
                shownRoute={shownRoute}
              />
            </div>
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export { Orders };
