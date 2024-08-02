import { FC, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import Header from '../components/Header';

const SearchPage: FC = () => {
  const [query, setQuery] = useState('');
  const [properties, setProperties] = useState([]);

  const searchProperties = async () => {
    const res = await fetch(`/api/properties?query=${query}`);
    const data = await res.json();
    setProperties(data);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search properties..."
          className="p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchProperties}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {properties.map((property: any) => (
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

export default SearchPage;