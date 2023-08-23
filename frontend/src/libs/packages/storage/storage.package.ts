import { ApplicationError } from 'shared/build/index.js';

import { type ValueOf } from '~/libs/types/types.js';

import { type StorageKey } from './libs/enums/enums.js';
import { type IStorage } from './libs/interfaces/interfaces.js';

class Storage<T> implements IStorage {
  private store: globalThis.Storage;

  public constructor(store: globalThis.Storage) {
    this.store = store;
  }

  public set<K extends ValueOf<typeof StorageKey>>(key: K, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      this.store.setItem(key as string, serializedValue);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new ApplicationError( { message:`Error setting value in storage '${key}'`, cause: error }));
    }
  }

  public get<K extends ValueOf<typeof StorageKey>, R = T>(key: K): Promise<R | null> {
    try {
      const value = this.store.getItem(key as string);
  
      return value === null ? Promise.resolve(null) : Promise.resolve(JSON.parse(value) as R);
    } catch (error) {
      return Promise.reject(new ApplicationError( { message:`Error getting value from storage '${key}'`, cause: error }));
    }
  }

  public drop<K extends ValueOf<typeof StorageKey>>(key: K): Promise<void> {
    try {
      this.store.removeItem(key as string);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new ApplicationError( { message:`Error removing value from storage '${key}'`, cause: error }));
    }
  }

  public async has<K extends ValueOf<typeof StorageKey>>(key: K): Promise<boolean> {
    try {
      const value = await this.get(key);

      return Boolean(value);
    } catch {
      return false;
    }
  }
}

export { Storage };
