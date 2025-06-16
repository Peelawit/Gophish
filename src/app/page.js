'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/auth');
  }, [router]);
  
  // return <div>กำลังเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ...</div>;
}
