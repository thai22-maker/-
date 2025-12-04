import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text: string;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-white p-8 rounded-full border-4 border-black shadow-cartoon animate-spin mb-8">
        <Loader2 className="w-12 h-12 text-cartoon-blue" />
      </div>
      <h2 className="text-2xl font-black text-gray-800 animate-pulse">{text}</h2>
      <p className="text-gray-500 mt-2 font-medium">老师的大脑正在飞速运转...</p>
    </div>
  );
};
