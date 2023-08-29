import { type IService } from '~/libs/interfaces/interfaces.js';
import { encryptService } from '~/libs/packages/packages.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import { GroupEntity } from '../groups/groups.js';
import {
  type UserDatabaseModelWithGroup,
  type UserEntityCreateUpdate,
  type UserEntityObjectT,
  type UserEntityObjectWithGroupT,
  type UserEntityT,
} from './libs/types/types.js';
import { UserEntity } from './user.entity.js';

class UserService implements IService<UserEntityObjectT> {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async findAll(): Promise<UserEntityObjectT[]> {
    const result = await this.userRepository.findAll();

    return result.map(item => UserEntity.initialize(item).toObject());
  }

  public async findByPhone(phone: UserEntityT['phone']): Promise<UserEntityObjectWithGroupT> {
    const result = await this.userRepository.find({ phone });

    if (result.length === 1) {
      return {
        ...UserEntity.initialize(result[0]).toObject(),
        group: GroupEntity.initialize(result[0].group).toObject()
      };
    }

    return null;
  }

  public async findByEmail(email: UserEntityT['email']): Promise<UserEntityObjectWithGroupT> {
    const result = await this.userRepository.find({ email });

    if (result.length === 1) {
      return {
        ...UserEntity.initialize(result[0]).toObject(),
        group: GroupEntity.initialize(result[0].group).toObject()
      };
    }

    return null;
  }

  public async findByEmailRaw(email: UserEntityT['email']): Promise<UserDatabaseModelWithGroup | null> {
    const result = await this.userRepository.find({ email });

    return result.length === 1 ? result[0] : null;
  }

  public async findByAccessToken(accessToken: NonNullable<UserEntityT['accessToken']>): Promise<UserEntityObjectWithGroupT> {
    const result = await this.userRepository.find({ accessToken });

    if (result.length === 1) {
      return {
        ...UserEntity.initialize(result[0]).toObject(),
        group: GroupEntity.initialize(result[0].group).toObject()
      };
    }

    return null;
  }

  public async findById(id: UserEntityT['id']): Promise<UserEntityObjectWithGroupT> {
    const result = await this.userRepository.find({ id });

    if (result.length === 1) {
      return {
        ...UserEntity.initialize(result[0]).toObject(),
        group: GroupEntity.initialize(result[0].group).toObject()
      };
    }

    return null;
  }

  public async create(
    payload: UserEntityCreateUpdate,
  ): ReturnType<IService<UserEntityObjectT>['create']> {
    const { password, ...user } = payload;
    const { passwordHash, passwordSalt } = await encryptService.encrypt(password);

    const result = await this.userRepository.create(
      {
        ...user,
        passwordHash,
        passwordSalt,
      },
    );

    return UserEntity.initialize(result).toObject();
  }

  public async update(id: UserEntityT['id'], payload: Partial<UserEntityCreateUpdate>): ReturnType<IService<UserEntityObjectT>['update']> {
    const { password, ...updated } = payload;

    if (password) {
      const encryptedPassword = await encryptService.encrypt(password);
      Object.assign(updated, encryptedPassword);
    }

    const result = await this.userRepository.update(id, payload);

    return UserEntity.initialize(result).toObject();
  }

  public delete(id: UserEntityT['id']): ReturnType<IService<UserEntityObjectT>['delete']> {
    return this.userRepository.delete(id);
  }

  public async setAccessToken(id: UserEntityT['id'], token: string | null): Promise<UserEntityObjectT> {
    const result = await this.userRepository.update(id, { accessToken: token });

    return UserEntity.initialize(result).toObject();
  }
}

export { UserService };
