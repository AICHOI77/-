'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getSuccessStory, SuccessStory } from '@/lib/successStoryService';

export default function SuccessStoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const storyId = params.id as string;

  const [story, setStory] = useState<SuccessStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStory();
  }, [storyId]);

  const loadStory = async () => {
    setIsLoading(true);
    try {
      const data = await getSuccessStory(storyId);
      setStory(data);
    } catch (error) {
      console.error('성공사례 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!story) {
    return (
      <main className="min-h-screen bg-black">
        <Header />
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              성공사례를 찾을 수 없습니다
            </h1>
            <button
              onClick={() => router.push('/success-stories')}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Hero Image */}
      <section className="pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
            {story.imageUrl ? (
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-600 text-6xl">📊</span>
              </div>
            )}
            {story.featured && (
              <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                추천 사례
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1 bg-red-900/30 text-red-400 rounded-full text-sm font-medium">
                {story.industry}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{story.title}</h1>
            <p className="text-xl text-gray-400">{story.companyName}</p>
          </div>

          {/* Results */}
          <div className="glass rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">주요 성과</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-black/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">매출 증가</p>
                <p className="text-4xl font-bold text-red-600">
                  {story.results.salesIncrease}
                </p>
              </div>
              <div className="text-center p-6 bg-black/50 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">고객 증가</p>
                <p className="text-4xl font-bold text-white">
                  {story.results.customerIncrease}
                </p>
              </div>
              {story.results.customMetric && (
                <div className="text-center p-6 bg-black/50 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">기타 성과</p>
                  <p className="text-2xl font-bold text-white">
                    {story.results.customMetric}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">소개</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {story.description}
            </p>
          </div>

          {/* Detailed Content */}
          <div className="glass rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">상세 내용</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {story.content}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12 glass rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              당신도 성공 스토리의 주인공이 되어보세요
            </h3>
            <p className="text-gray-400 mb-6">
              지금 무료로 시작하고 14일 동안 모든 기능을 체험하세요
            </p>
            <button
              onClick={() => router.push('/signup')}
              className="px-10 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
            >
              무료로 시작하기
            </button>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/success-stories')}
              className="px-6 py-3 glass glass-hover text-white rounded font-medium"
            >
              ← 목록으로 돌아가기
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
