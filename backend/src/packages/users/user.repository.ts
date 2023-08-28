import { type InferModel } from 'drizzle-orm';
import { eq, or } from 'drizzle-orm';

import { type IRepository } from '~/libs/interfaces/interfaces.js';
import {
  type IDatabase,
  type schema,
} from '~/libs/packages/database/database.js';
import { type DatabaseSchema } from '~/libs/packages/database/schema/schema.js';
import { UserEntity } from '~/packages/users/user.entity.js';

import { type UserEntityT } from './libs/types/types.js';

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

  public async findByPhoneAndEmail({
    phone,
    email,
  }: Pick<UserEntityT, 'phone' | 'email'>): Promise<
    (UserEntityT & { createdAt: Date; updatedAt: Date }) | null
  > {
    const [user = null] = await this.db
      .driver()
      .select()
      .from(this.usersSchema)
      .where(
        or(
          eq(this.usersSchema.phone, phone),
          eq(this.usersSchema.email, email),
        ),
      )
      .execute();

    return user;
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

  public async create(
    entity: Omit<UserEntityT, 'id'>,
  ): Promise<UserEntityT & { createdAt: Date; updatedAt: Date }> {
    const [user] = await this.db
      .driver()
      .insert(this.usersSchema)
      .values(entity)
      .returning()
      .execute();

    return user;
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
