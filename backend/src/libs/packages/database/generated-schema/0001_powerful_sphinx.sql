CREATE TABLE IF NOT EXISTS
  "groups" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "key" varchar NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );

INSERT INTO
  "groups" (name, key)
VALUES
  ('Customer', 'customer'),
  ('Business', 'business'),
  ('Driver', 'driver');

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "email" varchar NOT NULL;

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "first_name" varchar NOT NULL;

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "last_name" varchar NOT NULL;

--> statement-breakpoint
ALTER TABLE "users"
ADD COLUMN "group_id" integer NOT NULL;

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "users" ADD CONSTRAINT "users_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
