import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import MapModalWrapper from './MapModalWrapper';
import CloseButton from '../CloseButton';
import { LatLng, LatLngExpression } from 'leaflet';
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { safeDecode } from '@/utils/helpers';
import { Location } from '@/app/orders/new/CreateOrder';
import { customLocationIcon, driverLocationIcon } from './MapModal';

const center = [30.3753, 69.3451]; // Approximate center of Pakistan

// Custom component to fit map to polyline
const FitToPolyLine: React.FC<{ positions: any }> = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions && positions.length > 0) {
      // const bounds = positions.map(([lat, lng]) => [lat, lng]);
      map.fitBounds(positions, { duration: 1 });
    }
  }, [map, positions]);

  return null;
};

const FitToMarker: React.FC<{ position: any }> = ({ position }) => {
  const map = useMap(); // Get the map instance

  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [map, position]);

  return null;
};

function LocationMarker({
  location,
  isDriver,
}: {
  location: Location;
  isDriver?: boolean;
}) {
  return location ? (
    <>
      <Marker
        position={[location?.position.lat, location?.position.lng]}
        icon={isDriver ? driverLocationIcon : customLocationIcon}
      >
        <Popup>{location?.address}</Popup>
      </Marker>
      <Circle
        radius={40}
        center={[location?.position.lat, location?.position.lng]}
        color="red"
      />
    </>
  ) : null;
}

interface PropTypes {
  onOpenChange: () => void;
  geometry: string;
  from: Location;
  to: Location;
  tracker?: Location;
}

const MapRouteModal = ({
  onOpenChange,
  from,
  geometry,
  to,
  tracker,
}: PropTypes) => {
  const bounds = safeDecode(geometry);
  console.log('Geometry Bounds: ', bounds);

  return (
    <MapModalWrapper>
      <CloseButton onClick={() => onOpenChange()} />
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        center={center as LatLngExpression}
        //   bounds={bounds}
        zoom={5}
        // ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          // pathOptions={{ color: 'blue' } as PathOptions}
          positions={bounds}
          pathOptions={{
            weight: 7,
            // color: 'blue',
          }}
        />
        {tracker && <FitToMarker position={tracker?.position} />}
        {!tracker && bounds && <FitToPolyLine positions={bounds} />}
        {!tracker && from && <LocationMarker location={from} />}
        {!tracker && to && <LocationMarker location={to} />}
        {tracker && <LocationMarker location={tracker} isDriver={true} />}
        {/* <LocationMarker location={location ? location : null} /> */}
      </MapContainer>
    </MapModalWrapper>
  );
};

export default MapRouteModal;
