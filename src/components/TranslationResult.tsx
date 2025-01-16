import React, { useState } from 'react';
import { Book, Copy, CheckCircle } from 'lucide-react';

interface TranslationResultProps {
  translatedText: string;
  themes: any;
  selectedTheme: string;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ translatedText, themes, selectedTheme }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Book className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
          <h2 className="text-lg font-semibold text-white">Çeviri Sonucu</h2>
        </div>
        <button onClick={handleCopy} className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
          {copySuccess ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Copy className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
          )}
        </button>
      </div>
      <div className="w-full min-h-[12rem] p-4 bg-gray-900/50 border border-gray-700 rounded-md text-white whitespace-pre-wrap">
        {translatedText}
      </div>
      <div className="text-gray-400 text-sm mt-1">Karakter sayısı: {translatedText.length}</div>
    </div>
  );
};

export default TranslationResult;
