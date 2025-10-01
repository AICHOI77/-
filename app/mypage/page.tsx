export const metadata = {
  title: '마이페이지 | 자영업킹',
  description: '내 정보와 주문 내역을 관리하세요',
};

export default function MypagePage() {
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2024-01-15',
    grade: '일반회원',
    profileImage: null,
  };

  const recentOrders = [
    {
      id: '1',
      orderNumber: 'ORD-20240125-001',
      date: '2024-01-25',
      status: 'delivered',
      total: 99000,
    },
    {
      id: '2',
      orderNumber: 'ORD-20240120-002',
      date: '2024-01-20',
      status: 'shipping',
      total: 49000,
    },
  ];

  const stats = {
    points: 5000,
    orders: 12,
    reviews: 8,
  };

  return (
    <div className="space-y-8">
      {/* 사용자 정보 요약 */}
      <div className="bg-black border border-gray-800 rounded-lg p-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">{user.name[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>가입일: {user.joinDate}</span>
              <span>등급: {user.grade}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 대시보드 위젯 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">포인트</h3>
          <p className="text-3xl font-bold text-white">{stats.points.toLocaleString()}P</p>
        </div>
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">총 주문</h3>
          <p className="text-3xl font-bold text-white">{stats.orders}건</p>
        </div>
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm mb-2">작성 리뷰</h3>
          <p className="text-3xl font-bold text-white">{stats.reviews}개</p>
        </div>
      </div>

      {/* 최근 주문 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">최근 주문</h3>
          <a href="/mypage/orders" className="text-sm text-red-600 hover:text-red-500">
            전체보기
          </a>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-800 rounded-lg p-4 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white mb-1">{order.orderNumber}</p>
                  <p className="text-sm text-gray-400">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white mb-1">
                    {order.total.toLocaleString()}원
                  </p>
                  <span
                    className={`text-sm px-3 py-1 rounded ${
                      order.status === 'delivered'
                        ? 'bg-green-900 text-green-400'
                        : 'bg-blue-900 text-blue-400'
                    }`}
                  >
                    {order.status === 'delivered' ? '배송완료' : '배송중'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/mypage/profile', label: '내 정보 관리' },
          { href: '/mypage/orders', label: '주문 조회' },
          { href: '/mypage/settings', label: '설정' },
          { href: '/contact', label: '고객센터' },
        ].map((action) => (
          <a
            key={action.href}
            href={action.href}
            className="bg-black border border-gray-800 rounded-lg p-6 text-center hover:border-red-600 transition-colors"
          >
            <span className="text-white font-medium">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}