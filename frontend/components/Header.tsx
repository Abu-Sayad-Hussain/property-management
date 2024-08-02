import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Property Management</h1>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;