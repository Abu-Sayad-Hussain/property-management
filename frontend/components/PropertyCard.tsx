import Link from 'next/link';
import { FC } from 'react';

interface PropertyCardProps {
  id: number;
  name: string;
  city: string;
  state: string;
  imageUrl: string;
}

const PropertyCard: FC<PropertyCardProps> = ({ id, name, city, state, imageUrl }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{city}, {state}</p>
        <Link href={`/properties/${id}`}>
          <a className="text-blue-500">View Details</a>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
