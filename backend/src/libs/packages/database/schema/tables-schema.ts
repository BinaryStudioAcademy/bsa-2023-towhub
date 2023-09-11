import { relations } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  unique,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { TruckStatus } from 'shared/build/index.js';

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

const truckStatusEnum = pgEnum('truck_status', [
  TruckStatus.NOT_AVAILABLE,
  TruckStatus.AVAILABLE,
  TruckStatus.ACTIVE,
  TruckStatus.BUSY,
]);

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
    status: truckStatusEnum('status').notNull().default(TruckStatus.AVAILABLE),
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
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    truckId: integer('truck_id')
      .references(() => trucks.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return {
      unique_user_id_truck_id: unique('unique_user_id_truck_id').on(
        table.userId,
        table.truckId,
      ),
      pk: primaryKey(table.id),
    };
  },
);

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

const driversRelations = relations(drivers, ({ one }) => ({
  user: one(users, {
    fields: [drivers.userId],
    references: [users.id],
  }),
  business: one(business, {
    fields: [drivers.businessId],
    references: [business.id],
  }),
}));

export {
  business,
  drivers,
  driversRelations,
  groups,
  trucks,
  trucksRelations,
  truckStatusEnum,
  users,
  usersRelations,
  usersTrucks,
  usersTrucksRelations,
};
