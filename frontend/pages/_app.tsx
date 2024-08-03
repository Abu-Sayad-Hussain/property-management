// pages/_app.tsx
import '../styles/globals.css';
import { FC } from 'react';
import { AppProps } from 'next/app';
import useAuth from '../hooks/useAuth';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { isAuthenticated, loading } = useAuth(); // Get loading state

  if (loading) return <div>Loading...</div>; // Show loading state while checking authentication

  // Handle pages that should be accessible to authenticated users only
  if (!isAuthenticated && (Component.name !== 'LoginPage' && Component.name !== 'RegisterPage')) {
    return <div>Loading...</div>; // Show a loading state while redirecting
  }

  return <Component {...pageProps} />;
};

export default MyApp;