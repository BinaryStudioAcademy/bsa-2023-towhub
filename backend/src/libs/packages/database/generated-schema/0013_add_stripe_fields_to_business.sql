ALTER TABLE "business_details"
ADD COLUMN "stripe_id" varchar;

--> statement-breakpoint
ALTER TABLE "business_details"
ADD COLUMN "stripe_activated" boolean DEFAULT false NOT NULL;

--> statement-breakpoint
ALTER TABLE "business_details"
ADD CONSTRAINT "business_details_stripe_id_unique" UNIQUE ("stripe_id");
