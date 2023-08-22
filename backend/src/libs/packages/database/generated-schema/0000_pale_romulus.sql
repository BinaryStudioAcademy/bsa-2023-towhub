CREATE TABLE IF NOT EXISTS
  "business_details" (
    "id" serial PRIMARY KEY NOT NULL,
    "company_name" varchar NOT NULL,
    "tax_number" varchar NOT NULL,
    "owner_id" integer NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "business_details_company_name_unique" UNIQUE ("company_name"),
    CONSTRAINT "business_details_tax_number_unique" UNIQUE ("tax_number")
  );

--> statement-breakpoint
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

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "business_details" ADD CONSTRAINT "business_details_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
