import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Travello" };

export default function AdminLayout({ children }) {
  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
