import { Storage } from './storage.package.js';

const localStorage = new Storage(window.localStorage);
const sessionStorage = new Storage(window.sessionStorage);

export { localStorage, sessionStorage };
export { StorageKey } from './libs/enums/enums.js';
export { type IStorage } from './libs/interfaces/interfaces.js';
