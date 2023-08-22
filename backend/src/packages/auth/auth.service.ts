import {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type UserEntity } from '../users/user.entity.ts';

class AuthService {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  public async checkExistingUser(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<boolean> {
    const existingUser: UserEntity[] = await this.userService.findByPhone(
      userRequestDto.phone,
    );

    return existingUser.length > 0;
  }

  public signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return this.userService.create(userRequestDto);
  }
}

export { AuthService };
