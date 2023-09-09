CREATE TABLE IF NOT EXISTS
  "trucks" (
    "id" serial PRIMARY KEY NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "manufacturer" varchar NOT NULL,
    "capacity" integer NOT NULL,
    "price_per_km" real NOT NULL,
    "license_plate_number" varchar NOT NULL,
    "year" integer NOT NULL,
    "tow_type" varchar NOT NULL
  );

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS
  "users_trucks" (
    "user_id" integer NOT NULL,
    "truck_id" integer NOT NULL,
    CONSTRAINT users_trucks_user_id_truck_id PRIMARY KEY ("user_id", "truck_id")
  );

--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "trucks_license_plate_number_idx" ON "trucks" ("license_plate_number");

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "users_trucks" ADD CONSTRAINT "users_trucks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "users_trucks" ADD CONSTRAINT "users_trucks_truck_id_trucks_id_fk" FOREIGN KEY ("truck_id") REFERENCES "trucks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
