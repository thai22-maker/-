import React, { useEffect } from 'react';
import { Trophy, RefreshCw, Home } from 'lucide-react';

interface ResultViewProps {
  score: number;
  total: number;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ score, total, onReset }) => {
  const isPerfect = score === total;
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto pop-in text-center pt-10">
      
      <div className="relative mb-8">
        {isPerfect && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                 <div className="animate-bounce bg-cartoon-red text-white px-4 py-1 rounded-full border-2 border-black font-bold">
                    太棒了！全对！
                 </div>
            </div>
        )}
        <div className={`p-8 rounded-full border-4 border-black shadow-cartoon ${isPerfect ? 'bg-cartoon-yellow' : 'bg-white'}`}>
          <Trophy className={`w-24 h-24 ${isPerfect ? 'text-white drop-shadow-md' : 'text-gray-300'}`} />
        </div>
      </div>

      <h2 className="text-4xl font-black mb-4 text-gray-800">
        {isPerfect ? "挑战大成功! 🎉" : "挑战完成!"}
      </h2>
      
      <p className="text-xl font-bold text-gray-500 mb-8">
        你答对了 <span className="text-cartoon-blue text-3xl mx-1">{score}</span> / {total} 道题
      </p>

      <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-cartoon w-full mb-8">
        <p className="text-lg font-medium text-gray-700 leading-relaxed">
          {isPerfect 
            ? "哇！你已经完全掌握了这个知识点！你的努力得到了回报，继续保持这份热情！你是最棒的！ 🌟"
            : "不错哦！你已经迈出了重要的一步。再回顾一下错题解析，相信下次你一定能全对！加油！ 💪"}
        </p>
      </div>

      <div className="flex gap-4">
         <button 
          onClick={onReset}
          className="bg-cartoon-blue text-white text-lg font-bold py-3 px-8 rounded-2xl border-4 border-black shadow-cartoon hover:shadow-cartoon-hover hover:translate-y-1 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" /> 回到首页
        </button>
      </div>
    </div>
  );
};
