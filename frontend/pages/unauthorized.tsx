// pages/unauthorized.tsx
import { FC } from 'react';
import Link from 'next/link';

const Unauthorized: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
        <p className="mb-4">You do not have access to this page.</p>
        <Link href="/login">
          <a className="text-blue-500">Go to Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;