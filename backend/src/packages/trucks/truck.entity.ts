import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import {
  type TruckEntity as TruckEntityT,
  type TruckEntityDatabase,
} from './libs/types/types.js';

class TruckEntity implements IEntity {
  private id: number | null;

  private createdAt: Date;

  private updatedAt: Date;

  private manufacturer: string;

  private capacity: number;

  private pricePerKm: number;

  private licensePlateNumber: string;

  private year: string;

  private constructor({
    id,
    createdAt,
    updatedAt,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
  }: NullableProperties<TruckEntityDatabase, 'id'>) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.manufacturer = manufacturer;
    this.capacity = capacity;
    this.pricePerKm = pricePerKm;
    this.licensePlateNumber = licensePlateNumber;
    this.year = year;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
  }: TruckEntityT): TruckEntity {
    return new TruckEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      manufacturer,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
    });
  }

  public static initializeNew({
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
  }: Omit<TruckEntityT, 'id' | 'createdAt' | 'updatedAt'>): TruckEntity {
    return new TruckEntity({
      id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      manufacturer,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
    });
  }

  public toObject(): TruckEntityT {
    return {
      id: this.id as number,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      manufacturer: this.manufacturer,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      year: this.year,
    };
  }

  public toNewObject(): Omit<TruckEntityT, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      manufacturer: this.manufacturer,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      year: this.year,
    };
  }
}

export { TruckEntity };
