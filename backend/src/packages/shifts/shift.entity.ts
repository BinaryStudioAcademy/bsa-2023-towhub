import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type TruckEntity } from '../trucks/libs/types/types.js';
import { type UserEntityT } from '../users/users.js';
import {
  type ShiftDatabaseModel,
  type ShiftEntity as ShiftEntityT,
} from './libs/types/types.js';

class ShiftEntity implements IEntity {
  private 'id': number | null;

  private 'startDate': Date;

  private 'endDate': Date | null;

  private 'driverId': UserEntityT['id'];

  private 'truckId': TruckEntity['id'];

  private constructor({
    id,
    startDate,
    endDate,
    driverId,
    truckId,
  }: NullableProperties<ShiftEntityT, 'id' | 'endDate'>) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.driverId = driverId;
    this.truckId = truckId;
  }

  public static initialize({
    id,
    startDate,
    endDate,
    driverId,
    truckId,
  }: ShiftDatabaseModel): ShiftEntity {
    return new ShiftEntity({
      id,
      startDate,
      endDate,
      driverId,
      truckId,
    });
  }

  public static initializeNew({
    startDate,
    driverId,
    truckId,
  }: Pick<ShiftEntityT, 'startDate' | 'driverId' | 'truckId'>): ShiftEntity {
    return new ShiftEntity({
      id: null,
      startDate,
      endDate: null,
      driverId,
      truckId,
    });
  }

  public toObject(): ShiftEntityT {
    return {
      id: this.id as number,
      startDate: this.startDate,
      endDate: this.endDate,
      driverId: this.driverId,
      truckId: this.truckId,
    };
  }

  public toNewObject(): Omit<ShiftEntityT, 'id'> {
    return {
      startDate: this.startDate,
      endDate: this.endDate,
      driverId: this.driverId,
      truckId: this.truckId,
    };
  }
}

export { ShiftEntity };
