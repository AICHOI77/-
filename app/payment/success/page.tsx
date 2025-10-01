'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createPayment } from '@/lib/firestoreService';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [status, setStatus] = useState<'confirming' | 'success' | 'error'>('confirming');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (!paymentKey || !orderId || !amount) {
        setStatus('error');
        setErrorMessage('결제 정보가 올바르지 않습니다.');
        return;
      }

      try {
        // 결제 승인 API 호출
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || '결제 승인 실패');
        }

        const paymentData = await response.json();

        // Firestore에 결제 내역 저장
        if (user) {
          await createPayment({
            userId: user.uid,
            orderId,
            paymentKey,
            amount: Number(amount),
            orderName: paymentData.orderName || '자영업킹 구독',
            status: 'completed',
            paymentData,
            createdAt: new Date() as any,
          });
        }

        setStatus('success');
      } catch (error: any) {
        console.error('결제 승인 오류:', error);
        setStatus('error');
        setErrorMessage(error.message || '결제 승인 중 오류가 발생했습니다.');
      }
    };

    confirmPayment();
  }, [searchParams, user]);

  if (status === 'confirming') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl">결제를 확인하는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="glass rounded-lg p-8">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-3xl font-bold mb-4">결제 실패</h1>
            <p className="text-gray-400 mb-8">{errorMessage}</p>
            <button
              onClick={() => router.push('/payment')}
              className="px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="glass rounded-lg p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4">결제 완료</h1>
          <p className="text-gray-400 mb-8">
            결제가 성공적으로 완료되었습니다.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              홈으로 이동
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-8 py-3 glass glass-hover text-white rounded font-semibold"
            >
              대시보드로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
