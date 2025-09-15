import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './src/db/schema',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL || 'postgres://user:Arnold%401@localhost:5432/wyer_db',
    },
});
