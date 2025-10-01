// Toss Payments 설정 및 유틸리티

export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
export const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

// 결제 요청 타입
export interface PaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail?: string;
  customerMobilePhone?: string;
}

// 결제 승인 요청 타입
export interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

// Toss Payments SDK 로드
export const loadTossPayments = async () => {
  if (!TOSS_CLIENT_KEY) {
    throw new Error('Toss Payments Client Key가 설정되지 않았습니다.');
  }

  try {
    const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk');
    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
    return tossPayments;
  } catch (error) {
    console.error('Toss Payments SDK 로드 오류:', error);
    throw new Error('결제 시스템을 불러오는 중 오류가 발생했습니다.');
  }
};

// 결제 승인 API 호출 (서버 사이드)
export const confirmPayment = async (confirmRequest: PaymentConfirmRequest) => {
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(confirmRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || '결제 승인 실패');
  }

  return response.json();
};
