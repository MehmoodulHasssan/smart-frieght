'use client';
import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
  Circle,
  CircleMarker,
  Polygon,
  Rectangle,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Icon,
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  PathOptions,
  latLngBounds,
} from 'leaflet';
import { decode, encode } from 'polyline';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import { useTheme } from '@/context/themeContext';
import { ScrollArea } from '../ui/scroll-area';
import useFetch from '@/hooks/useFetch';
import { useQuery } from '@tanstack/react-query';
import { getAddress, OSMPlace } from '@/utils/queries';
import leafletMarker from 'leaflet/dist/images/marker-icon-2x.png';
import { UseFormReturn } from 'react-hook-form';
import { Location } from '@/app/orders/new/CreateOrder';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import MapModalWrapper from './MapModalWrapper';
import CloseButton from '../CloseButton';

const center = [30.3753, 69.3451]; // Approximate center of Pakistan

export const customLocationIcon = new Icon({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png', // Default marker icon URL

  iconSize: [32, 32], // Resize the default icon
  iconAnchor: [16, 32], // Anchor the icon at the bottom
  popupAnchor: [0, -32], // Adjust the popup position
});

function LocationMarker({ location }: { location: Location | null }) {
  // const map = useMapEvents({
  //   // triggerd by click event on map
  //   click(e) {
  //     console.log(e);
  //     setPosition(e.latlng);
  //     map.flyTo(e.latlng, map.getZoom());
  //     map.flyToBounds(rectangle);
  //     //it triggers map to get user's location and then triggers location found
  //     map.locate();
  //   },

  //   //triggered by browser geolocaiton service
  //   locationfound(e) {
  //     console.log(e);
  //     //   console.log(e.latlng);
  //   },

  // });
  const map = useMap();

  useEffect(() => {
    if (location) {
      console.log(location);
      map.flyTo(location?.position, 16);
    }
  }, [location, map]);

  return location ? (
    <Marker
      position={[location?.position.lat, location?.position.lng]}
      icon={customLocationIcon}
    >
      <Popup></Popup>
    </Marker>
  ) : null;
}

interface MapProps {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Map: React.FC<MapProps> = ({
  location,
  setOpen,
  isOpen,
  setLocation,
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  // const map = useMap();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [searchQuery],
    queryFn: () => getAddress(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearchSubmit = () => {
    if (inputRef?.current?.value) {
      setSearchQuery(inputRef.current.value);
      setShowSearchResults(true);
    }
  };

  const handleChangeLocation = () => {
    inputRef.current!.readOnly = false;
    inputRef.current!.focus();
    setLocation(null);
  };

  const handleClickNode = (addressNode: OSMPlace) => {
    const currPosition = new LatLng(+addressNode.lat, +addressNode.lon);
    setLocation({
      position: currPosition,
      address: addressNode.display_name,
    });
    setShowSearchResults(false);
    inputRef.current!.value = addressNode.display_name;
    inputRef.current!.readOnly = true;

    // map.flyTo(currPosition, 13);
  };

  useEffect(() => {
    if (location) {
      inputRef.current!.readOnly = true;
      inputRef.current!.value = location?.address;
    }
  }, []);

  return (
    <MapModalWrapper>
      <CloseButton onClick={() => setOpen(false)} />
      <div className="h-10 w-full relative flex">
        <Button
          variant={'outline'}
          className={`${
            theme == 'dark' ? 'bg-black' : 'bg-white'
          } text-center flex-shrink-0`}
          onClick={location ? handleChangeLocation : handleSearchSubmit}
          size={'icon'}
          title={location ? 'Change location' : 'Search a place'}
          disabled={isLoading}
        >
          {!isLoading &&
            (location ? (
              <LiaExchangeAltSolid fill={theme == 'dark' ? 'white' : ''} />
            ) : (
              <IoSearchOutline fill={theme == 'dark' ? 'white' : ''} />
            ))}
          {isLoading && <span className="loader"></span>}
        </Button>
        <Input
          className="w-full flex-grow"
          ref={inputRef}
          placeholder="Search a place"
        />
        <div
          className={`absolute top-10 w-full left-0 z-50 ${
            theme == 'dark' ? 'bg-black' : 'bg-white'
          }`}
        >
          {showSearchResults && data && (
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {data.length > 0 &&
                  data.map((addressNode) => (
                    <div
                      key={addressNode.osm_id}
                      className="text-sm flex items-center justify-start p-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                      onClick={() => handleClickNode(addressNode)}
                    >
                      <p>{addressNode.display_name}</p>
                    </div>
                  ))}
                {data.length == 0 && (
                  <div className="text-sm flex items-center justify-start p-2 rounded-md hover:bg-gray-300 hover:cursor-pointer">
                    <p className="text-red-500">No results found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
      {
        <MapContainer
          style={{ height: '100%', width: '100%', zIndex: 10 }}
          center={center as LatLngExpression}
          zoom={5}
          // ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker location={location ? location : null} />
        </MapContainer>
      }
    </MapModalWrapper>
  );
};

export default Map;
