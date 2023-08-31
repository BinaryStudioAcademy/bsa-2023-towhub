import { type IService } from '~/libs/interfaces/service.interface';

import {
  type TruckAddRequestDto,
  type TruckEntityDatabase,
} from './libs/types/types.js';
import { TruckEntity } from './truck.entity.js';
import { type TruckRepository } from './truck.repository.js';

class TruckService implements IService {
  private repository: TruckRepository;

  public constructor(repository: TruckRepository) {
    this.repository = repository;
  }

  public async findById(id: number): Promise<TruckEntityDatabase | null> {
    return await this.repository.findById(id);
  }

  public async create(
    payload: TruckAddRequestDto,
  ): Promise<TruckEntityDatabase> {
    const newTruckEntity = TruckEntity.initializeNew({
      manufacturer: payload.manufacturer.value,
      year: payload.year.value,
      towType: payload.towType.value,
      capacity: payload.capacity,
      pricePerKm: payload.pricePerKm,
      licensePlateNumber: payload.licensePlateNumber,
    });

    return await this.repository.create(newTruckEntity.toNewObject());
  }

  public async update(parameters: {
    id: number;
    payload: Partial<TruckEntityDatabase>;
  }): Promise<TruckEntityDatabase> {
    return await this.repository.update(parameters);
  }

  public async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }
}

export { TruckService };
