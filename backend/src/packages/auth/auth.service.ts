import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
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
    email,
  }: UserSignUpRequestDto): Promise<boolean> {
    const existingUser: UserEntity | null =
      (await this.userService.findByPhone(phone)) ??
      (await this.userService.findByEmail(email));

    return Boolean(existingUser);
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const isUserExist = await this.checkExistingUser(userRequestDto);

    if (isUserExist) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    return await this.userService.create(userRequestDto);
  }
}

export { AuthService };
