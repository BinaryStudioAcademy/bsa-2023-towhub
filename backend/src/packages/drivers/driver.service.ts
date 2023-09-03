import { NotFoundError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { UserGroupKey } from '../auth/libs/enums/enums.js';
import { DriverEntity } from '../drivers/driver.entity.js';
import { type DriverRepository } from '../drivers/driver.repository.js';
import {
  type DriverAddResponseWithGroup,
  type DriverCreatePayload,
  type DriverEntity as DriverEntityT,
  type DriverGetAllResponseDto,
  type DriverUpdatePayload,
  type DriverUpdateResponseDto,
} from '../drivers/libs/types/types.js';
import { type GroupService } from '../groups/group.service.js';
import { type UserService } from '../users/user.service.js';

class DriverService implements IService {
  private driverRepository: DriverRepository;

  private userService: UserService;

  private groupService: GroupService;

  public constructor(
    driverRepository: DriverRepository,
    userService: UserService,
    groupService: GroupService,
  ) {
    this.driverRepository = driverRepository;
    this.userService = userService;
    this.groupService = groupService;
  }

  public async findById(id: number): Promise<DriverEntityT | null> {
    const [driver = null] = await this.driverRepository.find({ id });

    return driver ? DriverEntity.initialize(driver).toObject() : null;
  }

  public async findAllByBusinessId(
    businessId: number,
  ): Promise<DriverGetAllResponseDto> {
    const items = await this.driverRepository.findAllByBusinessId(businessId);

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create({
    payload,
    id,
  }: DriverCreatePayload): Promise<DriverAddResponseWithGroup> {
    const { password, email, lastName, firstName, phone, driverLicenseNumber } =
      payload;

    const { result: doesDriverExist } = await this.driverRepository.checkExists(
      {
        driverLicenseNumber,
      },
    );

    if (doesDriverExist) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.DRIVER_ALREADY_EXISTS,
      });
    }
    const group = await this.groupService.findByKey(UserGroupKey.DRIVER);

    if (!group) {
      throw new HttpError({
        message: HttpMessage.INVALID_GROUP,
        status: HttpCode.BAD_REQUEST,
      });
    }

    const user = await this.userService.create({
      password,
      email,
      lastName,
      firstName,
      phone,
      groupId: group.id,
    });

    const driver = await this.driverRepository.create(
      DriverEntity.initializeNew({
        driverLicenseNumber,
        businessId: id,
        userId: user.id,
      }),
    );

    const driverObject = driver.toObject();

    return { ...user, group, driver: driverObject };
  }

  public async update({
    driverId,
    payload,
  }: DriverUpdatePayload): Promise<DriverUpdateResponseDto> {
    const foundDriver = await this.findById(driverId);

    if (!foundDriver) {
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

    const user = await this.userService.update(driverId, payload);

    const driver = await this.driverRepository.update({
      id: foundDriver.id,
      payload,
    });

    const driverObject = driver.toObject();

    return { ...user, driver: driverObject };
  }

  public async delete(id: number): Promise<boolean> {
    const foundDriver = await this.findById(id);

    if (!foundDriver) {
      throw new NotFoundError({});
    }

    const isDriverDeleted = await this.driverRepository.delete(id);

    if (isDriverDeleted) {
      return await this.userService.delete(foundDriver.userId);
    } else {
      throw new HttpError({
        message: HttpMessage.CANNOT_DELETE,
        status: HttpCode.BAD_REQUEST,
      });
    }
  }
}

export { DriverService };
