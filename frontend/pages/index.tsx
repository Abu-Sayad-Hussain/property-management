import { FC, useState } from 'react';
import Header from '../components/Header';
import PropertyCard from '../components/PropertyCard';
import { Property } from '@/types/property';

const IndexPage: FC = () => {
  const [properties, setProperties] = useState([]);

  const searchProperties = async (query: string) => {
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
          onChange={(e) => searchProperties(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {properties.map((property: Property) => (
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

export default IndexPage;