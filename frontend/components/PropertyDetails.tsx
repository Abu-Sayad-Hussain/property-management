import { FC } from 'react';

interface PropertyDetailsProps {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  type?: string;
  capacity?: number;
  images?: string[];
}

const PropertyDetails: FC<PropertyDetailsProps> = ({
  name,
  address,
  city,
  state,
  zip,
  country,
  phone,
  type,
  capacity,
  images,
}) => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold mb-2">{name}</h1>
        <p className="text-lg font-medium text-gray-700">
          {address && `${address}, `}
          {city && `${city}, `}
          {state && `${state} `}
          {zip && `- ${zip}`}
        </p>
        {country && (
          <p className="text-lg font-medium text-gray-700">Country: {country}</p>
        )}
        {phone && (
          <p className="text-lg font-medium text-gray-700">Phone: {phone}</p>
        )}
        {type && (
          <p className="text-lg font-medium text-gray-700">Type: {type}</p>
        )}
        {capacity && (
          <p className="text-lg font-medium text-gray-700">Capacity: {capacity}</p>
        )}
      </header>

      <section>
        {images && images.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Property image ${index}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </section>

      <footer className="mt-8">
        <p className="text-gray-500">Details are subject to change. Please contact us for the most accurate information.</p>
      </footer>
    </div>
  );
};

export default PropertyDetails;