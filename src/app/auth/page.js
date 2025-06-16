'use client'

import { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import EmailPage from '@/components/auth/EmailPage';
import PasswordPage from '@/components/auth/PasswordPage';

export default function AuthPage() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  
  const handleEmailNext = (email) => {
    setEmail(email);
    setStep('password');
  };
  
  const handleBack = () => {
    setStep('email');
  };
  
  const handleSubmit = (credentials) => {
    console.log('Login attempted with:', credentials);
    // Here you would handle the login logic with your authentication service
    alert('ล็อกอินด้วย: ' + credentials.email);
  };
  
  return (
    <AuthLayout>
      {step === 'email' ? (
        <EmailPage onNext={handleEmailNext} />
      ) : (
        <PasswordPage 
          email={email} 
          onBack={handleBack} 
          onSubmit={handleSubmit} 
        />
      )}
    </AuthLayout>
  );
} 