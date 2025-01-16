import React from 'react';
import { Book } from 'lucide-react';

interface OriginalTextInputProps {
  originalText: string;
  setOriginalText: (value: string) => void;
  themes: any;
  selectedTheme: string;
}

const OriginalTextInput: React.FC<OriginalTextInputProps> = ({ originalText, setOriginalText, themes, selectedTheme }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Book className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
        <h2 className="text-lg font-semibold text-white">Orijinal Metin</h2>
      </div>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="İngilizce metni buraya yapıştırın..."
        className="w-full h-48 p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
      />
      <div className="text-gray-400 text-sm mt-1">Karakter sayısı: {originalText.length}</div>
    </div>
  );
};

export default OriginalTextInput;
