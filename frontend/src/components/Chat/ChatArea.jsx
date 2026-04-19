import React, { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import MessageItem from './MessageItem';
import LoadingIndicator from '../UI/LoadingIndicator';

const ChatArea = ({ messages, isThinking }) => {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    // Adding a small delay ensures the content is rendered before we calculate height
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className="group">
            <MessageItem role={msg.role} content={msg.content} />
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <LoadingIndicator />
          </div>
        )}

        {messages.length === 0 && !isThinking && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 opacity-50">
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Bot className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold">How can I help you today?</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2">
                Ask about government schemes, eligibility criteria, or required documents for farmers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
