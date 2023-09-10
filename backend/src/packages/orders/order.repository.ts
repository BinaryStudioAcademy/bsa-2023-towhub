import { eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { OrderEntity } from '~/packages/orders/order.entity.js';

import { combineFilters } from './libs/helpers/combine-filters.js';
import { type OrderEntity as OrderEntityT } from './libs/types/types.js';

class OrderRepository implements Omit<IRepository, 'find'> {
  private db: Pick<IDatabase, 'driver'>;

  private ordersSchema: DatabaseSchema['orders'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    ordersSchema: DatabaseSchema['orders'],
  ) {
    this.db = database;
    this.ordersSchema = ordersSchema;
  }

  public async findById(id: OrderEntityT['id']): Promise<OrderEntity | null> {
    const result = await this.db.driver().query.orders.findFirst({
      where: (orders) => eq(orders.id, id),
      with: {
        driver: {
          columns: { id: true, businessId: true, driverLicenseNumber: true },
          with: { user: { columns: { firstName: true, lastName: true } } },
        },
      },
    });

    return (result ?? null) && OrderEntity.initialize(result as OrderEntityT);
  }

  public async find(
    search: Partial<Pick<OrderEntityT, 'userId' | 'driverId' | 'businessId'>>,
  ): Promise<OrderEntity[]> {
    const orders = await this.db
      .driver()
      .select()
      .from(this.ordersSchema)
      .where(
        combineFilters<DatabaseSchema['orders']>(this.ordersSchema, search),
      );

    return orders.map((it) => OrderEntity.initialize(it as OrderEntityT));
  }

  public async create(entity: OrderEntity): Promise<OrderEntity> {
    const [result] = await this.db
      .driver()
      .insert(this.ordersSchema)
      .values(entity.toNewObject())
      .returning()
      .execute();

    return OrderEntity.initialize(result as OrderEntityT);
  }

  public async update({
    id,
    payload,
  }: {
    id: OrderEntityT['id'];
    payload: Partial<OrderEntityT>;
  }): Promise<OrderEntity | null> {
    const [result = null] = await this.db
      .driver()
      .update(this.ordersSchema)
      .set(payload)
      .where(eq(this.ordersSchema.id, id))
      .returning();

    return result && OrderEntity.initialize(result as OrderEntityT);
  }

  public async delete(
    id: OrderEntityT['id'],
  ): ReturnType<IRepository['delete']> {
    const [item] = await this.db
      .driver()
      .delete(this.ordersSchema)
      .where(eq(this.ordersSchema.id, id))
      .returning();

    return Boolean(item);
  }
}

export { OrderRepository };
