'use client';

import { useState } from 'react';

export default function AdminProductsPage() {
  const products = [
    { id: 1, name: '기본형', price: 49000, stock: 999, status: 'active', sales: 125 },
    { id: 2, name: '프리미엄', price: 99000, stock: 999, status: 'active', sales: 87 },
    { id: 3, name: '엔터프라이즈', price: 0, stock: 999, status: 'active', sales: 34 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">상품 관리</h1>
          <p className="text-gray-400">전체 {products.length}개</p>
        </div>
        <button className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
          상품 추가
        </button>
      </div>

      {/* 상품 테이블 */}
      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">상품명</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">가격</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">재고</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">판매량</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">상태</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">액션</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900">
                  <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {product.price === 0 ? '맞춤형' : `${product.price.toLocaleString()}원`}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-400">{product.sales}건</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-900 text-green-400 rounded text-xs">
                      판매중
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm border border-gray-800">
                        수정
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