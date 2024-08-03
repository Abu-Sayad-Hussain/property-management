import React, { ComponentType } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const withAuth = (WrappedComponent: ComponentType) => {
  const Wrapper = (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;