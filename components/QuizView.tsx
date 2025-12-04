import React, { useState } from 'react';
import { PracticeQuestion } from '../types';
import { Check, X } from 'lucide-react';

interface QuizViewProps {
  questions: PracticeQuestion[];
  onComplete: (score: number) => void; // Updated signature
  onRetry?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score including the current one if correct
      const finalScore = selectedOption === currentQuestion.correctAnswer ? score + 1 : score;
      // Wait, score state update is async. 
      // safer to rely on the state `score` which was updated in handleOptionClick? 
      // React state updates might batch. 
      // Actually, handleOptionClick runs before handleNext (user clicks option, then clicks next).
      // So `score` state is up to date when Next is clicked.
      onComplete(score); 
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    }
  };

  const progressPercentage = ((currentIdx + 1) / questions.length) * 100;

  if (currentIdx >= questions.length) return null;

  return (
    <div className="w-full max-w-2xl mx-auto pop-in pb-20">
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 font-bold text-gray-500">
          <span>挑战进度</span>
          <span>{currentIdx + 1} / {questions.length}</span>
        </div>
        <div className="h-6 bg-white rounded-full border-4 border-black overflow-hidden relative">
          <div 
            className="h-full bg-cartoon-yellow transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white p-8 rounded-3xl border-4 border-black shadow-cartoon mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-cartoon-blue text-white px-4 py-2 rounded-bl-xl font-bold border-l-4 border-b-4 border-black">
          第 {currentIdx + 1} 题
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-4 font-medium transition-all text-lg ";
            
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                btnClass += "border-cartoon-green bg-green-50 text-green-800 font-bold flex justify-between items-center";
              } else if (option === selectedOption) {
                btnClass += "border-cartoon-red bg-red-50 text-red-800 font-bold flex justify-between items-center";
              } else {
                btnClass += "border-gray-100 text-gray-400";
              }
            } else if (selectedOption === option) {
               btnClass += "border-cartoon-blue bg-blue-50 font-bold";
            } else {
                btnClass += "border-black hover:border-cartoon-blue hover:bg-blue-50 hover:shadow-cartoon-hover active:scale-95";
            }

            return (
              <button 
                key={idx}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span>{option}</span>
                {isAnswered && option === currentQuestion.correctAnswer && <Check className="w-6 h-6" />}
                {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && <X className="w-6 h-6" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Reveal */}
      {showExplanation && (
        <div className="bg-cartoon-purple bg-opacity-10 p-6 rounded-3xl border-4 border-cartoon-purple mb-24 pop-in">
          <h4 className="font-bold text-cartoon-purple mb-2">💡 解析:</h4>
          <p className="text-gray-700 font-medium">{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Footer Navigation */}
      {isAnswered && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 px-4">
          <button 
            onClick={handleNext}
            className="bg-cartoon-green text-white text-xl font-black py-4 px-12 rounded-full border-4 border-black shadow-cartoon hover:shadow-cartoon-hover hover:translate-y-1 transition-all"
          >
            {isLastQuestion ? "查看结果" : "下一题"}
          </button>
        </div>
      )}
    </div>
  );
};
