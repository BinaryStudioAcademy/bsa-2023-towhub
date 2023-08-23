CREATE TABLE IF NOT EXISTS
  "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "phone" varchar NOT NULL,
    "password_hash" varchar NOT NULL,
    "password_salt" varchar NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_phone_unique_idx" ON "users" ("phone");
