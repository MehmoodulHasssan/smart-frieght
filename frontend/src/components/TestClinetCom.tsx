'use client';
import React from 'react';
// import MapRouteModal from './map-subcomponents/MapRouteModal';
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';

const MapRouteModal = dynamic(
  () => import('./map-subcomponents/MapRouteModal'),
  { ssr: true }
);

const TestClinetCom = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <MapRouteModal
      geometry={
        '_`q~Dmlh}LyEaFbAkB_B{GiGTueCnnDeBbKyQzOyDp@}Jg@aA~@|@|PqOjUnM`NoKdOHjAkAS'
      }
      setOpen={setOpen}
      // to={
      // }
      from={{
        position: new LatLng(31.38586545, 73.12072457896113),
        address:
          'Rachna Town, Faisalabad District, Faisalabad Division, Punjab, Pakista…',
      }}
      to={{
        position: new LatLng(31.4187077, 73.0790905),
        address:
          'Rachna Town, Faisalabad District, Faisalabad Division, Punjab, Pakista…',
      }}
    />
  );
};

export default TestClinetCom;
