import React from 'react';
import { User, Bot, Copy, ThumbsUp, RotateCcw } from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageItem = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse animate-in slide-in-from-right-4' : 'animate-in slide-in-from-left-4'} transition-all duration-300`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
        isUser 
          ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white border-2 border-white dark:border-gray-800' 
          : 'bg-white dark:bg-gray-800 text-violet-600 border border-gray-200 dark:border-gray-700'
      }`}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Message and Controls */}
      <div className={`flex flex-col gap-2 max-w-[80%]`}>
        <div 
          className={`px-5 py-3.5 rounded-3xl shadow-sm text-[15px] leading-relaxed relative ${
            isUser
              ? 'bg-violet-600 text-white rounded-tr-sm'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm'
          }`}
        >
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
          
          {/* Decorative bubble tail */}
          <div className={`absolute top-0 w-2 h-2 ${isUser ? '-right-1 bg-violet-600' : '-left-1 bg-white dark:bg-gray-800 border-l border-t border-gray-100 dark:border-gray-700'} -z-10`} />
        </div>

        {/* Action Buttons (only for AI) */}
        {!isUser && (
          <div className="flex items-center gap-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            <button className="p-1.5 text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-all" title="Copy response">
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all" title="Helpful">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-all" title="Regenerate">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
