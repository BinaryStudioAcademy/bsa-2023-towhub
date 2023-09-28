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
CREATE TABLE IF NOT EXISTS
  "file_verification_status" (
    "id" serial PRIMARY KEY NOT NULL,
    "file_id" integer NOT NULL,
    "name" "verification_name" NOT NULL,
    "status" "verification_status" NOT NULL,
    "message" varchar
  );

--> statement-breakpoint
ALTER TABLE "driver_details"
ADD COLUMN "driver_license_file_id" integer;

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_driver_license_file_id_files_id_fk" FOREIGN KEY ("driver_license_file_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "file_verification_status" ADD CONSTRAINT "file_verification_status_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
