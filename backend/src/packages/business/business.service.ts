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
  type DriverCreateRequestDto,
  type DriverCreateUpdateResponseDto,
  type DriverGetAllResponseDto,
  type DriverUpdateRequestDto,
} from '../drivers/drivers.js';
import { type FileVerificationStatusService } from '../file-verification-status/file-verification-status.js';
import { FileVerificationName } from '../file-verification-status/libs/enums/enums.js';
import { type FilesService } from '../files/files.js';
import { type MultipartParsedFile } from '../files/libs/types/types.js';
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

type Constructor = {
  businessRepository: BusinessRepository;

  driverService: DriverService;

  truckService: TruckService;

  userService: UserService;

  filesService: FilesService;

  fileVerificationStatusService: FileVerificationStatusService;
};

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  private driverService: DriverService;

  private truckService: TruckService;

  private userService: UserService;

  private fileService: FilesService;

  private fileVerificationStatusService: FileVerificationStatusService;

  public constructor({
    businessRepository,
    driverService,
    truckService,
    userService,
    filesService,
    fileVerificationStatusService,
  }: Constructor) {
    this.businessRepository = businessRepository;
    this.driverService = driverService;
    this.truckService = truckService;
    this.userService = userService;
    this.fileService = filesService;
    this.fileVerificationStatusService = fileVerificationStatusService;
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

    const [existingBusiness = null] = await this.businessRepository.find({
      taxNumber,
    });

    if (existingBusiness && existingBusiness.ownerId !== userId) {
      throw new HttpError({
        message: HttpMessage.BUSINESS_EXISTS,
        status: HttpCode.CONFLICT,
      });
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

  public async createDriver({
    payload,
    ownerId,
    hostname,
  }: {
    payload: DriverCreateRequestDto<MultipartParsedFile>;
    ownerId: number;
    hostname: string;
  }): Promise<DriverAddResponseWithGroup> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const createdFile = await this.fileService.create(payload.files[0]);

    const result = await this.driverService.create({
      payload,
      businessId: business.id,
      driverLicenseFileId: createdFile.id,
      hostname,
    });

    const { id, status, name, message } =
      await this.fileVerificationStatusService.create({
        fileId: createdFile.id,
        name: FileVerificationName.DRIVER_LICENSE_SCAN,
      });

    return {
      ...result,
      verificationStatus: {
        id,
        status,
        name,
        message,
      },
    };
  }

  public async updateDriver({
    payload,
    driverId,
    ownerId,
  }: {
    payload: DriverUpdateRequestDto<MultipartParsedFile>;
    driverId: number;
    ownerId: number;
  }): Promise<DriverCreateUpdateResponseDto> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const driverToUpdate = await this.driverService.findById(driverId);

    if (!driverToUpdate) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    if (driverToUpdate.driverLicenseFileId) {
      await this.fileVerificationStatusService.deleteByFileId(
        driverToUpdate.driverLicenseFileId,
      );
    }

    const newLicenseFile = await this.fileService.create(payload.files[0]);

    const updatedDriver = await this.driverService.update({
      driverId,
      payload: {
        ...payload,
        driverLicenseFileId: newLicenseFile.id,
      },
    });

    const { id, status, name, message } =
      await this.fileVerificationStatusService.create({
        fileId: newLicenseFile.id,
        name: FileVerificationName.DRIVER_LICENSE_SCAN,
      });

    if (driverToUpdate.driverLicenseFileId) {
      await this.fileService.delete(driverToUpdate.driverLicenseFileId);
    }

    return {
      ...updatedDriver,
      verificationStatus: { id, status, name, message },
    };
  }

  public async findAllDriversByBusinessId({
    ownerId,
    query,
  }: {
    ownerId: number;
    query: GetPaginatedPageQuery;
  }): Promise<DriverGetAllResponseDto> {
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

  public async deleteDriver({
    driverId,
    ownerId,
  }: {
    driverId: number;
    ownerId: number;
  }): Promise<boolean> {
    const business = await this.findByOwnerId(ownerId);

    if (!business) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const driverToDelete = await this.driverService.findById(driverId);

    if (!driverToDelete) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    const result = await this.driverService.delete(driverId);

    if (driverToDelete.driverLicenseFileId) {
      await this.fileVerificationStatusService.deleteByFileId(
        driverToDelete.driverLicenseFileId,
      );
      await this.fileService.delete(driverToDelete.driverLicenseFileId);
    }

    return result;
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
