import { type AsyncThunk } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';

import {
  type AsyncThunkConfig,
  type PaginationPayload,
} from '~/libs/types/types.js';

import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type Properties<T, K> = {
  tableFetchCall: AsyncThunk<T, K & PaginationPayload, AsyncThunkConfig>;
  payload: K;
  initialPageSize?: number;
  initialPageIndex?: number;
};

type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
};

const useAppTable = <T, K>({
  tableFetchCall,
  payload,
  initialPageSize = DEFAULT_PAGE_SIZE,
  initialPageIndex = DEFAULT_PAGE_INDEX,
}: Properties<T, K>): ReturnValue => {
  const [pageSize, changePageSize] = useState(initialPageSize);
  const [pageIndex, changePageIndex] = useState(initialPageIndex);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(tableFetchCall({ ...payload, pageSize, pageIndex }));
  }, [tableFetchCall, pageSize, pageIndex, dispatch, payload]);

  return { pageSize, pageIndex, changePageSize, changePageIndex };
};

export { useAppTable };
