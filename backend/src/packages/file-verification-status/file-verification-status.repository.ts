import { and, eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/interfaces.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import {
  type FileVerificationStatusDatabaseCreateUpdateModel,
  type FileVerificationStatusDatabaseModel,
} from './libs/types/types.js';

class FileVerificationStatusRepository
  implements IRepository<FileVerificationStatusDatabaseModel>
{
  private db: Pick<IDatabase, 'driver'>;

  private fileVerificationStatusSchema: DatabaseSchema['fileVerificationStatus'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    fileVerificationStatusSchema: DatabaseSchema['fileVerificationStatus'],
  ) {
    this.db = database;
    this.fileVerificationStatusSchema = fileVerificationStatusSchema;
  }

  public findAll(): Promise<FileVerificationStatusDatabaseModel[]> {
    return this.db.driver().select().from(this.fileVerificationStatusSchema);
  }

  public findByFileId(
    fileId: FileVerificationStatusDatabaseModel['fileId'],
  ): Promise<FileVerificationStatusDatabaseModel[]> {
    return this.db
      .driver()
      .select()
      .from(this.fileVerificationStatusSchema)
      .where(eq(this.fileVerificationStatusSchema.fileId, fileId));
  }

  public find(
    partial: Partial<FileVerificationStatusDatabaseModel>,
  ): Promise<FileVerificationStatusDatabaseModel[]> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.fileVerificationStatusSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.fileVerificationStatus.findMany({
        where: finalQuery,
      })
      .execute();
  }

  public async create(
    entity: FileVerificationStatusDatabaseCreateUpdateModel,
  ): Promise<FileVerificationStatusDatabaseModel> {
    const [result] = await this.db
      .driver()
      .insert(this.fileVerificationStatusSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update(
    id: FileVerificationStatusDatabaseModel['id'],
    updated: Partial<FileVerificationStatusDatabaseCreateUpdateModel>,
  ): Promise<FileVerificationStatusDatabaseModel> {
    const [result] = await this.db
      .driver()
      .update(this.fileVerificationStatusSchema)
      .set(updated)
      .where(eq(this.fileVerificationStatusSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(
    id: FileVerificationStatusDatabaseModel['id'],
  ): ReturnType<IRepository<FileVerificationStatusDatabaseModel>['delete']> {
    const result = await this.db
      .driver()
      .delete(this.fileVerificationStatusSchema)
      .where(eq(this.fileVerificationStatusSchema.id, id))
      .returning()
      .execute();

    return result.length > 0;
  }

  public async deleteByFileId(
    fileId: FileVerificationStatusDatabaseModel['fileId'],
  ): ReturnType<IRepository<FileVerificationStatusDatabaseModel>['delete']> {
    const result = await this.db
      .driver()
      .delete(this.fileVerificationStatusSchema)
      .where(eq(this.fileVerificationStatusSchema.fileId, fileId))
      .returning()
      .execute();

    return result.length > 0;
  }
}

export { FileVerificationStatusRepository };
