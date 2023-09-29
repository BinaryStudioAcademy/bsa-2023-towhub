import { type Coordinates } from './types.js';

type LocationChangeHandler = (location: Coordinates, address: string) => void;

export { type LocationChangeHandler };
