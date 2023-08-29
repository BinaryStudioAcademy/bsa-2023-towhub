import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type UserService } from '~/packages/users/user.service.js';
import {
  type CustomerSignUpRequestDto,
  type CustomerSignUpResponseDto,
} from '~/packages/users/users.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  private async checkIsExistingUser(
    userRequest: CustomerSignUpRequestDto,
  ): Promise<boolean> {
    const existingUser = await this.userService.findByPhoneOrEmail(userRequest);

    return Boolean(existingUser);
  }

  public async signUp(
    userRequestDto: CustomerSignUpRequestDto,
  ): Promise<CustomerSignUpResponseDto> {
    const isExistingUser = await this.checkIsExistingUser(userRequestDto);

    if (isExistingUser) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    return await this.userService.create(userRequestDto);
  }
}

export { AuthService };
