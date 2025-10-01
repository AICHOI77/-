'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllSuccessStories, SuccessStory } from '@/lib/successStoryService';

export default function SuccessStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSuccessStories(50);
      setStories(data);
    } catch (error) {
      console.error('성공사례 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const industries = ['all', '음식점', '카페', '소매업', '서비스업', '기타'];

  const filteredStories =
    filter === 'all' ? stories : stories.filter((s) => s.industry === filter);

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-red-600">성공</span>사례
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            자영업킹과 함께 성장한 사업자들의 실제 이야기를 만나보세요
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 flex-wrap justify-center">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === industry
                    ? 'bg-red-600 text-white'
                    : 'glass glass-hover text-gray-300'
                }`}
              >
                {industry === 'all' ? '전체' : industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  onClick={() => router.push(`/success-stories/${story.id}`)}
                  className="glass rounded-lg overflow-hidden hover:border-red-600 transition-all cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gray-900 overflow-hidden">
                    {story.imageUrl ? (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-4xl">📊</span>
                      </div>
                    )}
                    {story.featured && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        추천
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-red-900/30 text-red-400 rounded-full">
                        {story.industry}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {story.description}
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-black/50 rounded">
                        <p className="text-xs text-gray-500 mb-1">매출 증가</p>
                        <p className="text-lg font-bold text-red-600">
                          {story.results.salesIncrease}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-black/50 rounded">
                        <p className="text-xs text-gray-500 mb-1">고객 증가</p>
                        <p className="text-lg font-bold text-white">
                          {story.results.customerIncrease}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {filter === 'all'
                  ? '아직 등록된 성공사례가 없습니다.'
                  : `${filter} 업종의 성공사례가 없습니다.`}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            당신의 성공 스토리를 만들어보세요
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            지금 시작하면 14일 무료 체험이 가능합니다
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="px-12 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
          >
            무료로 시작하기
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
