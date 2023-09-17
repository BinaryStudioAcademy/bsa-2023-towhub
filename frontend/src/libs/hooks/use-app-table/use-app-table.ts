import { type AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

import {
  type AsyncThunkConfig,
  type PaginationParameters,
} from '~/libs/types/types.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type Properties<T, K> = {
  tableFetchCall: AsyncThunk<
    T,
    (K & PaginationParameters) | PaginationParameters,
    AsyncThunkConfig
  >;
  payload?: K;
  initialPageSize?: number;
  initialPageIndex?: number;
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
  initialPageSize = DEFAULT_PAGE_SIZE,
  initialPageIndex = DEFAULT_PAGE_INDEX,
}: Properties<T, K>): ReturnValue => {
  const [pageSize, changePageSize] = useState(initialPageSize);
  const [pageIndex, changePageIndex] = useState(initialPageIndex);
  const dispatch = useAppDispatch();

  const updatePage = useCallback(() => {
    void dispatch(
      tableFetchCall({ ...payload, page: pageIndex, size: pageSize }),
    );
  }, [dispatch, pageIndex, pageSize, payload, tableFetchCall]);

  useEffect(() => {
    updatePage();
  }, [tableFetchCall, pageSize, pageIndex, dispatch, payload, updatePage]);

  return { pageSize, pageIndex, changePageSize, changePageIndex, updatePage };
};

export { useAppTable };
