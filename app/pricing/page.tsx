import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const plans = [
    {
      name: '스타터',
      price: '49,000',
      description: '소규모 사업자를 위한 기본 플랜',
      features: [
        '매출 분석 대시보드',
        '고객 DB 관리 (최대 100명)',
        '기본 마케팅 도구',
        '모바일 앱 접근',
        '이메일 지원',
        '월간 리포트',
      ],
      popular: false,
    },
    {
      name: '프로페셔널',
      price: '99,000',
      description: '성장하는 비즈니스를 위한 플랜',
      features: [
        '모든 스타터 기능',
        '무제한 고객 DB',
        'AI 마케팅 추천',
        '예약/주문 시스템',
        '재고 관리',
        '우선 지원',
        '주간 리포트',
        '맞춤형 대시보드',
      ],
      popular: true,
    },
    {
      name: '엔터프라이즈',
      price: '맞춤형',
      description: '대규모 사업자를 위한 프리미엄 플랜',
      features: [
        '모든 프로페셔널 기능',
        '다매장 통합 관리',
        '전담 계정 매니저',
        'API 연동',
        '고급 분석 및 인사이트',
        '커스텀 개발',
        '24/7 전화 지원',
        '현장 교육',
      ],
      popular: false,
    },
  ];

  const addons = [
    { name: 'AI 챗봇', price: '29,000/월', description: '24시간 자동 고객 응대' },
    { name: '배달 연동', price: '19,000/월', description: '배달앱 통합 관리' },
    { name: '고급 분석', price: '39,000/월', description: '심층 데이터 분석 및 예측' },
    { name: '멤버십 시스템', price: '24,000/월', description: '고객 충성도 프로그램' },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">
              가격 플랜
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            비즈니스 규모에 맞는 플랜을 선택하세요
            <br />
            언제든지 업그레이드 가능합니다
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-gray-400">월간 결제</span>
            <div className="glass rounded-full px-3 py-1 text-sm text-blue-400 font-semibold">
              연간 결제 시 20% 할인
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'ring-2 ring-red-600 relative'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      인기
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    {plan.price === '맞춤형' ? (
                      plan.price
                    ) : (
                      <>
                        {plan.price}
                        <span className="text-xl text-gray-400">원/월</span>
                      </>
                    )}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/signup"
                  className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                      : 'glass-hover text-white'
                  }`}
                >
                  {plan.price === '맞춤형' ? '상담 신청' : '시작하기'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">
              추가 옵션
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addons.map((addon, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-6 text-center"
              >
                <h4 className="text-xl font-bold text-white mb-2">
                  {addon.name}
                </h4>
                <p className="text-2xl font-bold text-blue-400 mb-3">
                  {addon.price}
                </p>
                <p className="text-sm text-gray-400">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-white">
              자주 묻는 질문
            </span>
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '무료 체험 기간이 있나요?',
                a: '네, 모든 플랜에 대해 14일 무료 체험을 제공합니다. 신용카드 등록 없이 시작할 수 있습니다.',
              },
              {
                q: '플랜 변경이 가능한가요?',
                a: '언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 시 일할 계산으로 정산됩니다.',
              },
              {
                q: '계약 기간이 있나요?',
                a: '월간 플랜은 계약 기간이 없으며, 언제든지 해지 가능합니다. 연간 플랜은 20% 할인 혜택이 있습니다.',
              },
              {
                q: '환불 정책은 어떻게 되나요?',
                a: '서비스에 만족하지 못하시면 결제 후 30일 이내 전액 환불이 가능합니다.',
              },
            ].map((faq, index) => (
              <div key={index} className="glass glass-hover rounded-2xl p-6">
                <h4 className="text-xl font-bold text-white mb-3">
                  {faq.q}
                </h4>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
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
              아직 고민 중이신가요?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              전문가와 상담하고 최적의 플랜을 찾아보세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
              >
                무료 체험 시작
              </a>
              <a
                href="/contact"
                className="px-8 py-4 glass glass-hover text-white rounded-xl font-semibold text-lg"
              >
                상담 신청
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}