import { eq, placeholder, sql } from 'drizzle-orm';

import { DatabaseError } from '~/libs/exceptions/exceptions.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type TruckEntity, type TruckEntityT } from './libs/types/types.js';

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

  public async findById(id: number): Promise<TruckEntity[]> {
    try {
      return await this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .where(eq(this.trucksSchema.id, id));
    } catch (error: unknown) {
      throw new DatabaseError({
        message: `Truck with ID ${id} was not found in the database`,
        cause: error,
      });
    }
  }

  public async findAll(): Promise<TruckEntity[]> {
    try {
      return await this.db.driver().select().from(this.trucksSchema);
    } catch (error: unknown) {
      throw new DatabaseError({
        message: 'Failed to retrieve trucks',
        cause: error,
      });
    }
  }

  public async create(
    entity: Omit<TruckEntityT, 'id'>,
  ): Promise<TruckEntity[]> {
    try {
      const preparedInsert = this.db
        .driver()
        .insert(this.trucksSchema)
        .values(entity)
        .returning()
        .prepare('createTruck');

      return await preparedInsert.execute();
    } catch (error: unknown) {
      throw new DatabaseError({
        message: 'Failed to create a new truck',
        cause: error,
      });
    }
  }

  public async update(
    id: number,
    payload: Partial<TruckEntity>,
  ): Promise<TruckEntity[]> {
    try {
      const preparedUpdate = this.db
        .driver()
        .update(this.trucksSchema)
        .set(payload)
        .where(sql`${this.trucksSchema.id} = ${placeholder('id')}`)
        .returning()
        .prepare('updateTruck');

      return await preparedUpdate.execute({ id });
    } catch (error: unknown) {
      throw new DatabaseError({
        message: 'An error occurred while updating the truck in the database',
        cause: error,
      });
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      return Boolean(
        await this.db
          .driver()
          .delete(this.trucksSchema)
          .where(eq(this.trucksSchema.id, id))
          .returning()
          .execute(),
      );
    } catch (error: unknown) {
      throw new DatabaseError({
        message: `Failed to update truck with ID ${id}`,
        cause: error,
      });
    }
  }

  public async find(query: string): Promise<TruckEntity[]> {
    try {
      const preparedQuery = this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .where(
          sql`lower(${
            this.trucksSchema.licensePlateNumber
          }) ilike ${placeholder('query')}`,
        )
        .prepare('findTrucks');

      return await preparedQuery.execute({ query: `%${query}%` });
    } catch (error: unknown) {
      throw new DatabaseError({
        message: `An error occurred while searching ${query} for trucks`,
        cause: error,
      });
    }
  }
}

export { TruckRepository };
