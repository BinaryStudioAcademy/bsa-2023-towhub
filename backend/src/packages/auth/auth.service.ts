import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import {
  type IEncryptService,
  type IJwtService,
} from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type GroupService } from '~/packages/groups/group.service.js';
import { GroupEntity } from '~/packages/groups/groups.js';
import {
  type BusinessSignUpRequestDto,
  type CustomerSignUpRequestDto,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupAndBusinessT,
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type BusinessService } from '../business/business.service.js';
import { UserGroupKey } from './libs/enums/enums.js';
import { createUnauthorizedError } from './libs/helpers/helpers.js';
import { type UserSignInRequestDto } from './libs/types/types.js';

type AuthServiceConstructorProperties = {
  userService: UserService;
  groupService: GroupService;
  jwtService: IJwtService;
  encryptService: IEncryptService;
  businessService: BusinessService;
  config: IConfig['ENV']['JWT'];
};

class AuthService {
  private userService: AuthServiceConstructorProperties['userService'];

  private groupService: AuthServiceConstructorProperties['groupService'];

  private jwtService: AuthServiceConstructorProperties['jwtService'];

  private encryptService: AuthServiceConstructorProperties['encryptService'];

  private businessService: AuthServiceConstructorProperties['businessService'];

  private config: AuthServiceConstructorProperties['config'];

  public constructor({
    userService,
    groupService,
    jwtService,
    encryptService,
    businessService,
    config,
  }: AuthServiceConstructorProperties) {
    this.userService = userService;
    this.groupService = groupService;
    this.jwtService = jwtService;
    this.encryptService = encryptService;
    this.businessService = businessService;
    this.config = config;
  }

  private async checkIsExistingUser({
    email,
    phone,
  }: CustomerSignUpRequestDto | BusinessSignUpRequestDto): Promise<void> {
    const existingUser = await this.userService.findByPhoneOrEmail(
      phone,
      email,
    );

    if (email === existingUser?.email) {
      throw new HttpError({
        message: HttpMessage.USER_EMAIL_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    if (phone === existingUser?.phone) {
      throw new HttpError({
        message: HttpMessage.USER_PHONE_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }
  }

  private async checkIsExistingBusiness({
    taxNumber,
  }: BusinessSignUpRequestDto): Promise<void> {
    const existingBusiness = await this.businessService.checkIsExistingBusiness(
      { taxNumber },
    );

    if (existingBusiness) {
      throw new HttpError({
        message: HttpMessage.BUSINESS_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }
  }

  public async signUpCustomer(
    payload: CustomerSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupT> {
    await this.checkIsExistingUser(payload);
    const group = await this.groupService.findByKey(UserGroupKey.CUSTOMER);

    if (!group) {
      throw new HttpError({
        message: HttpMessage.INVALID_GROUP,
        status: HttpCode.BAD_REQUEST,
      });
    }
    const newUser = await this.userService.create({
      ...payload,
      groupId: group.id,
    });
    const userWithToken = await this.generateAccessTokenAndUpdateUser(
      newUser.id,
    );

    return { ...userWithToken, group };
  }

  public async signUpBusiness(
    payload: BusinessSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupAndBusinessT> {
    await this.checkIsExistingUser(payload);
    await this.checkIsExistingBusiness(payload);

    const {
      phone,
      email,
      firstName,
      lastName,
      password,
      companyName,
      taxNumber,
    } = payload;

    const group = await this.groupService.findByKey(UserGroupKey.BUSINESS);

    if (!group) {
      throw new HttpError({
        message: HttpMessage.INVALID_GROUP,
        status: HttpCode.BAD_REQUEST,
      });
    }

    const newUser = await this.userService.create({
      phone,
      email,
      firstName,
      lastName,
      password,
      groupId: group.id,
    });

    const userWithToken = await this.generateAccessTokenAndUpdateUser(
      newUser.id,
    );

    const business = await this.businessService.create({
      payload: {
        companyName,
        taxNumber,
      },
      owner: { ...newUser, group },
    });

    return { ...userWithToken, group, business };
  }

  public async signIn(
    credentials: UserSignInRequestDto,
  ): Promise<
    UserEntityObjectWithGroupAndBusinessT | UserEntityObjectWithGroupT
  > {
    const { email, password } = credentials;

    const user = await this.userService.findByEmailRaw(email);

    if (!user) {
      throw createUnauthorizedError(HttpMessage.WRONG_EMAIL);
    }

    const passwordsAreEqual = await this.encryptService.compare(
      password,
      user.passwordHash,
    );

    if (!passwordsAreEqual) {
      throw createUnauthorizedError(HttpMessage.WRONG_PASSWORD);
    }

    const updatedUser = await this.generateAccessTokenAndUpdateUser(user.id);

    const userGroup = GroupEntity.initialize(user.group).toObject();

    const userBusiness =
      userGroup.key === UserGroupKey.BUSINESS
        ? await this.businessService.findByOwnerId(updatedUser.id)
        : null;

    return {
      ...updatedUser,
      group: userGroup,
      ...(userBusiness && { business: userBusiness }),
    };
  }

  public async getCurrent(
    user: UserEntityObjectWithGroupT,
  ): Promise<
    UserEntityObjectWithGroupT | UserEntityObjectWithGroupAndBusinessT
  > {
    if (user.group.key === UserGroupKey.BUSINESS) {
      const business = await this.businessService.findByOwnerId(user.id);

      return business ? { ...user, business } : user;
    }

    return user;
  }

  public async generateAccessTokenAndUpdateUser(
    userId: UserEntityT['id'],
  ): Promise<UserEntityObjectT> {
    const jwtPayload = { id: userId };

    const accessToken = await this.jwtService.createToken(
      jwtPayload,
      this.config.ACCESS_LIFETIME,
    );

    return await this.userService.setAccessToken(userId, accessToken);
  }
}

export { AuthService };
