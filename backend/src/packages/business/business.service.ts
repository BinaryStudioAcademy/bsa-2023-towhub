import {
  EntityAccessDeniedError,
  NotFoundError,
} from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { type PaginationWithSortingParameters } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { type DriverService } from '../drivers/driver.service.js';
import {
  type DriverAddResponseWithGroup,
  type DriverCreateUpdateRequestDto,
  type DriverCreateUpdateResponseDto,
  type DriverGetAllResponseDto,
} from '../drivers/drivers.js';
import { type ShiftEntityT } from '../shifts/shift.js';
import {
  type TruckAddRequestDto,
  type TruckEntityT,
  type TruckGetAllResponseDto,
} from '../trucks/libs/types/types.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserService } from '../users/user.service.js';
import {
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from '../users/users.js';
import { BusinessEntity } from './business.entity.js';
import { type BusinessRepository } from './business.repository.js';
import {
  type BusinessAddResponseDto,
  type BusinessCreatePayload,
  type BusinessEditDto,
  type BusinessEditResponseDto,
  type BusinessEntityT,
  type GetPaginatedPageQuery,
} from './libs/types/types.js';

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  private driverService: DriverService;

  private truckService: TruckService;

  private userService: UserService;

  public constructor({
    businessRepository,
    driverService,
    truckService,
    userService,
  }: {
    businessRepository: BusinessRepository;
    driverService: DriverService;
    truckService: TruckService;
    userService: UserService;
  }) {
    this.businessRepository = businessRepository;
    this.driverService = driverService;
    this.truckService = truckService;
    this.userService = userService;
  }

  public async findById(
    id: number,
    { owner }: { owner: UserEntityObjectWithGroupT },
  ): Promise<BusinessEntityT | null> {
    const [foundBusiness = null] = await this.businessRepository.find({ id });

    if (!foundBusiness) {
      return null;
    }

    const isOwner = this.checkIsOwner({
      userId: owner.id,
      business: foundBusiness,
    });

    if (!isOwner) {
      throw new EntityAccessDeniedError({});
    }

    return BusinessEntity.initialize(foundBusiness).toObject();
  }

  public async findByOwnerId(ownerId: number): Promise<BusinessEntityT | null> {
    const [business = null] = await this.businessRepository.find({ ownerId });

    return business ? BusinessEntity.initialize(business).toObject() : null;
  }

  public async checkIsExistingBusiness(
    key: Pick<BusinessEntityT, 'taxNumber'>,
  ): Promise<boolean> {
    const { result: doesBusinessExist } =
      await this.businessRepository.checkExists(key);

    return doesBusinessExist;
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

  public checkIsOwner({
    userId,
    business,
  }: {
    userId: UserEntityObjectWithGroupT['id'];
    business: BusinessEntityT;
  }): boolean {
    return userId === business.ownerId;
  }

  public async update({
    userId,
    payload,
  }: {
    userId: number;
    payload: BusinessEditDto;
  }): Promise<BusinessEditResponseDto> {
    const foundBusinessByUserId = await this.findByOwnerId(userId);
    const { taxNumber, companyName, firstName, lastName, phone, email } =
      payload;

    if (!foundBusinessByUserId) {
      throw new NotFoundError({});
    }

    const business = await this.businessRepository.update({
      id: foundBusinessByUserId.id,
      payload: { taxNumber, companyName },
    });

    const updatedBusiness = business.toObject();

    const updatedUser = await this.userService.update(userId, {
      firstName,
      lastName,
      phone,
      email,
    });

    return { ...updatedUser, business: updatedBusiness };
  }

  public async delete(owner: UserEntityObjectWithGroupT): Promise<boolean> {
    const foundBusiness = await this.findByOwnerId(owner.id);

    if (!foundBusiness) {
      throw new NotFoundError({});
    }

    return await this.businessRepository.delete(foundBusiness.id);
  }

  public async createDriver(
    payload: DriverCreateUpdateRequestDto,
    ownerId: number,
  ): Promise<DriverAddResponseWithGroup> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.driverService.create({
      payload,
      businessId: business.id,
    });
  }

  public async updateDriver(
    payload: DriverCreateUpdateRequestDto,
    driverId: number,
    ownerId: number,
  ): Promise<DriverCreateUpdateResponseDto> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.driverService.update({
      driverId,
      payload,
    });
  }

  public async findAllDriversByBusinessId(
    ownerId: number,
    query: GetPaginatedPageQuery,
  ): Promise<DriverGetAllResponseDto> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.driverService.findAllByBusinessId({
      businessId: business.id,
      query,
    });
  }

  public async deleteDriver(
    driverId: number,
    ownerId: number,
  ): Promise<boolean> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.driverService.delete(driverId);
  }

  public async findAllTrucksByBusinessId(
    userId: number,
    query: PaginationWithSortingParameters,
  ): Promise<TruckGetAllResponseDto> {
    const business = await this.findByOwnerId(userId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.truckService.findAllByBusinessId(business.id, query);
  }

  public async createTruck(
    payload: TruckAddRequestDto,
    userId: number,
  ): Promise<TruckEntityT> {
    const business = await this.findByOwnerId(userId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    return await this.truckService.create({
      ...payload,
      businessId: business.id,
    });
  }

  public checkisDriverBelongedToBusiness({
    userId,
    driverId,
  }: {
    userId: UserEntityT['id'];
    driverId: ShiftEntityT['driverId'];
  }): Promise<boolean> {
    return this.businessRepository.checkisDriverBelongedToBusiness(
      userId,
      driverId,
    );
  }
}

export { BusinessService };
