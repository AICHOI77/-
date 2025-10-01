'use client';

import { useState } from 'react';
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
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'basic', name: '기본형' },
    { id: 'premium', name: '프리미엄' },
    { id: 'enterprise', name: '엔터프라이즈' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const comparisonFeatures = [
    '매출 분석',
    '고객 관리',
    'AI 예측',
    '예약 시스템',
    '재고 관리',
    '다매장 관리',
    'API 연동',
    '전담 매니저',
  ];

  const faqs = [
    {
      question: '무료 체험 기간이 있나요?',
      answer:
        '네, 모든 플랜에 대해 14일 무료 체험을 제공합니다. 별도의 결제 정보 없이 시작할 수 있습니다.',
    },
    {
      question: '계약 기간은 어떻게 되나요?',
      answer:
        '월 단위 계약으로 진행되며, 언제든지 해지 가능합니다. 연간 계약 시 20% 할인 혜택이 제공됩니다.',
    },
    {
      question: '플랜 변경이 가능한가요?',
      answer:
        '언제든지 플랜 업그레이드 또는 다운그레이드가 가능합니다. 변경 시점부터 새로운 요금이 적용됩니다.',
    },
    {
      question: '환불 정책은 어떻게 되나요?',
      answer:
        '서비스 이용 후 30일 이내 만족하지 못하실 경우 전액 환불해드립니다.',
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            상품 소개
          </h1>
          <p className="text-xl text-gray-400">
            사업 규모에 맞는 최적의 솔루션을 선택하세요
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-black border rounded-lg p-8 hover:border-red-600 transition-colors ${
                  product.popular ? 'border-red-600' : 'border-gray-800'
                }`}
              >
                {product.popular && (
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded text-sm font-medium mb-4">
                    인기
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <div className="text-3xl font-bold text-white mb-6">
                  {product.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-red-600 mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/products/${product.id}`}
                  className={`block text-center px-6 py-3 rounded font-medium transition-colors ${
                    product.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {product.price === '맞춤형 견적' ? '상담 신청' : '시작하기'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            기능 비교
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 text-white">기능</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 text-white">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="p-4 text-gray-300">{feature}</td>
                    <td className="p-4 text-center">
                      <span className="text-red-600">✓</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-red-600">✓</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-red-600">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-black border border-gray-800 rounded-lg p-6 hover:border-red-600 transition-colors"
              >
                <summary className="text-lg font-bold text-white cursor-pointer">
                  {faq.question}
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}