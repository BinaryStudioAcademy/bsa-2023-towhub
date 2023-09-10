import { type IService } from '~/libs/interfaces/interfaces.js';

import {
  type UsersTrucksCreateUpdate,
  type UsersTrucksEntityObjectT,
  type UsersTrucksEntityT,
} from './libs/types/types.js';
import { UsersTrucksEntity } from './users-trucks.entity.js';
import { type UsersTrucksRepository } from './users-trucks.repository.js';

class UsersTrucksService implements IService<UsersTrucksEntityObjectT> {
  private usersTrucksRepository: UsersTrucksRepository;

  public constructor(usersTrucksRepository: UsersTrucksRepository) {
    this.usersTrucksRepository = usersTrucksRepository;
  }

  public async findById(
    id: UsersTrucksEntityT['id'],
  ): Promise<UsersTrucksEntityT | null> {
    const [usersTrucksRecord = null] = await this.usersTrucksRepository.find({
      id,
    });

    if (!usersTrucksRecord) {
      return null;
    }

    return {
      ...UsersTrucksEntity.initialize(usersTrucksRecord).toObject(),
    };
  }

  public async findByUserId(
    userId: UsersTrucksEntityT['userId'],
  ): Promise<UsersTrucksEntityT[] | null> {
    const usersTrucksRecords = await this.usersTrucksRepository.find({
      userId,
    });

    if (usersTrucksRecords.length === 0) {
      return null;
    }

    return usersTrucksRecords.map((usersTrucksRecord) =>
      UsersTrucksEntity.initialize(usersTrucksRecord).toObject(),
    );
  }

  public async create(
    payload: UsersTrucksCreateUpdate,
  ): ReturnType<IService<UsersTrucksEntityObjectT>['create']> {
    const { userId, truckId } = payload;

    const result = await this.usersTrucksRepository.create({
      userId,
      truckId,
    });

    return UsersTrucksEntity.initialize(result).toObject();
  }

  public async update(
    id: UsersTrucksEntityT['id'],
    payload: Partial<UsersTrucksCreateUpdate>,
  ): ReturnType<IService<UsersTrucksEntityObjectT>['update']> {
    const result = await this.usersTrucksRepository.update(id, payload);

    return UsersTrucksEntity.initialize(result).toObject();
  }

  public delete(
    id: UsersTrucksEntityT['id'],
  ): ReturnType<IService<UsersTrucksEntityObjectT>['delete']> {
    return this.usersTrucksRepository.delete(id);
  }
}

export { UsersTrucksService };
