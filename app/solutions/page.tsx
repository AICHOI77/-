import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SolutionsPage() {
  const solutions = [
    {
      icon: '🍽️',
      title: '음식점 솔루션',
      description: '음식점 운영의 모든 것을 한 곳에서',
      features: [
        '메뉴 관리 및 재고 추적',
        '테이블 예약 시스템',
        '배달 주문 통합',
        '식자재 발주 자동화',
      ],
      stats: { sales: '+45%', customers: '2,500+', rating: '4.8/5' },
    },
    {
      icon: '☕',
      title: '카페 솔루션',
      description: '카페 운영을 더 스마트하게',
      features: [
        '멤버십 적립 시스템',
        '선주문 서비스',
        '시즌 메뉴 프로모션',
        '원두 재고 관리',
      ],
      stats: { sales: '+38%', customers: '1,800+', rating: '4.7/5' },
    },
    {
      icon: '🛍️',
      title: '소매점 솔루션',
      description: '매장 관리의 새로운 기준',
      features: [
        'POS 통합 관리',
        '재고 실시간 추적',
        '바코드 스캔 시스템',
        '발주 자동화',
      ],
      stats: { sales: '+52%', customers: '3,200+', rating: '4.9/5' },
    },
    {
      icon: '💇',
      title: '뷰티샵 솔루션',
      description: '고객 예약부터 관리까지',
      features: [
        '예약 스케줄 관리',
        '고객 히스토리 기록',
        '멤버십 관리',
        '시술 후기 관리',
      ],
      stats: { sales: '+41%', customers: '1,500+', rating: '4.8/5' },
    },
    {
      icon: '🏋️',
      title: '피트니스 솔루션',
      description: '회원 관리의 완벽한 파트너',
      features: [
        '회원권 관리',
        '출석 체크',
        'PT 스케줄링',
        '운동 기록 추적',
      ],
      stats: { sales: '+35%', customers: '2,100+', rating: '4.7/5' },
    },
    {
      icon: '🎓',
      title: '교육 솔루션',
      description: '학원 운영의 스마트한 변화',
      features: [
        '학생 출결 관리',
        '수업 스케줄',
        '성적 관리',
        '학부모 알림',
      ],
      stats: { sales: '+48%', customers: '1,200+', rating: '4.9/5' },
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              업종별 맞춤 솔루션
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            각 업종의 특성에 최적화된 맞춤형 솔루션으로
            <br />
            비즈니스 성공을 가속화하세요
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-8 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-6">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-500">
                      {solution.stats.sales}
                    </div>
                    <div className="text-xs text-gray-500">매출 증가</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {solution.stats.customers}
                    </div>
                    <div className="text-xs text-gray-500">사용자</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-700">
                      {solution.stats.rating}
                    </div>
                    <div className="text-xs text-gray-500">평점</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">
              성공 사례
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: '김치찌개 맛집',
                type: '음식점',
                result: '매출 67% 증가',
                comment: '예약 시스템 덕분에 회전율이 2배 높아졌어요!',
              },
              {
                name: '모던 카페',
                type: '카페',
                result: '고객 85% 증가',
                comment: '멤버십 시스템으로 단골이 3배 늘었습니다.',
              },
              {
                name: '스마트 헬스장',
                type: '피트니스',
                result: '매출 92% 증가',
                comment: 'PT 관리가 너무 편해져서 수업을 2배 늘렸어요.',
              },
            ].map((story, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-8"
              >
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {story.result}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {story.name}
                </h4>
                <p className="text-sm text-gray-500 mb-4">{story.type}</p>
                <p className="text-gray-300 leading-relaxed">
                  &ldquo;{story.comment}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              내 업종에 맞는 솔루션 찾기
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              전문 상담을 통해 최적의 솔루션을 추천해드립니다
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
            >
              상담 신청하기
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}