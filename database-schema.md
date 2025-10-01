# Firestore Database Schema

## Collections 구조

### 1. users (사용자)
```typescript
{
  uid: string;                    // Firebase Auth UID (문서 ID로 사용)
  email: string;                  // 이메일
  name: string;                   // 이름
  phone: string;                  // 전화번호
  birthdate?: string;             // 생년월일 (선택)
  role: 'user' | 'admin';        // 사용자 역할
  points: number;                 // 적립금
  createdAt: Timestamp;           // 가입일
  updatedAt: Timestamp;           // 수정일
  marketingConsent: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  isActive: boolean;              // 활성 상태
}
```

### 2. products (상품)
```typescript
{
  productId: string;              // 문서 ID
  name: string;                   // 상품명
  category: string;               // 카테고리 (basic|premium|enterprise)
  price: number;                  // 가격
  description: string;            // 설명
  features: string[];             // 기능 목록
  isActive: boolean;              // 판매 가능 여부
  stock: number;                  // 재고 수량
  salesCount: number;             // 판매 수량
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 3. orders (주문)
```typescript
{
  orderId: string;                // 문서 ID
  userId: string;                 // 사용자 UID
  productId: string;              // 상품 ID
  productName: string;            // 상품명 (스냅샷)
  price: number;                  // 결제 금액
  quantity: number;               // 수량
  totalAmount: number;            // 총 금액
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  paymentId?: string;             // 결제 ID (연결)
  createdAt: Timestamp;           // 주문 일시
  updatedAt: Timestamp;
  cancelledAt?: Timestamp;        // 취소 일시
}
```

### 4. payments (결제)
```typescript
{
  paymentId: string;              // 문서 ID
  orderId: string;                // 주문 ID
  userId: string;                 // 사용자 UID

  // 토스페이먼츠 정보
  paymentKey: string;             // 토스 결제 키
  orderName: string;              // 주문명
  method: string;                 // 결제 수단 (카드, 가상계좌 등)
  totalAmount: number;            // 결제 금액
  status: 'READY' | 'IN_PROGRESS' | 'DONE' | 'CANCELED' | 'FAILED';

  // 결제 상세 정보
  approvedAt?: Timestamp;         // 승인 일시
  canceledAt?: Timestamp;         // 취소 일시
  failReason?: string;            // 실패 사유

  // 메타데이터
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 5. reviews (리뷰)
```typescript
{
  reviewId: string;               // 문서 ID
  userId: string;                 // 작성자 UID
  orderId: string;                // 주문 ID
  productId: string;              // 상품 ID
  rating: number;                 // 평점 (1-5)
  comment: string;                // 리뷰 내용
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Firestore Indexes

### Composite Indexes (복합 인덱스)
```
orders:
  - userId (ASC) + createdAt (DESC)
  - status (ASC) + createdAt (DESC)
  - userId (ASC) + status (ASC) + createdAt (DESC)

payments:
  - userId (ASC) + createdAt (DESC)
  - status (ASC) + createdAt (DESC)

reviews:
  - productId (ASC) + createdAt (DESC)
  - userId (ASC) + createdAt (DESC)
```

## Security Rules 예시

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 사용자 컬렉션
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth.token.role == 'admin';
    }

    // 상품 컬렉션
    match /products/{productId} {
      allow read: if true;  // 모두 읽기 가능
      allow write: if request.auth.token.role == 'admin';
    }

    // 주문 컬렉션
    match /orders/{orderId} {
      allow read: if request.auth != null &&
                     (resource.data.userId == request.auth.uid ||
                      request.auth.token.role == 'admin');
      allow create: if request.auth != null &&
                       request.resource.data.userId == request.auth.uid;
      allow update: if request.auth.token.role == 'admin';
    }

    // 결제 컬렉션
    match /payments/{paymentId} {
      allow read: if request.auth != null &&
                     (resource.data.userId == request.auth.uid ||
                      request.auth.token.role == 'admin');
      allow create: if request.auth != null &&
                       request.resource.data.userId == request.auth.uid;
      allow update: if request.auth.token.role == 'admin';
    }

    // 리뷰 컬렉션
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null &&
                       request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null &&
                               resource.data.userId == request.auth.uid;
    }
  }
}
```

## 데이터 흐름

### 결제 프로세스
1. 사용자가 상품 선택 → `products` 조회
2. 주문 생성 → `orders` 문서 생성 (status: 'pending')
3. 토스페이먼츠 결제 요청 → `payments` 문서 생성 (status: 'READY')
4. 결제 승인 → `payments` 업데이트 (status: 'DONE')
5. 주문 완료 → `orders` 업데이트 (status: 'paid')
6. 상품 재고 차감 → `products` 업데이트 (stock -1, salesCount +1)

### 주문 조회
- 사용자: `orders` where userId == currentUser
- 관리자: `orders` 전체 조회 가능

### 통계 데이터
- 총 주문 수: `orders` count
- 총 매출: `payments` where status == 'DONE' sum(totalAmount)
- 상품별 판매: `products` orderBy salesCount DESC