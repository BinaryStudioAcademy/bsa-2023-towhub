import { and, desc, eq, sql } from 'drizzle-orm';

import { countOffsetByQuery } from '~/libs/helpers/count-offset-by-query.helper.js';
import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type IDatabase } from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

import { type GetPaginatedPageQuery } from '../business/libs/types/types.js';
import { type DriverEntityT as DriverEntity } from '../drivers/drivers.js';
import { type UserEntityT } from '../users/users.js';
import { OrderStatus } from './libs/enums/enums.js';
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

  private fileSchema: DatabaseSchema['files'];

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
    this.fileSchema = files;
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
        shiftId: this.ordersSchema.shiftId,
        driver: {
          id: this.shiftsSchema.driverId,
          firstName: this.usersSchema.firstName,
          lastName: this.usersSchema.lastName,
          email: this.usersSchema.email,
          phone: this.usersSchema.phone,
          driverLicenseNumber: this.driversSchema.driverLicenseNumber,
          avatarUrl: this.fileSchema.key,
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
        this.fileSchema,
        eq(this.driversSchema.avatarId, this.fileSchema.id),
      )
      .innerJoin(
        this.trucksSchema,
        eq(this.trucksSchema.id, this.shiftsSchema.truckId),
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
          avatarUrl: this.fileSchema.key,
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
        this.fileSchema,
        eq(this.driversSchema.avatarId, this.fileSchema.id),
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

  public async findAllUserOrders(
    search: Partial<{
      userId: OrderEntityT['userId'];
      status: OrderEntityT['status'];
    }>,
    { size, page }: GetPaginatedPageQuery,
  ): Promise<OrderEntityT[]> {
    const offset = countOffsetByQuery({ size, page });

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
          avatarUrl: this.fileSchema.key,
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
        this.fileSchema,
        eq(this.driversSchema.avatarId, this.fileSchema.id),
      )
      .innerJoin(
        this.trucksSchema,
        eq(this.trucksSchema.id, this.shiftsSchema.truckId),
      )
      .where(
        combineFilters<DatabaseSchema['orders']>(this.ordersSchema, search),
      )
      .offset(offset)
      .limit(size)
      .orderBy(
        desc(eq(this.ordersSchema.status, OrderStatus.PENDING)),
        desc(eq(this.ordersSchema.status, OrderStatus.PICKING_UP)),
        desc(eq(this.ordersSchema.status, OrderStatus.CONFIRMED)),
        desc(this.ordersSchema.createdAt),
      );
  }

  public async findAllDriverOrders(
    search: {
      driverId: DriverEntity['id'];
      status?: OrderEntityT['status'];
    },
    { size, page }: GetPaginatedPageQuery,
  ): Promise<OrderEntityT[]> {
    const offset = countOffsetByQuery({ size, page });

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
          avatarUrl: this.fileSchema.key,
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
        this.fileSchema,
        eq(this.driversSchema.avatarId, this.fileSchema.id),
      )
      .innerJoin(
        this.trucksSchema,
        eq(this.trucksSchema.id, this.shiftsSchema.truckId),
      )
      .where(
        and(
          eq(this.shiftsSchema.driverId, search.driverId),
          combineFilters<DatabaseSchema['orders']>(this.ordersSchema, {
            status: search.status,
          }),
        ),
      )
      .offset(offset)
      .limit(size)
      .orderBy(
        desc(eq(this.ordersSchema.status, OrderStatus.PENDING)),
        desc(eq(this.ordersSchema.status, OrderStatus.PICKING_UP)),
        desc(eq(this.ordersSchema.status, OrderStatus.CONFIRMED)),
        desc(this.ordersSchema.createdAt),
      );
  }

  public async getDriverTotal(search: {
    driverId: DriverEntity['id'];
    status?: OrderEntityT['status'];
  }): Promise<number> {
    const [order] = await this.db
      .driver()
      .select({ count: sql<number>`count(*)` })
      .from(this.ordersSchema)
      .innerJoin(
        this.shiftsSchema,
        eq(this.ordersSchema.shiftId, this.shiftsSchema.id),
      )
      .where(
        and(
          eq(this.shiftsSchema.driverId, search.driverId),
          combineFilters<DatabaseSchema['orders']>(this.ordersSchema, {
            status: search.status,
          }),
        ),
      );

    return order.count;
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

  public async getUserOrBusinessTotal(
    search: Partial<{
      ownerId: number | null;
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
