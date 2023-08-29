import { type UserGroupKey, type ValueOf } from 'shared/build';
import { HttpCode, HttpMessage } from 'shared/build';

import { HttpError } from '~/libs/exceptions/exceptions.js';
import {
  type CustomerSignUpRequestDto,
  type UserEntityObjectWithGroupT
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type GroupService } from '../groups/group.service.js';

class AuthService {
  private userService: UserService;

  private groupService: GroupService;

  public constructor(userService: UserService, groupService: GroupService) {
    this.userService = userService;
    this.groupService = groupService;
  }

  public async signUp(groupName: ValueOf<typeof UserGroupKey>,
    payload: CustomerSignUpRequestDto,
  ): Promise<UserEntityObjectWithGroupT> {
    const user = await this.userService.findByEmail(payload.email);

    if (user) {
      throw new HttpError({
        message: HttpMessage.USER_EXISTS,
        status: HttpCode.CONFLICT,
      });
    }

    const group = await this.groupService.findByKey(groupName);

    if (!group) {
      throw new HttpError({
        message: HttpMessage.INVALID_GROUP,
        status: HttpCode.BAD_REQUEST
      });
    }
    const result = await this.userService.create({ ...payload, groupId: group.id });

    return { ...result, group };

  }

}

export { AuthService };
