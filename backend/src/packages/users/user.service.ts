import { type IService } from '~/libs/interfaces/interfaces.js';
import { encryptService } from '~/libs/packages/packages.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
import { UserEntity } from './user.entity.js';

class UserService implements IService {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public find(): ReturnType<IService['find']> {
    return this.userRepository.find();
  }

  public findByPhone(value: string): Promise<UserEntity | null> {
    return this.userRepository.findByPhone(value);
  }

  public findById(id: number): ReturnType<IService['find']> {
    return this.userRepository.findById(id);
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UserSignUpRequestDto,
    groupId = 1, //TEMPORARY MOCK
  ): Promise<UserSignUpResponseDto> {
    const { phone, email, password, firstName, lastName } = payload;
    const { passwordHash, passwordSalt } =
      await encryptService.encrypt(password);

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        phone,
        email,
        firstName,
        lastName,
        groupId,
        passwordSalt,
        passwordHash,
      }),
    );

    return user.toObject();
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
