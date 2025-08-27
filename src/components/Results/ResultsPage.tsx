import React from 'react';
import { ResultTemplate } from '../../utils/scoring';

interface ResultsPageProps {
  result: ResultTemplate;
  userInfo: {
    name: string;
    email: string;
  };
  score: number;
  maxScore: number;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ result, userInfo, score, maxScore }) => {
  const scorePercentage = Math.round((score / maxScore) * 100);
  
  // Calculate category scores based on the result category
  const getCategoryScores = () => {
    switch (result.category) {
      case 'content_creator':
        return { contentStrategy: 25, leadGeneration: 15, conversionSystem: 10 };
      case 'getting_there':
        return { contentStrategy: 65, leadGeneration: 50, conversionSystem: 35 };
      case 'conversion_pro':
        return { contentStrategy: 85, leadGeneration: 80, conversionSystem: 75 };
      default:
        return { contentStrategy: 50, leadGeneration: 50, conversionSystem: 50 };
    }
  };
  
  const categoryScores = getCategoryScores();

  const handleBookCall = () => {
    window.open('https://calendly.com/stefanieharma/30min', '_blank');
  };

  const handleShare = () => {
    const text = `I just completed the OverlySocial Conversion Audit and discovered I'm "${result.title}"! 🎯`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'My Conversion Audit Results', text, url });
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Motion Blur Background - Same as quiz pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/10" />
        
        {/* Motion Blur Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-primary/25 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-cyan-300/25 rounded-full blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/15 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header Section with Score Visualization */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Premium Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight leading-tight">
                Your Results
                <span className="block text-accent font-normal">Are Ready</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                Hey {userInfo.name}, here's your personalized conversion assessment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Score Visualization */}
              <div className="text-center">
                <div className="relative inline-block">
                  {/* Premium Glassmorphism Container */}
                  <div className="relative w-64 h-64 mx-auto bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl shadow-black/20">
                    <svg className="w-full h-full transform -rotate-90 p-4" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="6"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${scorePercentage * 2.51} 251.2`}
                        className="transition-all duration-2000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8798f7" />
                          <stop offset="100%" stopColor="#3a35fb" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center Score */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-light text-white mb-2">
                        {scorePercentage}%
                      </div>
                      <div className="text-sm text-white/70 font-light">
                        Your Overall Score
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-center space-x-6 mt-8 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                    <span className="text-white/70">High-yield for improvement</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-white/70">Some optimizations possible</span>
                  </div>
                </div>
              </div>
              
              {/* Right: Results Text */}
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-white mb-4 leading-tight">
                  Your conversion type is
                  <span className="block text-accent font-normal">{result.category.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                </h2>
                
                <p className="text-white/80 text-lg mb-6 leading-relaxed font-light">
                  Thank you, {userInfo.name}! If you've chosen to receive emails from us, we've sent a 
                  comprehensive report to {userInfo.email}.
                </p>
                
                <p className="text-white/70 text-base leading-relaxed font-light mb-8">
                  {result.subtitle}
                </p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleShare}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-light hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
                  >
                    Share Results
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-8 py-4 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-medium hover:shadow-xl hover:shadow-accent/25 transition-all hover:scale-105"
                  >
                    Save as PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown Section */}
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
              We've scored you against the following evidence-based dimensions of conversion success:
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Content Strategy */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-black/20 hover:bg-white/15 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mx-auto mb-6 shadow-xl shadow-orange-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-xl mb-3">Content Strategy</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-light">
                  Your ability to create content that attracts, engages, and converts your ideal clients into leads and customers.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-light text-lg">{categoryScores.contentStrategy}%</span>
                    <span className="text-xs text-white/60 font-light">
                      {categoryScores.contentStrategy < 50 ? 'High-yield for improvement' : 'Some optimizations possible'}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-2000 ${
                        categoryScores.contentStrategy < 50 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                      }`}
                      style={{ width: `${categoryScores.contentStrategy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lead Generation */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-black/20 hover:bg-white/15 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mx-auto mb-6 shadow-xl shadow-green-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-xl mb-3">Lead Generation</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-light">
                  Your systems for capturing interested prospects and building relationships that turn into sales conversations.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-light text-lg">{categoryScores.leadGeneration}%</span>
                    <span className="text-xs text-white/60 font-light">
                      {categoryScores.leadGeneration < 50 ? 'High-yield for improvement' : 'Some optimizations possible'}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-2000 delay-300 ${
                        categoryScores.leadGeneration < 50 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                      }`}
                      style={{ width: `${categoryScores.leadGeneration}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Conversion System */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl shadow-black/20 hover:bg-white/15 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl mx-auto mb-6 shadow-xl shadow-cyan-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-white font-light text-xl mb-3">Conversion System</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-light">
                  Your ability to turn leads into paying clients through strategic nurturing and effective sales processes.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-light text-lg">{categoryScores.conversionSystem}%</span>
                    <span className="text-xs text-white/60 font-light">
                      {categoryScores.conversionSystem < 50 ? 'High-yield for improvement' : 'Some optimizations possible'}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-2000 delay-500 ${
                        categoryScores.conversionSystem < 50 ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                      }`}
                      style={{ width: `${categoryScores.conversionSystem}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Diagnosis Section */}
            <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="px-8 py-6 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-orange-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight">What's Really Happening</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-white/90 leading-relaxed whitespace-pre-line text-base font-light">
                    {result.diagnosis}
                  </div>
                </div>
              </div>
            </section>

            {/* Problem Why Section */}
            <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="px-8 py-6 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-red-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight">Why This Is Costing You</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-white/90 leading-relaxed whitespace-pre-line text-base font-light">
                    {result.problemWhy}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Win Section */}
            <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="px-8 py-6 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-green-500/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight">30-Minute Quick Win</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-white/90 leading-relaxed whitespace-pre-line text-base font-light">
                    {result.quickWin}
                  </div>
                </div>
              </div>
            </section>

            {/* 30-Day Strategy Section */}
            <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="px-8 py-6 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-accent/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight">Your 30-Day Action Plan</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-white/90 leading-relaxed whitespace-pre-line text-base font-light">
                    {result.thirtyDayStrategy}
                  </div>
                </div>
              </div>
            </section>

            {/* OverlySocial Section */}
            <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="px-8 py-6 border-b border-white/20">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mr-4 shadow-xl shadow-primary/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-tight">About OverlySocial</h2>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-white/90 leading-relaxed whitespace-pre-line text-base font-light">
                    {result.overlySocialIntro}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Call-to-Action Section */}
            <section className="bg-white/15 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl shadow-black/30 p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/10 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  Ready to transform your conversion system?
                </h3>
                <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                  Master each dimension of conversion success with personalized guidance from Stefany and the OverlySocial team.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={handleBookCall}
                    className="bg-gradient-to-r from-accent to-primary text-white px-12 py-5 rounded-2xl font-medium text-lg hover:shadow-2xl hover:shadow-accent/25 transition-all hover:scale-105 border border-white/20"
                  >
                    Book a Strategy Call
                  </button>
                  <p className="text-sm text-white/60 font-light">
                    Start your journey with our step-by-step consultation or Done-For-You Conversion System that's used by hundreds of entrepreneurs.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};