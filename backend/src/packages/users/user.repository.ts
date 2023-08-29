import { and, eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import {
  type UserDatabaseModel,
  type UserDatabaseModelCreateUpdate,
  type UserDatabaseModelWithGroup
} from './libs/types/types.js';

class UserRepository implements IRepository<UserDatabaseModel> {
  private db: Pick<IDatabase, 'driver'>;

  private usersSchema: DatabaseSchema['users'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    usersSchema: DatabaseSchema['users'],
  ) {
    this.db = database;
    this.usersSchema = usersSchema;
  }

  public findAll(): Promise<UserDatabaseModel[]> {
    return this.db.driver().select().from(this.usersSchema);
  }

  public find(partial: Partial<UserDatabaseModel>):
    ReturnType<IRepository<UserDatabaseModelWithGroup>['find']> {
    const queries = Object.entries(partial).map(([key, value]) => eq(
      this.usersSchema[key as keyof typeof partial],
      value as NonNullable<typeof value>
    ));

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver().query.users.findMany({
        where: finalQuery,
        with: { group: true }
      })
      .execute();
  }

  public async create(entity: UserDatabaseModelCreateUpdate): ReturnType<IRepository<UserDatabaseModel>['create']> {
    const [result] = await this.db
      .driver()
      .insert(this.usersSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update(
    id: UserDatabaseModel['id'],
    updated: Partial<UserDatabaseModelCreateUpdate>
  ): ReturnType<IRepository<UserDatabaseModel>['update']> {
    const [result] = await this.db
      .driver()
      .update(this.usersSchema)
      .set(updated)
      .where(eq(this.usersSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(id: UserDatabaseModel['id']): ReturnType<IRepository<UserDatabaseModel>['delete']> {
    await this.db
      .driver()
      .delete(this.usersSchema)
      .where(eq(this.usersSchema.id, id))
      .execute();

    return true;
  }
}

export { UserRepository };
