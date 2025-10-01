'use client';

import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-white/20">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            자영업자 매출 증대
          </h2>
          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            AI 기반 데이터 분석으로 매출을 극대화하세요.
            실시간 대시보드와 맞춤형 인사이트로 비즈니스 성장을 가속화합니다.
          </p>
          <div className="mt-6 flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">250%</div>
              <div className="text-xs text-gray-400">평균 매출 증가</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">24/7</div>
              <div className="text-xs text-gray-400">AI 지원</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">10K+</div>
              <div className="text-xs text-gray-400">사업자</div>
            </div>
          </div>
        </div>

        {/* Right content - 3D Animation */}
        <div className="flex-1 relative min-h-[250px] md:min-h-0">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}