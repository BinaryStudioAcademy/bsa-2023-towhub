import { type ILogger } from '~/libs/packages/logger/logger.js';

import {
  type GeolocationCache,
  type GeolocationLatLng,
} from './libs/types/types.js';

class GeolocationCacheService {
  private static instance: GeolocationCacheService | null = null;

  private cache: GeolocationCache;

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): GeolocationCacheService {
    if (!GeolocationCacheService.instance) {
      GeolocationCacheService.instance = new this();
    }

    return GeolocationCacheService.instance;
  }

  public setCache(key: number, value: GeolocationLatLng): void {
    this.cache.set(key, value);
  }

  public getCache(key: number): GeolocationLatLng | undefined {
    return this.cache.get(key);
  }

  public deleteCache(key: number): boolean {
    return this.cache.delete(key);
  }

  public logCache(logger: ILogger): void {
    for (const cacheEntry of this.cache.entries()) {
      logger.info(JSON.stringify(cacheEntry, null, 2));
    }
  }
}

export { GeolocationCacheService };
