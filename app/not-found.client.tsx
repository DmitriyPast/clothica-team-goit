'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundTimer() {
  const router = useRouter();
  const [seconds, setSeconds] = useState<number | null>(null);

  useEffect(() => {
    setSeconds(5);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds(prev => (prev ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      router.push('/');
    }
  }, [seconds, router]);

  return <strong>Redirecting in {seconds} seconds...</strong>;
}
