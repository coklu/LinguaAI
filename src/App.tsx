import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import ThemeSelector from './components/ThemeSelector';
import ApiKeyInput from './components/ApiKeyInput';
import ModelSelector from './components/ModelSelector';
import OriginalTextInput from './components/OriginalTextInput';
import KeywordsInput from './components/KeywordsInput';
import SaveToHistoryCheckbox from './components/SaveToHistoryCheckbox';
import NovelDetailsInput from './components/NovelDetailsInput';
import TranslateButton from './components/TranslateButton';
import TranslationResult from './components/TranslationResult';
import History from './components/History';
import Tutorial from './components/Tutorial';
import { TranslationHistory } from './components/types';
import { generateEPUB } from './utils/epub';

const themes = {
  'mavi-gri': {
    gradient: 'from-gray-800 via-blue-900 to-gray-900',
    buttonGradient: 'from-blue-500 to-blue-700',
    headerGradient: 'from-gray-900 via-blue-900 to-gray-900',
    accentColor: 'text-blue-400',
    buttonHover: 'hover:from-blue-600 hover:to-blue-800'
  },
  'sari-gri': {
    gradient: 'from-gray-800 via-yellow-900 to-gray-900',
    buttonGradient: 'from-yellow-500 to-yellow-700',
    headerGradient: 'from-gray-900 via-yellow-900 to-gray-900',
    accentColor: 'text-yellow-400',
    buttonHover: 'hover:from-yellow-600 hover:to-yellow-800'
  },
  'kirmizi-gri': {
    gradient: 'from-gray-800 via-red-900 to-gray-900',
    buttonGradient: 'from-red-500 to-red-700',
    headerGradient: 'from-gray-900 via-red-900 to-gray-900',
    accentColor: 'text-red-400',
    buttonHover: 'hover:from-red-600 hover:to-red-800'
  },
  'beyaz-gri': {
    gradient: 'from-gray-800 via-slate-500 to-gray-900',
    buttonGradient: 'from-slate-500 to-slate-700',
    headerGradient: 'from-gray-900 via-slate-500 to-gray-900',
    accentColor: 'text-slate-400',
    buttonHover: 'hover:from-slate-600 hover:to-slate-800'
  },
  'turuncu-gri': {
    gradient: 'from-gray-800 via-orange-900 to-gray-900',
    buttonGradient: 'from-orange-500 to-orange-700',
    headerGradient: 'from-gray-900 via-orange-900 to-gray-900',
    accentColor: 'text-orange-400',
    buttonHover: 'hover:from-orange-600 hover:to-orange-800'
  }
};

function App() {
  const [apiKey, setApiKey] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [model, setModel] = useState('gemini-1.5-pro');
  const [showKeywords, setShowKeywords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('translator');
  const [selectedTheme, setSelectedTheme] = useState('mavi-gri');
  const [mounted, setMounted] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<TranslationHistory[]>([]);
  const [saveToHistory, setSaveToHistory] = useState(false);
  const [novelName, setNovelName] = useState('');
  const [chapter, setChapter] = useState('');
  const [viewingChapter, setViewingChapter] = useState<TranslationHistory | null>(null);
  const [editingChapter, setEditingChapter] = useState<TranslationHistory | null>(null);
  const [editedTranslation, setEditedTranslation] = useState('');

  useEffect(() => {
    setMounted(true);
    const storedApiKey = localStorage.getItem('apiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }

    const storedHistory = localStorage.getItem('translationHistory');
    if (storedHistory) {
      setTranslationHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    if (translationHistory.length > 0) {
      localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
    }
  }, [translationHistory]);

  const handleTranslate = async () => {
    try {
      setIsLoading(true);

      const basePrompt = "Bu metni İngilizceden Türkçeye çevir. Çeviride, metnin orijinal anlamını, duygusunu ve üslubunu korumaya özen göster. Herhangi bir bağlam verilmediğinde, genel dil bilgisi ve edebi çeviri kurallarını dikkate alarak akıcı, doğal ve anlaşılır bir şekilde çevir. Kültürel ve dilsel farklılıkları, Türkçe okuyucunun rahatça anlayabileceği şekilde uygun bir biçimde uyarlamaya çalış.";

      const prompt = keywords
        ? `${basePrompt}\n\nÖzellikle bu kelimelere ve özel isimlere dikkat et, bunları olduğu gibi koru: ${keywords}\n\nÇevrilecek metin:\n${originalText}`
        : `${basePrompt}\n\nÇevrilecek metin:\n${originalText}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API yanıt vermedi');
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('API geçersiz yanıt döndürdü');
      }

      const translation = data.candidates[0].content.parts[0].text;
      setTranslatedText(translation);

      if (saveToHistory) {
        const isDuplicate = translationHistory.some(
          (item) => item.novelName === novelName && item.chapter === chapter
        );

        if (isDuplicate) {
          alert('Bu bölüm zaten çeviri geçmişinde kayıtlı!');
          return;
        }

        setTranslationHistory((prevHistory) => [
          ...prevHistory,
          {
            novelName,
            chapter,
            translated: translation,
            timestamp: Date.now(),
          },
        ]);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText(`Çeviri sırasında bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setTranslationHistory([]);
    localStorage.removeItem('translationHistory');
    setViewingChapter(null);
  };

  const groupedHistory = translationHistory.reduce<{ [key: string]: TranslationHistory[] }>((acc, item) => {
    const key = item.novelName || 'Kategorize Edilmemiş';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const handleViewChapter = (item: TranslationHistory) => {
    setViewingChapter(item);
  };

  const handleBackToHistory = () => {
    setViewingChapter(null);
  };

  const handleDeleteChapter = (timestamp: number) => {
    setTranslationHistory(prevHistory => prevHistory.filter(item => item.timestamp !== timestamp));
  };

  const handleEditChapter = (item: TranslationHistory) => {
    setEditingChapter(item);
    setEditedTranslation(item.translated);
  };

  const handleSaveEditedChapter = () => {
    setTranslationHistory(prevHistory =>
      prevHistory.map(item =>
        item.timestamp === editingChapter?.timestamp
          ? { ...item, translated: editedTranslation }
          : item
      )
    );
    setEditingChapter(null);
    setEditedTranslation('');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themes[selectedTheme].gradient} transition-all duration-700`}>
      <nav className={`bg-gradient-to-r ${themes[selectedTheme].headerGradient} shadow-lg transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${mounted ? 'animate-slide-in' : ''}`}>
              <BookOpen className={`h-6 w-6 ${themes[selectedTheme].accentColor} hover:scale-110 transition-transform`} />
              <span className="text-xl font-bold text-white">LinguaAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('translator')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'translator'
                    ? `bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white`
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Çevirmen
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'history'
                    ? `bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white`
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Geçmiş
              </button>
              <button
                onClick={() => setActiveTab('tutorial')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'tutorial'
                    ? `bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white`
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Eğitim
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'translator' ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 grid gap-6">
              <ThemeSelector themes={themes} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />

              <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} themes={themes} selectedTheme={selectedTheme} />

              <ModelSelector model={model} setModel={setModel} themes={themes} selectedTheme={selectedTheme} />

              <OriginalTextInput originalText={originalText} setOriginalText={setOriginalText} themes={themes} selectedTheme={selectedTheme} />

              <div className="md:col-span-2">
                <button
                  onClick={() => setShowKeywords(!showKeywords)}
                  className={`flex items-center space-x-2 ${themes[selectedTheme].accentColor} hover:brightness-125 transition-all duration-300`}
                >
                  <ChevronDown className={`h-5 w-5 transform transition-transform duration-300 ${showKeywords ? 'rotate-180' : ''}`} />
                  <span>Anahtar Kelimeler (Opsiyonel)</span>
                </button>
              </div>

              {showKeywords && (
                <KeywordsInput keywords={keywords} setKeywords={setKeywords} themes={themes} selectedTheme={selectedTheme} showKeywords={showKeywords} />
              )}

              <SaveToHistoryCheckbox
                saveToHistory={saveToHistory}
                setSaveToHistory={setSaveToHistory}
                themes={themes}
                selectedTheme={selectedTheme}
              />
            </div>
            {saveToHistory && (
              <div className={`${saveToHistory ? 'animate-slide-down' : 'animate-slide-up'} md:col-span-2 grid gap-6`}>
                <NovelDetailsInput novelName={novelName} chapter={chapter} setNovelName={setNovelName} setChapter={setChapter} themes={themes} selectedTheme={selectedTheme} />
              </div>
            )}
            <div className="md:col-span-2">
              <TranslateButton isLoading={isLoading} handleTranslate={handleTranslate} apiKey={apiKey} originalText={originalText} themes={themes} selectedTheme={selectedTheme} />
            </div>
            {translatedText && (
              <div className="md:col-span-2">
                <TranslationResult translatedText={translatedText} themes={themes} selectedTheme={selectedTheme} />
              </div>
            )}
          </div>
        ) : activeTab === 'history' ? (
          <History
            groupedHistory={groupedHistory}
            viewingChapter={viewingChapter}
            editingChapter={editingChapter}
            editedTranslation={editedTranslation}
            handleViewChapter={handleViewChapter}
            handleBackToHistory={handleBackToHistory}
            handleDeleteChapter={handleDeleteChapter}
            handleEditChapter={handleEditChapter}
            handleSaveEditedChapter={handleSaveEditedChapter}
            setEditingChapter={setEditingChapter}
            setEditedTranslation={setEditedTranslation}
            themes={themes}
            selectedTheme={selectedTheme}
            clearHistory={clearHistory}
            generateEPUB={(novelName: string) => generateEPUB(novelName, translationHistory)}
          />
        ) : (
          <Tutorial />
        )}

        <div className="mt-8 text-center text-gray-400">
          <p>Geliştirici İletişim: <a href="https://discord.com/users/yildizya" target="_blank" rel="noopener noreferrer" className={`${themes[selectedTheme].accentColor} hover:brightness-125 transition-colors duration-300`}>@yildizya (Discord)</a></p>
        </div>
      </main>
    </div>
  );
}

export default App;