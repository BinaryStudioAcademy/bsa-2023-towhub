import { and, eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import {
  type DriverHaveAccessToTruck,
  type TruckDatabaseModel,
} from '../trucks/libs/types/types.js';
import {
  type UsersTrucksEntityT,
  type UsersTrucksModel,
} from './libs/types/types.js';

class UsersTrucksRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private usersTrucksSchema: DatabaseSchema['usersTrucks'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    usersTrucksSchema: DatabaseSchema['usersTrucks'],
  ) {
    this.db = database;
    this.usersTrucksSchema = usersTrucksSchema;
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

  public async find(
    partial: Partial<UsersTrucksModel>,
  ): ReturnType<IRepository<UsersTrucksEntityT>['find']> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(this.usersTrucksSchema[key as keyof typeof partial], value),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return await this.db
      .driver()
      .query.usersTrucks.findMany({
        where: finalQuery,
      })
      .execute();
  }

  public async findById(id: number): Promise<UsersTrucksEntityT> {
    const [result] = await this.db
      .driver()
      .select()
      .from(this.usersTrucksSchema)
      .where(eq(this.usersTrucksSchema.id, id));

    return result;
  }

  public async findTrucksByUserId(
    userId: number,
  ): Promise<TruckDatabaseModel[]> {
    const result = await this.db.driver().query.usersTrucks.findMany({
      columns: {},
      with: {
        truck: true,
      },
      where: (usersTrucks, { eq }) => eq(usersTrucks.userId, userId),
    });

    return result.map((rawTruck) => rawTruck.truck as TruckDatabaseModel);
  }

  public async create(
    entity: Pick<UsersTrucksEntityT, 'userId' | 'truckId'>,
  ): Promise<UsersTrucksModel> {
    const [result] = await this.db
      .driver()
      .insert(this.usersTrucksSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update(
    id: number,
    payload: Partial<UsersTrucksEntityT>,
  ): Promise<UsersTrucksModel> {
    const [result] = await this.db
      .driver()
      .update(this.usersTrucksSchema)
      .set(payload)
      .where(eq(this.usersTrucksSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(id: number): Promise<boolean> {
    return Boolean(
      await this.db
        .driver()
        .delete(this.usersTrucksSchema)
        .where(eq(this.usersTrucksSchema.id, id))
        .returning()
        .execute(),
    );
  }

  public async deleteByUserId(userId: number): Promise<boolean> {
    return Boolean(
      await this.db
        .driver()
        .delete(this.usersTrucksSchema)
        .where(eq(this.usersTrucksSchema.userId, userId))
        .returning()
        .execute(),
    );
  }

  public async deleteByTruckId(truckId: number): Promise<boolean> {
    return Boolean(
      await this.db
        .driver()
        .delete(this.usersTrucksSchema)
        .where(eq(this.usersTrucksSchema.truckId, truckId))
        .returning()
        .execute(),
    );
  }
}

export { UsersTrucksRepository };
