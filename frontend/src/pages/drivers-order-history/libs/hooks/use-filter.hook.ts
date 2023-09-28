import { type SingleValue } from 'react-select';

import {
  useAppTable,
  useCallback,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { type ReturnValue } from '~/libs/hooks/use-app-table/libs/types/types.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type HttpError } from '~/libs/packages/http/http.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { getDriverOrdersPage } from '~/slices/orders/actions.js';

import { type OrderStatus } from '../../libs/enums/enums.js';
import { type OrderFindAllDriverOrdersResponseDto } from '../../libs/types/types.js';

const useFilter = (): {
  listHook: ReturnValue;
  handleChangeFilter: (option: SingleValue<SelectOption>) => void;
} => {
  const { setQueryParameters, getQueryParameters, removeQueryParameters } =
    useQueryParameters();
  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const listHook = useAppTable<
    OrderFindAllDriverOrdersResponseDto,
    { status?: typeof OrderStatus },
    HttpError
  >({
    tableFetchCall: getDriverOrdersPage,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
    filterName: 'status',
  });

  const handleChangeFilter = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (option?.value) {
        listHook.onChangePageIndex(0);
        setQueryParameters({
          size: listHook.pageSize,
          page: 0,
          status: option.value,
        });
      } else {
        removeQueryParameters('status');
      }
    },
    [listHook, removeQueryParameters, setQueryParameters],
  );

  return {
    listHook,
    handleChangeFilter,
  };
};

export { useFilter };
