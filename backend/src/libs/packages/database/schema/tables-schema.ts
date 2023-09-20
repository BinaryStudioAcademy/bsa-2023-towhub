import { relations } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { ORDER_STATUSES } from 'shared/build/index.js';

const orderStatus = pgEnum('order_status', ORDER_STATUSES);
const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  price: integer('price').notNull(),
  scheduledTime: timestamp('scheduled_time', { mode: 'string' }).notNull(),
  startPoint: varchar('start_point').notNull(),
  endPoint: varchar('end_point').notNull(),
  status: orderStatus('status').notNull(),
  userId: integer('user_id').references(() => users.id),
  businessId: integer('business_id').references(() => business.id),
  shiftId: integer('shift_id')
    .references(() => shifts.id)
    .notNull(),
  carsQty: integer('cars_qty').notNull().default(1),
  customerName: varchar('customer_name'),
  customerPhone: varchar('customer_phone'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  business: one(business, {
    fields: [orders.businessId],
    references: [business.id],
  }),
  shift: one(shifts, {
    fields: [orders.shiftId],
    references: [shifts.id],
  }),
}));

const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    phone: varchar('phone').notNull(),
    email: varchar('email').notNull(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    passwordHash: varchar('password_hash').notNull(),
    passwordSalt: varchar('password_salt').notNull(),
    groupId: integer('group_id')
      .references(() => groups.id)
      .notNull(),
    accessToken: varchar('access_token'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },

  (users) => {
    return {
      phoneIdx: uniqueIndex('users_phone_unique_idx').on(users.phone),
      emailIdx: uniqueIndex('users_email_unique_idx').on(users.email),
    };
  },
);

const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.groupId],
    references: [groups.id],
  }),
  usersTrucks: many(usersTrucks),
  orders: many(orders),
}));

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  key: varchar('key').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
const business = pgTable('business_details', {
  id: serial('id').primaryKey(),
  companyName: varchar('company_name').notNull(),
  taxNumber: varchar('tax_number').unique().notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const files = pgTable('files', {
  id: serial('id').primaryKey(),
  key: varchar('key').unique().notNull(),
  name: varchar('name').notNull(),
  contentType: varchar('content_type').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const drivers = pgTable('driver_details', {
  id: serial('id').primaryKey(),
  driverLicenseNumber: varchar('driver_license_number').unique().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  businessId: integer('business_id')
    .notNull()
    .references(() => business.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const trucks = pgTable(
  'trucks',
  {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    manufacturer: varchar('manufacturer').notNull(),
    capacity: integer('capacity').notNull(),
    pricePerKm: real('price_per_km').notNull(),
    licensePlateNumber: varchar('license_plate_number').notNull(),
    year: integer('year').notNull(),
    towType: varchar('tow_type').notNull(),
    businessId: integer('business_id')
      .notNull()
      .references(() => business.id),
  },
  (trucks) => {
    return {
      uniqueLicensePlateNumber: uniqueIndex(
        'trucks_license_plate_number_idx',
      ).on(trucks.licensePlateNumber),
    };
  },
);

const trucksRelations = relations(trucks, ({ many }) => ({
  usersTrucks: many(usersTrucks),
}));

const usersTrucks = pgTable(
  'users_trucks',
  {
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    truckId: integer('truck_id')
      .references(() => trucks.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.userId, table.truckId),
    };
  },
);

const shifts = pgTable('shifts', {
  id: serial('id').primaryKey(),
  startDate: timestamp('start_date', {
    mode: 'date',
  }).notNull(),
  endDate: timestamp('end_date', {
    mode: 'date',
  }),
  driverId: integer('driver_id')
    .references(() => users.id)
    .notNull(),
  truckId: integer('truck_id')
    .references(() => trucks.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
const businessRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

const usersTrucksRelations = relations(usersTrucks, ({ one }) => ({
  truck: one(trucks, {
    fields: [usersTrucks.truckId],
    references: [trucks.id],
  }),
  user: one(users, {
    fields: [usersTrucks.userId],
    references: [users.id],
  }),
}));

const driversRelations = relations(drivers, ({ one, many }) => ({
  user: one(users, {
    fields: [drivers.userId],
    references: [users.id],
  }),
  business: one(business, {
    fields: [drivers.businessId],
    references: [business.id],
  }),
  orders: many(orders),
}));

export {
  business,
  businessRelations,
  drivers,
  driversRelations,
  files,
  groups,
  orders,
  ordersRelations,
  orderStatus,
  shifts,
  trucks,
  trucksRelations,
  users,
  usersRelations,
  usersTrucks,
  usersTrucksRelations,
};
