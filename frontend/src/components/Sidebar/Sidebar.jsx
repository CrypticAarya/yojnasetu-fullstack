import React from 'react';
import { Sparkles, X, LayoutGrid, HelpCircle, Settings, Info, RotateCcw } from 'lucide-react';
import SchemeCard from './SchemeCard';

const Sidebar = ({ isOpen, onClose, schemes = [], userData = {}, onSelectScheme, onClearChat }) => {
  const hasProfileData = Object.values(userData).some(val => val !== null && val !== undefined && val !== '');

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl shadow-lg shadow-violet-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                Yojna Setu
              </span>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
            
            {/* Dynamic AI Profile Section */}
            <section className="animate-in slide-in-from-top-4 duration-500">
              <div className="px-2 mb-4 flex items-center justify-between">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Your Profile <span className="text-[8px] ml-1 opacity-50">(AI Identified)</span>
                </h2>
              </div>
              
              <div className="p-4 bg-gray-50/80 dark:bg-gray-900/40 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 space-y-3">
                {hasProfileData ? (
                  <div className="flex flex-wrap gap-2">
                    {userData.age && (
                      <span className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        Age: {userData.age}
                      </span>
                    )}
                    {userData.state && (
                      <span className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        📍 {userData.state}
                      </span>
                    )}
                    {userData.occupation && (
                      <span className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-300">
                        💼 {userData.occupation}
                      </span>
                    )}
                    {userData.income && (
                      <span className="px-2.5 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-[11px] font-semibold text-gray-600 dark:text-gray-300 font-mono">
                        ₹{userData.income}
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-400 italic px-1">
                    Tell the AI about yourself to build your profile...
                  </p>
                )}
              </div>
            </section>

            {/* Eligible Schemes Section */}
            <section>
              <div className="px-2 mb-4 flex items-center justify-between">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Eligible Schemes
                </h2>
                <LayoutGrid className="w-3.5 h-3.5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {schemes.length > 0 ? (
                  schemes.map((scheme) => (
                    <SchemeCard 
                      key={scheme._id || scheme.id}
                      title={scheme.name}
                      category={scheme.category || "General"}
                      benefits={scheme.benefits}
                      reason={scheme.reason_for_eligibility}
                      onClick={() => onSelectScheme(scheme)}
                    />
                  ))
                ) : (
                  <div className="px-4 py-12 flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                      <Info className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500">No Schemes Yet</p>
                      <p className="text-[10px] text-gray-400 mt-1 max-w-[150px]">
                        AI will identify eligibility after your message.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 w-full p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all text-sm font-medium text-gray-600 dark:text-gray-400 group">
                <HelpCircle className="w-4 h-4 group-hover:text-violet-600" />
                <span>Documentation</span>
              </button>
              <button 
                onClick={onClearChat}
                className="flex items-center gap-3 w-full p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all text-sm font-medium text-gray-600 dark:text-gray-400 group"
              >
                <RotateCcw className="w-4 h-4 group-hover:text-red-500" />
                <span>Clear Chat</span>
              </button>
              <button className="flex items-center gap-3 w-full p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all text-sm font-medium text-gray-600 dark:text-gray-400 group">
                <Settings className="w-4 h-4 group-hover:text-violet-600" />
                <span>Settings</span>
              </button>
            </div>
            
            <div className="mt-4 flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-inner">
                S
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-bold truncate">Sarthak</p>
                <p className="text-[10px] text-gray-400 font-medium">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
