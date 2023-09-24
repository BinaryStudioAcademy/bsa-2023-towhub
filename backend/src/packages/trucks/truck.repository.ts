import { eq, ilike, placeholder, sql } from 'drizzle-orm';

import { countOffsetByQuery, getSortedBy } from '~/libs/helpers/helpers.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type PaginationWithSortingParameters } from '~/libs/types/types.js';

import {
  type DriverHaveAccessToTruck,
  type TruckDatabaseModel,
  type TruckEntityT,
} from './libs/types/types.js';

class TruckRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private trucksSchema: DatabaseSchema['trucks'];

  private usersTrucksSchema: DatabaseSchema['usersTrucks'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    trucksSchema: DatabaseSchema['trucks'],
    usersTrucksSchema: DatabaseSchema['usersTrucks'],
  ) {
    this.db = database;
    this.trucksSchema = trucksSchema;
    this.usersTrucksSchema = usersTrucksSchema;
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
    { size, sort, page }: PaginationWithSortingParameters,
  ): Promise<TruckDatabaseModel[]> {
    const offset = countOffsetByQuery({ size, page });

    const sortedBy = getSortedBy(
      sort,
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
      .limit(size);
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
    entity: Omit<TruckEntityT, 'id' | 'createdAt' | 'status'>,
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
    payload: Partial<Omit<TruckEntityT, 'createdAt'>>,
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

  public async getTrucksByBusinessId(
    id: number,
  ): Promise<TruckDatabaseModel[]> {
    return await this.db
      .driver()
      .select()
      .from(this.trucksSchema)
      .where(eq(this.trucksSchema.businessId, id));
  }

  public async addTruckToDriver(
    driverTruckIds: DriverHaveAccessToTruck[],
  ): Promise<void> {
    const preparedQuery = this.db
      .driver()
      .insert(this.usersTrucksSchema)
      .values(driverTruckIds)
      .prepare('addTruckToDriver');

    await preparedQuery.execute();
  }

  public async getTrucksByUserId(
    userId: number,
  ): Promise<DriverHaveAccessToTruck[]> {
    const preparedQuery = this.db
      .driver()
      .select()
      .from(this.usersTrucksSchema)
      .where(eq(this.usersTrucksSchema.userId, userId))
      .prepare('getTrucksByUserId');

    return await preparedQuery.execute();
  }
}

export { TruckRepository };
