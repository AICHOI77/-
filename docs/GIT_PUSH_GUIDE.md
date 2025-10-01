# Git Push 가이드

## ✅ 보안 확인 완료

### 민감한 정보 보호 상태
- ✅ `.env.local` 파일이 `.gitignore`에 포함됨
- ✅ 소스 코드에 하드코딩된 API 키 없음 (0개)
- ✅ `.env.example` 파일에 템플릿만 포함 (실제 값 없음)
- ✅ Firebase 및 Toss Payments 키가 환경 변수로 관리됨

### 커밋 완료
```
f34016b feat: 자영업킹 플랫폼 초기 구현
```

---

## 🚀 GitHub에 푸시하기

### 1. GitHub에서 새 저장소 생성

[GitHub](https://github.com/new)에서:
1. Repository name: `자영업킹` 또는 원하는 이름
2. Public 또는 Private 선택
3. **중요**: "Add a README file" 체크 해제 (이미 README.md 존재)
4. **중요**: "Add .gitignore" 체크 해제 (이미 .gitignore 존재)
5. Create repository 클릭

### 2. 원격 저장소 연결 및 푸시

GitHub에서 제공하는 URL을 복사한 후:

```bash
# 원격 저장소 추가
git remote add origin https://github.com/your-username/your-repo-name.git

# 브랜치 이름을 main으로 설정 (이미 main이면 생략 가능)
git branch -M main

# 첫 푸시
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/wol10/자영업킹.git
git branch -M main
git push -u origin main
```

### 3. 푸시 완료 확인

브라우저에서 GitHub 저장소 페이지를 새로고침하여 파일들이 업로드되었는지 확인하세요.

---

## 🔐 배포 전 환경 변수 설정

### Vercel 배포

1. [Vercel](https://vercel.com)에 로그인
2. "Import Project" → GitHub 저장소 선택
3. **Environment Variables** 섹션에서 다음 값 추가:

```
NEXT_PUBLIC_FIREBASE_API_KEY=실제_값
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=실제_값
NEXT_PUBLIC_FIREBASE_PROJECT_ID=실제_값
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=실제_값
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=실제_값
NEXT_PUBLIC_FIREBASE_APP_ID=실제_값
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=실제_값
NEXT_PUBLIC_TOSS_CLIENT_KEY=실제_값
TOSS_SECRET_KEY=실제_값
```

4. Deploy 클릭

### 다른 호스팅 플랫폼

각 플랫폼의 환경 변수 설정 페이지에서 동일하게 설정하세요.

---

## 📝 향후 작업 시 Git 워크플로우

### 기능 개발
```bash
# 새 기능 브랜치 생성
git checkout -b feature/새기능이름

# 코드 작성 및 테스트
# ...

# 변경사항 커밋
git add .
git commit -m "feat: 새 기능 설명"

# GitHub에 푸시
git push origin feature/새기능이름

# GitHub에서 Pull Request 생성
```

### 버그 수정
```bash
git checkout -b fix/버그설명
# 수정 작업
git add .
git commit -m "fix: 버그 수정 내용"
git push origin fix/버그설명
```

### main 브랜치로 병합 후
```bash
git checkout main
git pull origin main
```

---

## ⚠️ 주의사항

### 절대 하지 말아야 할 것
- ❌ `.env.local` 파일을 커밋하지 마세요
- ❌ API 키를 직접 코드에 작성하지 마세요
- ❌ 공개 저장소에 민감한 정보를 올리지 마세요

### 만약 실수로 API 키를 푸시했다면
1. **즉시** Firebase Console과 Toss Payments에서 해당 키 비활성화
2. 새로운 키 발급
3. `.env.local` 업데이트
4. Git 히스토리에서 제거:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env.local" \
     --prune-empty --tag-name-filter cat -- --all
   git push origin --force --all
   ```

---

## 📚 추가 문서

- [README.md](../README.md) - 프로젝트 개요
- [SECURITY.md](./SECURITY.md) - 보안 설정 상세 가이드
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - 프로젝트 구조
- [FEATURES.md](./FEATURES.md) - 기능 명세서

---

**최종 업데이트:** 2025년 10월 1일

## ✅ 체크리스트

푸시하기 전 마지막 확인:
- [x] `.env.local`이 gitignore에 포함되어 있음
- [x] 소스 코드에 하드코딩된 키 없음
- [x] `.env.example` 파일에 실제 값 없음
- [x] 첫 번째 커밋 완료
- [ ] GitHub 저장소 생성
- [ ] 원격 저장소 연결
- [ ] git push 실행
- [ ] 배포 시 환경 변수 설정
