import React from 'react';
import { AnalysisResult } from '../types';
import { BookOpen, CheckCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface AnalysisViewProps {
  analysis: AnalysisResult;
  onNext: () => void;
  imageSrc: string;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, onNext, imageSrc }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pop-in pb-20">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Image & Concept */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-2 rounded-3xl border-4 border-black shadow-cartoon transform -rotate-1">
            <img src={imageSrc} alt="Question" className="w-full h-64 object-cover rounded-2xl" />
          </div>
          
          <div className="bg-cartoon-yellow p-6 rounded-3xl border-4 border-black shadow-cartoon">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-black" />
              <h3 className="text-xl font-black">核心知识点</h3>
            </div>
            <p className="text-lg font-bold">{analysis.coreConcept}</p>
          </div>
        </div>

        {/* Right Column: Analysis & Solution */}
        <div className="flex flex-col gap-6">
          {/* Encouragement Bubble */}
          <div className="bg-cartoon-purple text-white p-6 rounded-3xl rounded-bl-none border-4 border-black shadow-cartoon relative">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">🌟</span> 老师的话:
            </h3>
            <p className="text-lg leading-relaxed font-medium">"{analysis.encouragement}"</p>
          </div>

          {/* Mistake Analysis */}
          <div className="bg-white p-6 rounded-3xl border-4 border-cartoon-red shadow-cartoon">
            <div className="flex items-center gap-3 mb-3 text-cartoon-red">
              <Lightbulb className="w-6 h-6 fill-current" />
              <h3 className="text-xl font-black">为什么会错?</h3>
            </div>
            <p className="text-gray-700 leading-relaxed font-medium">
              {analysis.mistakeAnalysis}
            </p>
          </div>

          {/* Correct Solution */}
          <div className="bg-white p-6 rounded-3xl border-4 border-cartoon-green shadow-cartoon">
             <div className="flex items-center gap-3 mb-3 text-cartoon-green">
              <CheckCircle className="w-6 h-6 fill-current" />
              <h3 className="text-xl font-black">正确解法</h3>
            </div>
            <div className="prose prose-sm max-w-none font-medium text-gray-700 whitespace-pre-line">
              {analysis.correctSolution}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4">
        <button 
          onClick={onNext}
          className="bg-cartoon-blue text-white text-xl font-black py-4 px-12 rounded-full border-4 border-black shadow-cartoon hover:shadow-cartoon-hover hover:translate-y-1 transition-all flex items-center gap-3 wiggle"
        >
          我学会了，去练习！ <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
