import { relations } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { OrderStatus } from 'shared/build/index.js';

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
  orders: many(orders),
}));

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

const businessRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

const orderStatuses = Object.values(OrderStatus as Record<number, string>) as [
  string,
  ...string[],
];

const statusEnum = pgEnum('status_enum', orderStatuses);

const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  price: integer('price').notNull(),
  scheduledTime: timestamp('scheduled_time', { mode: 'string' }).notNull(),
  startPoint: varchar('start_point').notNull(),
  endPoint: varchar('end_point').notNull(),
  status: statusEnum('status').notNull(),
  userId: integer('user_id').references(() => users.id),
  businessId: integer('business_id').references(() => business.id),
  driverId: integer('driver_id'),
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
}));

export {
  business,
  businessRelations,
  groups,
  orders,
  ordersRelations,
  statusEnum,
  users,
  usersRelations,
};
