import React from 'react';
import { Languages } from 'lucide-react';

interface KeywordsInputProps {
  keywords: string;
  setKeywords: (value: string) => void;
  themes: any;
  selectedTheme: string;
  showKeywords: boolean;
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({ keywords, setKeywords, themes, selectedTheme, showKeywords }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover-scale ${showKeywords ? 'animate-slide-down animate-fade-in' : 'animate-slide-up' } md:col-span-2`}>
      <div className="flex items-center space-x-2 mb-4">
        <Languages className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
        <h2 className="text-lg font-semibold text-white">Anahtar Kelimeler</h2>
      </div>
      <textarea
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Özel isimler ve dikkat edilmesi gereken kelimeleri buraya yazın (her kelime için yeni satır kullanın)"
        className="w-full h-24 p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
      />
      <div className="text-gray-400 text-sm mt-1">Karakter sayısı: {keywords.length}</div>
    </div>
  );
};

export default KeywordsInput;