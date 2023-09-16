ALTER TABLE "trucks"
ADD COLUMN "business_id" integer NOT NULL;

--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "trucks" ADD CONSTRAINT "trucks_business_id_business_details_id_fk" FOREIGN KEY ("business_id") REFERENCES "business_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
