import { type SQL, and, eq, or } from 'drizzle-orm';

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
import { selectDriverJoinFileVerificationStatus } from './libs/constants/constants.js';

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
    partial: Partial<Omit<DriverEntityT, 'verificationStatus'>>,
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
      .select(selectDriverJoinFileVerificationStatus)
      .from(this.driverSchema)
      .innerJoin(
        schema.fileVerificationStatus,
        eq(
          this.driverSchema.driverLicenseFileId,
          schema.fileVerificationStatus.fileId,
        ),
      )
      .where(finalQuery)
      .execute();
  }

  public async findAllByBusinessId(
    businessId: number,
  ): Promise<DriverEntity[]> {
    const drivers = await this.db
      .driver()
      .select(selectDriverJoinFileVerificationStatus)
      .from(this.driverSchema)
      .where(eq(this.driverSchema.businessId, businessId));

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

    const [driver] = await this.db
      .driver()
      .select()
      .from(this.driverSchema)
      .where(or(...filterClause));

    return {
      result: Boolean(driver),
    };
  }

  public async create(entity: DriverEntity): Promise<DriverEntity> {
    const { driverLicenseNumber, userId, businessId, driverLicenseFileId } =
      entity.toNewObject();

    const [result] = await this.db
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

    const [item] = await this.find({ id: result.id });

    return DriverEntity.initialize(item);
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<Pick<DriverEntityT, 'driverLicenseNumber'>>;
  }): Promise<DriverEntity> {
    const [result] = await this.db
      .driver()
      .update(this.driverSchema)
      .set(payload)
      .where(eq(this.driverSchema.id, id))
      .returning()
      .execute();

    const [item] = await this.find({ id: result.id });

    return DriverEntity.initialize(item);
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
}

export { DriverRepository };
