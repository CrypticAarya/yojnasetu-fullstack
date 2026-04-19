import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar/Sidebar';
import ChatArea from './components/Chat/ChatArea';
import ChatInput from './components/Chat/ChatInput';
import SchemeModal from './components/UI/SchemeModal';

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'ai',
    content: "Greetings! I am your **Yojna Setu Assistant**. I'm here to help you navigate through various government schemes designed for farmers and rural development.\n\nHow can I assist you today? You can ask me about eligibility, required documents, or specific scheme benefits."
  }
];

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export default function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [userData, setUserData] = useState({
    age: null,
    income: null,
    state: null,
    occupation: null
  });
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleSendMessage = async (content) => {
    // 1. Add User Message
    const userMessage = { id: Date.now(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    // 2. Trigger "Thinking" state
    setIsThinking(true);

    try {
      // 3. API Call to Backend
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We send the current `messages` as `history`.
        // The newest user message isn't in `messages` state yet during this render cycle,
        // so we append it manually to ensure backend gets the full context.
        body: JSON.stringify({ 
          message: content, 
          history: [...messages, userMessage] 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // 4. Update UI with AI Response
      const aiResponse = {
        id: Date.now() + 1,
        role: 'ai',
        content: data.reply || data.message || "I'm sorry, I couldn't process that."
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // 5. Update Sidebar Schemes
      if (data.schemes && data.schemes.length > 0) {
        setSchemes(data.schemes);
      }

      // 6. Update User Profile Data (Merge extracted info)
      if (data.extracted_data) {
        setUserData(prev => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(data.extracted_data).filter(([_, v]) => v !== null)
          )
        }));
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: "Something went wrong. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 overflow-hidden">
      
      {/* Dynamic Modal */}
      {selectedScheme && (
        <SchemeModal 
          scheme={selectedScheme} 
          onClose={() => setSelectedScheme(null)} 
        />
      )}

      {/* Sidebar Component with Dynamic Schemes & Profile */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        schemes={schemes}
        userData={userData}
        onSelectScheme={(scheme) => setSelectedScheme(scheme)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative min-w-0 h-full">
        
        {/* Modern Glassy Header */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all active:scale-95"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Assistant Online
              </h1>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Yojna Setu • AI Guide
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-full">
              <span className="text-[10px] font-bold text-gray-500">v1.2.0</span>
            </div>
          </div>
        </header>

        {/* Chat Area Component */}
        <ChatArea 
          messages={messages} 
          isThinking={isThinking} 
        />

        {/* Chat Input Component */}
        <ChatInput 
          onSend={handleSendMessage} 
          disabled={isThinking} 
        />
      </div>
    </div>
  );
}
