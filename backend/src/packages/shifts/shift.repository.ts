import { and, desc, eq, isNull } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/database.interface.js';
import {
  type DatabaseSchema,
  schema,
} from '~/libs/packages/database/schema/schema.js';

import { type ShiftDatabaseModel } from './libs/types/types.js';
import { type ShiftEntity as ShiftEntityT } from './shift.js';

class ShiftRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private shiftSchema: DatabaseSchema['shifts'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    shiftSchema: DatabaseSchema['shifts'],
  ) {
    this.db = database;
    this.shiftSchema = shiftSchema;
  }

  public find(
    partial: Partial<ShiftDatabaseModel>,
  ): Promise<ShiftDatabaseModel[]> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.shiftSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.shifts.findMany({
        where: finalQuery,
      })
      .execute();
  }

  public async getOpenedByDriver(
    driverId: number,
  ): Promise<ShiftDatabaseModel | null> {
    const [shift = null] = await this.db
      .driver()
      .select()
      .from(this.shiftSchema)
      .where(
        and(
          isNull(this.shiftSchema.endDate),
          eq(this.shiftSchema.driverId, driverId),
        ),
      )
      .execute();

    return shift;
  }

  public async getOpenedByTruckWithBusiness(
    truckId: number,
  ): Promise<
    | (ShiftDatabaseModel & { businessId: number; driverLicenseNumber: string })
    | null
  > {
    const [shift = null] = await this.db
      .driver()
      .select()
      .from(this.shiftSchema)
      .innerJoin(
        schema.drivers,
        eq(this.shiftSchema.driverId, schema.drivers.userId),
      )
      .where(
        and(
          isNull(this.shiftSchema.endDate),
          eq(this.shiftSchema.truckId, truckId),
        ),
      )
      .execute();

    return shift
      ? {
          ...shift.shifts,
          businessId: shift.driver_details.businessId,
          driverLicenseNumber: shift.driver_details.driverLicenseNumber,
        }
      : null;
  }

  public getAllOpened(): Promise<ShiftDatabaseModel[]> {
    return this.db
      .driver()
      .select()
      .from(this.shiftSchema)
      .orderBy(desc(this.shiftSchema.startDate))
      .where(isNull(this.shiftSchema.endDate))
      .execute();
  }

  public async create(
    entity: Pick<ShiftEntityT, 'startDate' | 'truckId' | 'driverId'>,
  ): Promise<ShiftDatabaseModel> {
    const [shift] = await this.db
      .driver()
      .insert(this.shiftSchema)
      .values(entity)
      .returning()
      .execute();

    return shift;
  }

  public async findById(
    id: ShiftEntityT['id'],
  ): Promise<ShiftDatabaseModel | null> {
    const [shift = null] = await this.db
      .driver()
      .select()
      .from(this.shiftSchema)
      .where(eq(this.shiftSchema.id, id))
      .execute();

    return shift;
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<ShiftDatabaseModel>;
  }): Promise<ShiftDatabaseModel> {
    const [item] = await this.db
      .driver()
      .update(this.shiftSchema)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(this.shiftSchema.id, id))
      .returning()
      .execute();

    return item;
  }

  public async delete(id: number): Promise<boolean> {
    const [item] = await this.db
      .driver()
      .delete(this.shiftSchema)
      .where(eq(this.shiftSchema.id, id))
      .returning()
      .execute();

    return await Promise.resolve(Boolean(item));
  }
}

export { ShiftRepository };
