import { eq, ilike, or } from 'drizzle-orm';

import { DatabaseError } from '~/libs/exceptions/exceptions.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

type TruckEntityDatabase = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  manufacturer: string;
  capacity: number;
  pricePerKm: number;
  licensePlateNumber: string;
  year: string;
};

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

  public async find(id: number): Promise<TruckEntityDatabase | null> {
    try {
      const [truck = null] = await this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .where(eq(this.trucksSchema.id, id));

      return truck;
    } catch (error: unknown) {
      throw new DatabaseError({
        message: 'An error occurred while fetching the truck from the database',
        cause: error,
      });
    }
  }

  public async findAll(): Promise<TruckEntityDatabase[]> {
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
    entity: TruckEntityDatabase,
  ): Promise<TruckEntityDatabase> {
    try {
      const [result] = await this.db
        .driver()
        .insert(this.trucksSchema)
        .values(entity)
        .returning()
        .execute();

      return result;
    } catch (error: unknown) {
      throw new DatabaseError({
        message: 'Failed to create a new truck',
        cause: error,
      });
    }
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<TruckEntityDatabase>;
  }): Promise<TruckEntityDatabase> {
    const [result] = await this.db
      .driver()
      .update(this.trucksSchema)
      .set(payload)
      .where(eq(this.trucksSchema.id, id))
      .returning()
      .execute();

    return result;
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const [item] = await this.db
        .driver()
        .delete(this.trucksSchema)
        .where(eq(this.trucksSchema.id, id))
        .returning()
        .execute();

      return Boolean(item);
    } catch (error: unknown) {
      throw new DatabaseError({
        message: `Failed to update truck with ID ${id}`,
        cause: error,
      });
    }
  }

  public async search(query: string): Promise<TruckEntityDatabase[]> {
    try {
      return await this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .where(
          or(
            ilike(this.trucksSchema.manufacturer, `%${query}%`),
            ilike(this.trucksSchema.capacity, `%${query}%`),
            ilike(this.trucksSchema.pricePerKm, `%${query}%`),
            ilike(this.trucksSchema.licensePlateNumber, `%${query}%`),
            ilike(this.trucksSchema.year, `%${query}%`),
          ),
        );
    } catch (error: unknown) {
      throw new DatabaseError({
        message: `An error occurred while searching ${query} for trucks`,
        cause: error,
      });
    }
  }

  public async getTrucksByOwner(
    ownerId: number,
  ): Promise<TruckEntityDatabase[]> {
    try {
      const result = await this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .leftJoin(
          this.usersTrucksSchema,
          eq(this.trucksSchema.id, this.usersTrucksSchema.truckId),
        )
        .where(eq(this.usersTrucksSchema.userId, ownerId))
        .orderBy(this.trucksSchema.id)
        .execute();

      const mappedResult: TruckEntityDatabase[] = result.map((it) => it.trucks);

      return mappedResult;
    } catch (error) {
      throw new DatabaseError({
        message: `Failed to fetch trucks by owner (ownerId: ${ownerId})`,
        cause: error,
      });
    }
  }
}

export { TruckRepository };
