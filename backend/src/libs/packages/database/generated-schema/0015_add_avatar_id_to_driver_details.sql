ALTER TABLE "driver_details"
ADD COLUMN "avatar_id" integer;

--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "driver_details" ADD CONSTRAINT "driver_details_avatar_id_files_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
