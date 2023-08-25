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
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },

  (users) => {
    return {
      phoneIdx: uniqueIndex('users_phone_unique_idx').on(users.phone),
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

const business = pgTable('business_details', {
  id: serial('id').primaryKey(),
  companyName: varchar('company_name').unique().notNull(),
  taxNumber: varchar('tax_number').unique().notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
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
  },
  (trucks) => {
    return {
      uniqueLicensePlateNumber: uniqueIndex(
        'trucks_license_plate_number_idx',
      ).on(trucks.licensePlateNumber),
    };
  },
);

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

export { business, groups, trucks, users, usersTrucks };
