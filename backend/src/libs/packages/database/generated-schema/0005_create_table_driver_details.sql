CREATE TABLE IF NOT EXISTS
  "driver_details" (
    "id" serial PRIMARY KEY NOT NULL,
    "driver_license_number" varchar NOT NULL,
    "user_id" integer NOT NULL,
    "business_id" integer NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "driver_details_driver_license_number_unique" UNIQUE ("driver_license_number")
  );

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_business_id_business_details_id_fk" FOREIGN KEY ("business_id") REFERENCES "business_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
