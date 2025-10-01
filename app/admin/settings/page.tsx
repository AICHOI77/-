'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: '자영업킹',
    siteEmail: 'admin@salesking.com',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
  });

  const handleSave = () => {
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">시스템 설정</h1>
        <p className="text-gray-400">관리자 시스템 설정</p>
      </div>

      {/* 기본 설정 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">기본 설정</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              사이트 이름
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              관리자 이메일
            </label>
            <input
              type="email"
              value={settings.siteEmail}
              onChange={(e) =>
                setSettings({ ...settings, siteEmail: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded text-white focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 시스템 설정 */}
      <div className="bg-black border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">시스템 설정</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">유지보수 모드</p>
              <p className="text-sm text-gray-400">사이트를 임시로 비활성화합니다</p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maintenanceMode: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div>
              <p className="text-white font-medium mb-1">회원가입 허용</p>
              <p className="text-sm text-gray-400">새로운 회원가입을 허용합니다</p>
            </div>
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowRegistration: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium mb-1">이메일 알림</p>
              <p className="text-sm text-gray-400">시스템 이메일 알림을 활성화합니다</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  emailNotifications: e.target.checked,
                })
              }
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
        >
          설정 저장
        </button>
      </div>
    </div>
  );
}