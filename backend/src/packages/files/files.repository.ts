import { and, eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import {
  type FileDatabaseModel,
  type FileDatabaseModelCreateUpdate,
} from './libs/types/types.js';

class FilesRepository implements IRepository<FileDatabaseModel> {
  private db: Pick<IDatabase, 'driver'>;

  private filesSchema: DatabaseSchema['files'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    filesSchema: DatabaseSchema['files'],
  ) {
    this.db = database;
    this.filesSchema = filesSchema;
  }

  public findAll(): Promise<FileDatabaseModel[]> {
    return this.db.driver().select().from(this.filesSchema);
  }

  public find(
    partial: Partial<FileDatabaseModel>,
  ): Promise<FileDatabaseModel[]> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.filesSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.files.findMany({
        where: finalQuery,
      })
      .execute();
  }

  public async create(
    entity: FileDatabaseModelCreateUpdate,
  ): Promise<FileDatabaseModel> {
    const [result] = await this.db
      .driver()
      .insert(this.filesSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update(
    id: FileDatabaseModel['id'],
    updated: Partial<FileDatabaseModelCreateUpdate>,
  ): Promise<FileDatabaseModel> {
    const [result] = await this.db
      .driver()
      .update(this.filesSchema)
      .set(updated)
      .where(eq(this.filesSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(
    id: FileDatabaseModel['id'],
  ): ReturnType<IRepository<FileDatabaseModel>['delete']> {
    const result = await this.db
      .driver()
      .delete(this.filesSchema)
      .where(eq(this.filesSchema.id, id))
      .returning()
      .execute();

    return result.length > 0;
  }
}

export { FilesRepository };
