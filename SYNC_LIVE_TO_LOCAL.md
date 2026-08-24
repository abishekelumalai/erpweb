# Sync Live Content to Local Dev

## Steps to combine live site content into local development

### 1. Export from Live Server

SSH into the production server and run:

```bash
# Navigate to the project directory on the live server
cd /path/to/chalowebsite-main

# Copy the SQLite database file
cp db/chalo.db db/chalo-backup-$(date +%Y%m%d).db

# Download the database to your local machine
scp user@server:/path/to/chalowebsite-main/db/chalo.db ./db/chalo.db
```

### 2. Import to Local

```bash
# In your local project directory
cd C:\Users\ITPL1\Desktop\chalowebsite\chalowebsite-main

# Backup your local db (if any)
copy db\chalo.db db\chalo-local-backup.db

# Replace with live data
# (copy the downloaded file to your local db folder)
copy /Y downloaded-chalo.db db\chalo.db
```

### 3. Run Prisma Migration (if schema changed)

```bash
npx prisma migrate deploy
# OR if schema is newer locally:
npx prisma db push
```

### 4. Verify

```bash
npm run dev
# Visit http://localhost:3000 — check:
# - All blog posts appear
# - Testimonials render
# - FAQs show up
# - Case studies are visible
# - News/events display correctly
# - Admin panel shows correct counts
```

### 5. Alternative: Prisma Studio (visual check)

```bash
npx prisma studio
# Opens browser at http://localhost:5555
# Browse all tables to verify content
```

---

## Notes

- The `.env` file should have `DATABASE_URL="file:./db/chalo.db"` (or whatever your local path is)
- If the live site uses a different DB path, check the live `.env` file
- Always backup before overwriting
- If there are schema differences between live and local, run `prisma migrate` after copying
