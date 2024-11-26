'use client';
import React, { useState } from 'react';
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
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LatLng,
  LatLngBoundsExpression,
  LatLngExpression,
  PathOptions,
  latLngBounds,
} from 'leaflet';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { IoSearchOutline } from 'react-icons/io5';
import { useTheme } from '@/context/themeContext';
import { ScrollArea } from './ui/scroll-area';

const center = [51.505, -0.09];

const polyline: LatLngExpression[] = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];

// latLngBounds(polyline);

const multiPolyline: LatLngExpression[][] = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
];

const polygon: LatLngExpression[] = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
];

const multiPolygon: LatLngExpression[][] = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
];

const rectangle: LatLngBoundsExpression = [
  [51.49, -0.08],
  [51.5, -0.06],
];

const tags = Array.from(
  { length: 10 },
  (_, index) => index + 'It is not a game bro, its just a map suggestion'
);

const fillBlueOptions = { fillColor: 'blue' };
const blackOptions = { color: 'black' };
const limeOptions: PathOptions = { color: 'green', weight: 7, opacity: 0.5 };
const purpleOptions = { color: 'purple' };
const redOptions = { color: 'red' };

// function LocationMarker() {
//   const [position, setPosition] = useState<LatLng | null>(null);

//   const map = useMapEvents({
//     // triggerd by click event on map
//     click(e) {
//       console.log(e);
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//       map.flyToBounds(rectangle);
//       //it triggers map to get user's location and then triggers location found
//       map.locate();
//     },

//     //triggered by browser geolocaiton service
//     locationfound(e) {
//       console.log(e);
//       //   console.log(e.latlng);
//     },
//   });

//   return position ? (
//     <Marker position={[position.lat, position.lng]}>
//       <Popup>You are here</Popup>
//     </Marker>
//   ) : null;
// }

const Map: React.FC<{
  point: LatLng | null;
  setPoint: React.Dispatch<React.SetStateAction<LatLng | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}> = ({ point, setPoint, setOpen, isOpen }) => {
  const { theme } = useTheme();
  // const mapRef = React.useRef<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log(searchQuery);
    const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=jsonv2`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  // React.useEffect(() => {
  //   if (!mapRef.current) return;

  //   // Clean up map instance when modal is closed
  //   return () => {
  //     if (mapRef.current) {
  //       mapRef.current.leafletElement.remove();
  //       mapRef.current = null;
  //     }
  //   };
  // }, []);

  return (
    <div
      style={{ marginTop: 0 }}
      className={`fixed top-0 left-0 flex justify-center items-center bg-opacity-70 z-50 bg-black h-dvh w-dvw`}
    >
      <div
        className={`flex p-10 ${
          theme == 'dark' ? 'bg-black' : 'bg-white'
        } flex-col gap-2 w-2/4 h-3/4 border ${
          theme == 'dark' ? 'border-x-slate-200' : 'border-slate-900'
        } rounded-lg`}
      >
        <div className="h-10 w-full relative flex">
          <Button
            variant={'outline'}
            className={`${
              theme == 'dark' ? 'bg-slate-800' : 'bg-white'
            } text-center flex-shrink-0`}
            onClick={handleSearchSubmit}
            size={'icon'}
          >
            <IoSearchOutline fill={theme == 'dark' ? 'white' : ''} />
          </Button>
          <Input
            value={searchQuery}
            className="w-full flex-grow"
            onChange={handleSearchChange}
            placeholder="Search a place"
          />
          <div
            className={`absolute top-10 w-full left-0 z-50 ${
              theme == 'dark' ? 'bg-slate-800' : 'bg-white'
            }`}
          >
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="text-sm flex items-center justify-start p-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
                  >
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        {
          <MapContainer
            style={{ height: '100%', width: '100%', zIndex: 10 }}
            center={center as LatLngExpression}
            zoom={13}
            // ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
              center={[51.51, -0.12]}
              pathOptions={fillBlueOptions}
              radius={200}
            />
            <CircleMarker
              center={[51.51, -0.12]}
              pathOptions={redOptions}
              radius={20}
            >
              <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
            <Polyline pathOptions={limeOptions} positions={polyline} />
            <Polyline pathOptions={limeOptions} positions={multiPolyline} />
            <Polygon pathOptions={purpleOptions} positions={polygon} />
            <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
            <Rectangle bounds={rectangle} pathOptions={blackOptions} />
            {/* <LocationMarker /> */}
          </MapContainer>
        }
      </div>
    </div>
  );
};

export default Map;
