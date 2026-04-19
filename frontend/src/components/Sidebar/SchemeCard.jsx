import React from 'react';
import { ChevronRight, Award, CheckCircle2 } from 'lucide-react';

const SchemeCard = ({ title, category, benefits, reason, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 active:scale-[0.98]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-violet-600 dark:group-hover:text-violet-400">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
            {benefits}
          </p>
          {reason && (
            <div className="mt-2 flex items-start gap-1.5 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
              <p className="text-[11px] font-medium text-green-700 dark:text-green-400 leading-snug">
                {reason}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400" />
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-gray-400">
        <Award className="w-3 h-3" />
        <span>Verified Government Scheme</span>
      </div>
    </div>
  );
};

export default SchemeCard;
