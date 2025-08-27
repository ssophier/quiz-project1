import React from 'react';
import { Question } from '../../data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionIndex: number) => void;
  selectedAnswer?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  selectedAnswer
}) => {
  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 p-8 md:p-12">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-10 leading-tight tracking-tight">
            {question.question}
          </h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswer(index)}
                className={`group w-full text-left p-6 md:p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  selectedAnswer === index
                    ? 'bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/40 shadow-xl shadow-accent/20'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/10'
                }`}
              >
                <div className="flex items-start space-x-6">
                  <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedAnswer === index
                      ? 'border-accent bg-accent shadow-lg shadow-accent/40'
                      : 'border-white/40 group-hover:border-white/60'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className={`text-lg md:text-xl leading-relaxed transition-all duration-300 ${
                    selectedAnswer === index 
                      ? 'text-white font-medium' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/5 to-cyan-500/10 rounded-3xl blur-2xl scale-105 -z-10 opacity-60" />
    </div>
  );
};