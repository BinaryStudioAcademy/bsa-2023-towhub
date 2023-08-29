import { useCallback, useSearchParameters } from '../hooks.js';

type Queries = Record<string, string | null>;

type Parameters = Record<string, string | number>;

type ReturnType = {
  getQueryParameters: (...keys: string[]) => string | Queries | null;
  setQueryParameters: (parameters: Parameters) => void;
  removeQueryParameters: (...keys: string[]) => void;
};

const useQueryParameters = (): ReturnType => {
  const [searchParameters, setSearchParameters] = useSearchParameters();

  const getQueryParameters = useCallback(
    (...keys: string[]): Queries | string | null => {
      if (keys.length > 1) {
        const result: Queries = {};
        for (const key of keys) {
          result[key] = searchParameters.get(key);
        }

        return result;
      } else {
        return searchParameters.get(keys[0]);
      }
    },
    [searchParameters],
  );

  const setQueryParameters = useCallback(
    (parameters: Parameters): void => {
      const newSearchParameters = new URLSearchParams(searchParameters);
      for (const key in parameters) {
        newSearchParameters.set(key, parameters[key].toString());
      }
      setSearchParameters(newSearchParameters);
    },
    [searchParameters, setSearchParameters],
  );

  const removeQueryParameters = useCallback(
    (...keys: string[]): void => {
      const newSearchParameters = new URLSearchParams(searchParameters);

      if (keys.length > 1) {
        for (const key of keys) {
          newSearchParameters.delete(key);
        }
      } else {
        newSearchParameters.delete(keys[0]);
      }

      setSearchParameters(newSearchParameters);
    },
    [searchParameters, setSearchParameters],
  );

  return { getQueryParameters, setQueryParameters, removeQueryParameters };
};

export { useQueryParameters };
