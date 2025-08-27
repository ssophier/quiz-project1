import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      {/* Elegant Question Counter */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
          <span className="text-white/80 font-light text-lg">
            Question <span className="text-accent font-medium">{current}</span> of {total}
          </span>
        </div>
      </div>
      
      {/* Premium Progress Bar */}
      <div className="relative w-full">
        {/* Background track */}
        <div className="w-full h-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
          {/* Progress fill with glow */}
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent via-primary to-cyan-400 transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
        
        {/* Glowing dots for each question */}
        <div className="flex justify-between absolute -top-1 w-full">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < current
                  ? 'bg-accent shadow-lg shadow-accent/50 scale-110'
                  : index === current - 1
                  ? 'bg-white/60 scale-105 animate-pulse'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};