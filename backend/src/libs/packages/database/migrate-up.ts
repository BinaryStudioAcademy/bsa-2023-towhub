import { database } from './database.js';

const migrate = async (): Promise<void> => {
  return await database.migrate();
};

await migrate();
