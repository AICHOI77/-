'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-2xl">자</span>
            </div>
            <span className="text-2xl font-bold text-white">자영업킹</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">로그인</h1>
          <p className="text-gray-400">계정에 로그인하여 서비스를 이용하세요</p>
        </div>

        {/* 로그인 폼 */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-600/10 border border-red-600/50 rounded p-3 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <div className="text-sm text-gray-400">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="text-red-600 hover:text-red-500 font-medium">
                회원가입
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}