'use client';

import { useState } from 'react';

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-20240125-001',
      user: '홍길동',
      product: '프리미엄 플랜',
      amount: 99000,
      date: '2024-01-25',
      status: 'completed',
    },
    {
      id: 2,
      orderNumber: 'ORD-20240124-002',
      user: '김철수',
      product: '기본 플랜',
      amount: 49000,
      date: '2024-01-24',
      status: 'pending',
    },
    {
      id: 3,
      orderNumber: 'ORD-20240123-003',
      user: '이영희',
      product: '엔터프라이즈',
      amount: 299000,
      date: '2024-01-23',
      status: 'shipping',
    },
  ];

  const statusLabels: Record<string, string> = {
    pending: '대기',
    paid: '결제완료',
    shipping: '배송중',
    completed: '완료',
    cancelled: '취소',
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-900 text-yellow-400',
    paid: 'bg-blue-900 text-blue-400',
    shipping: 'bg-purple-900 text-purple-400',
    completed: 'bg-green-900 text-green-400',
    cancelled: 'bg-red-900 text-red-400',
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">주문 관리</h1>
          <p className="text-gray-400">전체 {orders.length}건</p>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
        >
          <option value="all">전체 상태</option>
          <option value="pending">대기</option>
          <option value="paid">결제완료</option>
          <option value="shipping">배송중</option>
          <option value="completed">완료</option>
          <option value="cancelled">취소</option>
        </select>
      </div>

      {/* 주문 테이블 */}
      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">주문번호</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">고객</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">상품</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">금액</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">주문일</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">상태</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">액션</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-6 py-4 text-white font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-400">{order.user}</td>
                  <td className="px-6 py-4 text-gray-400">{order.product}</td>
                  <td className="px-6 py-4 text-white">{order.amount.toLocaleString()}원</td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-xs ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm border border-gray-800">
                        상세
                      </button>
                      <button className="px-3 py-1 bg-red-900 text-red-400 rounded hover:bg-red-800 text-sm border border-red-800">
                        취소
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