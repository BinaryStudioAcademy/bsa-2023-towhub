import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/service.interface';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import {
  reverseTransformTruckEntity,
  transformTruckEntity,
} from './libs/helper/transform-truck-entity.js';
import { type TruckEntityT } from './libs/types/types.js';
import { TruckEntity } from './truck.entity.js';
import { type TruckRepository } from './truck.repository.js';

class TruckService implements IService {
  private repository: TruckRepository;

  public constructor(repository: TruckRepository) {
    this.repository = repository;
  }

  public async findById(id: number): Promise<TruckEntityT | null> {
    const result = await this.repository.findById(id);

    return result.length > 0
      ? TruckEntity.initialize(transformTruckEntity(result[0])).toObject()
      : null;
  }

  public async create(payload: TruckEntityT): Promise<TruckEntityT> {
    const existingTruck = await this.repository.find(
      payload.licensePlateNumber,
    );

    if (existingTruck.length > 0) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.TRUCK_EXISTS,
      });
    }

    const newTruckEntity = TruckEntity.initializeNew(payload);

    const [result] = await this.repository.create(newTruckEntity.toNewObject());

    return TruckEntity.initialize(transformTruckEntity(result)).toObject();
  }

  public async update(
    id: number,
    payload: Partial<TruckEntityT>,
  ): Promise<TruckEntityT> {
    const truck = await this.findById(id);

    if (!truck) {
      throw new NotFoundError({ message: 'Truck not found' });
    }

    if (truck.licensePlateNumber === payload.licensePlateNumber) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.TRUCK_EXISTS,
      });
    }

    const updatePayload = { ...truck, ...payload };

    const [result] = await this.repository.update(
      id,
      reverseTransformTruckEntity(updatePayload),
    );

    return TruckEntity.initialize(transformTruckEntity(result)).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  public async getAll(): Promise<TruckEntityT[]> {
    const result = await this.repository.findAll();

    return result.map((element) => transformTruckEntity(element));
  }
}

export { TruckService };
