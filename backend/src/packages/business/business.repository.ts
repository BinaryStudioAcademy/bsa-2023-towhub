import { type SQL, and, eq, or } from 'drizzle-orm';

import { AppErrorMessage } from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IRepository } from '~/libs/interfaces/repository.interface.js';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/database.interface.js';
import {
  type DatabaseSchema,
  schema,
} from '~/libs/packages/database/schema/schema.js';
import { type OperationResult } from '~/libs/types/types.js';

import { BusinessEntity } from './business.entity.js';
import { type BusinessEntityT } from './libs/types/types.js';

class BusinessRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private businessSchema: DatabaseSchema['business'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    businessSchema: DatabaseSchema['business'],
  ) {
    this.db = database;
    this.businessSchema = businessSchema;
  }

  public find(
    partial: Partial<BusinessEntityT>,
  ): ReturnType<IRepository<BusinessEntityT>['find']> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.businessSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.business.findMany({ where: finalQuery })
      .execute();
  }

  public async checkExists({
    id,
    taxNumber,
    companyName,
    ownerId,
  }: Partial<BusinessEntityT>): Promise<OperationResult<boolean>> {
    const filterClause: SQL[] = [];

    if (id) {
      filterClause.push(eq(this.businessSchema.id, id));
    }

    if (taxNumber) {
      filterClause.push(eq(this.businessSchema.taxNumber, taxNumber));
    }

    if (companyName) {
      filterClause.push(eq(this.businessSchema.companyName, companyName));
    }

    if (ownerId) {
      filterClause.push(eq(this.businessSchema.ownerId, ownerId));
    }

    if (filterClause.length === 0) {
      throw new ApplicationError({
        message: AppErrorMessage.INVALID_QUERY,
      });
    }

    const [business]: BusinessEntityT[] = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .where(or(...filterClause));

    return {
      result: Boolean(business),
    };
  }

  public async create(entity: BusinessEntity): Promise<BusinessEntity> {
    const { companyName, taxNumber, ownerId } = entity.toNewObject();

    const [item] = await this.db
      .driver()
      .insert(this.businessSchema)
      .values({ companyName, taxNumber, ownerId })
      .returning()
      .execute();

    return BusinessEntity.initialize(item);
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<BusinessEntityT>;
  }): Promise<BusinessEntity> {
    const [item] = await this.db
      .driver()
      .update(this.businessSchema)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(this.businessSchema.id, id))
      .returning()
      .execute();

    return BusinessEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const [item] = await this.db
      .driver()
      .delete(this.businessSchema)
      .where(eq(this.businessSchema.id, id))
      .returning()
      .execute();

    return Boolean(item);
  }

  public async checkisDriverBelongedToBusiness(
    userId: number,
    driverId: number,
  ): Promise<boolean> {
    const [item] = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .innerJoin(
        schema.drivers,
        eq(this.businessSchema.id, schema.drivers.businessId),
      )
      .where(
        and(
          eq(this.businessSchema.ownerId, userId),
          eq(schema.drivers.userId, driverId),
        ),
      )
      .execute();

    return Boolean(item);
  }
}

export { BusinessRepository };
