import { eq, ilike, or } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type TruckEntity as TruckEntityT } from './libs/types/types.js';
import { TruckEntity } from './truck.entity.js';

type NewTruckData = Omit<TruckEntityT, 'id' | 'createdAt' | 'updatedAt'>;

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

  public async find(id: number): Promise<TruckEntity | null> {
    const result: TruckEntityT[] = await this.db
      .driver()
      .select()
      .from(this.trucksSchema)
      .where(eq(this.trucksSchema.id, id));

    return result.length === 0 ? null : TruckEntity.initialize(result[0]);
  }

  public async findAll(): Promise<TruckEntity[]> {
    try {
      const result = await this.db.driver().select().from(this.trucksSchema);

      return result.length === 0
        ? []
        : result.map((it) => TruckEntity.initialize(it));
    } catch (error) {
      throw new Error(`Failed to retrieve trucks: ${(error as Error).message}`);
    }
  }

  public async create(entity: NewTruckData): Promise<TruckEntity> {
    try {
      const {
        manufacturer,
        capacity,
        pricePerKm,
        licensePlateNumber,
      }: NewTruckData = entity;

      const [result] = await this.db
        .driver()
        .insert(this.trucksSchema)
        .values({
          manufacturer,
          capacity,
          pricePerKm,
          licensePlateNumber,
        })
        .returning()
        .execute();

      return TruckEntity.initialize(result);
    } catch (error) {
      throw new Error(
        `Failed to create a new truck: ${(error as Error).message}`,
      );
    }
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<TruckEntityT>;
  }): Promise<TruckEntity> {
    const [result] = await this.db
      .driver()
      .update(this.trucksSchema)
      .set(payload)
      .where(eq(this.trucksSchema.id, id))
      .returning()
      .execute();

    return TruckEntity.initialize(result);
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
    } catch (error) {
      throw new Error(
        `Failed to update truck with ID ${id}: ${(error as Error).message}`,
      );
    }
  }

  public async search(query: string): Promise<TruckEntity[]> {
    try {
      const result = await this.db
        .driver()
        .select()
        .from(this.trucksSchema)
        .where(
          or(
            ilike(this.trucksSchema.manufacturer, `%${query}%`),
            ilike(this.trucksSchema.capacity, `%${query}%`),
            ilike(this.trucksSchema.pricePerKm, `%${query}%`),
            ilike(this.trucksSchema.licensePlateNumber, `%${query}%`),
          ),
        );

      return result.length === 0
        ? []
        : result.map((it) => TruckEntity.initialize(it));
    } catch (error) {
      throw new Error(
        `An error occurred while searching ${query} for trucks: ${
          (error as Error).message
        }`,
      );
    }
  }

  public async getTrucksByOwner(ownerId: number): Promise<TruckEntity[]> {
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

      return result.map((it) => TruckEntity.initialize(it.trucks));
    } catch (error) {
      throw new Error(
        `Failed to fetch trucks by owner (ownerId: ${ownerId}). Error: ${
          (error as Error).message
        }`,
      );
    }
  }
}

export { TruckRepository };
