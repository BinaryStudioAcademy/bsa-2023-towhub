import { HttpCode, HttpError, HttpMessage } from 'shared/build/index.js';

import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type UserEntity } from '../users/user.entity.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  private async checkExistingUser({
    phone,
  }: UserSignUpRequestDto): Promise<boolean> {
    const existingUser: UserEntity | undefined =
      await this.userService.findByPhone(phone);

    return Boolean(existingUser);
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    if (await this.checkExistingUser(userRequestDto)) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    return await this.userService.create(userRequestDto);
  }
}

export { AuthService };
