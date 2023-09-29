import { Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppSelector,
  useAppTable,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type PaginationParameters } from '~/libs/types/types.js';
import { getPayments } from '~/slices/stripe/actions.js';
import {
  selectPayments,
  selectStripeDataStatus,
} from '~/slices/stripe/selectors.js';

import { columns } from './columns/columns.js';
import { EMPTY_TABLE_MESSAGE } from './libs/constants/empty-table-message.constant.js';
import { type GetPaymentsResponse } from './libs/types/types.js';
import styles from './styles.module.scss';

const PaymentsTable: React.FC = () => {
  const { getQueryParameters } = useQueryParameters();

  const dataStatus = useAppSelector(selectStripeDataStatus);
  const { items, total } = useAppSelector(selectPayments);

  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    GetPaymentsResponse,
    PaginationParameters,
    null
  >({
    tableFetchCall: getPayments,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={getValidClassNames('h3', styles.title)}>Payments log</h2>
      </div>
      <Table
        data={items}
        totalRow={total}
        columns={columns}
        isLoading={dataStatus === DataStatus.PENDING}
        pageIndex={pageIndex}
        pageSize={pageSize}
        changePageIndex={changePageIndex}
        changePageSize={changePageSize}
        emptyTableMessage={EMPTY_TABLE_MESSAGE}
      />
    </div>
  );
};

export { PaymentsTable };
