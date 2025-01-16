import React from 'react';
import { Palette } from 'lucide-react';

interface ThemeSelectorProps {
  themes: any;
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedTheme, setSelectedTheme }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Palette className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
        <h2 className="text-lg font-semibold text-white">Tema Seçimi</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(themes).map(([theme, colors]) => (
          <button
            key={theme}
            onClick={() => setSelectedTheme(theme)}
            className={`w-16 h-16 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              selectedTheme === theme
                ? `bg-gradient-to-br ${colors.buttonGradient} ring-2 ring-white`
                : `bg-gradient-to-br ${colors.buttonGradient} opacity-70 hover:opacity-100`
            }`}
            aria-label={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
