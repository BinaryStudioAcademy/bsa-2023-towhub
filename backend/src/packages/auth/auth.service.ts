import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { ApplicationError, HttpError } from '~/libs/exceptions/exceptions.js';
import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  private async checkIsExistingUser(
    userRequest: UserSignUpRequestDto,
  ): Promise<boolean> {
    const existingUser =
      await this.userService.findByPhoneAndEmail(userRequest);

    return Boolean(existingUser);
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const isExistingUser = await this.checkIsExistingUser(userRequestDto);

    if (isExistingUser) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    const createdUser = await this.userService.create(userRequestDto);

    if (!createdUser) {
      throw new ApplicationError({
        message: 'Mistake', //Change!
      });
    }

    return createdUser;
  }
}

export { AuthService };
