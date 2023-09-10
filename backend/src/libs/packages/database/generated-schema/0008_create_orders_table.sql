DO $$ BEGIN
  CREATE TYPE "order_status" AS ENUM('pending', 'confirmed', 'canceled', 'done');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS
  "orders" (
    "id" serial PRIMARY KEY NOT NULL,
    "price" integer NOT NULL,
    "scheduled_time" timestamp NOT NULL,
    "start_point" varchar NOT NULL,
    "end_point" varchar NOT NULL,
    "status" "order_status" NOT NULL,
    "user_id" integer,
    "business_id" integer,
    "driver_id" integer,
    "cars_qty" integer DEFAULT 1 NOT NULL,
    "customer_name" varchar,
    "customer_phone" varchar,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
  );

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "orders" ADD CONSTRAINT "orders_business_id_business_details_id_fk" FOREIGN KEY ("business_id") REFERENCES "business_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
DO $$ BEGIN
  ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_driver_details_id_fk" FOREIGN KEY ("driver_id") REFERENCES "driver_details"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
