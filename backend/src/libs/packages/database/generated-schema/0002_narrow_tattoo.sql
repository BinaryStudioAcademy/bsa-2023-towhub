CREATE TABLE IF NOT EXISTS "trucks" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"manufacturer" varchar NOT NULL,
	"capacity" varchar NOT NULL,
	"price_per_km" varchar NOT NULL,
	"license_plate_number" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_trucks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"truck_id" integer NOT NULL,
	CONSTRAINT "users_trucks_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_trucks_truck_id_unique" UNIQUE("truck_id")
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "group_id" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "trucks_license_plate_number_idx" ON "trucks" ("license_plate_number");--> statement-breakpoint
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
