import { schema } from '~/libs/packages/database/schema/schema.js';

const SELECT_FILTER_JOIN_AVATAR = {
  avatar: {
    id: schema.files.id,
    key: schema.files.key,
    name: schema.files.name,
    contentType: schema.files.contentType,
    createdAt: schema.files.createdAt,
    updatedAt: schema.files.updatedAt,
  },
};

export { SELECT_FILTER_JOIN_AVATAR };
