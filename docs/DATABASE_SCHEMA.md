# 데이터베이스 스키마

## Firestore 컬렉션 구조

### 1. users (사용자)

```typescript
interface User {
  uid: string;                    // Firebase Auth UID (Document ID)
  email: string;                  // 이메일 주소
  displayName: string;            // 사용자 이름
  phoneNumber?: string;           // 전화번호 (선택)
  createdAt: Timestamp;           // 가입일
  updatedAt: Timestamp;           // 최종 수정일
  photoURL?: string;              // 프로필 이미지 URL (선택)
}
```

**인덱스:**
- `email` (ASC) - 이메일 검색용
- `createdAt` (DESC) - 가입일순 정렬

**보안 규칙:**
```javascript
match /users/{userId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null && request.auth.uid == userId;
  allow update, delete: if request.auth != null && request.auth.uid == userId;
}
```

---

### 2. payments (결제 내역)

```typescript
interface Payment {
  id: string;                     // Document ID (자동 생성)
  userId: string;                 // 사용자 ID (users 컬렉션 참조)
  orderId: string;                // 주문 ID (UUID)
  paymentKey: string;             // Toss Payments 결제 키
  amount: number;                 // 결제 금액 (원)
  orderName: string;              // 주문명
  status: 'pending' | 'completed' | 'failed' | 'cancelled'; // 결제 상태
  paymentData?: any;              // Toss Payments 응답 데이터
  createdAt: Timestamp;           // 결제 생성일
  updatedAt?: Timestamp;          // 최종 수정일
}
```

**인덱스:**
- `userId` (ASC), `createdAt` (DESC) - 사용자별 결제 내역 조회
- `orderId` (ASC) - 주문 ID로 검색
- `status` (ASC), `createdAt` (DESC) - 상태별 정렬

**보안 규칙:**
```javascript
match /payments/{paymentId} {
  allow read: if request.auth != null &&
              resource.data.userId == request.auth.uid;
  allow create: if request.auth != null &&
                request.resource.data.userId == request.auth.uid;
  allow update, delete: if false; // 결제 내역은 수정/삭제 불가
}
```

**주요 쿼리:**
```typescript
// 사용자별 결제 내역 조회
const q = query(
  collection(db, 'payments'),
  where('userId', '==', userId),
  orderBy('createdAt', 'desc')
);

// 완료된 결제만 조회
const q = query(
  collection(db, 'payments'),
  where('userId', '==', userId),
  where('status', '==', 'completed'),
  orderBy('createdAt', 'desc')
);
```

---

### 3. reviews (리뷰)

```typescript
interface Review {
  id: string;                     // Document ID (자동 생성)
  userId: string;                 // 작성자 ID (users 컬렉션 참조)
  userName: string;               // 작성자 이름
  rating: number;                 // 평점 (1-5)
  title: string;                  // 리뷰 제목
  content: string;                // 리뷰 내용
  createdAt: Timestamp;           // 작성일
  updatedAt?: Timestamp;          // 수정일
}
```

**인덱스:**
- `userId` (ASC), `createdAt` (DESC) - 사용자별 리뷰 조회
- `rating` (DESC), `createdAt` (DESC) - 평점순 정렬
- `createdAt` (DESC) - 최신순 정렬

**보안 규칙:**
```javascript
match /reviews/{reviewId} {
  allow read: if true; // 모든 사용자가 조회 가능
  allow create: if request.auth != null &&
                request.resource.data.userId == request.auth.uid;
  allow update, delete: if request.auth != null &&
                        resource.data.userId == request.auth.uid;
}
```

**주요 쿼리:**
```typescript
// 최신 리뷰 조회
const q = query(
  collection(db, 'reviews'),
  orderBy('createdAt', 'desc'),
  limit(10)
);

// 평균 평점 계산
const reviews = await getAllReviews();
const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
```

---

### 4. successStories (성공사례)

```typescript
interface SuccessStory {
  id: string;                     // Document ID (자동 생성)
  companyName: string;            // 회사/상호명
  industry: string;               // 업종
  description: string;            // 간단한 설명
  detailedStory: string;          // 상세 스토리
  imageUrl: string;               // 이미지 URL (Firebase Storage)
  results: {                      // 성과 데이터
    salesIncrease?: string;       // 매출 증가율 (예: "150%")
    customerIncrease?: string;    // 고객 증가율
    efficiencyGain?: string;      // 효율 개선율
  };
  featured: boolean;              // 추천 사례 여부
  createdAt: Timestamp;           // 등록일
  updatedAt?: Timestamp;          // 수정일
}
```

**인덱스:**
- `industry` (ASC), `createdAt` (DESC) - 업종별 조회
- `featured` (DESC), `createdAt` (DESC) - 추천 사례 우선
- `createdAt` (DESC) - 최신순 정렬

**보안 규칙:**
```javascript
match /successStories/{storyId} {
  allow read: if true; // 모든 사용자가 조회 가능
  allow create, update, delete: if false; // 관리자만 가능 (향후 구현)
}
```

**주요 쿼리:**
```typescript
// 추천 사례 조회
const q = query(
  collection(db, 'successStories'),
  where('featured', '==', true),
  orderBy('createdAt', 'desc')
);

// 업종별 조회
const q = query(
  collection(db, 'successStories'),
  where('industry', '==', '음식점'),
  orderBy('createdAt', 'desc')
);
```

---

## Firebase Storage 구조

### 성공사례 이미지

```
success-stories/
  ├── {storyId}/
  │   ├── hero-image.jpg          // 메인 이미지
  │   ├── thumbnail.jpg           // 썸네일 (자동 생성 예정)
  │   └── gallery/                // 추가 이미지 (향후 구현)
  │       ├── image1.jpg
  │       └── image2.jpg
```

**스토리지 규칙:**
```javascript
match /success-stories/{storyId}/{allPaths=**} {
  allow read: if true;
  allow write: if false; // 관리자만 가능 (향후 구현)
}
```

---

## 데이터 관계도

```
users (1) ----< (N) payments
  │
  └----< (N) reviews

successStories (독립)
  └─ images (Storage)
```

---

## 향후 추가 예정 컬렉션

### admin (관리자)
```typescript
interface Admin {
  uid: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  permissions: string[];
  createdAt: Timestamp;
}
```

### subscriptions (구독)
```typescript
interface Subscription {
  id: string;
  userId: string;
  productId: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Timestamp;
  endDate: Timestamp;
  renewalDate?: Timestamp;
  paymentId: string;
}
```

### notifications (알림)
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'payment' | 'subscription' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}
```

---

## 데이터베이스 최적화 팁

### 인덱스 생성
Firebase Console → Firestore Database → Indexes에서 복합 인덱스 생성

**권장 복합 인덱스:**
1. `payments`: `userId` (ASC) + `status` (ASC) + `createdAt` (DESC)
2. `reviews`: `rating` (DESC) + `createdAt` (DESC)
3. `successStories`: `industry` (ASC) + `featured` (DESC) + `createdAt` (DESC)

### 쿼리 최적화
- `limit()` 사용으로 데이터 로드 제한
- 페이지네이션 구현으로 무한 스크롤 지원
- `where()` 조건을 인덱스 순서와 일치시키기

### 보안 규칙 테스트
Firebase Console → Firestore Database → Rules → Playground에서 테스트

---

**최종 업데이트:** 2025년 10월 1일
