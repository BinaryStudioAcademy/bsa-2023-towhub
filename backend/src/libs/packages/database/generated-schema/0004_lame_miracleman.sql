ALTER TABLE "driver_details"
ADD COLUMN "business_id" integer NOT NULL;

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_business_id_business_details_id_fk" FOREIGN KEY ("business_id") REFERENCES "business_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
