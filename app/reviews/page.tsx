'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  getAverageRating,
  Review,
} from '@/lib/firestoreService';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: '',
  });

  useEffect(() => {
    loadReviews();
  }, [user]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const [allReviewsData, avgRating] = await Promise.all([
        getAllReviews(20),
        getAverageRating(),
      ]);

      setReviews(allReviewsData);
      setAverageRating(avgRating);

      if (user) {
        const userReviewsData = await getUserReviews(user.uid);
        setUserReviews(userReviewsData);
      }
    } catch (error) {
      console.error('리뷰 로드 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (!formData.title || !formData.content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      if (editingReview) {
        // 수정
        await updateReview(editingReview.id!, {
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
        });
      } else {
        // 새 리뷰 작성
        await createReview({
          userId: user.uid,
          userName: user.displayName || user.email || '익명',
          userPhotoURL: user.photoURL || undefined,
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
          createdAt: new Date() as any,
          updatedAt: new Date() as any,
        });
      }

      // 폼 초기화
      setFormData({ rating: 5, title: '', content: '' });
      setShowForm(false);
      setEditingReview(null);

      // 리뷰 다시 로드
      loadReviews();
    } catch (error) {
      console.error('리뷰 저장 오류:', error);
      alert('리뷰 저장 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      rating: review.rating,
      title: review.title,
      content: review.content,
    });
    setShowForm(true);
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteReview(reviewId);
      loadReviews();
    } catch (error) {
      console.error('리뷰 삭제 오류:', error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-red-600">사용자</span> 리뷰
          </h1>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-2xl">{renderStars(Math.round(averageRating))}</div>
            <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-gray-400">총 {reviews.length}개의 리뷰</p>
        </div>

        {user && (
          <div className="mb-8">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingReview(null);
                setFormData({ rating: 5, title: '', content: '' });
              }}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              {showForm ? '취소' : '리뷰 작성하기'}
            </button>
          </div>
        )}

        {showForm && (
          <div className="glass rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingReview ? '리뷰 수정' : '리뷰 작성'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  평점
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="text-3xl focus:outline-none transition-colors"
                    >
                      <span
                        className={
                          star <= formData.rating ? 'text-yellow-500' : 'text-gray-600'
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                  placeholder="리뷰 제목을 입력하세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  내용
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white resize-none"
                  placeholder="리뷰 내용을 입력하세요"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg"
              >
                {editingReview ? '수정 완료' : '등록'}
              </button>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="glass rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <div className="flex items-center gap-1 text-sm">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>

                  {user && user.uid === review.userId && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="px-3 py-1 text-sm glass glass-hover rounded"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(review.id!)}
                        className="px-3 py-1 text-sm bg-red-900/20 hover:bg-red-900/40 rounded"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{review.title}</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{review.content}</p>

                <p className="text-sm text-gray-500 mt-4">
                  {review.createdAt?.toDate?.()?.toLocaleDateString() || '날짜 정보 없음'}
                </p>
              </div>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                아직 작성된 리뷰가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
