import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SaveToHistoryCheckboxProps {
  saveToHistory: boolean;
  setSaveToHistory: (value: boolean) => void;
  themes: any;
  selectedTheme: string;
}

const SaveToHistoryCheckbox: React.FC<SaveToHistoryCheckboxProps> = ({
  saveToHistory,
  setSaveToHistory,
  themes,
  selectedTheme,
}) => {
  return (
    <div className="md:col-span-2 flex items-center space-x-2">
      <button
        onClick={() => setSaveToHistory(!saveToHistory)}
        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 ${
          saveToHistory
            ? `bg-gradient-to-br ${themes[selectedTheme].buttonGradient} ${themes[selectedTheme].buttonHover}`
            : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        {saveToHistory && (
          <CheckCircle
            className={`h-4 w-4 ${
              saveToHistory ? 'text-white' : 'text-transparent'
            } transition-all duration-300`}
          />
        )}
      </button>
      <label
        htmlFor="saveToHistory"
        className={`text-white cursor-pointer select-none ${
          saveToHistory ? themes[selectedTheme].accentColor : ''
        }`}
      >
        Çeviriyi geçmişe kaydet
      </label>
    </div>
  );
};

export default SaveToHistoryCheckbox;
