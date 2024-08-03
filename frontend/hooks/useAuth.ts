// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (router.pathname !== '/login' && router.pathname !== '/register') {
        router.push('/login'); // Redirect to login if not authenticated and not on login/register page
      }
    }
    setLoading(false); // Set loading to false after checking authentication
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false);
    router.push('/login'); // Redirect to login page
  };

  return { isAuthenticated, loading, logout }; // Return loading state
};

export default useAuth;