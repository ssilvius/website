import AdminLayout from '@/components/layouts/admin';

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}