import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { type PaginationWithSortingParameters } from '~/libs/types/types.js';
import { type DriverService } from '~/packages/drivers/drivers.js';

import { FileVerificationStatus } from '../file-verification-status/libs/enums/enums.js';
import { VerificationError } from '../file-verification-status/libs/exceptions/exceptions.js';
import { type UsersTrucksService } from '../users-trucks/users-trucks.js';
import { TruckStatus } from './libs/enums/enums.js';
import {
  type TruckEntityT,
  type TruckGetAllResponseDto,
} from './libs/types/types.js';
import { TruckEntity } from './truck.entity.js';
import { type TruckRepository } from './truck.repository.js';

type Constructor = {
  repository: TruckRepository;
  usersTrucksService: UsersTrucksService;
  driverService: DriverService;
};

class TruckService implements IService {
  private repository: TruckRepository;

  private usersTrucksService: UsersTrucksService;

  private driverService: DriverService;

  public constructor({
    repository,
    usersTrucksService,
    driverService,
  }: Constructor) {
    this.repository = repository;
    this.usersTrucksService = usersTrucksService;
    this.driverService = driverService;
  }

  public async checkIsNotAvailableById(id: number): Promise<boolean> {
    const truck = await this.findById(id);

    return !truck || truck.status !== TruckStatus.AVAILABLE;
  }

  public async findById(id: number): Promise<TruckEntityT | null> {
    const [truck = null] = await this.repository.findById(id);

    return truck ? TruckEntity.initialize(truck).toObject() : null;
  }

  public async findTrucksByUserId(userId: number): Promise<TruckEntityT[]> {
    const driver = await this.driverService.findByUserId(userId);

    if (!driver?.verificationStatus) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    if (driver.verificationStatus.status !== FileVerificationStatus.VERIFIED) {
      throw new VerificationError({
        verificationStatus: driver.verificationStatus.status,
      });
    }

    return await this.usersTrucksService.findTrucksByUserId(userId);
  }

  public async findAllByBusinessId(
    businessId: number,
    query: PaginationWithSortingParameters,
  ): Promise<TruckGetAllResponseDto> {
    const data = await this.repository.findAllByBusinessId(businessId, query);

    const items = data.map((it) => TruckEntity.initialize(it).toObject());

    const total = await this.repository.getTotal(businessId);

    return { items, total };
  }

  public async create(
    payload: Omit<TruckEntityT, 'id' | 'createdAt' | 'status'>,
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
    payload: Partial<Omit<TruckEntityT, 'createdAt'>>,
  ): Promise<TruckEntityT> {
    const truck = await this.findById(id);

    if (!truck) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.NOT_FOUND,
      });
    }

    const [result] = await this.repository.update(id, payload);

    return TruckEntity.initialize(result).toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  public async getAll(): Promise<TruckEntityT[]> {
    const result = await this.repository.findAll();

    return result.map((element) => TruckEntity.initialize(element).toObject());
  }
}

export { TruckService };
