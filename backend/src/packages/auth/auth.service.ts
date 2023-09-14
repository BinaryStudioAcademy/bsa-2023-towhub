import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import {
  HttpError,
  PostgresError,
  UniqueViolationError,
} from '~/libs/exceptions/exceptions.js';
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

  public async signUpCustomer(
    payload: CustomerSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupT> {
    const group = await this.groupService.findByKey(UserGroupKey.CUSTOMER);

    if (!group) {
      throw new HttpError({
        message: HttpMessage.INVALID_GROUP,
        status: HttpCode.BAD_REQUEST,
      });
    }

    try {
      const newUser = await this.userService.create({
        ...payload,
        groupId: group.id,
      });
      const userWithToken = await this.generateAccessTokenAndUpdateUser(
        newUser.id,
      );

      return { ...userWithToken, group };
    } catch (error) {
      if (error instanceof PostgresError) {
        throw new UniqueViolationError(error);
      }
      throw error;
    }
  }

  public async signUpBusiness(
    payload: BusinessSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupAndBusinessT> {
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

    try {
      const business = await this.businessService.create({
        payload: {
          companyName,
          taxNumber,
        },
        owner: { ...newUser, group },
      });

      return { ...userWithToken, group, business };
    } catch (error: unknown) {
      if (error instanceof PostgresError) {
        throw new UniqueViolationError(error);
      }
      throw error;
    }
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

    const group = GroupEntity.initialize(user.group).toObject();

    return {
      ...updatedUser,
      group,
    };
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
