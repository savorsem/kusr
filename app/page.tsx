import { ModuleCard } from '@/components/ui/ModuleCard';

export default function Home() {
  // Mock data generation
  const modules = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Модуль ${i + 1}`,
    description: `Изучение темы уровня ${i + 1}. Практические задания и тесты.`,
    isLocked: i > 2, // Mocking that user is on level 3
    isCompleted: i < 2
  }));

  return (
    <div className="px-4 pt-6 pb-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Школа KRAUZ</h1>
        <p className="text-gray-500">Добро пожаловать назад! Твой уровень: 3</p>
        
        {/* Progress Bar Mock */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '12%' }}></div>
        </div>
        <p className="text-xs text-right mt-1 text-gray-400">3 из 25 модулей</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <ModuleCard 
            key={mod.id}
            {...mod}
          />
        ))}
      </div>
    </div>
  );
}