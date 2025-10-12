'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Pequeño delay para mostrar la pantalla de carga
    const timer = setTimeout(() => {
      if (authService.isAuthenticated()) {
        router.push('/books');
      } else {
        router.push('/login');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LoadingSpinner 
      fullScreen 
      text="✨ Preparando tu experiencia de biblioteca..." 
      size="xl" 
    />
  );
}
