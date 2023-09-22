import { type AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

import {
  type AsyncThunkConfig,
  type SortMethodValue,
} from '~/libs/types/types.js';

import { useQueryParameters } from '../hooks.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';

type Properties<T, K> = {
  tableFetchCall: AsyncThunk<T, string | undefined, AsyncThunkConfig>;
  payload?: K;
  initialPageSize?: number | null;
  initialPageIndex?: number | null;
  sort?: SortMethodValue | null;
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
  sort,
}: Properties<T, K>): ReturnValue => {
  const [pageSize, changePageSize] = useState(
    initialPageSize ?? DEFAULT_PAGE_SIZE,
  );
  const [pageIndex, changePageIndex] = useState(
    initialPageIndex ?? DEFAULT_PAGE_INDEX,
  );

  const { setQueryParameters, searchParameters } = useQueryParameters();
  const dispatch = useAppDispatch();

  const updatePage = useCallback(() => {
    const actionPayload = {
      ...payload,
      page: pageIndex,
      size: pageSize,
    };

    const queryParameters = sort ? { ...actionPayload, sort } : actionPayload;

    setQueryParameters(queryParameters);
  }, [pageIndex, pageSize, payload, setQueryParameters, sort]);

  useEffect(() => {
    updatePage();
  }, [pageSize, pageIndex, dispatch, payload, updatePage]);

  useEffect(() => {
    void dispatch(tableFetchCall(searchParameters.toString()));
  }, [dispatch, searchParameters, tableFetchCall]);

  return { pageSize, pageIndex, changePageSize, changePageIndex, updatePage };
};

export { useAppTable };
