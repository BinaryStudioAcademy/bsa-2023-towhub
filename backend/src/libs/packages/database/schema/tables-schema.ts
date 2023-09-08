import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

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

const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  key: varchar('key').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

const usersRelations = relations(users, ({ one, many }) => ({
  group: one(groups, {
    fields: [users.groupId],
    references: [groups.id],
  }),
  usersTrucks: many(usersTrucks),
}));

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

export {
  business,
  drivers,
  files,
  groups,
  trucks,
  trucksRelations,
  users,
  usersRelations,
  usersTrucks,
  usersTrucksRelations,
};
