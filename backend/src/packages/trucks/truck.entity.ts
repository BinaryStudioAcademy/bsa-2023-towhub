import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties, type ValueOf } from '~/libs/types/types.js';

import {
  type TruckManufacturer,
  type TruckTowType,
} from './libs/enums/enums.js';
import {
  type TruckDatabaseModel,
  type TruckEntity as TruckEntityT,
} from './libs/types/types.js';

class TruckEntity implements IEntity {
  private id: number | null;

  private manufacturer: ValueOf<typeof TruckManufacturer>;

  private towType: ValueOf<typeof TruckTowType>;

  private year: number;

  private licensePlateNumber: string;

  private capacity: number;

  private pricePerKm: number;

  private businessId: number;

  private constructor({
    id,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
    businessId,
  }: NullableProperties<TruckEntityT, 'id'>) {
    this.id = id;
    this.manufacturer = manufacturer;
    this.capacity = capacity;
    this.pricePerKm = pricePerKm;
    this.licensePlateNumber = licensePlateNumber;
    this.year = year;
    this.towType = towType;
    this.businessId = businessId;
  }

  public static initialize({
    id,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
    businessId,
  }: TruckDatabaseModel): TruckEntity {
    return new TruckEntity({
      id,
      manufacturer: manufacturer as ValueOf<typeof TruckManufacturer>,
      towType: towType as ValueOf<typeof TruckTowType>,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
      businessId,
    });
  }

  public static initializeNew({
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
    businessId,
  }: Omit<TruckDatabaseModel, 'id'>): TruckEntity {
    return new TruckEntity({
      id: null,
      manufacturer: manufacturer as ValueOf<typeof TruckManufacturer>,
      towType: towType as ValueOf<typeof TruckTowType>,
      capacity,
      pricePerKm,
      licensePlateNumber,
      year,
      businessId,
    });
  }

  public toObject(): TruckEntityT {
    return {
      id: this.id as number,
      manufacturer: this.manufacturer,
      towType: this.towType,
      year: this.year,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      businessId: this.businessId,
    };
  }

  public toNewObject(): Omit<TruckEntityT, 'id'> {
    return {
      manufacturer: this.manufacturer,
      towType: this.towType,
      year: this.year,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      businessId: this.businessId,
    };
  }
}

export { TruckEntity };
