import AuthGuard from '@/components/auth/auth-guard';
import SidebarNav from '@/components/mypage/sidebar-nav';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="lg:grid lg:grid-cols-4 lg:gap-8">
              <div className="lg:col-span-1 mb-8 lg:mb-0">
                <SidebarNav />
              </div>
              <div className="lg:col-span-3">{children}</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
}