import { eq, ilike, placeholder } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import {
  type TruckDatabaseModel,
  type TruckEntity,
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

  public async create(
    entity: Omit<TruckEntity, 'id'>,
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
    payload: Partial<TruckEntity>,
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

  public async insertUserTruck(
    userId: number,
    truckId: number,
  ): Promise<
    {
      userId: number;
      truckId: number;
    }[]
  > {
    const preparedQuery = this.db
      .driver()
      .insert(this.usersTrucksSchema)
      .values({ userId, truckId })
      .returning()
      .prepare('insertUserTruck');

    return await preparedQuery.execute();
  }
}

export { TruckRepository };
