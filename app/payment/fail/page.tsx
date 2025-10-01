'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentFailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="glass rounded-lg p-8">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-4">결제 실패</h1>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded">
              <p className="text-sm text-gray-300 mb-1">오류 메시지</p>
              <p className="text-white font-medium">{decodeURIComponent(errorMessage)}</p>
              {errorCode && (
                <p className="text-xs text-gray-400 mt-2">코드: {errorCode}</p>
              )}
            </div>
          )}

          <p className="text-gray-400 mb-8">
            결제가 취소되었거나 오류가 발생했습니다.
            <br />
            다시 시도해 주세요.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/payment')}
              className="w-full px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold"
            >
              다시 시도
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full px-8 py-3 glass glass-hover text-white rounded font-semibold"
            >
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
        </div>
      }
    >
      <PaymentFailContent />
    </Suspense>
  );
}
