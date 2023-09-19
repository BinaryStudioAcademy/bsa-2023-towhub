import { type AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

import {
  type AsyncThunkConfig,
  type PaginationParameters,
} from '~/libs/types/types.js';

import { useQueryParameters } from '../hooks.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type Properties<T, K> = {
  tableFetchCall: AsyncThunk<
    T,
    (K & PaginationParameters) | PaginationParameters,
    AsyncThunkConfig
  >;
  payload?: K;
  initialPageSize?: number | null;
  initialPageIndex?: number | null;
};

type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePage: () => void;
};

const useAppTable = <T, K = PaginationParameters>({
  tableFetchCall,
  payload,
  initialPageSize,
  initialPageIndex,
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
    const actionPayload = { ...payload, page: pageIndex, size: pageSize };
    setQueryParameters(actionPayload);
    void dispatch(tableFetchCall(actionPayload));
  }, [
    dispatch,
    pageIndex,
    pageSize,
    payload,
    tableFetchCall,
    setQueryParameters,
  ]);

  useEffect(() => {
    updatePage();
  }, [tableFetchCall, pageSize, pageIndex, dispatch, payload, updatePage]);

  return { pageSize, pageIndex, changePageSize, changePageIndex, updatePage };
};

export { useAppTable };
