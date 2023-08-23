import { type InferModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import {
  type IDatabase,
  type schema,
} from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { UserEntity } from '~/packages/users/user.entity.js';

class UserRepository implements IRepository {
  private db: Pick<IDatabase, 'driver'>;

  private usersSchema: DatabaseSchema['users'];

  public constructor(
    database: Pick<IDatabase, 'driver'>,
    usersSchema: DatabaseSchema['users'],
  ) {
    this.db = database;
    this.usersSchema = usersSchema;
  }

  public find(): Promise<InferModel<typeof schema.users>[]> {
    return Promise.resolve([]);
  }

  public findById(id: number): Promise<InferModel<typeof schema.users>[]> {
    return this.db
      .driver()
      .select()
      .from(this.usersSchema)
      .where(eq(this.usersSchema.id, id))
      .execute();
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.db.driver().select().from(this.usersSchema);

    return users.map((it) => UserEntity.initialize(it));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { phone, passwordSalt, passwordHash, email, firstName, lastName } =
      entity.toNewObject();

    const [item] = await this.db
      .driver()
      .insert(this.usersSchema)
      .values({
        phone,
        passwordHash,
        passwordSalt,
        email,
        firstName,
        lastName,
      })
      .returning()
      .execute();

    return UserEntity.initialize(item);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
