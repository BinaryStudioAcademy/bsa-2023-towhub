
import { HttpCode, HttpMessage } from '~/libs/enums/enums.js';
import { HttpError } from '~/libs/exceptions/exceptions.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type CustomerSignUpRequestDto,
  type UserEntityObjectWithGroupT
} from '~/packages/users/libs/types/types.js';
import { type UserService } from '~/packages/users/user.service.js';

import { type GroupService } from '../groups/group.service.js';
import { type UserGroupKey } from '../groups/groups.js';

class AuthService {
  private userService: UserService;

  private groupService: GroupService;

  public constructor(userService: UserService, groupService: GroupService) {
    this.userService = userService;
    this.groupService = groupService;
  }

  public async signUp(groupKey: ValueOf<typeof UserGroupKey>,
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
        status: HttpCode.BAD_REQUEST
      });
    }
    const result = await this.userService.create({ ...payload, groupId: group.id });

    return { ...result, groups: group };

  }

}

export { AuthService };
