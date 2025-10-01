# 자영업킹 (Self-employed King)

자영업자를 위한 매출 증대 플랫폼

## 🎯 프로젝트 개요

자영업킹은 소상공인과 자영업자들이 효율적으로 사업을 관리하고 매출을 증대시킬 수 있도록 돕는 올인원 SaaS 플랫폿입니다.

### 주요 기능
- ✅ **회원 관리**: Firebase Authentication 기반 이메일/비밀번호 인증
- ✅ **상품 소개**: 기본형, 프리미엄, 엔터프라이즈 플랜
- ✅ **결제 시스템**: Toss Payments 연동
- ✅ **리뷰 시스템**: 사용자 리뷰 작성 및 관리
- ✅ **성공사례**: Firebase Storage 기반 이미지 관리
- ✅ **대시보드**: 결제 내역 및 통계 확인
- ✅ **3D UI**: Spline 3D Scene 통합

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 15.0.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **3D Graphics**: Spline (@splinetool/react-spline)

### Backend & Database
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Analytics**: Firebase Analytics

### Payment
- **Gateway**: Toss Payments SDK v2.4.0

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Code Style**: Prettier

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd "0930 mvp"
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 실제 값을 입력하세요:

```bash
cp .env.example .env.local
```

`.env.local` 파일에 다음 값을 설정:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Toss Payments Configuration
NEXT_PUBLIC_TOSS_CLIENT_KEY=your_client_key
TOSS_SECRET_KEY=your_secret_key
```

자세한 설정 방법은 [docs/SECURITY.md](docs/SECURITY.md)를 참조하세요.

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 5. 프로덕션 빌드
```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
0930 mvp/
├── app/                      # Next.js App Router 페이지
│   ├── about/                # 회사소개 페이지
│   ├── admin/                # 관리자 페이지 (향후 구현)
│   ├── api/                  # API 라우트
│   │   └── payments/         # 결제 승인 API
│   ├── dashboard/            # 사용자 대시보드
│   ├── login/                # 로그인 페이지
│   ├── mypage/               # 마이페이지
│   ├── payment/              # 결제 페이지
│   │   ├── success/          # 결제 성공
│   │   └── fail/             # 결제 실패
│   ├── products/             # 상품 목록 및 상세
│   ├── reviews/              # 리뷰 페이지
│   ├── signup/               # 회원가입 페이지
│   ├── success-stories/      # 성공사례
│   ├── layout.tsx            # 루트 레이아웃
│   └── page.tsx              # 홈페이지
├── components/               # 재사용 가능한 컴포넌트
│   ├── ui/                   # shadcn/ui 컴포넌트
│   ├── Footer.tsx            # 푸터
│   ├── Header.tsx            # 헤더
│   └── Spotlight.tsx         # 스포트라이트 효과
├── contexts/                 # React Context
│   └── AuthContext.tsx       # 인증 상태 관리
├── lib/                      # 유틸리티 및 서비스
│   ├── firebase.ts           # Firebase 초기화
│   ├── firestoreService.ts   # Firestore CRUD 함수
│   ├── successStoryService.ts # 성공사례 서비스
│   ├── tossPayments.ts       # Toss Payments 설정
│   └── utils.ts              # 유틸리티 함수
├── public/                   # 정적 파일
│   ├── logo.png              # 로고 이미지
│   └── ...
├── docs/                     # 프로젝트 문서
│   ├── PROJECT_OVERVIEW.md   # 프로젝트 개요
│   ├── FEATURES.md           # 기능 명세서
│   ├── DATABASE_SCHEMA.md    # 데이터베이스 스키마
│   ├── API_DOCUMENTATION.md  # API 문서
│   └── SECURITY.md           # 보안 설정 가이드
├── .env.example              # 환경 변수 템플릿
├── .gitignore                # Git 제외 파일
├── next.config.ts            # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
└── package.json              # 프로젝트 의존성
```

## 📚 문서

- [프로젝트 개요](docs/PROJECT_OVERVIEW.md) - 전체 프로젝트 구조 및 아키텍처
- [기능 명세서](docs/FEATURES.md) - 상세 기능 설명
- [데이터베이스 스키마](docs/DATABASE_SCHEMA.md) - Firestore 컬렉션 구조
- [API 문서](docs/API_DOCUMENTATION.md) - API 엔드포인트 및 서비스 함수
- [보안 가이드](docs/SECURITY.md) - 환경 변수 및 보안 설정

## 🔐 보안

⚠️ **중요**: 절대 `.env.local` 파일을 Git에 커밋하지 마세요!

모든 민감한 API 키와 인증 정보는 환경 변수로 관리됩니다. 자세한 내용은 [docs/SECURITY.md](docs/SECURITY.md)를 참조하세요.

### 커밋 전 체크리스트
- [ ] `.env.local`이 `.gitignore`에 포함되어 있는지 확인
- [ ] 소스 코드에 하드코딩된 API 키가 없는지 확인
- [ ] `.env.example` 파일에 실제 값이 없는지 확인

## 🚀 배포

### Vercel 배포 (권장)
1. Vercel 계정에 프로젝트 연결
2. 환경 변수 설정 (Settings → Environment Variables)
3. 자동 배포 완료

### 다른 호스팅
각 플랫폼의 환경 변수 설정 방법에 따라 `.env.local`의 모든 변수를 설정하세요.

## 🧪 테스트

```bash
# 개발 모드에서 테스트
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm start
```

## 📝 개발 가이드

### 새로운 페이지 추가
1. `app/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 작성
3. 필요시 `layout.tsx` 추가

### 새로운 컴포넌트 추가
1. `components/` 디렉토리에 컴포넌트 파일 생성
2. TypeScript 타입 정의
3. 재사용 가능하도록 설계

### Firestore 데이터 추가
1. `lib/firestoreService.ts`에 서비스 함수 작성
2. 타입 정의 추가
3. 보안 규칙 설정

## 🎨 디자인 시스템

### 색상 팔레트 (Netflix 테마)
- **Primary**: Black (#000000)
- **Accent**: Red (#e50914)
- **Background**: Black
- **Text**: White / Gray

### 타이포그래피
- **Font Family**: system-ui, sans-serif
- **Headings**: Bold, large sizes
- **Body**: Regular, readable sizes

## 🔄 버전 관리

### Git 워크플로우
```bash
# 기능 브랜치 생성
git checkout -b feature/new-feature

# 변경사항 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 원격 저장소에 푸시
git push origin feature/new-feature
```

### 커밋 컨벤션
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드 설정 변경

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 📧 연락처

프로젝트 관련 문의: [이메일 주소]

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Toss Payments](https://www.tosspayments.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Spline](https://spline.design/)

---

**최종 업데이트:** 2025년 10월 1일
