import { type SingleValue } from 'react-select';

import {
  useAppDispatch,
  useAppTable,
  useCallback,
  useEffect,
  useQueryParameters,
} from '~/libs/hooks/hooks.js';
import { type ReturnValue } from '~/libs/hooks/use-app-table/libs/types/types.js';
import { type Queries } from '~/libs/hooks/use-query-parameters/use-query-parameters.hook.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';
import { getDriverOrdersPage } from '~/slices/orders/actions.js';

import { type OrderStatus } from '../../libs/enums/enums.js';
import { type OrderFindAllDriverOrdersResponseDto } from '../../libs/types/types.js';

const useFilter = (): {
  listHook: ReturnValue;
  handleChangeFilter: (option: SingleValue<SelectOption>) => void;
} => {
  const dispatch = useAppDispatch();
  const {
    setQueryParameters,
    getQueryParameters,
    searchParameters,
    removeQueryParameters,
  } = useQueryParameters();
  const { size: initialSize, page: initialPage } = getQueryParameters(
    'size',
    'page',
  ) as Queries;

  const listHook = useAppTable<
    OrderFindAllDriverOrdersResponseDto,
    { status?: typeof OrderStatus }
  >({
    tableFetchCall: getDriverOrdersPage,
    initialPageIndex: initialPage ? Number(initialPage) : null,
    initialPageSize: initialSize ? Number(initialSize) : null,
    filterName: 'status',
  });

  useEffect(() => {
    void dispatch(getDriverOrdersPage(searchParameters.toString()));
  }, [dispatch, searchParameters]);

  const handleChangeFilter = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (option?.value) {
        listHook.changePageIndex(0);
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
