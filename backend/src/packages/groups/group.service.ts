import { type IService } from '~/libs/interfaces/interfaces.js';
import { type GroupRepository } from '~/packages/groups/group.repository.js';

import { GroupEntity } from './group.entity.js';
import {
  type GroupDatabaseModelCreateUpdate,
  type GroupEntityObjectT,
  type GroupEntityT,
} from './libs/types/types.js';

class GroupService implements IService<GroupEntityObjectT> {
  private groupRepository: GroupRepository;

  public constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository;
  }

  public async findByName(name: GroupEntityT['name']): Promise<GroupEntityObjectT | null> {
    const result = await this.groupRepository.find({ name });

    return result.length === 1 ? GroupEntity.initialize(result[0]).toObject() : null;
  }

  public async findByKey(key: GroupEntityT['key']): Promise<GroupEntityObjectT | null> {
    const result = await this.groupRepository.find({ key });

    return result.length === 1 ? GroupEntity.initialize(result[0]).toObject() : null;
  }

  public async findById(id: GroupEntityT['id']): ReturnType<IService<GroupEntityObjectT>['findById']> {
    const result = await this.groupRepository.find({ id });

    return result.length === 1 ? GroupEntity.initialize(result[0]).toObject() : null;
  }

  public async create(
    payload: GroupDatabaseModelCreateUpdate,
  ): ReturnType<IService<GroupEntityObjectT>['create']> {
    const result = await this.groupRepository.create(payload);

    return GroupEntity.initialize(result).toObject();
  }

  public async update(id: GroupEntityT['id'], payload: Partial<GroupDatabaseModelCreateUpdate>): ReturnType<IService<GroupEntityObjectT>['update']> {
    const result = await this.groupRepository.update(id, payload);

    return GroupEntity.initialize(result).toObject();
  }

  public delete(id: GroupEntityT['id']): ReturnType<IService<GroupEntityObjectT>['delete']> {
    return this.groupRepository.delete(id);
  }
}

export { GroupService };
