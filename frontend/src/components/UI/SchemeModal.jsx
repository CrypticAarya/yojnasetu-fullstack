import React from 'react';
import { X, CheckCircle2, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const SchemeModal = ({ scheme, onClose }) => {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-gray-200 dark:border-gray-800">
        
        {/* Header Image/Pattern */}
        <div className="h-32 bg-gradient-to-tr from-violet-600 to-fuchsia-600 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-10 left-8 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-4 border-white dark:border-gray-900">
            <ShieldCheck className="w-10 h-10 text-violet-600" />
          </div>
        </div>

        <div className="px-8 pt-16 pb-8">
          <div className="flex flex-col gap-6">
            {/* Title Section */}
            <div>
              <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {scheme.category || "General Scheme"}
              </span>
              <h2 className="text-2xl font-heading font-bold mt-2 text-gray-900 dark:text-gray-100">
                {scheme.name}
              </h2>
            </div>

            {/* Description & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-violet-600 rounded-full"></span>
                  Key Benefits
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {scheme.benefits}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-fuchsia-600 rounded-full"></span>
                  Eligibility
                </h3>
                <div className="space-y-2">
                  {scheme.eligibility.split('.').filter(e => e.trim()).map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <span>{item.trim()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                Required Documents
              </h3>
              <div className="flex flex-wrap gap-2">
                {(scheme.documents || ['Aadhar Card', 'Bank Passbook', 'Land Records']).map((doc, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center gap-4 mt-2">
              <a 
                href={scheme.apply_link || "#"} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/25 hover:scale-[1.02] transition-all"
              >
                Apply Online
                <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={onClose}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all underline-offset-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeModal;
