import { FC } from 'react';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';

const Header: FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link href="/home" legacyBehavior>
          <a className="text-2xl font-bold">Property Management</a>
        </Link>
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={logout} className="mr-4">
            Logout
          </button>
        ) : (
          <>
            <Link href="/login" legacyBehavior>
              <a className="mr-4">Login</a>
            </Link>
            <Link href="/register" legacyBehavior>
              <a>Register</a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;