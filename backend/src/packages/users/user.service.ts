import { type IService } from '~/libs/interfaces/interfaces.js';
import { encryptService } from '~/libs/packages/packages.js';

import {
  type UserEntityT,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
import { type UserRepository } from './user.repository.js';

class UserService implements IService {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public find(): ReturnType<IService['find']> {
    return this.userRepository.find();
  }

  public async findByPhoneAndEmail({
    phone,
    email,
  }: UserSignUpRequestDto): Promise<
    (UserEntityT & { createdAt: Date; updatedAt: Date }) | null
  > {
    const user = await this.userRepository.findByPhoneAndEmail({
      phone,
      email,
    });

    return user ?? null;
  }

  // public findByEmail(value: string): Promise<UserEntity | null> {
  //   return this.userRepository.findByEmail(value);
  // }

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
  ): Promise<UserSignUpResponseDto> {
    const { email: userEmail, password, ...newUser } = payload;
    const { passwordHash, passwordSalt } =
      await encryptService.encrypt(password);

    const user = await this.userRepository.create({
      ...newUser,
      email: userEmail.toLowerCase(),
      passwordSalt,
      passwordHash,
    });

    const { id, phone, email, firstName, lastName, groupId } = user;

    return { id, phone, email, firstName, lastName, groupId };
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
