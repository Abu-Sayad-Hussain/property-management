import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropertyDetails from '../../components/PropertyDetails';
import Header from '../../components/Header';
import { Property } from '../../types/property';
import useAuth from '../../hooks/useAuth';

const PropertyPage: FC = () => {
  const [property, setProperty] = useState<Property | null>(null);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Redirect to login page if not authenticated
      return;
    }

    const fetchProperty = async () => {
      if (!id) return; // Ensure id is defined

      try {
        const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Pass the token
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login'); // Redirect to login page if unauthorized
          } else {
            console.error(`Failed to fetch property: ${res.statusText}`);
          }
          return;
        }

        const propertyData: Property = await res.json();
        setProperty(propertyData);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id, isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) return <div>Loading...</div>; // Show loading state while checking authentication

  if (!property) return <div className="container mx-auto p-6">Property not found</div>;

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

export default PropertyPage;