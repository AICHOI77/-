'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loadTossPayments } from '@/lib/tossPayments';
import { createPayment } from '@/lib/firestoreService';

export default function PaymentPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [amount, setAmount] = useState(10000);
  const [orderName, setOrderName] = useState('자영업킹 구독');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    try {
      setIsLoading(true);

      // 주문 ID 생성 (고유값)
      const orderId = `ORDER_${Date.now()}_${user.uid}`;

      console.log('결제 시작:', { orderId, amount, orderName });

      // Firestore에 주문 정보 먼저 저장 (pending 상태)
      await createPayment({
        userId: user.uid,
        orderId,
        paymentKey: '', // 결제 성공 후 업데이트
        amount,
        orderName,
        status: 'pending',
        createdAt: new Date() as any,
      });

      console.log('주문 정보 저장 완료');

      // Toss Payments SDK 로드
      console.log('Toss Payments SDK 로드 시작...');
      const tossPayments = await loadTossPayments();
      console.log('Toss Payments SDK 로드 완료:', tossPayments);

      // Payment 객체 생성
      const payment = tossPayments.payment({ customerKey: user.uid });
      console.log('Payment 객체 생성:', payment);

      // 결제 요청
      console.log('결제 요청 시작...');
      await payment.requestPayment({
        method: 'CARD', // 'CARD', 'VIRTUAL_ACCOUNT', 'TRANSFER' 등
        amount: {
          currency: 'KRW',
          value: amount,
        },
        orderId,
        orderName,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: user.email || undefined,
        customerName: user.displayName || user.email || '고객',
      });
    } catch (error: any) {
      console.error('결제 오류 상세:', error);
      alert(`결제 중 오류가 발생했습니다.\n${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">로그인이 필요합니다</h2>
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">결제하기</h1>

        <div className="glass rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              상품명
            </label>
            <input
              type="text"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              결제 금액
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
              />
              <span className="flex items-center px-4 text-gray-400">원</span>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium">총 결제금액</span>
              <span className="text-2xl font-bold text-red-600">
                {amount.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading || !orderName || amount < 100}
              className="w-full px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {isLoading ? '결제 진행 중...' : '결제하기'}
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center">
            결제는 토스페이먼츠를 통해 안전하게 처리됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
