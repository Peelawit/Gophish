'use client'

import { useState } from 'react';
import MicrosoftLogo from './MicrosoftLogo';
import { KeyRound, Loader2 } from 'lucide-react';

export default function PasswordPage({ email, onBack, onSubmit, isLoading = false }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    // Here you would normally handle authentication
    // For demo purposes we'll just pass the credentials up
    onSubmit({ email, password });
  };

  return (
    <div>
      <div className="flex flex-col bg-white shadow-xl p-12 w-[440px]">
        <MicrosoftLogo />
        
        <div className="flex items-center mt-6 mb-4">
          <button 
            onClick={onBack}
            disabled={isLoading}
            className="text-gray-500 mr-3 cursor-pointer hover:rounded-full hover:bg-gray-300 p-1 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="text-sm text-gray-600">{email}</span>
        </div>
        
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">Enter password</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
              {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
              className="w-full pt-2 pb-2 text-sm text-gray-800 border-b-2 border-gray-300 focus:border-ms-blue focus:outline-none disabled:opacity-50"
              aria-label="Password"
            />
          </div>
          
          <div className="text-sm text-[#1e79c0] mb-6">
            <a href="#" className="hover:underline">Forgot my password</a>
          </div>
          
          <div className="flex justify-end pt-10 gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="px-10 py-1 text-md bg-gray-200 cursor-pointer text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-1 bg-[#0067b8] text-white cursor-pointer hover:bg-[#0067b8] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 