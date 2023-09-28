import { type AsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';

import { type HttpError } from '~/libs/packages/http/http.js';
import {
  type AsyncThunkConfig,
  type SortMethodValue,
} from '~/libs/types/types.js';

import { useQueryParameters } from '../hooks.js';
import { useAppDispatch } from '../use-app-dispatch/use-app-dispatch.hook.js';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './libs/constant.js';
import { type ReturnValue } from './libs/types/types.js';

type Properties<T, K, RejectValue extends HttpError | null> = {
  tableFetchCall: AsyncThunk<
    T,
    string | undefined,
    AsyncThunkConfig<RejectValue>
  >;
  payload?: K;
  initialPageSize?: number | null;
  initialPageIndex?: number | null;
  sort?: SortMethodValue | null;
  filterName?: string;
};

const useAppTable = <T, K, RejectValue extends HttpError | null>({
  tableFetchCall,
  payload,
  initialPageSize,
  initialPageIndex,
  sort,
  filterName,
}: Properties<T, K, RejectValue>): ReturnValue => {
  const [query, setQuery] = useState<string>();
  const [pageSize, onChangePageSize] = useState(
    initialPageSize ?? DEFAULT_PAGE_SIZE,
  );
  const [pageIndex, onChangePageIndex] = useState(
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

    if (query !== newQuery) {
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

  useEffect(() => {
    void dispatch(tableFetchCall(searchParameters.toString()));
  }, [dispatch, searchParameters, tableFetchCall]);

  return {
    pageSize,
    pageIndex,
    onChangePageSize,
    onChangePageIndex,
    updatePage,
  };
};

export { useAppTable };
