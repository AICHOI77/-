'use client';

import { useState } from 'react';

export default function OrdersPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-20240125-001',
      orderDate: '2024-01-25',
      status: 'delivered',
      productName: '프리미엄 플랜',
      quantity: 1,
      price: 99000,
    },
    {
      id: '2',
      orderNumber: 'ORD-20240120-002',
      orderDate: '2024-01-20',
      status: 'shipping',
      productName: '기본 플랜',
      quantity: 1,
      price: 49000,
    },
  ];

  const statusLabels: Record<string, string> = {
    paid: '결제완료',
    shipping: '배송중',
    delivered: '배송완료',
    cancelled: '취소',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">주문내역</h1>
        <p className="text-gray-400">주문 및 배송 정보를 확인하세요</p>
      </div>

      {/* 필터 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              기간
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            >
              <option value="1month">1개월</option>
              <option value="3months">3개월</option>
              <option value="6months">6개월</option>
              <option value="1year">1년</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              상태
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            >
              <option value="all">전체</option>
              <option value="paid">결제완료</option>
              <option value="shipping">배송중</option>
              <option value="delivered">배송완료</option>
              <option value="cancelled">취소</option>
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-black border border-gray-800 rounded-lg p-6 hover:border-red-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">
                  주문번호: {order.orderNumber}
                </p>
                <p className="text-sm text-gray-400">
                  주문일: {order.orderDate}
                </p>
              </div>
              <span
                className={`text-sm px-4 py-2 rounded ${
                  order.status === 'delivered'
                    ? 'bg-green-900 text-green-400'
                    : order.status === 'shipping'
                    ? 'bg-blue-900 text-blue-400'
                    : 'bg-gray-900 text-gray-400'
                }`}
              >
                {statusLabels[order.status]}
              </span>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white mb-1">
                    {order.productName}
                  </p>
                  <p className="text-sm text-gray-400">수량: {order.quantity}</p>
                </div>
                <p className="text-xl font-bold text-white">
                  {order.price.toLocaleString()}원
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors text-sm border border-gray-800">
                  상세보기
                </button>
                {order.status === 'delivered' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
                    리뷰 작성
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}