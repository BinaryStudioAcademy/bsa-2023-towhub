import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpHeader } from '~/libs/packages/http/http.js';
import { type Http } from '~/libs/packages/http/http.package.js';
import { type ValueOf } from '~/libs/types/types.js';

import { TruckApiPath } from './libs/enums/enums.js';
import { type TruckEntity } from './libs/types/types.js';

class TruckApi {
  private baseUrl: string;

  private http: Http;

  public constructor(baseUrl: string, http: Http) {
    this.baseUrl = baseUrl;
    this.http = http;
  }

  public async addTruck(truck: Omit<TruckEntity, 'id'>): Promise<TruckEntity> {
    const path = this.getFullEndpoint(TruckApiPath.ROOT);

    const response = await this.http.load(path, {
      method: 'POST',
      headers: this.getHeaders(ContentType.JSON),
      payload: JSON.stringify(truck),
    });

    return (await response.json()) as TruckEntity;
  }

  private getHeaders(contentType: ValueOf<typeof ContentType>): Headers {
    const headers = new Headers();

    headers.append(HttpHeader.CONTENT_TYPE, contentType);

    return headers;
  }

  private getFullEndpoint(path: string): string {
    return `${this.baseUrl}${ApiPath.TRUCKS}${path}`;
  }
}

export { TruckApi };
