'use client';

import { useState } from 'react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      phone: '010-1234-5678',
      joinDate: '2024-01-15',
      status: 'active',
      orders: 5,
    },
    {
      id: 2,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-2345-6789',
      joinDate: '2024-01-20',
      status: 'active',
      orders: 3,
    },
    {
      id: 3,
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-3456-7890',
      joinDate: '2024-01-10',
      status: 'inactive',
      orders: 0,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">사용자 관리</h1>
          <p className="text-gray-400">전체 {users.length}명</p>
        </div>
        <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
          사용자 추가
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="이름, 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
          >
            <option value="all">전체 상태</option>
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>
      </div>

      {/* 사용자 테이블 */}
      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  이름
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  이메일
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  전화번호
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  가입일
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  주문수
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  액션
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-6 py-4 text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-400">{user.joinDate}</td>
                  <td className="px-6 py-4 text-gray-400">{user.orders}건</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded text-xs ${
                        user.status === 'active'
                          ? 'bg-green-900 text-green-400'
                          : 'bg-gray-900 text-gray-400'
                      }`}
                    >
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm border border-gray-800">
                        상세
                      </button>
                      <button className="px-3 py-1 bg-red-900 text-red-400 rounded hover:bg-red-800 text-sm border border-red-800">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}