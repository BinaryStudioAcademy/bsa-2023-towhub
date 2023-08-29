import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { type OperationResult } from '~/libs/types/types.js';
import { UserGroupKey } from '~/packages/users/libs/enums/enums.js';

import { DriverEntity } from '../drivers/driver.entity.js';
import { type DriverRepository } from '../drivers/driver.repository.js';
import {
  type DriverAddResponseDto,
  type DriverCreatePayload,
  type DriverEntityT,
  type DriverUpdatePayload,
  type DriverUpdateResponseDto,
} from '../drivers/libs/types/types.js';

class DriverService implements IService {
  private driverRepository: DriverRepository;

  public constructor(driverRepository: DriverRepository) {
    this.driverRepository = driverRepository;
  }

  public async find(
    id: number,
  ): Promise<OperationResult<DriverEntityT | null>> {
    const driver = await this.driverRepository.find(id);

    return { result: driver ? driver.toObject() : null };
  }

  public async create({
    payload,
    owner,
  }: DriverCreatePayload): Promise<DriverAddResponseDto> {
    if (owner.group.key !== UserGroupKey.BUSINESS) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_USER_GROUP,
      });
    }

    const { result: doesDriverExist } = await this.driverRepository.checkExists(
      {
        driverLicenseNumber: payload.driverLicenseNumber,
        userId: payload.userId,
      },
    );

    if (doesDriverExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_ALREADY_EXISTS,
      });
    }

    const driver = await this.driverRepository.create(
      DriverEntity.initializeNew({ ...payload, businessId: owner.id }),
    );

    return driver.toObject();
  }

  public async update({
    id,
    payload,
    owner,
  }: DriverUpdatePayload): Promise<DriverUpdateResponseDto> {
    if (owner.group.key !== UserGroupKey.BUSINESS) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_USER_GROUP,
      });
    }

    const { result: foundDriverById } = await this.find(id);

    if (!foundDriverById) {
      throw new NotFoundError({});
    }

    const { result: doesDriverExist } = await this.driverRepository.checkExists(
      {
        driverLicenseNumber: payload.driverLicenseNumber,
      },
    );

    if (doesDriverExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.LICENSE_NUMBER_ALREADY_EXISTS,
      });
    }

    const business = await this.driverRepository.update({
      id: foundDriverById.id,
      payload,
    });

    return business.toObject();
  }

  public async delete(id: number): Promise<OperationResult<boolean>> {
    const { result: foundDriver } = await this.find(id);

    if (!foundDriver) {
      throw new NotFoundError({});
    }

    const result = await this.driverRepository.delete(id);

    return {
      result,
    };
  }
}

export { DriverService };
