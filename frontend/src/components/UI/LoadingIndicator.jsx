import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl w-fit shadow-sm animate-in fade-in slide-in-from-left-2 duration-300">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-bounce"></div>
      </div>
      <span className="text-sm font-medium text-gray-400 ml-2 italic">Assistant is thinking...</span>
    </div>
  );
};

export default LoadingIndicator;
