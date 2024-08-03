// pages/properties/[id].tsx
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import PropertyDetails from '../../components/PropertyDetails';
import Header from '../../components/Header';
import { Property } from '../../types/property';

interface PropertyPageProps {
  property: Property;
}

const PropertyPage: FC<PropertyPageProps> = ({ property }) => {
  return (
    <div>
      <Header />
      <PropertyDetails
        name={property.name}
        address={property.address}
        city={property.city}
        state={property.state}
        zip={property.zip}
        country={property.country}
        phone={property.phone}
        type={property.type}
        capacity={property.capacity}
        images={property.images}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`http://localhost:5000/api/properties/${id}`);
  const property: Property = await res.json();

  return {
    props: {
      property,
    },
  };
};

export default PropertyPage;