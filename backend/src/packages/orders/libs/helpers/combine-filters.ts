import { type SQL, and, eq } from 'drizzle-orm';
import { type PgColumn } from 'drizzle-orm/pg-core';

import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';

type Table = DatabaseSchema[keyof DatabaseSchema];

const combineFilters = <TSchema extends Table>(
  schema: TSchema,
  searchBy: Record<PgColumn['name'], number | null>,
): SQL | undefined => {
  const eqs = Object.entries(searchBy)
    .filter(([, v]) => v)
    .map(([field, value]) => {
      return eq(schema[field as keyof TSchema], value);
    });

  return and(...eqs);
};

export { combineFilters };
