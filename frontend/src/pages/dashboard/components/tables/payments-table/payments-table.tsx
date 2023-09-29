import { Input, Table } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppForm,
  useAppSelector,
  useAppTable,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { getPayments } from '~/slices/stripe/actions.js';
import {
  selectPayments,
  selectStripeDataStatus,
} from '~/slices/stripe/selectors.js';

import { columns } from './columns/columns.js';
import { EMPTY_TABLE_MESSAGE } from './libs/constants/empty-table-message.constant.js';
import {
  type FilterFields,
  type GetPaymentsResponse,
} from './libs/types/types.js';
import styles from './styles.module.scss';

const PaymentsTable: React.FC = () => {
  const { getQueryParameters } = useQueryParameters();

  const dataStatus = useAppSelector(selectStripeDataStatus);
  const { items, total } = useAppSelector(selectPayments);

  const { size: initialSize, page: initialPage } = getQueryParameters(
    ...([
      'size',
      'page',
      'intervalFrom',
      'intervalTo',
    ] satisfies (keyof FilterFields)[]),
  ) as FilterFields;

  const { pageSize, pageIndex, changePageSize, changePageIndex } = useAppTable<
    GetPaymentsResponse,
    Pick<FilterFields, 'intervalFrom' | 'intervalTo'>,
    null
  >({
    tableFetchCall: getPayments,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
  });

  const { control, errors } = useAppForm<{
    intervalFrom: string;
    intervalTo: string;
  }>({
    defaultValues: {
      intervalFrom: '',
      intervalTo: '',
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={getValidClassNames('h3', styles.title)}>Payments log</h2>
      </div>
      {items.length > 0 && (
        <form className={styles.form} noValidate>
          <Input
            name={'intervalFrom'}
            control={control}
            label="Period from"
            errors={errors}
            type="datetime-local"
          />
          <Input
            name={'intervalTo'}
            control={control}
            label="Period to"
            errors={errors}
            type="datetime-local"
          />
        </form>
      )}

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
