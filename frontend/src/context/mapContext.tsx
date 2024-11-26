// // mapContext.tsx
// import React, {
//   createContext,
//   use,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';
// import { MapContainer, useMap } from 'react-leaflet';
// import { Map } from 'leaflet';

// interface MapContextType {
//   mapInstance: Map | null;
//   setMapInstance: React.Dispatch<React.SetStateAction<Map | null>>;
// }

// const MapContext = createContext<MapContextType | undefined>(undefined);

// export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [mapInstance, setMapInstance] = useState<Map | null>(null);
//   const map = useMap();
//   useEffect(() => {
//     if (!mapInstance) {
//       setMapInstance(map);
//     }
//   }, [mapInstance, map]);

//   return (
//     <MapContext.Provider value={{ mapInstance, setMapInstance }}>
//       {children}
//     </MapContext.Provider>
//   );
// };

// export const useMapContext = () => {
//   const context = useContext(MapContext);
//   if (!context) {
//     throw new Error('useMapContext must be used within a MapProvider');
//   }
//   return context;
// };
