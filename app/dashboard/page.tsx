'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUser, getUserPayments, getUserReviews, Payment, Review } from '@/lib/firestoreService';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadUserData();
  }, [user, router]);

  const loadUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const [paymentsData, reviewsData] = await Promise.all([
        getUserPayments(user.uid),
        getUserReviews(user.uid),
      ]);

      setPayments(paymentsData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('데이터 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalSpent = () => {
    return payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-red-600">내</span> 대시보드
          </h1>
          <p className="text-gray-400">
            안녕하세요, <span className="text-white font-semibold">{user.displayName || user.email}</span>님!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">총 결제 금액</p>
                <p className="text-3xl font-bold text-red-600">
                  {getTotalSpent().toLocaleString()}원
                </p>
              </div>

              <div className="glass rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">결제 횟수</p>
                <p className="text-3xl font-bold text-white">
                  {payments.filter((p) => p.status === 'completed').length}회
                </p>
              </div>

              <div className="glass rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">작성한 리뷰</p>
                <p className="text-3xl font-bold text-white">{reviews.length}개</p>
              </div>
            </div>

            {/* 결제 내역 */}
            <div className="glass rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">결제 내역</h2>
                <button
                  onClick={() => router.push('/payment')}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-sm"
                >
                  새 결제하기
                </button>
              </div>

              {payments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">날짜</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">주문번호</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">상품명</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium">금액</th>
                        <th className="text-center py-3 px-4 text-gray-400 font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-800 hover:bg-white/5">
                          <td className="py-3 px-4 text-sm">
                            {payment.createdAt?.toDate?.()?.toLocaleDateString() || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm font-mono">{payment.orderId}</td>
                          <td className="py-3 px-4">{payment.orderName}</td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {payment.amount.toLocaleString()}원
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                                payment.status === 'completed'
                                  ? 'bg-green-900/30 text-green-400'
                                  : payment.status === 'failed'
                                  ? 'bg-red-900/30 text-red-400'
                                  : 'bg-yellow-900/30 text-yellow-400'
                              }`}
                            >
                              {payment.status === 'completed'
                                ? '완료'
                                : payment.status === 'failed'
                                ? '실패'
                                : '대기중'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  아직 결제 내역이 없습니다.
                </div>
              )}
            </div>

            {/* 내 리뷰 */}
            <div className="glass rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">내 리뷰</h2>
                <button
                  onClick={() => router.push('/reviews')}
                  className="px-4 py-2 glass glass-hover text-white rounded font-semibold text-sm"
                >
                  리뷰 페이지로
                </button>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-black/30 rounded border border-gray-800">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? 'text-yellow-500' : 'text-gray-600'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold mb-1">{review.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{review.content}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {review.createdAt?.toDate?.()?.toLocaleDateString() || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  아직 작성한 리뷰가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
