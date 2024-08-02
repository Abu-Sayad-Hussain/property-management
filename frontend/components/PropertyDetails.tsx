import { FC } from 'react';

interface PropertyDetailsProps {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  phone: string;
  type: string;
  capacity: number;
  images: string[];
}

const PropertyDetails: FC<PropertyDetailsProps> = ({ name, address, city, state, zip, county, phone, type, capacity, images }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{address}, {city}, {state} {zip}</p>
      <p>County: {county}</p>
      <p>Phone: {phone}</p>
      <p>Type: {type}</p>
      <p>Capacity: {capacity}</p>

      <div className="mt-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Property image ${index}`} className="w-full h-64 object-cover mt-2" />
        ))}
      </div>
    </div>
  );
};

export default PropertyDetails;
