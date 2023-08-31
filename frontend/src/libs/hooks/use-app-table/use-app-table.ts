import { useEffect, useState } from 'react';

import { type AppThunk } from '~/libs/types/types.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type EntityPagination<T> = {
  items: T[];
  total: number;
};

type Properties<T> = {
  tableFetchCall: (a: {
    pageSize: number;
    pageIndex: number;
  }) => AppThunk<EntityPagination<T>>;
  initialPageSize: number;
  initialPageIndex: number;
};

type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useAppTable = <T>({
  tableFetchCall,
  initialPageSize = DEFAULT_PAGE_SIZE,
  initialPageIndex = DEFAULT_PAGE_INDEX,
}: Properties<T>): ReturnValue => {
  const [pageSize, changePageSize] = useState(initialPageSize);
  const [pageIndex, changePageIndex] = useState(initialPageIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tableFetchCall({ pageSize, pageIndex }));
  }, [tableFetchCall, pageSize, pageIndex, dispatch]);

  return { pageSize, pageIndex, changePageSize, changePageIndex };
};

export { useAppTable };
