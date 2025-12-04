import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadView } from './components/UploadView';
import { AnalysisView } from './components/AnalysisView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { Loading } from './components/Loading';
import { AppState, AnalysisResult, PracticeQuestion } from './types';
import { analyzeImage, generatePracticeQuestions } from './services/geminiService';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(AppState.UPLOAD);
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [finalScore, setFinalScore] = useState(0);
  
    const handleImageSelect = async (file: File) => {
      setState(AppState.ANALYZING);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        setImage(base64String);
  
        try {
          const result = await analyzeImage(base64Data, file.type);
          setAnalysis(result);
          setState(AppState.REVIEW);
        } catch (error) {
          console.error(error);
          alert("分析失败，请重试！");
          setState(AppState.UPLOAD);
        }
      };
      reader.readAsDataURL(file);
    };
  
    const startPractice = async () => {
      if (!analysis) return;
      setState(AppState.GENERATING_QUIZ);
      try {
        const quiz = await generatePracticeQuestions(analysis.coreConcept, analysis.subject);
        setQuestions(quiz);
        setState(AppState.PRACTICE);
      } catch (error) {
        console.error(error);
        alert("题目生成失败，请重试！");
        setState(AppState.REVIEW);
      }
    };
  
    return (
      <div className="min-h-screen pb-12 font-sans text-slate-800">
        <Header />
        
        <main className="container mx-auto px-4 max-w-5xl">
          {state === AppState.UPLOAD && (
            <UploadView onImageSelect={handleImageSelect} />
          )}
  
          {state === AppState.ANALYZING && (
            <Loading text="AI 老师正在分析错题..." />
          )}
  
          {state === AppState.REVIEW && analysis && image && (
            <AnalysisView 
              analysis={analysis} 
              imageSrc={image} 
              onNext={startPractice} 
            />
          )}
  
          {state === AppState.GENERATING_QUIZ && (
            <Loading text="AI 老师正在准备练习题..." />
          )}
  
          {state === AppState.PRACTICE && (
            <QuizView 
                questions={questions} 
                onComplete={(score) => {
                    setFinalScore(score);
                    setState(AppState.SUCCESS);
                }}
            />
          )}

          {state === AppState.SUCCESS && (
              <ResultView 
                score={finalScore} 
                total={questions.length} 
                onReset={() => {
                    setState(AppState.UPLOAD);
                    setImage(null);
                    setAnalysis(null);
                    setQuestions([]);
                    setFinalScore(0);
                }} 
              />
          )}
        </main>
      </div>
    );
};

export default App;