export const metadata = {
  title: '관리자 대시보드 | 자영업킹',
  description: '시스템 관리 대시보드',
};

export default function AdminDashboardPage() {
  const stats = [
    { title: '총 사용자', value: '1,234', change: '+12%', color: 'blue' },
    { title: '총 주문', value: '567', change: '+8%', color: 'green' },
    { title: '총 매출', value: '₩45,000,000', change: '+15%', color: 'red' },
    { title: '활성 상품', value: '89', change: '+3%', color: 'yellow' },
  ];

  const recentOrders = [
    { id: 1, user: '홍길동', product: '프리미엄 플랜', amount: 99000, status: 'completed' },
    { id: 2, user: '김철수', product: '기본 플랜', amount: 49000, status: 'pending' },
    { id: 3, user: '이영희', product: '엔터프라이즈', amount: 299000, status: 'completed' },
  ];

  const recentUsers = [
    { id: 1, name: '박민수', email: 'park@example.com', date: '2024-01-25', status: 'active' },
    { id: 2, name: '정수진', email: 'jung@example.com', date: '2024-01-24', status: 'active' },
    { id: 3, name: '최동욱', email: 'choi@example.com', date: '2024-01-23', status: 'inactive' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">대시보드</h1>
        <p className="text-gray-400">시스템 현황을 한눈에 확인하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black border border-gray-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">{stat.title}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-sm text-green-500">{stat.change} 지난달 대비</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 최근 주문 */}
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">최근 주문</h2>
            <a href="/admin/orders" className="text-sm text-red-600 hover:text-red-500">
              전체보기
            </a>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-white">{order.user}</p>
                  <p className="text-sm text-gray-400">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">
                    {order.amount.toLocaleString()}원
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      order.status === 'completed'
                        ? 'bg-green-900 text-green-400'
                        : 'bg-yellow-900 text-yellow-400'
                    }`}
                  >
                    {order.status === 'completed' ? '완료' : '대기'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 가입자 */}
        <div className="bg-black border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">최근 가입자</h2>
            <a href="/admin/users" className="text-sm text-red-600 hover:text-red-500">
              전체보기
            </a>
          </div>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{user.date}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      user.status === 'active'
                        ? 'bg-green-900 text-green-400'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 매출 차트 영역 (플레이스홀더) */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">월별 매출</h2>
        <div className="h-64 flex items-center justify-center border border-gray-800 rounded">
          <p className="text-gray-600">차트 영역 (라이브러리 필요)</p>
        </div>
      </div>
    </div>
  );
}