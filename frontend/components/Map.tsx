import { FC } from 'react';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <div className="w-full h-64">
      {/* Replace this with actual map integration */}
      <div>Map Placeholder: Lat {latitude}, Long {longitude}</div>
    </div>
  );
};

export default Map;