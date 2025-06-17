'use client'

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function SuccessContent() {
  const [countdown, setCountdown] = useState(5);
  const searchParams = useSearchParams();
  const rid = searchParams.get('rid');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to Microsoft or close window
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          เข้าสู่ระบบสำเร็จ
        </h1>
        
        <p className="text-gray-600 mb-6">
          ขอบคุณที่เข้าสู่ระบบ Microsoft Account ของคุณ
        </p>
        
        {rid && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>หมายเหตุ:</strong> นี่เป็นการทดสอบความปลอดภัย
            </p>
          </div>
        )}
        
        <div className="text-sm text-gray-500">
          หน้าต่างนี้จะปิดโดยอัตโนมัติใน {countdown} วินาที
        </div>
        
        <button
          onClick={() => window.close()}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          ปิดหน้าต่าง
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-6"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
} 