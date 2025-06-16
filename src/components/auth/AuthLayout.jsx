'use client'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f0f0] to-[#e6f2ff] p-4">
      {children}
    </div>
  );
} 