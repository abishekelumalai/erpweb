import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseAndValidateBody, getStringField, safeErrorResponse } from '@/lib/api-helpers';
import { requireAdminAuth } from '@/lib/auth';
import { logAudit } from '@/lib/audit-log';
import { seedSiteContent } from '@/lib/seed-site-content';

export async function GET(request: NextRequest) {
  const auth = requireAdminAuth(request);
  if (!auth.authenticated) return auth.response;
  try {
    // Auto-seed if table is empty
    const count = await db.siteContent.count();
    if (count === 0) {
      await seedSiteContent(db);
    }

    const records = await db.siteContent.findMany({
      orderBy: [{ section: 'asc' }, { order: 'asc' }],
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching site content:', error);
    return safeErrorResponse('Failed to fetch site content', 500);
  }
}

export async function PUT(request: NextRequest) {
  const auth = requireAdminAuth(request);
  if (!auth.authenticated) return auth.response;
  try {
    const parsed = await parseAndValidateBody(request);
    if (!parsed.success) return parsed.response;

    const { body } = parsed;

    // Support both single update { key, value } and batch update [{ key, value }, ...]
    const updates: { key: string; value: string }[] = [];

    if (Array.isArray(body.items) && Array.isArray(body.items[0])) {
      // Batch: { items: [{ key, value }, ...] }
      for (const item of body.items) {
        const k = getStringField(item as Record<string, unknown>, 'key');
        const v = getStringField(item as Record<string, unknown>, 'value');
        if (k && v !== null) {
          updates.push({ key: k, value: v });
        }
      }
    } else {
      // Single: { key, value }
      const k = getStringField(body, 'key');
      const v = getStringField(body, 'value');
      if (!k) {
        return safeErrorResponse('Key is required', 400);
      }
      if (v === null) {
        return safeErrorResponse('Value is required', 400);
      }
      updates.push({ key: k, value: v });
    }

    const results = await Promise.all(
      updates.map(({ key, value }) =>
        db.siteContent.upsert({
          where: { key },
          update: { value },
          create: { key, value, section: 'Uncategorized', label: key },
        })
      )
    );

    await logAudit({
      user: auth.user,
      action: 'update',
      section: 'site-content',
      summary: `${auth.user.email} updated ${updates.length} site content field${updates.length === 1 ? '' : 's'}: ${updates.map((u) => u.key).join(', ')}`,
      request,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error updating site content:', error);
    return safeErrorResponse('Failed to update site content', 500);
  }
}