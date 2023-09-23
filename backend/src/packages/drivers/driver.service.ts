import { type IService } from '~/libs/interfaces/interfaces.js';
import {
  type GeolocationCacheService,
  type GeolocationLatLng,
} from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';

import { UserGroupKey } from '../auth/libs/enums/enums.js';
import { DriverEntity } from '../drivers/driver.entity.js';
import { type DriverRepository } from '../drivers/driver.repository.js';
import {
  type DriverAddPayload,
  type DriverAddResponseWithGroup,
  type DriverCreateUpdateResponseDto,
  type DriverEntityT,
  type DriverEntityWithFileVerificationStatusT,
  type DriverGetAllResponseDto,
  type DriverUpdatePayload,
} from '../drivers/libs/types/types.js';
import { type FileVerificationStatusService } from '../file-verification-status/file-verification-status.js';
import { FileVerificationStatus } from '../file-verification-status/libs/enums/enums.js';
import { type GroupService } from '../groups/group.service.js';
import { type UserService } from '../users/user.service.js';

class DriverService implements IService {
  private driverRepository: DriverRepository;

  private userService: UserService;

  private groupService: GroupService;

  private geolocationCacheService: GeolocationCacheService;

  private fileVerificationStatusService: FileVerificationStatusService;

  public constructor({
    driverRepository,
    userService,
    groupService,
    geolocationCacheService,
    fileVerificationStatusService,
  }: {
    driverRepository: DriverRepository;
    userService: UserService;
    groupService: GroupService;
    geolocationCacheService: GeolocationCacheService;
    fileVerificationStatusService: FileVerificationStatusService;
  }) {
    this.driverRepository = driverRepository;
    this.userService = userService;
    this.groupService = groupService;
    this.geolocationCacheService = geolocationCacheService;
    this.fileVerificationStatusService = fileVerificationStatusService;
  }

  public async getGeolocationById(id: number): Promise<GeolocationLatLng> {
    const foundDriver = await this.findById(id);

    if (!foundDriver) {
      throw new HttpError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
        status: HttpCode.NOT_FOUND,
      });
    }

    const geolocation = this.geolocationCacheService.getCache(id);

    if (!geolocation) {
      throw new HttpError({
        message: HttpMessage.DRIVER_LOCATION_UNKNOWN,
        status: HttpCode.BAD_REQUEST,
      });
    }

    return geolocation;
  }

  private async getDriverWithFileVerificationStatus(
    driver: DriverEntityT | null,
  ): Promise<DriverEntityWithFileVerificationStatusT> {
    if (!driver) {
      return {
        driverLicenseFileId: -1,
        businessId: -1,
        driverLicenseNumber: '',
        userId: -1,
        id: -1,
        fileVerificationStatus: {
          status: FileVerificationStatus.NOT_STARTED,
          message: 'fileVerificationStatus.message',
          name: 'driver_license_scan',
        },
      };
    }

    const fileVerificationStatus =
      await this.fileVerificationStatusService.findByFileId(
        driver.driverLicenseFileId,
      );

    if (!fileVerificationStatus) {
      return {
        ...driver,
        fileVerificationStatus: {
          status: FileVerificationStatus.NOT_STARTED,
          message: 'fileVerificationStatus.message',
          name: 'driver_license_scan',
        },
      };
    }

    return {
      ...driver,
      fileVerificationStatus: {
        status: fileVerificationStatus.status,
        message: fileVerificationStatus.message,
        name: fileVerificationStatus.name,
      },
    };
  }

  public async findByLicenseFileId(
    driverLicenseFileId: number,
  ): Promise<DriverEntityWithFileVerificationStatusT | null> {
    const [driver = null] = await this.driverRepository.find({
      driverLicenseFileId,
    });

    return await this.getDriverWithFileVerificationStatus(driver);
  }

  public async findById(
    id: number,
  ): Promise<DriverEntityWithFileVerificationStatusT | null> {
    const [driver = null] = await this.driverRepository.find({ id });

    return await this.getDriverWithFileVerificationStatus(driver);
  }

  public async findByUserId(
    userId: number,
  ): Promise<DriverEntityWithFileVerificationStatusT | null> {
    const [driver = null] = await this.driverRepository.find({ userId });

    return await this.getDriverWithFileVerificationStatus(driver);
  }

  public async findAllByBusinessId(
    businessId: number,
  ): Promise<DriverGetAllResponseDto> {
    const items = await this.driverRepository.findAllByBusinessId(businessId);

    return {
      items: await Promise.all(
        items.map(
          async (it) =>
            await this.getDriverWithFileVerificationStatus(it.toObject()),
        ),
      ),
    };
  }

  public async create({
    payload,
    businessId,
    driverLicenseFileId,
  }: DriverAddPayload & {
    driverLicenseFileId: DriverEntityT['driverLicenseFileId'];
  }): Promise<DriverAddResponseWithGroup> {
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
        message: HttpMessage.DRIVER_LICENSE_ALREADY_EXISTS,
      });
    }

    const userByPhone = await this.userService.findByPhone(phone);

    if (userByPhone) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.USER_PHONE_ALREADY_EXISTS,
      });
    }

    const userByEmail = await this.userService.findByEmail(email);

    if (userByEmail) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.USER_EMAIL_ALREADY_EXISTS,
      });
    }

    const group = await this.groupService.findByKey(UserGroupKey.DRIVER);

    if (!group) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: HttpMessage.INVALID_GROUP,
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
        businessId,
        userId: user.id,
        driverLicenseFileId,
      }),
    );

    const driverObject = driver.toObject();

    return { ...user, ...driverObject, group };
  }

  public async update({
    driverId,
    payload,
  }: DriverUpdatePayload): Promise<DriverCreateUpdateResponseDto> {
    const { password, email, lastName, firstName, phone, driverLicenseNumber } =
      payload;

    const foundDriver = await this.findById(driverId);

    if (!foundDriver) {
      throw new HttpError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
        status: HttpCode.NOT_FOUND,
      });
    }

    const user = await this.userService.update(foundDriver.userId, {
      password,
      email,
      lastName,
      firstName,
      phone,
    });

    const driver = await this.driverRepository.update({
      id: foundDriver.id,
      payload: { driverLicenseNumber },
    });

    const driverObject = driver.toObject();

    return { ...user, ...driverObject };
  }

  public async delete(id: number): Promise<boolean> {
    const foundDriver = await this.findById(id);

    if (!foundDriver) {
      throw new HttpError({
        message: HttpMessage.DRIVER_DOES_NOT_EXIST,
        status: HttpCode.NOT_FOUND,
      });
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
