import { type SQL, and, desc, eq, or, sql } from 'drizzle-orm';

import { AppErrorMessage } from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IRepository } from '~/libs/interfaces/repository.interface.js';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/database.interface.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { type OperationResult } from '~/libs/types/types.js';

import { DriverEntity } from './driver.entity.js';
import { type DriverEntity as DriverEntityT } from './drivers.js';

class DriverRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private driverSchema: DatabaseSchema['drivers'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,

    driverSchema: DatabaseSchema['drivers'],
  ) {
    this.db = database;
    this.driverSchema = driverSchema;
  }

  public find(
    partial: Partial<Omit<DriverEntityT, 'user'>>,
  ): ReturnType<IRepository<DriverEntityT>['find']> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.driverSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    return this.db
      .driver()
      .query.drivers.findMany({ where: finalQuery, with: { user: true } })
      .execute();
  }

  public async findAllByBusinessId(
    businessId: number,
  ): Promise<DriverEntity[]> {
    const drivers = await this.db
      .driver()
      .query.drivers.findMany({
        where: eq(this.driverSchema.businessId, businessId),
        with: { user: true },
      })
      .execute();

    return drivers.map((it) => DriverEntity.initialize(it));
  }

  public async findPageOfDrivers(
    businessId: number,
    pageIndex: number,
    pageSize: number,
  ): Promise<DriverEntity[]> {
    const offset = pageIndex * pageSize;
    const drivers = await this.db
      .driver()
      .query.drivers.findMany({
        limit: pageSize,
        offset,
        where: eq(this.driverSchema.businessId, businessId),
        with: { user: true },
        orderBy: [desc(this.driverSchema.createdAt)],
      })
      .execute();

    return drivers.map((it) => DriverEntity.initialize(it));
  }

  public async checkExists({
    driverLicenseNumber,
    userId,
  }: Partial<DriverEntityT>): Promise<OperationResult<boolean>> {
    const filterClause: SQL[] = [];

    if (driverLicenseNumber) {
      filterClause.push(
        eq(this.driverSchema.driverLicenseNumber, driverLicenseNumber),
      );
    }

    if (userId) {
      filterClause.push(eq(this.driverSchema.userId, userId));
    }

    if (filterClause.length === 0) {
      throw new ApplicationError({
        message: AppErrorMessage.INVALID_QUERY,
      });
    }

    const [driver]: DriverEntityT[] = await this.db
      .driver()
      .select()
      .from(this.driverSchema)
      .where(or(...filterClause));

    return {
      result: Boolean(driver),
    };
  }

  public async create(entity: DriverEntity): Promise<DriverEntity> {
    const { driverLicenseNumber, userId, businessId } = entity.toNewObject();

    const [item] = await this.db
      .driver()
      .insert(this.driverSchema)
      .values({ driverLicenseNumber, userId, businessId })
      .returning()
      .execute();

    return DriverEntity.initialize(item);
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<Pick<DriverEntityT, 'driverLicenseNumber'>>;
  }): Promise<DriverEntity> {
    const [item] = await this.db
      .driver()
      .update(this.driverSchema)
      .set(payload)
      .where(eq(this.driverSchema.id, id))
      .returning()
      .execute();

    return DriverEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const [item] = await this.db
      .driver()
      .delete(this.driverSchema)
      .where(eq(this.driverSchema.id, id))
      .returning()
      .execute();

    return Boolean(item);
  }

  public async getTotal(id: number): Promise<number> {
    const [driver] = await this.db
      .driver()
      .select({ count: sql<number>`count(*)` })
      .from(this.driverSchema)
      .where(eq(this.driverSchema.businessId, id));

    return driver.count;
  }
}

export { DriverRepository };
