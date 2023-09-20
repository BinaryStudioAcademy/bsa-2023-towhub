import { type AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

import {
  type AsyncThunkConfig,
  type PaginationParameters,
  type PaginationWithSortingParameters,
  type SortMethodValue,
} from '~/libs/types/types.js';

import { useQueryParameters } from '../hooks.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type Properties<T, K> = {
  tableFetchCall: AsyncThunk<
    T,
    PaginationWithSortingParameters | (K & PaginationParameters),
    AsyncThunkConfig
  >;
  payload?: K;
  initialPageSize?: number | null;
  initialPageIndex?: number | null;
  sort?: SortMethodValue;
};

type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePage: () => void;
};

const useAppTable = <T, K>({
  tableFetchCall,
  payload,
  initialPageSize,
  initialPageIndex,
  sort = '',
}: Properties<T, K>): ReturnValue => {
  const [pageSize, changePageSize] = useState(
    initialPageSize ?? DEFAULT_PAGE_SIZE,
  );
  const [pageIndex, changePageIndex] = useState(
    initialPageIndex ?? DEFAULT_PAGE_INDEX,
  );
  const { setQueryParameters } = useQueryParameters();
  const dispatch = useAppDispatch();

  const updatePage = useCallback(() => {
    const actionPayload = {
      ...payload,
      page: pageIndex,
      size: pageSize,
      sort,
    };
    setQueryParameters(actionPayload);
    void dispatch(tableFetchCall(actionPayload));
  }, [
    dispatch,
    pageIndex,
    pageSize,
    payload,
    setQueryParameters,
    sort,
    tableFetchCall,
  ]);

  useEffect(() => {
    updatePage();
  }, [tableFetchCall, pageSize, pageIndex, dispatch, payload, updatePage]);

  return { pageSize, pageIndex, changePageSize, changePageIndex, updatePage };
};

export { useAppTable };
