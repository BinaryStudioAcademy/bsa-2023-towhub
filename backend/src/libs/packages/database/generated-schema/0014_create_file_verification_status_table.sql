DO $$ BEGIN
 CREATE TYPE "verification_name" AS ENUM('driver_license_scan');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "verification_status" AS ENUM('pending', 'verified', 'failed', 'not_started');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file_verification_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_id" integer NOT NULL,
	"name" "verification_name" NOT NULL,
	"status" "verification_status" NOT NULL,
	"message" varchar
);
--> statement-breakpoint
ALTER TABLE "trucks" DROP CONSTRAINT "trucks_business_id_business_details_id_fk";
--> statement-breakpoint
ALTER TABLE "users_trucks" DROP CONSTRAINT "users_trucks_id";--> statement-breakpoint
ALTER TABLE "users_trucks" DROP CONSTRAINT "unique_user_id_truck_id";--> statement-breakpoint
ALTER TABLE "driver_details" ADD COLUMN "driver_license_file_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_driver_license_file_id_files_id_fk" FOREIGN KEY ("driver_license_file_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "trucks" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "trucks" DROP COLUMN IF EXISTS "business_id";--> statement-breakpoint
ALTER TABLE "users_trucks" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "file_verification_status" ADD CONSTRAINT "file_verification_status_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_trucks" ADD CONSTRAINT "users_trucks_user_id_truck_id" PRIMARY KEY("user_id","truck_id");