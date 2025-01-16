import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  themes: any;
  selectedTheme: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey, themes, selectedTheme }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Key className={`h-5 w-5 ${themes[selectedTheme].accentColor}`} />
        <h2 className="text-lg font-semibold text-white">API Anahtarı</h2>
      </div>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Gemini API anahtarınızı girin"
        className="w-full p-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
      />
    </div>
  );
};

export default ApiKeyInput;
