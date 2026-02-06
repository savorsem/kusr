'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function HomeworkForm() {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setStatus('loading');
    
    try {
      // Mock API call simulation
      // In real app: fetch('/api/check-homework', { ... })
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Random success/fail for prototype demo
      const isSuccess = Math.random() > 0.3;
      
      setStatus(isSuccess ? 'success' : 'error');
      setFeedback(isSuccess 
        ? "Отлично! Задание выполнено верно. Вы продемонстрировали хорошее понимание материала. Следующий модуль разблокирован." 
        : "Пока не совсем верно. Попробуйте раскрыть тему подробнее, обратив внимание на ключевые аспекты урока.");
        
    } catch {
      setStatus('error');
      setFeedback("Ошибка соединения. Попробуйте позже.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
      <h2 className="text-xl font-bold mb-4">Домашнее задание</h2>
      <p className="text-gray-600 mb-4 text-sm">
        Напишите эссе или ответ на вопрос по теме модуля.
        Наш AI агент KRAUZ проверит его автоматически.
      </p>

      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
            <CheckCircle className="w-5 h-5" />
            Задание принято!
          </div>
          <p className="text-green-800 text-sm">{feedback}</p>
          <button className="mt-4 w-full py-2 bg-green-600 text-white rounded-lg font-medium shadow-sm active:scale-95 transition-transform">
            Перейти к следующему модулю
          </button>
        </motion.div>
      ) : (
        <>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={status === 'loading'}
            placeholder="Ваш ответ..."
            className="w-full h-32 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
          />
          
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-start gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"
            >
              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{feedback}</p>
            </motion.div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!answer.trim() || status === 'loading'}
            className={cn(
              "mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all shadow-md active:scale-95",
              status === 'loading' ? "bg-gray-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Проверка агентом...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Отправить на проверку
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
