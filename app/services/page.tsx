import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const services = [
    {
      icon: '📊',
      title: '매출 분석 서비스',
      description: '실시간 매출 데이터를 AI가 분석하여 매출 패턴과 트렌드를 파악합니다.',
      features: [
        '일/주/월별 매출 분석',
        '상품별 판매 트렌드',
        '시간대별 매출 패턴',
        '고객 구매 주기 분석',
      ],
    },
    {
      icon: '🎯',
      title: '타겟 마케팅',
      description: '고객 데이터 분석을 통해 최적의 마케팅 전략을 제시합니다.',
      features: [
        '고객 세분화 분석',
        '맞춤형 프로모션 추천',
        'SNS 마케팅 가이드',
        '광고 효율 분석',
      ],
    },
    {
      icon: '💰',
      title: '수익 최적화',
      description: '가격 전략과 재고 관리로 수익을 극대화합니다.',
      features: [
        '동적 가격 책정',
        '재고 최적화',
        '원가 분석',
        '수익성 개선 제안',
      ],
    },
    {
      icon: '👥',
      title: '고객 관리',
      description: 'CRM 시스템으로 고객과의 관계를 강화합니다.',
      features: [
        '고객 DB 관리',
        '멤버십 프로그램',
        '리뷰 및 피드백 관리',
        '고객 충성도 분석',
      ],
    },
    {
      icon: '📱',
      title: '모바일 주문',
      description: '온라인 주문 시스템으로 매출 채널을 확장합니다.',
      features: [
        '모바일 주문 앱',
        '배달 연동',
        '결제 시스템',
        '주문 알림',
      ],
    },
    {
      icon: '🤖',
      title: 'AI 챗봇',
      description: '24시간 고객 응대 자동화로 만족도를 높입니다.',
      features: [
        '자동 상담',
        'FAQ 응답',
        '예약 관리',
        '다국어 지원',
      ],
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
              서비스
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            자영업자의 성공을 위한 종합 솔루션
            <br />
            AI 기술로 비즈니스의 모든 영역을 지원합니다
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-8 transition-all duration-300 hover:scale-105"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
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
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              14일 무료 체험으로 모든 서비스를 경험해보세요
            </p>
            <a
              href="/signup"
              className="inline-block px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
            >
              무료로 시작하기
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}