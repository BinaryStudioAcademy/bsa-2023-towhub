import { type SQL, and, desc, eq, or, sql } from 'drizzle-orm';

import { AppErrorMessage } from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IRepository } from '~/libs/interfaces/repository.interface.js';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/database.interface.js';
import {
  type DatabaseSchema,
  schema,
} from '~/libs/packages/database/schema/schema.js';
import { type OperationResult } from '~/libs/types/types.js';

import { DriverEntity } from './driver.entity.js';
import { type DriverEntityT } from './drivers.js';
import { SELECT_DRIVER_JOIN_FILE_VERIFICATION_STATUS } from './libs/constants/constants.js';
import { countOffsetByQuery } from './libs/helpers/helpers.js';
import { type GetPaginatedPageQuery } from './libs/types/types.js';

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

  public async find(
    partial: Partial<Omit<DriverEntityT, 'user' | 'verificationStatus'>>,
  ): ReturnType<IRepository<DriverEntityT>['find']> {
    const queries = Object.entries(partial).map(([key, value]) =>
      eq(
        this.driverSchema[key as keyof typeof partial],
        value as NonNullable<typeof value>,
      ),
    );

    const finalQuery = queries.length === 1 ? queries[0] : and(...queries);

    const drivers = await this.db
      .driver()
      .select(SELECT_DRIVER_JOIN_FILE_VERIFICATION_STATUS)
      .from(this.driverSchema)
      .innerJoin(
        schema.fileVerificationStatus,
        eq(
          this.driverSchema.driverLicenseFileId,
          schema.fileVerificationStatus.fileId,
        ),
      )
      .innerJoin(schema.users, eq(this.driverSchema.userId, schema.users.id))
      .where(finalQuery)
      .execute();

    return drivers.map(({ createdAt, updatedAt, ...pureDriver }) =>
      DriverEntity.initialize({
        ...pureDriver,
        createdAt: createdAt.toISOString(),
      }).toObject(),
    );
  }

  public async findAllByBusinessId(
    businessId: number,
    query: GetPaginatedPageQuery,
  ): Promise<DriverEntity[]> {
    const offset = countOffsetByQuery(query);
    const drivers = await this.db
      .driver()
      .select(SELECT_DRIVER_JOIN_FILE_VERIFICATION_STATUS)
      .from(this.driverSchema)
      .innerJoin(
        schema.fileVerificationStatus,
        eq(
          this.driverSchema.driverLicenseFileId,
          schema.fileVerificationStatus.fileId,
        ),
      )
      .innerJoin(schema.users, eq(this.driverSchema.userId, schema.users.id))
      .limit(query.size)
      .offset(offset)
      .where(eq(this.driverSchema.businessId, businessId))
      .orderBy(desc(this.driverSchema.createdAt));

    return drivers.map(({ createdAt, ...pureDriver }) =>
      DriverEntity.initialize({
        ...pureDriver,
        createdAt: new Date(createdAt).toISOString(),
      }),
    );
  }

  public async checkExists({
    driverLicenseNumber,
    userId,
  }: Partial<DriverEntityT>): Promise<OperationResult<boolean>> {
    const filterClauses: SQL[] = [];

    if (driverLicenseNumber) {
      filterClauses.push(
        eq(this.driverSchema.driverLicenseNumber, driverLicenseNumber),
      );
    }

    if (userId) {
      filterClauses.push(eq(this.driverSchema.userId, userId));
    }

    if (filterClauses.length === 0) {
      throw new ApplicationError({
        message: AppErrorMessage.INVALID_QUERY,
      });
    }

    const [driver] = await this.db
      .driver()
      .select()
      .from(this.driverSchema)
      .where(or(...filterClauses));

    return {
      result: Boolean(driver),
    };
  }

  public async create(entity: DriverEntity): Promise<DriverEntity> {
    const { driverLicenseNumber, userId, businessId, driverLicenseFileId } =
      entity.toNewObject();

    const [{ createdAt, ...pureDriver }] = await this.db
      .driver()
      .insert(this.driverSchema)
      .values({
        driverLicenseNumber,
        userId,
        businessId,
        driverLicenseFileId,
      })
      .returning()
      .execute();

    return DriverEntity.initialize({
      ...pureDriver,
      createdAt: new Date(createdAt).toISOString(),
      verificationStatus: null,
    });
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<Pick<DriverEntityT, 'driverLicenseNumber'>>;
  }): Promise<DriverEntity> {
    const [{ createdAt, ...pureDriver }] = await this.db
      .driver()
      .update(this.driverSchema)
      .set(payload)
      .where(eq(this.driverSchema.id, id))
      .returning()
      .execute();

    return DriverEntity.initialize({
      ...pureDriver,
      createdAt: new Date(createdAt).toISOString(),
      verificationStatus: null,
    });
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await this.db
      .driver()
      .delete(this.driverSchema)
      .where(eq(this.driverSchema.id, id))
      .returning()
      .execute();

    return Boolean(result);
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
