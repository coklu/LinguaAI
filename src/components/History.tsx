import React from 'react';
import { ChevronDown, Edit, Trash2, ArrowLeft, History as HistoryIcon, DownloadCloud } from 'lucide-react';
import { TranslationHistory } from './types';

interface HistoryProps {
  groupedHistory: { [key: string]: TranslationHistory[] };
  viewingChapter: TranslationHistory | null;
  editingChapter: TranslationHistory | null;
  editedTranslation: string;
  handleViewChapter: (item: TranslationHistory) => void;
  handleBackToHistory: () => void;
  handleDeleteChapter: (timestamp: number) => void;
  handleEditChapter: (item: TranslationHistory) => void;
  handleSaveEditedChapter: () => void;
  setEditingChapter: (value: TranslationHistory | null) => void;
  setEditedTranslation: (value: string) => void;
  themes: any;
  selectedTheme: string;
  clearHistory: () => void;
  generateEPUB: (novelName: string) => void; // Now receives novelName
}

const History: React.FC<HistoryProps> = ({
  groupedHistory,
  viewingChapter,
  editingChapter,
  editedTranslation,
  handleViewChapter,
  handleBackToHistory,
  handleDeleteChapter,
  handleEditChapter,
  handleSaveEditedChapter,
  setEditingChapter,
  setEditedTranslation,
  themes,
  selectedTheme,
  clearHistory,
  generateEPUB,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <HistoryIcon className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
          <h2 className="text-lg font-semibold text-white">Çeviri Geçmişi</h2>
        </div>
        <button
          onClick={clearHistory}
          className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
        >
          <Trash2 className={`h-5 w-5 text-red-500 hover:text-red-600`} />
        </button>
      </div>
      <div className="space-y-4">
        {viewingChapter ? (
          <div className="bg-gray-900/50 p-4 rounded-md">
            <button
              onClick={handleBackToHistory}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-4"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Geri Dön</span>
            </button>
            <p className="text-white mt-2 whitespace-pre-wrap">{viewingChapter.translated}</p>
          </div>
        ) : editingChapter ? (
          <div className="bg-gray-900/50 p-4 rounded-md">
            <textarea
              value={editedTranslation}
              onChange={(e) => setEditedTranslation(e.target.value)}
              className="w-full h-48 p-2 bg-gray-800/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
            />
            <button
              onClick={handleSaveEditedChapter}
              className={`mt-4 bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}
            >
              Kaydet
            </button>
            <button
              onClick={() => {
                setEditingChapter(null);
                setEditedTranslation('');
              }}
              className="mt-4 ml-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              İptal
            </button>
          </div>
        ) : (
          Object.entries(groupedHistory).map(([groupName, items]) => (
            <details key={groupName} className="bg-gray-900/50 p-4 rounded-md" open>
              <summary className="text-lg font-semibold text-white cursor-pointer flex items-center space-x-2">
                <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                <span>{groupName}</span>
              </summary>
              <div className="mt-4 space-y-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => handleViewChapter(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        {item.chapter && (
                          <p className="text-gray-400 text-sm">Bölüm: {item.chapter}</p>
                        )}
                        <p className="text-gray-400 text-sm">Tarih: {new Date(item.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditChapter(item);
                          }}
                          className="p-1 rounded-md hover:bg-gray-600 transition-colors duration-300"
                        >
                          <Edit className={`h-4 w-4 ${themes[selectedTheme].accentColor}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChapter(item.timestamp);
                          }}
                          className="p-1 rounded-md hover:bg-gray-600 transition-colors duration-300"
                        >
                          <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    generateEPUB(groupName); // Pass novelName here
                  }}
                  className={`mt-4 bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}
                >
                  <DownloadCloud className="h-5 w-5" />
                  <span>EPUB Oluştur</span>
                </button>
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
};

export default History;