import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { type DriverService } from '../drivers/driver.service.js';
import {
  type DriverAddPayload,
  type DriverAddResponseWithGroup,
  type DriverCreateUpdateResponseDto,
  type DriverGetAllResponseDto,
  type DriverUpdatePayload,
} from '../drivers/drivers.js';
import { type FileVerificationStatusService } from '../file-verification-status/file-verification-status.js';
import { FileVerificationName } from '../file-verification-status/libs/enums/enums.js';
import { type FilesService } from '../files/files.js';
import { type ShiftEntity } from '../shifts/shift.js';
import { type UserEntityT } from '../users/users.js';
import { BusinessEntity } from './business.entity.js';
import { type BusinessRepository } from './business.repository.js';
import {
  type BusinessAddResponseDto,
  type BusinessCreatePayload,
  type BusinessEntityT,
  type BusinessUpdateResponseDto,
} from './libs/types/types.js';

type Constructor = {
  businessRepository: BusinessRepository;

  driverService: DriverService;

  filesService: FilesService;

  fileVerificationStatusService: FileVerificationStatusService;
};

class BusinessService implements IService {
  private businessRepository: BusinessRepository;

  private driverService: DriverService;

  private fileService: FilesService;

  private fileVerificationStatusService: FileVerificationStatusService;

  public constructor({
    businessRepository,
    driverService,
    filesService,
    fileVerificationStatusService,
  }: Constructor) {
    this.businessRepository = businessRepository;
    this.driverService = driverService;
    this.fileService = filesService;
    this.fileVerificationStatusService = fileVerificationStatusService;
  }

  public async findById(id: number): Promise<BusinessEntityT | null> {
    const [business = null] = await this.businessRepository.find({ id });

    return business ? BusinessEntity.initialize(business).toObject() : null;
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
    businessId,
  }: DriverAddPayload): Promise<DriverAddResponseWithGroup> {
    const doesBusinessExist = await this.findById(businessId);

    if (!doesBusinessExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.BUSINESS_DOES_NOT_EXIST,
      });
    }

    const createdFile = await this.fileService.create(payload.files[0]);

    const createdDriver = await this.driverService.create({
      payload,
      businessId,
      driverLicenseFileId: createdFile.id,
    });

    await this.fileVerificationStatusService.create({
      fileId: createdFile.id,
      name: FileVerificationName.DRIVER_LICENSE_SCAN,
    });

    return createdDriver;
  }

  public updateDriver({
    driverId,
    payload,
  }: DriverUpdatePayload): Promise<DriverCreateUpdateResponseDto> {
    return this.driverService.update({
      driverId,
      payload,
    });
  }

  public findAllDriversByBusinessId(
    id: number,
  ): Promise<DriverGetAllResponseDto> {
    return this.driverService.findAllByBusinessId(id);
  }

  public async deleteDriver(driverId: number): Promise<boolean> {
    const driverToDelete = await this.driverService.findById(driverId);

    if (!driverToDelete) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
      });
    }

    await this.fileVerificationStatusService.deleteByFileId(
      driverToDelete.driverLicenseFileId,
    );
    await this.fileService.delete(driverToDelete.driverLicenseFileId);

    return await this.driverService.delete(driverId);
  }

  public checkisDriverBelongedToBusiness({
    userId,
    driverId,
  }: {
    userId: UserEntityT['id'];
    driverId: ShiftEntity['driverId'];
  }): Promise<boolean> {
    return this.businessRepository.checkisDriverBelongedToBusiness(
      userId,
      driverId,
    );
  }
}

export { BusinessService };
