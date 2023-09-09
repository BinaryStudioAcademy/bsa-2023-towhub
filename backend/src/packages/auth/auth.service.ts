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
  }: CustomerSignUpRequestDto | BusinessSignUpRequestDto): Promise<boolean> {
    const existingUser = await this.userService.findByPhoneOrEmail(
      phone,
      email,
    );

    return Boolean(existingUser);
  }

  private async checkIsExistingBusiness({
    taxNumber,
  }: BusinessSignUpRequestDto): Promise<boolean> {
    const existingBusiness = await this.businessService.checkIsExistingBusiness(
      { taxNumber },
    );

    return Boolean(existingBusiness);
  }

  public async signUpCustomer(
    payload: CustomerSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupT> {
    const isExistingUser = await this.checkIsExistingUser(payload);

    if (isExistingUser) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

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
    const isExistingUser = await this.checkIsExistingUser(payload);
    const isExistingBusiness = await this.checkIsExistingBusiness(payload);

    if (isExistingUser) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    if (isExistingBusiness) {
      throw new HttpError({
        message: HttpMessage.BUSINESS_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

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
  ): Promise<UserEntityObjectWithGroupT> {
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

    return {
      ...updatedUser,
      group: GroupEntity.initialize(user.group).toObject(),
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
