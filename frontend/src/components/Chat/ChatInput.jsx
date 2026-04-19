import React, { useState } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (trimmedValue && !disabled) {
      onSend(trimmedValue);
      setValue('');
      // Reset textarea height
      const textarea = e.target.querySelector('textarea');
      if (textarea) textarea.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-white via-white dark:from-gray-950 dark:via-gray-950 to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center group transition-all duration-300"
        >
          {/* Main Input Container */}
          <div className="relative w-full flex items-end gap-2 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[28px] shadow-2xl shadow-gray-200/50 dark:shadow-black/50 focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500/50 transition-all duration-300">
            
            {/* Action Buttons */}
            <button 
              type="button"
              className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Managed Input */}
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message your Yojna assistant..."
              className="flex-1 max-h-40 py-3 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none overflow-y-auto"
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />

            {/* Right Buttons Section */}
            <div className="flex items-center gap-1">
              <button 
                type="button"
                className="p-3 text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-full transition-all"
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button 
                type="submit"
                disabled={!value.trim() || disabled}
                className="p-3 bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white rounded-full shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
        
        <div className="text-center mt-3">
          <p className="text-[10px] text-gray-400 font-medium tracking-wide">
            AI can make mistakes. Verify important information with government officials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
