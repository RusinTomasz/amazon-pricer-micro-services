export const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS "user" (
	    "id" SERIAL,
	    "email" VARCHAR(255) NOT NULL,
	    "password" VARCHAR(255) NOT NULL,
	    PRIMARY KEY ("id")
    );`
