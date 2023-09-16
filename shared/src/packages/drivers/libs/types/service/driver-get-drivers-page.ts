import { type GetPaginatedPageQuery } from '~/libs/types/get-page-request-dto.type';

type DriverGetDriversPagePayload = {
  businessId: number;
  query: GetPaginatedPageQuery;
};

export { type DriverGetDriversPagePayload };
