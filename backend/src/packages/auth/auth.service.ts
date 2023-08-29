import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import {
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
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
  }: CustomerSignUpRequestDto): Promise<boolean> {
    const existingUser: UserEntity | null =
      await this.userService.findByPhone(phone);

    return Boolean(existingUser);
  }

  public async signUp(
    userRequestDto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
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
