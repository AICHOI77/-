import AdminSidebar from '@/components/admin/admin-sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-1 mb-8 lg:mb-0">
              <AdminSidebar />
            </div>
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}