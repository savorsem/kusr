import { Users, BookOpen, Activity, CheckSquare } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Админ-панель KRAUZ</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs">Всего учеников</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,248</p>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-green-500 mb-2">
            <Activity className="w-4 h-4" />
            <span className="text-xs text-gray-500">Активны сегодня</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">142</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <CheckSquare className="w-4 h-4" />
            <span className="text-xs text-gray-500">Ждут проверки</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">15</p>
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs text-gray-500">Ср. прогресс</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">42%</p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4">Последние проверки AI</h2>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-1">
              <span className="font-bold text-sm">Ученик #{1000 + i}</span>
              <span className="text-xs text-gray-400">2 мин назад</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">
              Сдал задание к Модулю {i}. Результат: <span className="text-green-600 font-bold">Одобрено</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
