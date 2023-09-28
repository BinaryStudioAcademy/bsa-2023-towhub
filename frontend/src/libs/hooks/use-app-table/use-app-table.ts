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
};

type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePage: () => void;
};

const useAppTable = <T, K, RejectValue extends HttpError | null>({
  tableFetchCall,
  payload,
  initialPageSize,
  initialPageIndex,
  sort,
}: Properties<T, K, RejectValue>): ReturnValue => {
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

    void dispatch(tableFetchCall(searchParameters.toString()));
  }, [
    dispatch,
    pageIndex,
    pageSize,
    payload,
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
