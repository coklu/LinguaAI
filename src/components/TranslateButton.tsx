import React from 'react';

interface TranslateButtonProps {
  isLoading: boolean;
  handleTranslate: () => void;
  apiKey: string;
  originalText: string;
  themes: any;
  selectedTheme: string;
}

const TranslateButton: React.FC<TranslateButtonProps> = ({
  isLoading,
  handleTranslate,
  apiKey,
  originalText,
  themes,
  selectedTheme,
}) => {
  return (
    <div className="md:col-span-2">
      <button
        onClick={handleTranslate}
        disabled={!apiKey || !originalText || isLoading}
        className={`w-full bg-gradient-to-r ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover} text-white py-3 rounded-lg font-semibold disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Çeviriliyor...</span>
          </>
        ) : (
          <span>Çeviriyi Başlat</span>
        )}
      </button>
    </div>
  );
};

export default TranslateButton;
