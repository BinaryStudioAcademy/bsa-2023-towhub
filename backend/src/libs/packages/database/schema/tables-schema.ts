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
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    email: varchar('email').notNull(),
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

export { groups, users };
