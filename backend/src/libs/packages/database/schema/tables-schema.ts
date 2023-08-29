import {
  integer,
  pgTable,
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

export { business, drivers, groups, users };
