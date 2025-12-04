import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center p-6 mb-8 relative">
      <div className="bg-white border-4 border-black p-4 rounded-full shadow-cartoon transform -rotate-2 flex items-center gap-3 z-10">
        <div className="bg-cartoon-yellow p-2 rounded-full border-2 border-black">
          <Sparkles className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-3xl font-black text-black tracking-tight">
          错题<span className="text-cartoon-blue">克星</span>
        </h1>
      </div>
      <div className="absolute top-4 right-10 hidden md:block">
        <div className="bg-cartoon-purple text-white px-4 py-2 rounded-xl border-2 border-black shadow-cartoon transform rotate-3 font-bold">
          加油！你可以的！ 🚀
        </div>
      </div>
    </header>
  );
};
