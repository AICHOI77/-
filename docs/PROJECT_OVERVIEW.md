# 자영업킹 (Sales Boost Platform) - 프로젝트 개요

## 📋 프로젝트 정보

**프로젝트명:** 자영업킹 - 자영업자 매출 증대 플랫폼
**기술 스택:** Next.js 15.0.3, TypeScript, Firebase, Toss Payments
**테마:** Netflix 스타일 (Black #000000 + Red #e50914)
**개발 시작일:** 2025년 10월 1일

---

## 🎯 프로젝트 목표

AI 기반 데이터 분석과 추천 시스템으로 자영업자의 매출을 증대시키는 SaaS 플랫폼

---

## 🏗️ 기술 스택

### Frontend
- **Framework:** Next.js 15.0.3 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **3D Graphics:** Spline (@splinetool/react-spline)
- **Animations:** Framer Motion

### Backend & Services
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Storage:** Firebase Storage
- **Analytics:** Firebase Analytics
- **Payment:** Toss Payments SDK

### Development Tools
- **Package Manager:** npm
- **Dev Server:** Turbopack (Next.js)
- **Version Control:** Git

---

## 📁 프로젝트 구조

```
/Users/wol10/0930 mvp/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈페이지
│   ├── about/                    # 회사소개
│   ├── products/                 # 상품 목록 및 상세
│   ├── success-stories/          # 성공사례
│   ├── login/                    # 로그인
│   ├── signup/                   # 회원가입
│   ├── payment/                  # 결제
│   ├── dashboard/                # 사용자 대시보드
│   ├── reviews/                  # 리뷰
│   ├── mypage/                   # 마이페이지
│   ├── api/                      # API Routes
│   │   └── payments/confirm/     # 결제 승인 API
│   └── globals.css               # 글로벌 스타일
│
├── components/                   # React 컴포넌트
│   ├── Header.tsx                # 네비게이션 헤더
│   ├── Footer.tsx                # 푸터
│   ├── HeroSection.tsx           # 히어로 섹션
│   ├── FeaturesSection.tsx       # 기능 소개
│   ├── SplineSceneBasic.tsx      # 3D Scene 컴포넌트
│   └── ui/                       # UI 컴포넌트
│       ├── card.tsx              # Card 컴포넌트
│       ├── spotlight.tsx         # Spotlight 효과
│       └── splite.tsx            # Spline Scene 래퍼
│
├── contexts/                     # React Context
│   └── AuthContext.tsx           # 인증 컨텍스트
│
├── lib/                          # 유틸리티 & 서비스
│   ├── firebase.ts               # Firebase 초기화
│   ├── firestoreService.ts       # Firestore CRUD
│   ├── tossPayments.ts           # Toss Payments 설정
│   ├── successStoryService.ts    # 성공사례 서비스
│   └── utils.ts                  # 유틸리티 함수 (cn)
│
├── public/                       # 정적 파일
│   └── image.png                 # 로고 이미지
│
├── docs/                         # 프로젝트 문서
│   ├── PROJECT_OVERVIEW.md       # 프로젝트 개요
│   ├── FEATURES.md               # 기능 명세
│   ├── DATABASE_SCHEMA.md        # 데이터베이스 스키마
│   └── API_DOCUMENTATION.md      # API 문서
│
├── .env.local                    # 환경 변수
├── package.json                  # 의존성 관리
├── tsconfig.json                 # TypeScript 설정
└── tailwind.config.ts            # Tailwind 설정
```

---

## 🔑 환경 변수

### Firebase Configuration
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyClv2Y-Ao1DRLX9Wf6GPJUXYW3_yvIyz-w
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-e46f6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-e46f6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-e46f6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=443398569273
NEXT_PUBLIC_FIREBASE_APP_ID=1:443398569273:web:93f30bdf179d0e7724fce8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ZB4M5C0ZYE
```

### Toss Payments Configuration
```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_XjExPeJWYVQQP429xmqV49R5gvNL
TOSS_SECRET_KEY=test_sk_7XZYkKL4MrjmEYnRjjkV0zJwlEWR
```

---

## 🚀 시작하기

### 설치
```bash
cd "/Users/wol10/0930 mvp"
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

서버 주소: http://localhost:3000

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

---

## 📦 주요 의존성

```json
{
  "dependencies": {
    "next": "15.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5",
    "firebase": "^11.0.2",
    "@tosspayments/tosspayments-sdk": "^2.4.0",
    "@tosspayments/integration-guide-mcp": "latest",
    "@splinetool/react-spline": "^4.0.0",
    "@splinetool/runtime": "^1.9.32",
    "framer-motion": "^11.11.17",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  }
}
```

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary:** #e50914 (Netflix Red)
- **Background:** #000000 (Pure Black)
- **Text Primary:** #ffffff (White)
- **Text Secondary:** #gray-400
- **Border:** #gray-800

### 타이포그래피
- **제목:** 5xl - 7xl, font-bold
- **본문:** base - xl, font-normal
- **소제목:** 2xl - 4xl, font-bold

### 컴포넌트 스타일
- **Glass Effect:** `bg-white/5 backdrop-blur-lg border border-white/10`
- **Hover Effect:** `hover:border-red-600 transition-all duration-300`
- **Button Primary:** `bg-red-600 hover:bg-red-700`

---

## 📱 주요 페이지

1. **홈 (/)** - 히어로 섹션, 기능 소개, 3D Scene
2. **회사소개 (/about)** - 회사 정보, 비전, 팀
3. **상품 (/products)** - 요금제 및 상품 목록
4. **상품 상세 (/products/[id])** - 상세 정보, 구매 버튼
5. **성공사례 (/success-stories)** - 고객 성공 스토리
6. **로그인 (/login)** - Firebase 인증
7. **회원가입 (/signup)** - 사용자 등록
8. **결제 (/payment)** - Toss Payments 연동
9. **대시보드 (/dashboard)** - 사용자 정보, 결제 내역
10. **리뷰 (/reviews)** - 리뷰 작성 및 조회

---

## 🔐 인증 시스템

### Firebase Authentication
- **이메일/비밀번호** 로그인
- **사용자 프로필** 관리
- **세션 관리** (AuthContext)

### 사용자 권한
- **user** - 일반 사용자
- **admin** - 관리자 (향후 구현)

---

## 💳 결제 시스템

### Toss Payments 연동
- **결제 수단:** 카드, 가상계좌, 계좌이체
- **결제 흐름:**
  1. 결제 페이지에서 정보 입력
  2. Firestore에 주문 정보 저장 (pending)
  3. Toss Payments 결제창 호출
  4. 결제 성공 → 승인 API 호출
  5. Firestore 주문 상태 업데이트 (completed)

---

## 📊 데이터베이스 구조

### Firestore Collections

#### users
- uid, email, displayName, phoneNumber
- createdAt, updatedAt
- subscription { plan, status, startDate, endDate }

#### payments
- userId, orderId, paymentKey
- amount, orderName, status
- paymentData, createdAt

#### reviews
- userId, userName, userPhotoURL
- rating, title, content
- createdAt, updatedAt

#### successStories
- title, companyName, industry
- description, content, imageUrl
- results { salesIncrease, customerIncrease }
- featured, createdAt, updatedAt

---

## 🎯 향후 계획

### Phase 1 (완료)
- ✅ 기본 페이지 구조
- ✅ Firebase 인증
- ✅ Toss Payments 결제
- ✅ 리뷰 시스템
- ✅ 성공사례

### Phase 2 (예정)
- ⏳ AI 매출 분석 대시보드
- ⏳ 실시간 데이터 시각화
- ⏳ 마케팅 도구 통합
- ⏳ 고객 관리 시스템

### Phase 3 (예정)
- ⏳ 모바일 앱 개발
- ⏳ API 공개
- ⏳ 다국어 지원
- ⏳ 관리자 대시보드

---

## 📞 연락처

**개발자:** [Your Name]
**이메일:** [Your Email]
**GitHub:** [Repository URL]

---

**최종 업데이트:** 2025년 10월 1일
