import { eq, ilike, placeholder, sql } from 'drizzle-orm';

import { countOffsetByQuery, getSortedBy } from '~/libs/helpers/helpers.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type PaginationWithSortingParameters } from '~/libs/types/types.js';

import {
  type TruckDatabaseModel,
  type TruckEntity,
} from './libs/types/types.js';

class TruckRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private trucksSchema: DatabaseSchema['trucks'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    trucksSchema: DatabaseSchema['trucks'],
  ) {
    this.db = database;
    this.trucksSchema = trucksSchema;
  }

  public async findById(id: number): Promise<TruckDatabaseModel[]> {
    return await this.db
      .driver()
      .select()
      .from(this.trucksSchema)
      .where(eq(this.trucksSchema.id, id));
  }

  public async findAll(): Promise<TruckDatabaseModel[]> {
    return await this.db.driver().select().from(this.trucksSchema);
  }

  public async findAllByBusinessId(
    businessId: number,
    query: PaginationWithSortingParameters,
  ): Promise<TruckDatabaseModel[]> {
    const offset = countOffsetByQuery({ size: query.size, page: query.page });

    const sortedBy = getSortedBy(
      query.sort,
      this.trucksSchema.createdAt,
      this.trucksSchema.year,
    );

    return await this.db
      .driver()
      .select()
      .from(this.trucksSchema)
      .where(eq(this.trucksSchema.businessId, businessId))
      .orderBy(...sortedBy)
      .offset(offset)
      .limit(query.size);
  }

  public async getTotal(businessId: number): Promise<number> {
    const [total] = await this.db
      .driver()
      .select({ count: sql<number>`count(${this.trucksSchema.businessId})` })
      .from(this.trucksSchema)
      .where(eq(this.trucksSchema.businessId, businessId));

    return total.count;
  }

  public async create(
    entity: Omit<TruckEntity, 'id' | 'createdAt'>,
  ): Promise<TruckDatabaseModel[]> {
    const preparedQuery = this.db
      .driver()
      .insert(this.trucksSchema)
      .values(entity)
      .returning()
      .prepare('createTruck');

    return await preparedQuery.execute();
  }

  public async update(
    id: number,
    payload: Partial<Omit<TruckEntity, 'createdAt'>>,
  ): Promise<TruckDatabaseModel[]> {
    const preparedQuery = this.db
      .driver()
      .update(this.trucksSchema)
      .set(payload)
      .where(eq(this.trucksSchema.id, placeholder('id')))
      .returning()
      .prepare('updateTruck');

    return await preparedQuery.execute({ id });
  }

  public async delete(id: number): Promise<boolean> {
    return Boolean(
      await this.db
        .driver()
        .delete(this.trucksSchema)
        .where(eq(this.trucksSchema.id, id))
        .returning()
        .execute(),
    );
  }

  public async find(query: string): Promise<TruckDatabaseModel[]> {
    const preparedQuery = this.db
      .driver()
      .select()
      .from(this.trucksSchema)
      .where(ilike(this.trucksSchema.licensePlateNumber, placeholder('query')))
      .prepare('findTrucks');

    return await preparedQuery.execute({ query: `%${query}%` });
  }
}

export { TruckRepository };
