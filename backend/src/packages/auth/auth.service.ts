import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type IEncryptService } from '~/libs/interfaces/encrypt.interface.js';
import { type IJwtService } from '~/libs/interfaces/jwt.inteface.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type GroupService } from '~/packages/groups/group.service.js';
import { type UserGroupKey, GroupEntity } from '~/packages/groups/groups.js';
import {
  type CustomerSignUpRequestDto,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { createUnauthorizedError } from './libs/helpers/helpers.js';
import { type UserSignInRequestDto } from './libs/types/types.js';

type AuthServiceConstructorProperties = {
  userService: UserService;
  groupService: GroupService;
  jwtService: IJwtService;
  encryptService: IEncryptService;
  config: IConfig['ENV']['JWT'];
};

class AuthService {
  private userService: AuthServiceConstructorProperties['userService'];

  private groupService: AuthServiceConstructorProperties['groupService'];

  private jwtService: AuthServiceConstructorProperties['jwtService'];

  private encryptService: AuthServiceConstructorProperties['encryptService'];

  private config: AuthServiceConstructorProperties['config'];

  public constructor({
    userService,
    groupService,
    jwtService,
    encryptService,
    config,
  }: AuthServiceConstructorProperties) {
    this.userService = userService;
    this.groupService = groupService;
    this.jwtService = jwtService;
    this.encryptService = encryptService;
    this.config = config;
  }

  public async signUp(
    groupKey: ValueOf<typeof UserGroupKey>,
    payload: CustomerSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupT> {
    const user = await this.userService.findByEmail(payload.email);

    if (user) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    const group = await this.groupService.findByKey(groupKey);

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

    return { ...userWithToken, groups: group };
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
      // Had to take group from raw because setAccessToken does not return this
      groups: GroupEntity.initialize(user.groups).toObject(),
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
