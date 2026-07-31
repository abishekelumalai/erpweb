import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Turso (hosted libSQL) in production/whenever TURSO_DATABASE_URL is set —
// falls back to a local SQLite file (DATABASE_URL) for local dev if unset.
// .trim() guards against trailing newlines/whitespace that hosting-provider
// env var UIs (Render, etc.) tend to append when pasting into their fields.
function createPrismaClient() {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim()
  if (tursoUrl) {
    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN?.trim(),
    })
    return new PrismaClient({ adapter, log: ['query'] })
  }
  return new PrismaClient({ log: ['query'] })
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db