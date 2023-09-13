import { type BusinessGetAllDriversRequestParameters } from '../types.js';

type DriverGetDriversPagePayload = {
  page: number;
  size: number;
} & BusinessGetAllDriversRequestParameters;

export { type DriverGetDriversPagePayload };
