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

    return result.map((item) => UserEntity.initialize(item).toObject());
  }

  public async findByPhoneOrEmail(
    phone: UserEntityT['phone'],
    email: UserEntityT['email'],
  ): Promise<(UserEntityT & { createdAt: Date; updatedAt: Date }) | null> {
    return await this.userRepository.findByPhoneOrEmail({
      phone,
      email,
    });
  }

  public async findByPhone(
    phone: UserEntityT['phone'],
  ): Promise<UserEntityObjectWithGroupT | null> {
    const [user = null] = await this.userRepository.find({ phone });

    if (!user) {
      return null;
    }

    const { group, ...pureUser } = user;

    return {
      ...UserEntity.initialize(pureUser).toObject(),
      group: GroupEntity.initialize(group).toObject(),
    };
  }

  public async findByEmail(
    email: UserEntityT['email'],
  ): Promise<UserEntityObjectWithGroupT | null> {
    const [user = null] = await this.userRepository.find({
      email: email.toLocaleLowerCase(),
    });

    if (!user) {
      return null;
    }

    const { group, ...pureUser } = user;

    return {
      ...UserEntity.initialize(pureUser).toObject(),
      group: GroupEntity.initialize(group).toObject(),
    };
  }

  // This returns a raw database entity instead of entity.toObject
  // Currently we need it to propertly authenticate user
  // Because otherwise it is impossible to get the password
  public async findByEmailRaw(
    email: UserEntityT['email'],
  ): Promise<UserDatabaseModelWithGroup | null> {
    const [user = null] = await this.userRepository.find({ email });

    return user;
  }

  public async findById(
    id: UserEntityT['id'],
  ): Promise<UserEntityObjectWithGroupT | null> {
    const [user = null] = await this.userRepository.find({ id });

    if (!user) {
      return null;
    }

    const { group, ...pureUser } = user;

    return {
      ...UserEntity.initialize(pureUser).toObject(),
      group: GroupEntity.initialize(group).toObject(),
    };
  }

  public async create(
    payload: UserEntityCreateUpdate,
  ): ReturnType<IService<UserEntityObjectT>['create']> {
    const { password, email, ...user } = payload;
    const { passwordHash, passwordSalt } =
      await encryptService.encrypt(password);

    const result = await this.userRepository.create({
      ...user,
      email: email.toLowerCase(),
      passwordHash,
      passwordSalt,
    });

    return UserEntity.initialize(result).toObject();
  }

  public async update(
    id: UserEntityT['id'],
    payload: Partial<UserEntityCreateUpdate>,
  ): ReturnType<IService<UserEntityObjectT>['update']> {
    const { password, ...updated } = payload;

    if (password) {
      const encryptedPassword = await encryptService.encrypt(password);
      Object.assign(updated, encryptedPassword);
    }

    const result = await this.userRepository.update(id, updated);

    return UserEntity.initialize(result).toObject();
  }

  public delete(
    id: UserEntityT['id'],
  ): ReturnType<IService<UserEntityObjectT>['delete']> {
    return this.userRepository.delete(id);
  }

  public async setAccessToken(
    id: UserEntityT['id'],
    token: string | null,
  ): Promise<UserEntityObjectT> {
    const result = await this.userRepository.update(id, { accessToken: token });

    return UserEntity.initialize(result).toObject();
  }
}

export { UserService };
