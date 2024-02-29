
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the login page when the root URL is accessed
    router.push('/login');
  }, []);

  return null; 
}
