DO $$ BEGIN
 CREATE TYPE "truck_status" AS ENUM('Not available', 'Available', 'Active', 'Busy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_trucks" DROP CONSTRAINT "users_trucks_user_id_truck_id";--> statement-breakpoint
ALTER TABLE "trucks" ADD COLUMN "status" "truck_status" DEFAULT 'Available' NOT NULL;--> statement-breakpoint
ALTER TABLE "users_trucks" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "users_trucks" ADD CONSTRAINT "users_trucks_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "users_trucks" ADD CONSTRAINT "unique_user_id_truck_id" UNIQUE("user_id","truck_id");