'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '홍길동',
    phone: '010-1234-5678',
    birthDate: '1990-01-01',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('정보가 수정되었습니다.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">내 정보</h1>
        <p className="text-gray-400">개인정보를 관리합니다</p>
      </div>

      {/* 기본 정보 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">기본 정보</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              전화번호
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              생년월일
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
          >
            저장하기
          </button>
        </form>
      </div>

      {/* 계정 정보 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">계정 정보</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              이메일
            </label>
            <input
              type="email"
              value="hong@example.com"
              disabled
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              비밀번호
            </label>
            <button className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors border border-gray-800">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}