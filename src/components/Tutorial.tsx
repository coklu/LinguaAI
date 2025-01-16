import React from 'react';
import { Youtube } from 'lucide-react';

const Tutorial: React.FC = () => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 hover-scale animate-fade-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Youtube className="h-5 w-5 text-red-400" />
        <h2 className="text-lg font-semibold text-white">Nasıl Kullanılır?</h2>
      </div>
      <div className="aspect-video w-full">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7isAm-XchSs?si=Ov-lCCjXIEc7W2p2"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Tutorial;
