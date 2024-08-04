import { FC, useState, useEffect } from 'react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Property } from '@/types/property';
import useAuth from '../hooks/useAuth';

const HomePage: FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [scraping, setScraping] = useState<boolean>(false);
  const [scrapingMessage, setScrapingMessage] = useState<string | null>(null);
  const [scrapingError, setScrapingError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scrapeQuery, setScrapeQuery] = useState<string>('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  const searchProperties = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/properties?query=${searchQuery}`, {
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

  const scrapeProperties = async () => {
    setScraping(true);
    setScrapingMessage(null);
    setScrapingError(null);
    try {
      const searchTerms = scrapeQuery.split(',').map(term => term.trim()); // Split input by commas and trim spaces
      const res = await fetch(`http://localhost:5000/api/properties/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
        },
        body: JSON.stringify({ searchTerms }),
      });

      if (res.status === 401) {
        // If unauthorized, redirect to login page
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setScrapingMessage('Scraping is done. Please search to get the properties.');
        setScrapingError(null); // Clear any previous errors
      } else {
        // Handle other errors
        setScrapingError(data.message || 'An error occurred while scraping');
      }
    } catch (error) {
      console.error('Error scraping properties:', error);
      setScrapingError('Failed to scrape properties');
    } finally {
      setScraping(false);
    }
  };

  if (loading || !isAuthenticated) return <div>Loading...</div>; // Optional: Show loading state while checking authentication

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search properties..."
            className="p-2 border border-gray-300 rounded text-gray-900 mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={searchProperties}
          >
            Search
          </button>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Scrape properties (comma-separated)..."
            className="p-2 border border-gray-300 rounded text-gray-900 mr-2"
            value={scrapeQuery}
            onChange={(e) => setScrapeQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={scrapeProperties}
            disabled={scraping}
          >
            {scraping ? 'Scraping...' : 'Scrape'}
          </button>
        </div>
        {scrapingMessage && <div className="text-green-500">{scrapingMessage}</div>}
        {scrapingError && <div className="text-red-500">{scrapingError}</div>}
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