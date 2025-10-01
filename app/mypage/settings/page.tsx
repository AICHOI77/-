'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailOrder: true,
    emailMarketing: false,
    smsOrder: true,
    pushNotif: false,
  });

  const [privacy, setPrivacy] = useState({
    personalInfo: true,
    marketing: false,
    thirdParty: false,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">설정</h1>
        <p className="text-gray-400">알림 및 개인정보 설정을 관리합니다</p>
      </div>

      {/* 알림 설정 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">알림 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">주문 이메일 알림</p>
              <p className="text-sm text-gray-400">주문 및 배송 정보를 이메일로 받습니다</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailOrder}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  emailOrder: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">마케팅 이메일</p>
              <p className="text-sm text-gray-400">프로모션 및 이벤트 정보를 받습니다</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailMarketing}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  emailMarketing: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">SMS 알림</p>
              <p className="text-sm text-gray-400">주문 상태를 SMS로 받습니다</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.smsOrder}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  smsOrder: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium mb-1">푸시 알림</p>
              <p className="text-sm text-gray-400">앱 푸시 알림을 받습니다</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.pushNotif}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  pushNotif: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* 개인정보 설정 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">개인정보 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">개인정보 처리방침 동의</p>
              <p className="text-sm text-gray-400">필수 항목</p>
            </div>
            <span className="text-green-500">동의</span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">마케팅 정보 수신 동의</p>
              <p className="text-sm text-gray-400">선택 항목</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.marketing}
              onChange={(e) =>
                setPrivacy({
                  ...privacy,
                  marketing: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium mb-1">제3자 정보제공 동의</p>
              <p className="text-sm text-gray-400">선택 항목</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.thirdParty}
              onChange={(e) =>
                setPrivacy({
                  ...privacy,
                  thirdParty: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* 계정 관리 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">계정 관리</h2>
        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors border border-gray-800 text-left">
            비밀번호 변경
          </button>
          <button className="w-full px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors border border-gray-800 text-left">
            이메일 변경
          </button>
          <button className="w-full px-6 py-3 bg-red-900 text-red-400 rounded hover:bg-red-800 transition-colors border border-red-800 text-left">
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}