'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  category: string;
  detailedDescription: string;
  benefits: string[];
  targetCustomers: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const productId = params.id as string;

  const products: Record<string, Product> = {
    '1': {
      id: '1',
      name: '기본형',
      category: 'basic',
      description: '소규모 자영업자를 위한 필수 기능',
      price: '49,000원/월',
      features: [
        '매출 분석 대시보드',
        '고객 관리 (100명)',
        '기본 마케팅 도구',
        '월간 리포트',
        '이메일 지원',
      ],
      detailedDescription:
        '소규모 자영업자가 필요로 하는 핵심 기능만을 엄선하여 제공합니다. 복잡한 설정 없이 바로 시작할 수 있으며, 직관적인 인터페이스로 누구나 쉽게 사용할 수 있습니다.',
      benefits: [
        '간편한 매출 관리',
        '효율적인 고객 관리',
        '데이터 기반 의사결정',
        '비용 효율적인 솔루션',
      ],
      targetCustomers: [
        '개인 자영업자',
        '소규모 가게 운영자',
        '창업 초기 사업자',
        '간단한 관리 시스템이 필요한 분',
      ],
    },
    '2': {
      id: '2',
      name: '프리미엄',
      category: 'premium',
      description: '성장하는 사업자를 위한 전문 솔루션',
      price: '99,000원/월',
      features: [
        '모든 기본형 기능',
        '무제한 고객 관리',
        'AI 매출 예측',
        '예약/주문 시스템',
        '재고 관리',
        '우선 지원',
        '주간 리포트',
      ],
      popular: true,
      detailedDescription:
        '성장하는 사업체를 위한 전문적인 솔루션입니다. AI 기반 예측 분석으로 매출을 극대화하고, 통합 관리 시스템으로 업무 효율을 높일 수 있습니다.',
      benefits: [
        'AI 기반 매출 예측',
        '통합 예약/주문 관리',
        '실시간 재고 추적',
        '우선 고객 지원',
        '상세한 분석 리포트',
      ],
      targetCustomers: [
        '성장하는 중소 사업자',
        '다양한 기능이 필요한 업체',
        '데이터 분석에 관심 있는 사업자',
        '시스템 통합이 필요한 분',
      ],
    },
    '3': {
      id: '3',
      name: '엔터프라이즈',
      category: 'enterprise',
      description: '다매장 운영을 위한 통합 관리 시스템',
      price: '맞춤형 견적',
      features: [
        '모든 프리미엄 기능',
        '다매장 통합 관리',
        '전담 계정 매니저',
        'API 연동',
        '고급 분석 리포트',
        '맞춤형 개발',
        '24/7 전화 지원',
        '현장 교육',
      ],
      detailedDescription:
        '대규모 사업체와 다매장 운영자를 위한 최고급 솔루션입니다. 전담 매니저가 배정되며, 맞춤형 개발 및 API 연동으로 기존 시스템과 완벽하게 통합됩니다.',
      benefits: [
        '다매장 통합 관리',
        '전담 계정 매니저 지원',
        '맞춤형 시스템 개발',
        'API 기반 확장성',
        '24/7 프리미엄 지원',
        '현장 교육 및 컨설팅',
      ],
      targetCustomers: [
        '다매장 운영 사업자',
        '대규모 체인점',
        '맞춤형 기능이 필요한 기업',
        '전문 지원이 필요한 조직',
      ],
    },
  };

  const product = products[productId];

  if (!product) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              상품을 찾을 수 없습니다
            </h1>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              상품 목록으로 돌아가기
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const handlePurchase = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/payment');
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Product Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Product Info */}
            <div>
              {product.popular && (
                <div className="inline-block bg-red-600 text-white px-4 py-1 rounded text-sm font-medium mb-4">
                  인기 상품
                </div>
              )}
              <h1 className="text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-400 mb-6">{product.description}</p>
              <div className="text-4xl font-bold text-red-600 mb-8">
                {product.price}
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={handlePurchase}
                  className="w-full px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
                >
                  {product.price === '맞춤형 견적' ? '상담 신청하기' : '구매하기'}
                </button>
                <button
                  onClick={() => router.push('/products')}
                  className="w-full px-8 py-4 glass glass-hover text-white rounded font-semibold text-lg"
                >
                  다른 상품 보기
                </button>
              </div>

              <div className="glass rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">포함된 기능</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-600 mr-3 text-xl">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Additional Info */}
            <div className="space-y-6">
              <div className="glass rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">상세 설명</h3>
                <p className="text-gray-300 leading-relaxed">
                  {product.detailedDescription}
                </p>
              </div>

              <div className="glass rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">주요 혜택</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-600 mr-3">●</span>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-4">추천 대상</h3>
                <ul className="space-y-3">
                  {product.targetCustomers.map((customer, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-600 mr-3">→</span>
                      <span className="text-gray-300">{customer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            14일 무료 체험으로 모든 기능을 경험해보세요
          </p>
          <button
            onClick={handlePurchase}
            className="px-12 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
          >
            {product.price === '맞춤형 견적' ? '상담 신청하기' : '무료로 시작하기'}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
