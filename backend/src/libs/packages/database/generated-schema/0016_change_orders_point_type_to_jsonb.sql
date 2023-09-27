ALTER TABLE "orders"
ALTER COLUMN "price"
SET DATA TYPE real;

--> statement-breakpoint
ALTER TABLE "orders"
ALTER COLUMN "start_point"
TYPE jsonb USING "start_point"::jsonb;

--> statement-breakpoint
ALTER TABLE "orders"
ALTER COLUMN "end_point"
TYPE jsonb USING "end_point"::jsonb;
