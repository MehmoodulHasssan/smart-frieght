import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import MapModalWrapper from './MapModalWrapper';
import CloseButton from '../CloseButton';
import { LatLng, LatLngExpression } from 'leaflet';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { safeDecode } from '@/utils/helpers';
import { Location } from '@/app/orders/new/CreateOrder';
import { customLocationIcon } from './MapModal';

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

function LocationMarker({ location }: { location: Location }) {
  console.log(location);
  //   const map = useMap();

  // //   useEffect(() => {
  // //     if (location) {
  // //       console.log(location);
  // //       map.flyTo(location?.position, 16);
  // //     }
  // //   }, [location, map]);

  return location ? (
    <Marker
      position={[location?.position.lat, location?.position.lng]}
      icon={customLocationIcon}
    >
      <Popup></Popup>
    </Marker>
  ) : null;
}

interface PropTypes {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  geometry: string;
  from: Location;
  to: Location;
}

const MapRouteModal = ({ setOpen, from, geometry, to }: PropTypes) => {
  const bounds = safeDecode(geometry);

  return (
    <MapModalWrapper>
      <CloseButton onClick={() => setOpen(false)} />
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
        <FitToPolyLine positions={bounds} />
        {from && <LocationMarker location={from} />}
        {to && <LocationMarker location={to} />}
        {/* <LocationMarker location={location ? location : null} /> */}
      </MapContainer>
    </MapModalWrapper>
  );
};

export default MapRouteModal;
