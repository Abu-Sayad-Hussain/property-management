import { FC } from 'react';
import { Property } from '@/types/property';

interface PropertyCardProps {
    id: number,
    name: string,
    city: string,
    state: string,
    imageUrl: string
};

const PropertyCard: FC<PropertyCardProps> = ({ id, name, city, state, imageUrl }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-700">{city}, {state}</p>
      </div>
    </div>
  );
};

export default PropertyCard;