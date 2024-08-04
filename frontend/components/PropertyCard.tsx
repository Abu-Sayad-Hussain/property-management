import { FC } from 'react';
import Link from 'next/link';

interface PropertyCardProps {
  id: number;
  name: string;
  city: string;
  state: string;
  imageUrl?: string;
}

const PropertyCard: FC<PropertyCardProps> = ({ id, name, city, state, imageUrl }) => {
  return (
    <Link href={`/properties/${id}`} passHref>
      <div className="block p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
        <img src={imageUrl || '/placeholder.png'} alt={name} className="w-full h-32 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-sm text-gray-600">{city}, {state}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;