import { and, eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import {
  type DatabaseSchema,
  type IDatabase,
} from '~/libs/packages/database/database.js';

import {
  type GroupDatabaseModel,
  type GroupDatabaseModelCreateUpdate,
} from './libs/types/types.js';

class GroupRepository implements IRepository<GroupDatabaseModel> {
  private db: Pick<IDatabase, 'driver'>;

  private groupsSchema: DatabaseSchema['groups'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    groupsSchema: DatabaseSchema['groups'],
  ) {
    this.db = database;
    this.groupsSchema = groupsSchema;
  }

  public find(
    partial: Partial<GroupDatabaseModel>,
  ): ReturnType<IRepository<GroupDatabaseModel>['find']> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.groupsSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.groups.findMany({ where: finalQuery })
      .execute();
  }

  public async create(
    entity: GroupDatabaseModelCreateUpdate,
  ): ReturnType<IRepository<GroupDatabaseModel>['create']> {
    const [result] = await this.db
      .driver()
      .insert(this.groupsSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update(
    id: GroupDatabaseModel['id'],
    updated: Partial<GroupDatabaseModelCreateUpdate>,
  ): ReturnType<IRepository<GroupDatabaseModel>['update']> {
    const [result] = await this.db
      .driver()
      .update(this.groupsSchema)
      .set(updated)
      .where(eq(this.groupsSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(
    id: GroupDatabaseModel['id'],
  ): ReturnType<IRepository<GroupDatabaseModel>['delete']> {
    await this.db
      .driver()
      .delete(this.groupsSchema)
      .where(eq(this.groupsSchema.id, id))
      .execute();

    return true;
  }
}

export { GroupRepository };
