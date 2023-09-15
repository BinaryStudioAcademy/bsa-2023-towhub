import { eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import {
  type DatabaseSchema,
  schema,
} from '~/libs/packages/database/schema/schema.js';

import { type UserEntityT } from '../users/users.js';
import { combineFilters } from './libs/helpers/combine-filters.js';
import {
  type OrderDatabaseModel,
  type OrderEntity as OrderEntityT,
} from './libs/types/types.js';

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

  public async findById(id: OrderEntityT['id']): Promise<OrderEntityT | null> {
    const [order = null] = await this.db
      .driver()
      .select({
        id: this.ordersSchema.id,
        userId: this.ordersSchema.userId,
        businessId: this.ordersSchema.businessId,
        price: this.ordersSchema.price,
        scheduledTime: this.ordersSchema.scheduledTime,
        startPoint: this.ordersSchema.startPoint,
        endPoint: this.ordersSchema.endPoint,
        status: this.ordersSchema.status,
        carsQty: this.ordersSchema.carsQty,
        customerName: this.ordersSchema.customerName,
        customerPhone: this.ordersSchema.customerPhone,
        shift: {
          id: this.ordersSchema.shiftId,
        },
        driver: {
          id: schema.shifts.driverId,
          firstName: schema.users.firstName,
          lastName: schema.users.lastName,
          email: schema.users.email,
          phone: schema.users.phone,
          driverLicenseNumber: schema.drivers.driverLicenseNumber,
        },
        truck: {
          id: schema.shifts.truckId,
          licensePlateNumber: schema.drivers.driverLicenseNumber,
        },
      })
      .from(this.ordersSchema)
      .innerJoin(schema.shifts, eq(this.ordersSchema.shiftId, schema.shifts.id))
      .innerJoin(schema.users, eq(schema.shifts.driverId, schema.users.id))
      .innerJoin(
        schema.drivers,
        eq(schema.drivers.userId, schema.shifts.driverId),
      )
      .where(eq(this.ordersSchema.id, id));

    return order;
  }

  public async findAllBusinessOrders(
    search: Partial<{
      userId: OrderEntityT['userId'];
      driverId: UserEntityT['id'];
      businessId: OrderEntityT['businessId'];
    }>,
  ): Promise<OrderEntityT[]> {
    return await this.db
      .driver()
      .select({
        id: this.ordersSchema.id,
        userId: this.ordersSchema.userId,
        businessId: this.ordersSchema.businessId,
        price: this.ordersSchema.price,
        scheduledTime: this.ordersSchema.scheduledTime,
        startPoint: this.ordersSchema.startPoint,
        endPoint: this.ordersSchema.endPoint,
        status: this.ordersSchema.status,
        carsQty: this.ordersSchema.carsQty,
        customerName: this.ordersSchema.customerName,
        customerPhone: this.ordersSchema.customerPhone,
        shift: {
          id: this.ordersSchema.shiftId,
        },
        driver: {
          id: schema.shifts.driverId,
          firstName: schema.users.firstName,
          lastName: schema.users.lastName,
          email: schema.users.email,
          phone: schema.users.phone,
          driverLicenseNumber: schema.drivers.driverLicenseNumber,
        },
        truck: {
          id: schema.shifts.truckId,
          licensePlateNumber: schema.drivers.driverLicenseNumber,
        },
      })
      .from(this.ordersSchema)
      .innerJoin(schema.shifts, eq(this.ordersSchema.shiftId, schema.shifts.id))
      .innerJoin(schema.users, eq(schema.shifts.driverId, schema.users.id))
      .innerJoin(
        schema.drivers,
        eq(schema.drivers.userId, schema.shifts.driverId),
      )
      .where(
        combineFilters<DatabaseSchema['orders']>(this.ordersSchema, search),
      );
  }

  public async create(
    entity: Omit<OrderEntityT, 'id' | 'shift' | 'driver' | 'truck'> & {
      shiftId: number;
    },
  ): Promise<OrderDatabaseModel | null> {
    const [result = null] = await this.db
      .driver()
      .insert(this.ordersSchema)
      .values(entity)
      .returning()
      .execute();

    return result;
  }

  public async update({
    id,
    payload,
  }: {
    id: OrderEntityT['id'];
    payload: Partial<OrderEntityT>;
  }): Promise<OrderDatabaseModel | null> {
    const [result = null] = await this.db
      .driver()
      .update(this.ordersSchema)
      .set(payload)
      .where(eq(this.ordersSchema.id, id))
      .returning();

    return result;
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
