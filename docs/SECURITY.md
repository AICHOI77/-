# 보안 설정 가이드

## 환경 변수 관리

### 중요 사항
⚠️ **절대 공개 저장소에 실제 API 키를 커밋하지 마세요!**

모든 민감한 인증 정보는 환경 변수로 관리되며, `.env.local` 파일은 `.gitignore`에 포함되어 있습니다.

---

## 환경 변수 설정 방법

### 1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 실제 값을 입력하세요:

```bash
cp .env.example .env.local
```

### 2. Firebase 설정

[Firebase Console](https://console.firebase.google.com/)에서:

1. 프로젝트 생성 또는 선택
2. 프로젝트 설정 → 일반 → 내 앱 → 웹 앱 추가
3. Firebase SDK 구성 값 복사
4. `.env.local` 파일에 다음 값 입력:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=실제_API_키
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=프로젝트ID.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=프로젝트ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=프로젝트ID.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=메시징_발신자_ID
NEXT_PUBLIC_FIREBASE_APP_ID=앱_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=측정_ID
```

### 3. Toss Payments 설정

[토스페이먼츠 개발자센터](https://developers.tosspayments.com/)에서:

1. 회원가입/로그인
2. 내 개발정보 → 테스트/라이브 키 확인
3. `.env.local` 파일에 다음 값 입력:

```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=클라이언트_키
TOSS_SECRET_KEY=시크릿_키
```

**참고:**
- 개발/테스트: `test_ck_...`, `test_sk_...` 사용
- 프로덕션: `live_ck_...`, `live_sk_...` 사용

---

## 환경 변수 타입

### Public (클라이언트 노출)
`NEXT_PUBLIC_` 접두사가 있는 변수는 브라우저에서 접근 가능합니다:
- `NEXT_PUBLIC_FIREBASE_*`: Firebase 클라이언트 SDK용
- `NEXT_PUBLIC_TOSS_CLIENT_KEY`: Toss Payments 결제창용

### Private (서버 전용)
접두사가 없는 변수는 서버 사이드에서만 사용:
- `TOSS_SECRET_KEY`: 결제 승인 API용 (절대 클라이언트 노출 금지)

---

## Git 커밋 전 체크리스트

### ✅ 커밋 전 반드시 확인
```bash
# .env.local이 gitignore에 포함되어 있는지 확인
cat .gitignore | grep ".env*.local"

# 소스 코드에 하드코딩된 키가 없는지 확인
grep -r "AIzaSy" --exclude-dir=node_modules --exclude-dir=.next .
grep -r "test_ck_" --exclude-dir=node_modules --exclude-dir=.next .
grep -r "test_sk_" --exclude-dir=node_modules --exclude-dir=.next .
```

### ❌ 절대 커밋하지 말아야 할 파일
- `.env.local`
- `.env.production.local`
- `.env.development.local`
- 실제 API 키가 포함된 모든 파일

### ✅ 커밋해도 되는 파일
- `.env.example` (예시 템플릿, 실제 값 없음)
- 환경 변수를 사용하는 코드 (`process.env.*`)

---

## 배포 환경 설정

### Vercel
1. 프로젝트 설정 → Environment Variables
2. `.env.local`의 모든 변수를 추가
3. Production/Preview/Development 환경별로 설정

### 다른 호스팅
각 플랫폼의 환경 변수 설정 방법을 참고하여 동일하게 설정

---

## Firebase 보안 규칙

### Firestore 보안 규칙
Firebase Console → Firestore Database → Rules에서 설정:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users 컬렉션
    match /users/{userId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Payments 컬렉션
    match /payments/{paymentId} {
      allow read: if request.auth != null &&
                  resource.data.userId == request.auth.uid;
      allow create: if request.auth != null &&
                    request.resource.data.userId == request.auth.uid;
      allow update, delete: if false; // 결제 내역은 수정/삭제 불가
    }

    // Reviews 컬렉션
    match /reviews/{reviewId} {
      allow read: if true; // 모든 사용자가 조회 가능
      allow create: if request.auth != null &&
                    request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null &&
                            resource.data.userId == request.auth.uid;
    }

    // Success Stories 컬렉션
    match /successStories/{storyId} {
      allow read: if true; // 모든 사용자가 조회 가능
      allow write: if false; // 관리자만 가능 (향후 구현)
    }
  }
}
```

### Storage 보안 규칙
Firebase Console → Storage → Rules에서 설정:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Success Stories 이미지
    match /success-stories/{storyId}/{allPaths=**} {
      allow read: if true; // 모든 사용자가 읽기 가능
      allow write: if false; // 관리자만 가능 (향후 구현)
    }
  }
}
```

---

## 보안 모범 사례

### 1. API 키 보호
- ✅ 환경 변수 사용
- ✅ `.env.local` 파일은 `.gitignore`에 포함
- ✅ `.env.example`로 템플릿 제공
- ❌ 소스 코드에 하드코딩 금지
- ❌ 공개 저장소에 커밋 금지

### 2. Firebase 설정
- ✅ Firestore 보안 규칙 설정
- ✅ Storage 보안 규칙 설정
- ✅ Authentication 이메일 인증 활성화
- ✅ 프로덕션에서는 도메인 제한 설정

### 3. Toss Payments
- ✅ 테스트/라이브 키 분리
- ✅ Secret Key는 서버 사이드에서만 사용
- ✅ Client Key만 클라이언트에 노출
- ✅ Webhook URL 설정으로 결제 검증

### 4. 정기적인 보안 점검
- 분기별 API 키 교체 (프로덕션)
- 로그 모니터링으로 이상 활동 감지
- 의존성 보안 업데이트 (`npm audit`)

---

## 문제 해결

### Q: 실수로 API 키를 커밋했어요!
**A:** 즉시 다음 조치를 취하세요:
1. Firebase/Toss Payments에서 해당 키를 즉시 비활성화
2. 새로운 키 발급
3. `.env.local` 업데이트
4. Git 히스토리에서 키 제거:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   ```
5. 강제 푸시 (협업 시 팀원에게 알림):
   ```bash
   git push origin --force --all
   ```

### Q: 환경 변수가 적용되지 않아요
**A:** 다음을 확인하세요:
1. `.env.local` 파일이 프로젝트 루트에 있는지
2. 개발 서버를 재시작했는지 (`npm run dev` 다시 실행)
3. 변수명에 오타가 없는지
4. `NEXT_PUBLIC_` 접두사가 필요한 경우 올바르게 사용했는지

### Q: 배포 후 환경 변수가 작동하지 않아요
**A:** 호스팅 플랫폼의 환경 변수 설정을 확인하세요:
- 모든 변수가 올바르게 입력되었는지
- Production 환경에 적용되었는지
- 배포 후 재빌드가 필요할 수 있음

---

**최종 업데이트:** 2025년 10월 1일
