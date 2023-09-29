import { desc, eq, sql } from 'drizzle-orm';

import { countOffsetByQuery } from '~/libs/helpers/count-offset-by-query.helper.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type FileEntityT } from '../files/libs/types/types.js';
import { type UserEntityT } from '../users/users.js';
import { combineFilters } from './libs/helpers/combine-filters.js';
import {
  type OrderDatabaseModel,
  type OrderEntity as OrderEntityT,
  type OrderQueryParameters,
} from './libs/types/types.js';

class OrderRepository implements Omit<IRepository, 'find'> {
  private db: Pick<IDatabase, 'driver'>;

  private ordersSchema: DatabaseSchema['orders'];

  private trucksSchema: DatabaseSchema['trucks'];

  private usersSchema: DatabaseSchema['users'];

  private shiftsSchema: DatabaseSchema['shifts'];

  private driversSchema: DatabaseSchema['drivers'];

  private filesSchema: DatabaseSchema['files'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    {
      orders,
      trucks,
      users,
      shifts,
      drivers,
      files,
    }: Pick<
      DatabaseSchema,
      'orders' | 'users' | 'trucks' | 'shifts' | 'drivers' | 'files'
    >,
  ) {
    this.db = database;
    this.ordersSchema = orders;
    this.trucksSchema = trucks;
    this.usersSchema = users;
    this.shiftsSchema = shifts;
    this.driversSchema = drivers;
    this.filesSchema = files;
  }

  public async findById(
    id: OrderEntityT['id'],
  ): Promise<{ order: OrderEntityT | null; avatarFile: FileEntityT | null }> {
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
        shiftId: this.ordersSchema.shiftId,
        driver: {
          id: this.shiftsSchema.driverId,
          firstName: this.usersSchema.firstName,
          lastName: this.usersSchema.lastName,
          email: this.usersSchema.email,
          phone: this.usersSchema.phone,
          driverLicenseNumber: this.driversSchema.driverLicenseNumber,
        },
        avatar: {
          id: this.filesSchema.id,
          key: this.filesSchema.key,
          name: this.filesSchema.name,
          contentType: this.filesSchema.contentType,
          createdAt: this.filesSchema.createdAt,
          updatedAt: this.filesSchema.updatedAt,
        },
        truck: {
          id: this.shiftsSchema.truckId,
          licensePlateNumber: this.trucksSchema.licensePlateNumber,
        },
      })
      .from(this.ordersSchema)
      .innerJoin(
        this.shiftsSchema,
        eq(this.ordersSchema.shiftId, this.shiftsSchema.id),
      )
      .innerJoin(
        this.usersSchema,
        eq(this.shiftsSchema.driverId, this.usersSchema.id),
      )
      .innerJoin(
        this.driversSchema,
        eq(this.driversSchema.userId, this.shiftsSchema.driverId),
      )
      .leftJoin(
        this.filesSchema,
        eq(this.driversSchema.avatarId, this.filesSchema.id),
      )
      .innerJoin(
        this.trucksSchema,
        eq(this.trucksSchema.id, this.shiftsSchema.truckId),
      )
      .where(eq(this.ordersSchema.id, id));

    let result = null;
    let avatarFile = null;

    if (order) {
      const { avatar, ...pureOrder } = order;
      avatarFile = avatar;
      result = pureOrder as OrderEntityT;
      result.driver = result.driver === null ? null : { ...pureOrder.driver };
    }

    return { order: result, avatarFile };
  }

  public async findAllBusinessOrders(
    search: Partial<{
      userId: OrderEntityT['userId'];
      driverId: UserEntityT['id'];
      businessId: OrderEntityT['businessId'];
    }>,
    query: OrderQueryParameters,
  ): Promise<OrderEntityT[]> {
    const { status, size, page } = query;
    const whereClause = status
      ? combineFilters<DatabaseSchema['orders']>(this.ordersSchema, {
          ...search,
          status: status,
        })
      : combineFilters<DatabaseSchema['orders']>(this.ordersSchema, search);

    const offset = countOffsetByQuery({ page, size });

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
        shiftId: this.ordersSchema.shiftId,
        driver: {
          id: this.shiftsSchema.driverId,
          firstName: this.usersSchema.firstName,
          lastName: this.usersSchema.lastName,
          email: this.usersSchema.email,
          phone: this.usersSchema.phone,
          driverLicenseNumber: this.driversSchema.driverLicenseNumber,
        },
        truck: {
          id: this.shiftsSchema.truckId,
          licensePlateNumber: this.trucksSchema.licensePlateNumber,
        },
      })
      .from(this.ordersSchema)
      .innerJoin(
        this.shiftsSchema,
        eq(this.ordersSchema.shiftId, this.shiftsSchema.id),
      )
      .innerJoin(
        this.usersSchema,
        eq(this.shiftsSchema.driverId, this.usersSchema.id),
      )
      .innerJoin(
        this.driversSchema,
        eq(this.driversSchema.userId, this.shiftsSchema.driverId),
      )
      .innerJoin(
        this.trucksSchema,
        eq(this.trucksSchema.id, this.shiftsSchema.truckId),
      )
      .where(whereClause)
      .offset(offset)
      .limit(size)
      .orderBy(desc(this.ordersSchema.createdAt));
  }

  public async create(
    entity: Omit<OrderEntityT, 'id' | 'shift' | 'driver' | 'truck'> & {
      shiftId: number;
    },
  ): Promise<OrderDatabaseModel> {
    const [result] = await this.db
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

  public async getTotalBusiness(
    search: Partial<{
      businessId: OrderEntityT['businessId'];
      status: OrderEntityT['status'];
    }>,
  ): Promise<number> {
    const [order] = await this.db
      .driver()
      .select({ count: sql<number>`count(*)` })
      .from(this.ordersSchema)
      .where(
        combineFilters<DatabaseSchema['orders']>(this.ordersSchema, search),
      );

    return order.count;
  }
}

export { OrderRepository };
