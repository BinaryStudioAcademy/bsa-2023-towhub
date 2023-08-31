import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties, type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
} from './libs/enums/enums.js';
import { type TruckEntityT } from './libs/types/types.js';

class TruckEntity implements IEntity {
  private id: TruckEntityT['id'] | null;

  private createdAt: Date;

  private updatedAt: Date;

  private manufacturer: string;

  private towType: string;

  private year: string;

  private licensePlateNumber: string;

  private capacity: number;

  private pricePerKm: number;

  private constructor({
    id,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
  }: NullableProperties<TruckEntityT, 'id'>) {
    this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.manufacturer = manufacturer;
    this.capacity = capacity;
    this.pricePerKm = pricePerKm;
    this.licensePlateNumber = licensePlateNumber;
    this.year = year;
    this.towType = towType;
  }

  public static initialize({
    id,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
  }: TruckEntityT): TruckEntity {
    return new TruckEntity({
      id,
      manufacturer,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
      towType,
    });
  }

  public static initializeNew({
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
  }: Omit<TruckEntityT, 'id'>): TruckEntity {
    return new TruckEntity({
      id: null,
      manufacturer,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
      towType,
    });
  }

  public toObject(): TruckEntityT {
    return {
      id: this.id as number,
      manufacturer: this.manufacturer as ValueOf<typeof TruckManufacturer>,
      towType: this.towType as ValueOf<typeof TruckTowType>,
      year: this.year,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
    };
  }

  public toNewObject(): Omit<TruckEntityT, 'id'> {
    return {
      manufacturer: this.manufacturer as ValueOf<typeof TruckManufacturer>,
      towType: this.towType as ValueOf<typeof TruckTowType>,
      year: this.year,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
    };
  }
}

export { TruckEntity };
