import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import { HomeworkForm } from '@/components/course/HomeworkForm';

export default async function ModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock content (In real app, fetch from Supabase by ID)
  const moduleData = {
    title: `Модуль ${id}: Продвинутые техники`,
    description: "В этом уроке мы разберем ключевые аспекты темы и закрепим их на практике.",
    videoDuration: "15:30",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-gray-100 px-4 py-3 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="font-bold text-lg text-gray-900 truncate">{moduleData.title}</h1>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {/* Video Placeholder */}
        <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg mb-8 relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <Play className="w-16 h-16 fill-white opacity-90 group-hover:scale-110 transition-transform z-10" />
          <span className="mt-4 font-medium z-10">Смотреть урок ({moduleData.videoDuration})</span>
        </div>

        {/* Lesson Content */}
        <div className="prose prose-blue prose-lg bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3>Материалы урока</h3>
          <p>
            Добро пожаловать в {id}-й module курса школы KRAUZ. 
            Здесь мы научимся применять полученные знания на практике.
          </p>
          <ul>
            <li>Принцип работы алгоритмов</li>
            <li>Анализ данных</li>
            <li>Построение стратегии</li>
          </ul>
          <p>
            Внимательно изучите видеоматериал выше перед выполнением домашнего задания.
            Ваш успех зависит от внимательности к деталям.
          </p>
        </div>

        {/* Homework Section */}
        <HomeworkForm />
      </div>
    </div>
  );
}
