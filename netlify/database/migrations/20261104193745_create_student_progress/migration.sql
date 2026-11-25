CREATE TABLE "student_progress" (
	"user_id" text PRIMARY KEY,
	"email" text NOT NULL,
	"name" text,
	"progress" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
