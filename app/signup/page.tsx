'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUser } from '@/lib/firestoreService';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      // Firebase Authentication으로 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 사용자 프로필 업데이트
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Firestore에 사용자 정보 저장
      await createUser(userCredential.user.uid, {
        uid: userCredential.user.uid,
        email: formData.email,
        displayName: formData.name,
        phoneNumber: formData.phone || undefined,
      });

      // 회원가입 성공 - 홈으로 이동
      router.push('/');
    } catch (error: any) {
      console.error('회원가입 오류:', error);

      // 에러 메시지 한글화
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('이미 사용 중인 이메일입니다.');
          break;
        case 'auth/invalid-email':
          setError('유효하지 않은 이메일 형식입니다.');
          break;
        case 'auth/weak-password':
          setError('비밀번호가 너무 약합니다.');
          break;
        default:
          setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-red-600">자영업킹</span> 회원가입
          </h1>
          <p className="text-gray-400">AI 기반 매출 증대 솔루션을 시작하세요</p>
        </div>

        <div className="glass rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이름 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                placeholder="홍길동"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                이메일 <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                전화번호
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                placeholder="010-1234-5678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호 <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                placeholder="최소 6자 이상"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호 확인 <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded focus:border-red-600 focus:outline-none text-white"
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-red-600 hover:text-red-500 font-medium">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
