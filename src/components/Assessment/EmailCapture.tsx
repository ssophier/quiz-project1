import React, { useState } from 'react';
import { validateEmail, validateName } from '../../utils/emailValidation';

interface EmailCaptureProps {
  onSubmit: (email: string, name: string) => void;
  loading?: boolean;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string; name?: string } = {};
    
    if (!validateName(name)) {
      newErrors.name = 'Please enter your first name';
    }
    
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(email, name);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Sophisticated Motion Blur Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/10" />
        
        {/* Motion Blur Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-bl from-primary/20 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-500/15 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Premium Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/20 p-8 md:p-10">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-3xl" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              {/* Premium Success Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-accent/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                Your Strategy
                <span className="block text-accent font-normal">Awaits</span>
              </h2>
              <p className="text-white/80 text-lg font-light leading-relaxed">
                Personalized insights to unlock your revenue potential
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-white/90 text-slate-900 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-white/30'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-300">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-white/90 text-slate-900 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-white/30'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent to-primary text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-accent/25 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating Results...
                  </div>
                ) : (
                  'Get My Results'
                )}
              </button>
            </form>

            <p className="text-xs text-white/60 text-center mt-4">
              We respect your privacy. Your information will only be used to send you valuable conversion tips and your assessment results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};