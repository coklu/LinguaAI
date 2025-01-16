import React from 'react';
import { BookOpen } from 'lucide-react';

interface NovelDetailsInputProps {
  novelName: string;
  chapter: string;
  setNovelName: (value: string) => void;
  setChapter: (value: string) => void;
  themes: any;
  selectedTheme: string;
}

const NovelDetailsInput: React.FC<NovelDetailsInputProps> = ({
  novelName,
  chapter,
  setNovelName,
  setChapter,
  themes,
  selectedTheme,
}) => {
  return (
    <>
      <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
          <h2 className="text-lg font-semibold text-white">Roman Adı (Opsiyonel)</h2>
        </div>
        <input
          type="text"
          value={novelName}
          onChange={(e) => setNovelName(e.target.value)}
          placeholder="Romanın adını girin"
          className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
        />
      </div>

      <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
          <h2 className="text-lg font-semibold text-white">Bölüm (Opsiyonel)</h2>
        </div>
        <input
          type="text"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          placeholder="Bölüm numarasını girin"
          className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
        />
      </div>
    </>
  );
};

export default NovelDetailsInput;
