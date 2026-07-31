import { requireAdminPage } from '@/lib/auth';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminPage();

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
