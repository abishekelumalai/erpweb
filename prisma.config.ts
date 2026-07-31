import { defineConfig } from 'prisma/config';
import { PrismaLibSQL } from '@prisma/adapter-libsql';

// Lets `prisma db push` / `prisma migrate` connect to Turso directly, using
// the same env vars the app's runtime client (src/lib/db.ts) uses. Only
// takes effect when TURSO_DATABASE_URL is set; without it, the CLI falls
// back to the schema's own `datasource.url` (local SQLite file) as before.
export default defineConfig(
  process.env.TURSO_DATABASE_URL
    ? {
        experimental: { adapter: true },
        engine: 'js',
        adapter: async () => {
          return new PrismaLibSQL({
            url: process.env.TURSO_DATABASE_URL!,
            authToken: process.env.TURSO_AUTH_TOKEN,
          });
        },
      }
    : {}
);
