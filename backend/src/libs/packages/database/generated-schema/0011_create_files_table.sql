ALTER TYPE "order_status"
ADD VALUE 'picking_up';

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS
  "files" (
    "id" serial PRIMARY KEY NOT NULL,
    "key" varchar NOT NULL,
    "name" varchar NOT NULL,
    "content_type" varchar NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "files_key_unique" UNIQUE ("key")
  );
