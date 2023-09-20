import { type IService } from '~/libs/interfaces/interfaces.js';
import {
  type GeolocationCacheService,
  type GeolocationLatLng,
} from '~/libs/packages/geolocation-cache/geolocation-cache.js';
import { HttpCode, HttpError, HttpMessage } from '~/libs/packages/http/http.js';
import { MailContent } from '~/libs/packages/mailer/libs/enums/enums.js';

import { UserGroupKey } from '../auth/libs/enums/enums.js';
import { DriverEntity } from '../drivers/driver.entity.js';
import { type DriverRepository } from '../drivers/driver.repository.js';
import {
  type DriverAddPayloadWithBusinessId,
  type DriverAddResponseWithGroup,
  type DriverCreateUpdateResponseDto,
  type DriverEntity as DriverEntityT,
  type DriverGetAllResponseDto,
  type DriverGetDriversPayloadWithBusinessId,
  type DriverUpdatePayload,
} from '../drivers/libs/types/types.js';
import { type GroupService } from '../groups/group.service.js';
import { TemplateName } from '../mail/libs/enums/template-name.enum.js';
import { type DriverCredentialsViewRenderParameter } from '../mail/libs/views/driver-credentials/libs/types/types.js';
import { mailService } from '../mail/mail.js';
import { type TruckService } from '../trucks/truck.service.js';
import { type UserService } from '../users/user.service.js';
import { convertToDriverUser } from './libs/helpers/helpers.js';

class DriverService implements IService {
  private driverRepository: DriverRepository;

  private userService: UserService;

  private groupService: GroupService;

  private geolocationCacheService: GeolocationCacheService;

  private truckService: TruckService;

  public constructor({
    driverRepository,
    userService,
    groupService,
    geolocationCacheService,
    truckService,
  }: {
    driverRepository: DriverRepository;
    userService: UserService;
    groupService: GroupService;
    geolocationCacheService: GeolocationCacheService;
    truckService: TruckService;
  }) {
    this.driverRepository = driverRepository;
    this.userService = userService;
    this.groupService = groupService;
    this.geolocationCacheService = geolocationCacheService;
    this.truckService = truckService;
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

  public async findById(id: number): Promise<DriverEntityT | null> {
    const [driver = null] = await this.driverRepository.find({ id });

    return driver ? DriverEntity.initialize(driver).toObject() : null;
  }

  public async findByUserId(userId: number): Promise<DriverEntityT | null> {
    const [driver = null] = await this.driverRepository.find({ userId });

    return driver ? DriverEntity.initialize(driver).toObject() : null;
  }

  public async findAllByBusinessId({
    businessId,
    query,
  }: DriverGetDriversPayloadWithBusinessId): Promise<DriverGetAllResponseDto> {
    const items = await this.driverRepository.findAllByBusinessId(
      businessId,
      query,
    );
    const total = await this.driverRepository.getTotal(businessId);

    return {
      items: items.map((item) => convertToDriverUser(item)),
      total,
    };
  }

  public async create({
    payload,
    businessId,
  }: DriverAddPayloadWithBusinessId): Promise<DriverAddResponseWithGroup> {
    const { email, lastName, firstName, phone, driverLicenseNumber, truckIds } =
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

    const password = await this.generatePassword();

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
      }),
    );

    const driverObject = driver.toObject();

    const emailData: DriverCredentialsViewRenderParameter = {
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      signInLink: MailContent.LINK,
    };

    await mailService.sendPage(
      { to: email, subject: MailContent.SUBJECT },
      TemplateName.DRIVER_CREDENTIALS,
      emailData,
    );

    await this.truckService.addTrucksToDriver(user.id, truckIds);

    return { ...user, ...driverObject, group, possibleTruckIds: truckIds };
  }

  private async generatePassword(): Promise<string> {
    const minLength = 6;
    const maxLength = 20;
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';

    const passwordLength =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let password = '';

    password += uppercaseChars.charAt(
      Math.floor(Math.random() * uppercaseChars.length),
    );
    password += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length),
    );
    password += numberChars.charAt(
      Math.floor(Math.random() * numberChars.length),
    );

    for (let index = 3; index < passwordLength; index++) {
      const characterSet = uppercaseChars + lowercaseChars + numberChars;
      const randomCharacter = characterSet.charAt(
        Math.floor(Math.random() * characterSet.length),
      );
      password += randomCharacter;
    }

    const hasDigit = /\d/.test(password);
    const hasLetter = /[A-Za-z]/.test(password);

    if (!hasDigit || !hasLetter) {
      return await this.generatePassword();
    }

    return password;
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
