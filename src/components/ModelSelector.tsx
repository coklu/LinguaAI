import React from 'react';
import { Sparkles } from 'lucide-react';

interface ModelSelectorProps {
  model: string;
  setModel: (value: string) => void;
  themes: any;
  selectedTheme: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel, themes, selectedTheme }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
        <h2 className="text-lg font-semibold text-white">Model Seçimi</h2>
      </div>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
      >
        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
        <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
        <option value="gemini-2.0-flash-exp">Gemini 2.0 Flash Experimental</option>
        <option value="gemini-exp-1206">Gemini Experimental 1206</option>
      </select>
    </div>
  );
};

export default ModelSelector;
