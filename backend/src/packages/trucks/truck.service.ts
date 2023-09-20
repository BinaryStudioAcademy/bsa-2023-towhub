import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { type EntityPagination } from '~/libs/types/types.js';

import { type GetPaginatedPageQuery } from '../business/libs/types/types.js';
import {
  type DriverHaveAccessToTruck,
  type TruckEntity as TruckEntityT,
} from './libs/types/types.js';
import { TruckEntity } from './truck.entity.js';
import { type TruckRepository } from './truck.repository.js';

class TruckService implements IService {
  private repository: TruckRepository;

  public constructor(repository: TruckRepository) {
    this.repository = repository;
  }

  public async findById(id: number): Promise<TruckEntityT | null> {
    const [truck = null] = await this.repository.findById(id);

    return truck ? TruckEntity.initialize(truck).toObject() : null;
  }

  public async create(
    payload: Omit<TruckEntityT, 'id'>,
  ): Promise<TruckEntityT> {
    const existingTruck = await this.repository.find(
      payload.licensePlateNumber,
    );

    if (existingTruck.length > 0) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.TRUCK_EXISTS,
      });
    }

    const [result] = await this.repository.create(payload);

    return TruckEntity.initialize(result).toObject();
  }

  public async update(
    id: number,
    payload: Partial<TruckEntityT>,
  ): Promise<TruckEntityT> {
    const truck = await this.findById(id);

    if (!truck) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.NOT_FOUND,
      });
    }

    const updatePayload = { ...truck, ...payload };

    const [result] = await this.repository.update(id, updatePayload);

    return TruckEntity.initialize(result).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  public async getAll(): Promise<TruckEntityT[]> {
    const result = await this.repository.findAll();

    return result.map((element) => TruckEntity.initialize(element).toObject());
  }

  public async addTrucksToDriver(
    userId: number,
    truckIds: number[],
  ): Promise<void> {
    const uniqueItems = [...new Set(truckIds)];
    const driverTrucks: DriverHaveAccessToTruck[] = uniqueItems.map(
      (truckId) => ({
        userId,
        truckId,
      }),
    );

    await this.repository.addTruckToDriver(driverTrucks);
  }

  public async findAllByBusinessId(
    businessId: number,
    query: GetPaginatedPageQuery,
  ): Promise<EntityPagination<TruckEntityT>> {
    const data = await this.repository.findAllByBusinessId(businessId, query);

    const items = data.map((it) => TruckEntity.initialize(it).toObject());

    const total = await this.repository.getTotal(businessId);

    return { items, total };
  }
}

export { TruckService };
