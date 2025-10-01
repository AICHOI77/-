export default function FeaturesSection() {
  const features = [
    {
      icon: '📊',
      title: '데이터 분석',
      description: '실시간 매출 데이터를 분석하여 인사이트를 제공합니다.',
    },
    {
      icon: '🎯',
      title: 'AI 마케팅',
      description: '타겟 고객을 분석하고 최적의 마케팅 전략을 추천합니다.',
    },
    {
      icon: '💡',
      title: '스마트 추천',
      description: '업종별 맞춤 솔루션으로 매출 증대를 지원합니다.',
    },
    {
      icon: '🔔',
      title: '실시간 알림',
      description: '중요한 비즈니스 이벤트를 즉시 알려드립니다.',
    },
    {
      icon: '📱',
      title: '모바일 최적화',
      description: '언제 어디서나 모바일로 비즈니스를 관리하세요.',
    },
    {
      icon: '🤝',
      title: '전문가 지원',
      description: '전문 컨설턴트의 1:1 맞춤 상담을 제공합니다.',
    },
  ];

  return (
    <section id="features" className="py-24 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            핵심 기능
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            자영업자를 위한 모든 기능을 하나의 플랫폼에서
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass glass-hover rounded p-8 transition-all duration-300 hover:border-red-600"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}