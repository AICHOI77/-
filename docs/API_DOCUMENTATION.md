# API 문서

## API 라우트

### 결제 승인 API

**경로:** `POST /api/payments/confirm`

#### 설명
Toss Payments 결제 승인을 처리하는 서버 사이드 API입니다. 클라이언트에서 결제 완료 후 이 API를 호출하여 최종 승인을 받습니다.

#### 요청

**Headers:**
```
Content-Type: application/json
```

**Body:**
```typescript
{
  paymentKey: string;    // Toss Payments에서 제공한 결제 키
  orderId: string;       // 주문 ID (UUID)
  amount: number;        // 결제 금액 (원)
}
```

**예시:**
```json
{
  "paymentKey": "tgen_2024100112345678901234567890",
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 99000
}
```

#### 응답

**성공 (200 OK):**
```typescript
{
  // Toss Payments API 응답 데이터
  paymentKey: string;
  orderId: string;
  status: string;
  totalAmount: number;
  method: string;
  approvedAt: string;
  // ... 기타 Toss Payments 필드
}
```

**예시:**
```json
{
  "paymentKey": "tgen_2024100112345678901234567890",
  "orderId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "DONE",
  "totalAmount": 99000,
  "method": "카드",
  "approvedAt": "2025-10-01T10:30:00+09:00",
  "card": {
    "company": "신한",
    "number": "1234-56**-****-7890"
  }
}
```

**실패 (400 Bad Request):**
```json
{
  "message": "결제 승인 실패: 에러 메시지"
}
```

**실패 (500 Internal Server Error):**
```json
{
  "message": "결제 승인 중 오류가 발생했습니다."
}
```

#### 에러 처리

| 에러 코드 | 설명 | 대응 방법 |
|-----------|------|-----------|
| `ALREADY_PROCESSED_PAYMENT` | 이미 처리된 결제 | 결제 상태 확인 후 적절한 안내 |
| `PROVIDER_ERROR` | 카드사 승인 실패 | 다른 카드로 재시도 안내 |
| `EXCEED_MAX_CARD_INSTALLMENT_PLAN` | 할부 개월 수 초과 | 할부 개월 수 조정 |
| `INVALID_REQUEST` | 잘못된 요청 | 파라미터 확인 |
| `NOT_ALLOWED_POINT_USE` | 포인트 사용 불가 | 포인트 사용 옵션 제거 |

#### 구현 예시

**클라이언트 (결제 성공 페이지):**
```typescript
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
  throw new Error(error.message);
}

const paymentData = await response.json();
console.log('결제 승인 완료:', paymentData);
```

**서버 ([app/api/payments/confirm/route.ts](../app/api/payments/confirm/route.ts)):**
```typescript
export async function POST(request: Request) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    // Toss Payments API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: `결제 승인 실패: ${error.message}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('결제 승인 오류:', error);
    return NextResponse.json(
      { message: '결제 승인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
```

---

## Firestore 서비스 함수

### User 관련

#### createUser
```typescript
createUser(userId: string, userData: Partial<User>): Promise<void>
```
새로운 사용자를 Firestore에 저장합니다.

**파라미터:**
- `userId`: Firebase Auth UID
- `userData`: 사용자 정보 (email, displayName, phoneNumber 등)

**예시:**
```typescript
await createUser(user.uid, {
  uid: user.uid,
  email: 'user@example.com',
  displayName: '홍길동',
  phoneNumber: '010-1234-5678',
});
```

#### getUser
```typescript
getUser(userId: string): Promise<User | null>
```
특정 사용자 정보를 조회합니다.

#### updateUser
```typescript
updateUser(userId: string, updates: Partial<User>): Promise<void>
```
사용자 정보를 업데이트합니다.

#### deleteUser
```typescript
deleteUser(userId: string): Promise<void>
```
사용자 정보를 삭제합니다.

---

### Payment 관련

#### createPayment
```typescript
createPayment(paymentData: Omit<Payment, 'id'>): Promise<string>
```
새로운 결제 내역을 생성합니다.

**파라미터:**
```typescript
{
  userId: string;
  orderId: string;
  paymentKey: string;
  amount: number;
  orderName: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentData?: any;
  createdAt: Timestamp;
}
```

**반환값:** 생성된 결제 문서 ID

**예시:**
```typescript
const paymentId = await createPayment({
  userId: user.uid,
  orderId: 'ORDER-12345',
  paymentKey: 'tgen_xxx',
  amount: 99000,
  orderName: '프리미엄 플랜',
  status: 'completed',
  paymentData: tossPaymentData,
  createdAt: serverTimestamp() as any,
});
```

#### getPayment
```typescript
getPayment(paymentId: string): Promise<Payment | null>
```
특정 결제 내역을 조회합니다.

#### getUserPayments
```typescript
getUserPayments(userId: string): Promise<Payment[]>
```
특정 사용자의 모든 결제 내역을 조회합니다 (최신순).

**예시:**
```typescript
const payments = await getUserPayments(user.uid);
console.log(`총 ${payments.length}건의 결제`);
```

#### updatePaymentStatus
```typescript
updatePaymentStatus(
  paymentId: string,
  status: Payment['status'],
  paymentData?: any
): Promise<void>
```
결제 상태를 업데이트합니다.

---

### Review 관련

#### createReview
```typescript
createReview(reviewData: Omit<Review, 'id'>): Promise<string>
```
새로운 리뷰를 생성합니다.

**파라미터:**
```typescript
{
  userId: string;
  userName: string;
  rating: number;      // 1-5
  title: string;
  content: string;
  createdAt: Timestamp;
}
```

**예시:**
```typescript
await createReview({
  userId: user.uid,
  userName: user.displayName || '익명',
  rating: 5,
  title: '매출이 2배 늘었어요!',
  content: '자영업킹 덕분에 매장 관리가 편해졌습니다.',
  createdAt: serverTimestamp() as any,
});
```

#### getReview
```typescript
getReview(reviewId: string): Promise<Review | null>
```
특정 리뷰를 조회합니다.

#### getAllReviews
```typescript
getAllReviews(limitCount: number = 10): Promise<Review[]>
```
모든 리뷰를 조회합니다 (최신순, 제한 개수).

#### updateReview
```typescript
updateReview(reviewId: string, updates: Partial<Review>): Promise<void>
```
리뷰를 수정합니다.

#### deleteReview
```typescript
deleteReview(reviewId: string): Promise<void>
```
리뷰를 삭제합니다.

---

### Success Story 관련

#### uploadSuccessStoryImage
```typescript
uploadSuccessStoryImage(file: File, storyId: string): Promise<string>
```
성공사례 이미지를 Firebase Storage에 업로드합니다.

**파라미터:**
- `file`: 업로드할 이미지 파일
- `storyId`: 성공사례 ID

**반환값:** 이미지 다운로드 URL

**예시:**
```typescript
const imageUrl = await uploadSuccessStoryImage(imageFile, 'story-001');
```

#### deleteSuccessStoryImage
```typescript
deleteSuccessStoryImage(imageUrl: string): Promise<void>
```
Firebase Storage에서 이미지를 삭제합니다.

#### createSuccessStory
```typescript
createSuccessStory(storyData: Omit<SuccessStory, 'id'>): Promise<string>
```
새로운 성공사례를 생성합니다.

**파라미터:**
```typescript
{
  companyName: string;
  industry: string;
  description: string;
  detailedStory: string;
  imageUrl: string;
  results: {
    salesIncrease?: string;
    customerIncrease?: string;
    efficiencyGain?: string;
  };
  featured: boolean;
  createdAt: Timestamp;
}
```

#### getSuccessStory
```typescript
getSuccessStory(storyId: string): Promise<SuccessStory | null>
```
특정 성공사례를 조회합니다.

#### getAllSuccessStories
```typescript
getAllSuccessStories(limitCount: number = 20): Promise<SuccessStory[]>
```
모든 성공사례를 조회합니다.

#### getFeaturedSuccessStories
```typescript
getFeaturedSuccessStories(): Promise<SuccessStory[]>
```
추천 성공사례만 조회합니다.

#### updateSuccessStory
```typescript
updateSuccessStory(storyId: string, updates: Partial<SuccessStory>): Promise<void>
```
성공사례를 수정합니다.

#### deleteSuccessStory
```typescript
deleteSuccessStory(storyId: string): Promise<void>
```
성공사례를 삭제합니다 (이미지도 함께 삭제).

---

## Toss Payments SDK

### loadTossPayments
```typescript
loadTossPayments(): Promise<TossPaymentsInstance>
```
Toss Payments SDK를 로드합니다.

**예시:**
```typescript
const tossPayments = await loadTossPayments();
const payment = tossPayments.payment({ customerKey: user.uid });
```

### requestPayment
```typescript
payment.requestPayment(options: PaymentRequest): Promise<void>
```
결제창을 호출합니다.

**파라미터:**
```typescript
{
  method: 'CARD' | 'TRANSFER' | 'VIRTUAL_ACCOUNT' | 'MOBILE_PHONE' | 'CULTURE_GIFT_CERTIFICATE' | 'BOOK_CULTURE_GIFT_CERTIFICATE' | 'GAME_CULTURE_GIFT_CERTIFICATE';
  amount: {
    currency: 'KRW';
    value: number;
  };
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail?: string;
  customerName?: string;
  customerMobilePhone?: string;
}
```

**예시:**
```typescript
await payment.requestPayment({
  method: 'CARD',
  amount: { currency: 'KRW', value: 99000 },
  orderId: 'ORDER-12345',
  orderName: '프리미엄 플랜',
  successUrl: 'https://example.com/payment/success',
  failUrl: 'https://example.com/payment/fail',
  customerName: '홍길동',
  customerEmail: 'user@example.com',
});
```

---

## Firebase Authentication

### createUserWithEmailAndPassword
```typescript
createUserWithEmailAndPassword(
  auth: Auth,
  email: string,
  password: string
): Promise<UserCredential>
```
이메일/비밀번호로 회원가입합니다.

### signInWithEmailAndPassword
```typescript
signInWithEmailAndPassword(
  auth: Auth,
  email: string,
  password: string
): Promise<UserCredential>
```
이메일/비밀번호로 로그인합니다.

### signOut
```typescript
signOut(auth: Auth): Promise<void>
```
로그아웃합니다.

### onAuthStateChanged
```typescript
onAuthStateChanged(
  auth: Auth,
  callback: (user: User | null) => void
): Unsubscribe
```
인증 상태 변화를 감지합니다.

---

## 에러 처리 가이드

### Firebase Auth 에러
```typescript
try {
  await createUserWithEmailAndPassword(auth, email, password);
} catch (error: any) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      alert('이미 사용 중인 이메일입니다.');
      break;
    case 'auth/invalid-email':
      alert('유효하지 않은 이메일입니다.');
      break;
    case 'auth/weak-password':
      alert('비밀번호는 6자 이상이어야 합니다.');
      break;
    default:
      alert('회원가입 중 오류가 발생했습니다.');
  }
}
```

### Firestore 에러
```typescript
try {
  await createPayment(paymentData);
} catch (error) {
  console.error('결제 내역 저장 실패:', error);
  alert('결제 정보를 저장하는 중 오류가 발생했습니다.');
}
```

### Toss Payments 에러
```typescript
try {
  await payment.requestPayment(options);
} catch (error: any) {
  if (error.code === 'USER_CANCEL') {
    alert('결제가 취소되었습니다.');
  } else if (error.code === 'INVALID_CARD') {
    alert('유효하지 않은 카드입니다.');
  } else {
    alert('결제 중 오류가 발생했습니다.');
  }
}
```

---

**최종 업데이트:** 2025년 10월 1일
