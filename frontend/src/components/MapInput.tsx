'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
// import MapModal from './MapModal';
import { useTheme } from '@/context/themeContext';
import Image from 'next/image';
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';
import { Location } from '@/app/orders/new/CreateOrder';

const MapModal = dynamic(() => import('./MapModal'), { ssr: true });

interface LocationInputProps {
  name: string;
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  label: string;
  placeholder?: string;
}

const MapInput = (props: LocationInputProps) => {
  const [mapModalOpen, setMapModalOpen] = React.useState(false);
  const { theme } = useTheme();
  const handleOpenMap = () => {
    setMapModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full">
        <Input
          value={props.location?.address}
          placeholder={props.placeholder}
          type={'text'}
          readOnly
          className="hover:cursor-pointer"
          onClick={handleOpenMap}
        />
        <Image
          width={25}
          height={25}
          className="absolute right-2 bottom-1"
          objectPosition="center"
          src={
            theme === 'light'
              ? '/images/location-black.png'
              : '/images/location-white.png'
          }
          alt="map"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </div>
      {mapModalOpen && (
        <MapModal
          location={props.location}
          setLocation={props.setLocation}
          setOpen={setMapModalOpen}
          isOpen={mapModalOpen}
        />
      )}
    </>
  );
};

export default MapInput;
