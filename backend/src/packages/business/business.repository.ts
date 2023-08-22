import { eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/repository.interface';
import { type IDatabase } from '~/libs/packages/database/libs/interfaces/database.interface';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { BusinessEntity } from './business.entity.js';
import { type BusinessEntity as BusinessEntityT } from './libs/types/types.js';

class BusinessRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private businessSchema: DatabaseSchema['business'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    businessSchema: DatabaseSchema['business'],
  ) {
    this.db = database;
    this.businessSchema = businessSchema;
  }

  public async find(id: number): Promise<BusinessEntity | null> {
    const businesses = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .where(eq(this.businessSchema.id, id));

    if (businesses.length === 0) {
      return null;
    }

    return BusinessEntity.initialize(businesses[0]);
  }

  public async findByOwnerId(ownerId: number): Promise<BusinessEntity | null> {
    const businesses = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .where(eq(this.businessSchema.ownerId, ownerId));

    if (businesses.length === 0) {
      return null;
    }

    return BusinessEntity.initialize(businesses[0]);
  }

  public async findByTaxNumber(
    taxNumber: string,
  ): Promise<BusinessEntity | null> {
    const businesses = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .where(eq(this.businessSchema.taxNumber, taxNumber));

    if (businesses.length === 0) {
      return null;
    }

    return BusinessEntity.initialize(businesses[0]);
  }

  public async findByName(companyName: string): Promise<BusinessEntity | null> {
    const businesses = await this.db
      .driver()
      .select()
      .from(this.businessSchema)
      .where(eq(this.businessSchema.companyName, companyName));

    if (businesses.length === 0) {
      return null;
    }

    return BusinessEntity.initialize(businesses[0]);
  }

  public async create(entity: BusinessEntity): Promise<BusinessEntity> {
    const { companyName, taxNumber, ownerId } = entity.toObject();

    const [item] = await this.db
      .driver()
      .insert(this.businessSchema)
      .values({ companyName, taxNumber, ownerId })
      .returning()
      .execute();

    return BusinessEntity.initialize(item);
  }

  public async update({
    id,
    payload,
  }: {
    id: number;
    payload: Partial<BusinessEntityT>;
  }): Promise<BusinessEntity> {
    const [item] = await this.db
      .driver()
      .update(this.businessSchema)
      .set(payload)
      .where(eq(this.businessSchema.id, id))
      .returning()
      .execute();

    return BusinessEntity.initialize(item);
  }

  public async delete(id: number): Promise<boolean> {
    const [item] = await this.db
      .driver()
      .delete(this.businessSchema)
      .where(eq(this.businessSchema.id, id))
      .returning()
      .execute();

    return Boolean(item);
  }
}

export { BusinessRepository };
