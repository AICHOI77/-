import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '회사소개 | 자영업킹',
  description: '신뢰할 수 있는 자영업자 매출 증대 전문 기업, 자영업킹을 소개합니다.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            회사소개
          </h1>
          <p className="text-xl text-gray-400">
            자영업자의 성공을 지원하는 검증된 파트너
          </p>
        </div>
      </section>

      {/* 회사 개요 */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                자영업킹 소개
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                자영업킹은 2019년 설립된 자영업자 매출 증대 전문 기업입니다.
                50명 이상의 전문가가 데이터 기반 분석과 실전 노하우로
                자영업자의 성공을 지원하고 있습니다.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="border border-gray-800 rounded p-4">
                  <div className="text-2xl font-bold text-red-600 mb-1">2019</div>
                  <div className="text-sm text-gray-400">설립연도</div>
                </div>
                <div className="border border-gray-800 rounded p-4">
                  <div className="text-2xl font-bold text-red-600 mb-1">50+</div>
                  <div className="text-sm text-gray-400">전문가</div>
                </div>
                <div className="border border-gray-800 rounded p-4">
                  <div className="text-2xl font-bold text-red-600 mb-1">10,000+</div>
                  <div className="text-sm text-gray-400">고객사</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded p-8 h-96 flex items-center justify-center border border-gray-800">
              <p className="text-gray-600 text-center">회사 이미지 영역</p>
            </div>
          </div>
        </div>
      </section>

      {/* 미션 & 비전 */}
      <section className="py-16 lg:py-24 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            미션 & 비전
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">미션</h3>
              <p className="text-gray-400 leading-relaxed">
                데이터 기반 분석과 실전 노하우로 자영업자의 매출 증대와
                안정적인 경영을 지원하여, 대한민국 자영업의 경쟁력을
                높이는 것이 우리의 사명입니다.
              </p>
            </div>
            <div className="bg-black border border-gray-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">비전</h3>
              <p className="text-gray-400 leading-relaxed">
                자영업자가 가장 먼저 찾는 신뢰할 수 있는 파트너가 되어,
                모든 자영업자가 안정적으로 성장할 수 있는 생태계를
                만들어가겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '신뢰',
                description: '검증된 데이터와 투명한 프로세스로 고객의 신뢰를 얻습니다',
              },
              {
                title: '전문성',
                description: '업종별 전문 컨설턴트가 실전 노하우를 제공합니다',
              },
              {
                title: '성과',
                description: '명확한 성과 지표로 실질적인 매출 증대를 실현합니다',
              },
              {
                title: '지속성',
                description: '단기 성과가 아닌 지속 가능한 성장을 추구합니다',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-black border border-gray-800 rounded-lg p-6 hover:border-red-600 transition-colors"
              >
                <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="py-16 lg:py-24 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            주요 연혁
          </h2>
          <div className="space-y-8">
            {[
              {
                year: '2024',
                events: [
                  '누적 고객사 10,000개 돌파',
                  'AI 기반 매출 예측 시스템 도입',
                ],
              },
              {
                year: '2023',
                events: [
                  '업종별 전문 컨설팅 서비스 런칭',
                  '모바일 앱 출시',
                ],
              },
              {
                year: '2022',
                events: [
                  '시리즈 A 투자 유치 (50억원)',
                  '직원 50명 돌파',
                ],
              },
              {
                year: '2021',
                events: [
                  '매출 분석 플랫폼 정식 오픈',
                  '고객사 1,000개 달성',
                ],
              },
              {
                year: '2019',
                events: [
                  '자영업킹 법인 설립',
                  '베타 서비스 시작',
                ],
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-black border border-gray-800 rounded-lg p-6">
                    <ul className="space-y-3">
                      {item.events.map((event, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-600 mr-3">•</span>
                          <span className="text-gray-300">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}