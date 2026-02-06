import Link from 'next/link';
import { Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
  isCompleted?: boolean;
}

export function ModuleCard({ id, title, description, isLocked, isCompleted }: ModuleCardProps) {
  const href = isLocked ? '#' : `/modules/${id}`;
  
  return (
    <Link href={href} aria-disabled={isLocked} className={cn(
      "block p-4 rounded-2xl shadow-sm border transition-all active:scale-95",
      isLocked ? "bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed" : "bg-white border-gray-200 hover:border-blue-400 cursor-pointer"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            isLocked ? "bg-gray-200 text-gray-500" : (isCompleted ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")
          )}>
            Уровень {id}
          </span>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-tight">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>
        </div>
        <div className="ml-3 mt-1">
          {isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : isCompleted ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <PlayCircle className="w-6 h-6 text-blue-500" />
          )}
        </div>
      </div>
    </Link>
  );
}
