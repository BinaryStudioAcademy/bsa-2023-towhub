CREATE TABLE IF NOT EXISTS
  "shifts" (
    "id" serial PRIMARY KEY NOT NULL,
    "start_date" timestamp NOT NULL,
    "end_date" timestamp,
    "driver_id" integer NOT NULL,
    "truck_id" integer NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    "deleted_at" timestamp
  );

--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "shifts" ADD CONSTRAINT "shifts_driver_id_users_id_fk" FOREIGN KEY ("driver_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "shifts" ADD CONSTRAINT "shifts_truck_id_trucks_id_fk" FOREIGN KEY ("truck_id") REFERENCES "trucks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
