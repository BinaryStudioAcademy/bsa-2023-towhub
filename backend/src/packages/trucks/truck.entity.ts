import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

type TruckEntityT = {
  id: number | null;
  createdAt: string;
  updatedAt: string;
  manufacturer: {
    label: string;
    value: string;
  };
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: string;
  towType: {
    label: string;
    value: string;
  };
};

class TruckEntity implements IEntity {
  private id: number | null;

  private createdAt: Date;

  private updatedAt: Date;

  private manufacturer: {
    label: string;
    value: string;
  };

  private capacity: number;

  private pricePerKm: number;

  private licensePlateNumber: string;

  private year: string;

  private towType: {
    label: string;
    value: string;
  };

  private constructor({
    id,
    createdAt,
    updatedAt,
    manufacturer,
    capacity,
    pricePerKm,
    licensePlateNumber,
    year,
    towType,
  }: NullableProperties<TruckEntityT, 'id'>) {
    this.id = id;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.manufacturer = manufacturer;
    this.capacity = capacity;
    this.pricePerKm = pricePerKm;
    this.licensePlateNumber = licensePlateNumber;
    this.year = year;
    this.towType = towType;
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
    towType,
  }: TruckEntityT): TruckEntity {
    return new TruckEntity({
      id,
      createdAt,
      updatedAt,
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
  }: Omit<TruckEntityT, 'id' | 'createdAt' | 'updatedAt'>): TruckEntity {
    return new TruckEntity({
      id: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      manufacturer: this.manufacturer,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      year: this.year,
      towType: this.towType,
    };
  }

  public toNewObject(): Omit<TruckEntityT, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      manufacturer: this.manufacturer,
      capacity: this.capacity,
      pricePerKm: this.pricePerKm,
      licensePlateNumber: this.licensePlateNumber,
      year: this.year,
      towType: this.towType,
    };
  }
}

export { TruckEntity };
