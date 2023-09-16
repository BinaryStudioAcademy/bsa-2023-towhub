ALTER TABLE "orders"
DROP CONSTRAINT "orders_driver_id_driver_details_id_fk";

--> statement-breakpoint
ALTER TABLE "orders"
ADD COLUMN "shift_id" integer NOT NULL;

--> statement-breakpoint
DO $$ BEGIN
    ALTER TABLE "orders" ADD CONSTRAINT "orders_shift_id_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
ALTER TABLE "orders"
DROP COLUMN IF EXISTS "driver_id";
