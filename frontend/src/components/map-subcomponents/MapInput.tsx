'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
// import MapModal from './MapModal';
import { useTheme } from '@/context/myThemeContext';
import Image from 'next/image';
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';
import { Location } from '@/app/orders/new/CreateOrder';
import { limitString } from '@/utils/helpers';

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
  const [showToolTip, setShowToolTip] = React.useState(false);
  const { theme } = useTheme();

  const handleOpenMap = () => {
    setMapModalOpen(true);
  };

  return (
    <>
      <div className="relative w-full">
        <label
          htmlFor="location"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {props.label}
        </label>
        <Input
          value={
            props.location?.address
              ? limitString(props.location?.address, 35)
              : ''
          }
          placeholder={props.placeholder}
          type={'text'}
          readOnly
          className="hover:cursor-pointer"
          onClick={handleOpenMap}
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        />

        {showToolTip && (
          <div
            onMouseEnter={() => setShowToolTip(true)}
            onMouseLeave={() => setShowToolTip(false)}
            className={`absolute top-16 left-0 z-10 w-full rounded ${
              theme == 'dark' ? 'bg-black text-white' : 'bg-white text-black'
            } px-2 py-1 text-xs shadow-lg `}
          >
            {props.location?.address}
          </div>
        )}

        <Image
          width={22}
          height={22}
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
