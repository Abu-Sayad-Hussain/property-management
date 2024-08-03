import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

const useAuthCheck = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  return { loading };
};

export default useAuthCheck;