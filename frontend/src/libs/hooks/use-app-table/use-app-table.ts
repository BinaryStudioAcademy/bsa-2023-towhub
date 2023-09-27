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
  filterName?: string;
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
  filterName,
}: Properties<T, K>): ReturnValue => {
  const [query, setQuery] = useState<string>();
  const [pageSize, changePageSize] = useState(
    initialPageSize ?? DEFAULT_PAGE_SIZE,
  );
  const [pageIndex, changePageIndex] = useState(
    initialPageIndex ?? DEFAULT_PAGE_INDEX,
  );

  const { setQueryParameters, searchParameters, getQueryParameters } =
    useQueryParameters();
  const dispatch = useAppDispatch();

  const updatePage = useCallback(() => {
    const actionPayload = {
      ...payload,
      page: pageIndex,
      size: pageSize,
    };

    const queryParameters: Record<string, string | number> = sort
      ? { ...actionPayload, sort }
      : actionPayload;

    if (filterName) {
      const filterValue = getQueryParameters(filterName) as string;

      if (filterValue) {
        queryParameters[filterName] = filterValue;
      }
    }

    setQueryParameters(queryParameters);
    const newQuery = searchParameters.toString();

    if (query !== newQuery && newQuery) {
      setQuery(newQuery);
      void dispatch(tableFetchCall(newQuery));
    }
  }, [
    dispatch,
    filterName,
    getQueryParameters,
    pageIndex,
    pageSize,
    payload,
    query,
    searchParameters,
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
