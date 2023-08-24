import { ApplicationError } from 'shared/build/index.js';

import { type StorageKey } from './libs/enums/enums.js';
import { type IStorage } from './libs/interfaces/interfaces.js';

type StorageKeyValue = keyof typeof StorageKey;

class Storage implements IStorage {
  private store: globalThis.Storage;

  public constructor(store: globalThis.Storage) {
    this.store = store;
  }

  public set<T>(key: StorageKeyValue, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      this.store.setItem(key as string, serializedValue);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        new ApplicationError({
          message: `Error setting value in storage '${key}'`,
          cause: error,
        }),
      );
    }
  }

  public get<T>(key: StorageKeyValue): Promise<T | null> {
    try {
      const value = this.store.getItem(key as string);

      return value === null
        ? Promise.resolve(null)
        : Promise.resolve(JSON.parse(value) as T);
    } catch (error) {
      return Promise.reject(
        new ApplicationError({
          message: `Error getting value from storage '${key}'`,
          cause: error,
        }),
      );
    }
  }

  public drop(key: StorageKeyValue): Promise<void> {
    try {
      this.store.removeItem(key as string);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        new ApplicationError({
          message: `Error removing value from storage '${key}'`,
          cause: error,
        }),
      );
    }
  }

  public async has(key: StorageKeyValue): Promise<boolean> {
    try {
      const value = await this.get(key);

      return Boolean(value);
    } catch {
      return false;
    }
  }
}

export { Storage };
