import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { type DriverService } from '../drivers/driver.service.js';
import {
  type DriverAddResponseWithGroup,
  type DriverCreatePayload,
  type DriverGetAllResponseDto,
  type DriverUpdatePayload,
  type DriverUpdateResponseDto,
} from '../drivers/drivers.js';
import { BusinessEntity } from './business.entity.js';
import { type BusinessRepository } from './business.repository.js';
import {
  type BusinessAddResponseDto,
  type BusinessCreatePayload,
  type BusinessEntityT,
  type BusinessUpdateResponseDto,
} from './libs/types/types.js';

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  private driverService: DriverService;

  public constructor(
    businessRepository: BusinessRepository,
    driverService: DriverService,
  ) {
    this.businessRepository = businessRepository;
    this.driverService = driverService;
  }

  public async findById(id: number): Promise<BusinessEntityT | null> {
    const [business = null] = await this.businessRepository.find({ id });

    return business ? BusinessEntity.initialize(business).toObject() : null;
  }

  public async findByOwnerId(ownerId: number): Promise<BusinessEntityT | null> {
    const [business = null] = await this.businessRepository.find({ ownerId });

    return business ? BusinessEntity.initialize(business).toObject() : null;
  }

  public async create({
    payload,
    owner,
  }: BusinessCreatePayload): Promise<BusinessAddResponseDto> {
    if (owner.group.key !== UserGroupKey.BUSINESS) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_USER_GROUP,
      });
    }

    const { result: doesBusinessExist } =
      await this.businessRepository.checkExists({
        id: owner.id,
        taxNumber: payload.taxNumber,
        companyName: payload.companyName,
      });

    if (doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_ALREADY_EXISTS,
      });
    }

    const business = await this.businessRepository.create(
      BusinessEntity.initializeNew({ ...payload, ownerId: owner.id }),
    );

    return business.toObject();
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Pick<BusinessEntityT, 'companyName'>;
  }): Promise<BusinessUpdateResponseDto> {
    const foundBusinessById = await this.findById(id);

    if (!foundBusinessById) {
      throw new NotFoundError({});
    }

    const { result: doesBusinessExist } =
      await this.businessRepository.checkExists({
        companyName: payload.companyName,
      });

    if (doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.NAME_ALREADY_REGISTERED,
      });
    }

    const business = await this.businessRepository.update({
      id: foundBusinessById.id,
      payload,
    });

    return business.toObject();
  }

  public async delete(id: number): Promise<boolean> {
    const foundBusiness = await this.findById(id);

    if (!foundBusiness) {
      throw new NotFoundError({});
    }

    return await this.businessRepository.delete(id);
  }

  public async createDriver({
    payload,
    groupKey,
    id,
  }: DriverCreatePayload): Promise<DriverAddResponseWithGroup> {
    const doesBusinessExist = await this.findById(id);

    if (!doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.driverService.create({ payload, groupKey, id });
  }

  public async updateDriver({
    driverId,
    payload,
  }: DriverUpdatePayload): Promise<DriverUpdateResponseDto> {
    return await this.driverService.update({
      driverId,
      payload,
    });
  }

  public async findAllDriversById(
    id: number,
  ): Promise<DriverGetAllResponseDto> {
    return await this.driverService.findAllByBusinessId(id);
  }

  public async deleteDriver(driverId: number): Promise<boolean> {
    return await this.driverService.delete(driverId);
  }
}

export { BusinessService };
