import { Storage } from './storage.package.js';

const LocalStorage = new Storage(window.localStorage);
const SessionStorage = new Storage(window.sessionStorage);

export { LocalStorage, SessionStorage };
export { StorageKey } from './libs/enums/enums.js';
export { type IStorage } from './libs/interfaces/interfaces.js';
