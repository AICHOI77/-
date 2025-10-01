import { SplineSceneBasic } from './SplineSceneBasic';

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">AI 기반 매출 증대 솔루션</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-red-600">
              자영업자의 성공을
            </span>
            <br />
            <span className="text-white">AI가 함께합니다</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            데이터 기반 분석과 AI 추천으로 매출을 극대화하세요.
            <br />
            복잡한 마케팅, 이제 간단하게 해결하세요.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg w-full sm:w-auto">
              무료로 시작하기
            </button>
            <button className="px-8 py-4 glass glass-hover text-white rounded font-semibold text-lg w-full sm:w-auto">
              데모 보기
            </button>
          </div>
        </div>

        {/* Spline 3D Scene */}
        <div className="mb-16">
          <SplineSceneBasic />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '10,000+', label: '가입 사업자' },
            { value: '250%', label: '평균 매출 증가' },
            { value: '24/7', label: 'AI 지원' },
            { value: '98%', label: '만족도' },
          ].map((stat, index) => (
            <div key={index} className="glass glass-hover rounded p-6">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}