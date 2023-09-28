import { schema } from '~/libs/packages/database/schema/schema.js';

const SELECT_FILTER_JOIN_USER = {
  user: {
    id: schema.users.id,
    phone: schema.users.phone,
    email: schema.users.email,
    firstName: schema.users.firstName,
    lastName: schema.users.lastName,
    passwordHash: schema.users.passwordHash,
    passwordSalt: schema.users.passwordSalt,
    groupId: schema.users.groupId,
    accessToken: schema.users.accessToken,
    createdAt: schema.users.createdAt,
    updatedAt: schema.users.updatedAt,
  },
};

export { SELECT_FILTER_JOIN_USER };
