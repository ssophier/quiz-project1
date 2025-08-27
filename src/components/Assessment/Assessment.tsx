import React from 'react';
import { useAssessment } from '../../hooks/useAssessment';
import { WelcomePage } from './WelcomePage';
import { QuestionCard } from './QuestionCard';
import { ProgressBar } from './ProgressBar';
import { EmailCapture } from './EmailCapture';
import { ResultsPage } from '../Results/ResultsPage';

export const Assessment: React.FC = () => {
  const {
    currentStep,
    currentQuestion,
    question,
    selectedAnswer,
    userInfo,
    assessmentResult,
    resultTemplate,
    loading,
    canGoNext,
    canGoPrevious,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitEmail,
    startAssessment,
  } = useAssessment();

  if (currentStep === 'welcome') {
    return <WelcomePage onStart={startAssessment} />;
  }

  if (currentStep === 'email') {
    return <EmailCapture onSubmit={submitEmail} loading={loading} />;
  }

  if (currentStep === 'results' && userInfo && assessmentResult && resultTemplate) {
    return (
      <ResultsPage
        result={resultTemplate}
        userInfo={userInfo}
        score={assessmentResult.score}
        maxScore={assessmentResult.maxScore}
      />
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Motion Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/10" />
        
        {/* Motion Blur Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-primary/25 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-cyan-300/25 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/15 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-tight">
            Conversion Growth
            <span className="block text-accent font-normal">Assessment</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Unlock your revenue potential with a personalized growth strategy
          </p>
        </div>

        {/* Elegant Progress Display */}
        <div className="max-w-2xl mx-auto mb-12">
          <ProgressBar 
            current={currentQuestion + 1} 
            total={8} 
          />
        </div>

        {/* Question Card */}
        <QuestionCard
          question={question}
          onAnswer={answerQuestion}
          selectedAnswer={selectedAnswer}
        />

        {/* Premium Navigation */}
        <div className="flex justify-between items-center max-w-2xl mx-auto mt-12">
          <button
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            className={`group px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
              canGoPrevious
                ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105'
                : 'bg-white/5 text-white/40 cursor-not-allowed border border-white/10'
            }`}
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </span>
          </button>

          <button
            onClick={nextQuestion}
            disabled={!canGoNext}
            className={`group px-10 py-4 rounded-2xl font-semibold transition-all duration-300 ${
              canGoNext
                ? 'bg-gradient-to-r from-accent to-primary text-white shadow-xl hover:shadow-2xl hover:shadow-accent/25 hover:scale-105 border border-white/20'
                : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
            }`}
          >
            <span className="flex items-center">
              {currentQuestion === 7 ? 'Complete Assessment' : 'Continue'}
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};