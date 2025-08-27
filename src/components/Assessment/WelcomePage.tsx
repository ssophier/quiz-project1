import React from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
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

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight leading-tight">
              Conversion Growth
              <span className="block text-accent font-normal">Assessment</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Discover why your content gets engagement but doesn't convert to clients
            </p>
            
            {/* CTA Button */}
            <button
              onClick={onStart}
              className="group bg-gradient-to-r from-accent to-primary text-white px-16 py-6 rounded-3xl font-medium text-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105 border border-white/20 mb-16"
            >
              <span className="flex items-center justify-center">
                Start the Assessment
                <svg className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Value Statement Section */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 p-12 mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
                In just 90 seconds, you'll discover:
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center mr-4 mt-1 shadow-xl shadow-accent/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">Your Conversion Type</h3>
                      <p className="text-white/80 font-light">Whether you're a Content Creator, Getting There, or Conversion Pro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 mt-1 shadow-xl shadow-green-500/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">30-Minute Quick Win</h3>
                      <p className="text-white/80 font-light">An actionable step you can implement today to see immediate results</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 mt-1 shadow-xl shadow-orange-500/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">Revenue Gaps</h3>
                      <p className="text-white/80 font-light">Exactly where you're losing potential clients and money</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 mt-1 shadow-xl shadow-purple-500/30">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-2">30-Day Action Plan</h3>
                      <p className="text-white/80 font-light">A personalized roadmap to transform your conversion system</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-white/60 text-sm font-light mb-12">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              90 seconds
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              8 questions
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% free
            </div>
          </div>

          {/* Trust Signal */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <p className="text-white/70 font-light text-lg">
              "This assessment helped me identify the exact gaps in my conversion system. 
              Within 30 days, I doubled my lead-to-client conversion rate."
            </p>
            <p className="text-white/50 font-light mt-4">— Emily C., Business Coach</p>
          </div>
        </div>
      </div>
    </div>
  );
};