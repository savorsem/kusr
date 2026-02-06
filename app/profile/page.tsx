'use client';

import { Settings, Bell, LogOut, Award } from 'lucide-react';

export default function ProfilePage() {
  // Mock User Data
  const user = {
    name: "Алексей Смирнов",
    username: "@alex_student",
    level: 3,
    xp: 450,
    completedModules: 2,
    totalModules: 25
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white p-6 pb-8 border-b border-gray-100 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-md">
            {user.name[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.username}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
              <Award className="w-3 h-3" />
              Уровень {user.level}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Мой прогресс</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Пройдено модулей</span>
                <span className="font-bold">{user.completedModules} из {user.totalModules}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${(user.completedModules / user.totalModules) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-900">Уведомления</span>
            </div>
            <div className="w-10 h-6 bg-green-500 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm" />
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-900">Настройки</span>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600">
            <div className="bg-red-50 p-2 rounded-lg">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </div>
    </div>
  );
}
