import { FC, useState, useEffect } from 'react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Property } from '@/types/property';
import useAuth from '../hooks/useAuth';

const HomePage: FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  const searchProperties = async (query: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
        },
      });

      if (res.status === 401) {
        // If unauthorized, redirect to login page
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setProperties(data);
        setError(null); // Clear any previous errors
      } else {
        // Handle other errors
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to fetch properties');
    }
  };

  if (loading || !isAuthenticated) return <div>Loading...</div>; // Optional: Show loading state while checking authentication

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
      <input
          type="text"
          placeholder="Search properties..."
          className="p-2 border border-gray-300 rounded text-gray-900"
          onChange={(e) => searchProperties(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              name={property.name}
              city={property.city}
              state={property.state}
              imageUrl={property.imageUrl}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;