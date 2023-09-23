import { database, schema } from '~/libs/packages/database/database.js';

import { UsersTrucksRepository } from './users-trucks.repository.js';
import { UsersTrucksService } from './users-trucks.service.js';

const usersTrucksRepository = new UsersTrucksRepository(
  database,
  schema.usersTrucks,
);
const usersTrucksService = new UsersTrucksService(usersTrucksRepository);

export { usersTrucksRepository, usersTrucksService };
export { UsersTrucksRepository } from './users-trucks.repository.js';
export { UsersTrucksService } from './users-trucks.service.js';
