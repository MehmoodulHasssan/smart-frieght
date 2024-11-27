import { apiCall } from './apiCall';
import { MAP_API_DOMAIN } from '@/apiConfig';

const getAddress = async (address: string): Promise<OSMPlaceResponse> => {
  const urlEncodedAddress = encodeURIComponent(address);
  const response = await apiCall(
    `${MAP_API_DOMAIN}/search?q=${urlEncodedAddress}&format=jsonv2`,
    'GET'
  );
  console.log(response);
  return response;
  // const response = await fetch(`${MAP_API_DOMAIN}/search?q=${address}&format=jsonv2&addressdetails=1&limit=1&polygon=1&extratags=1`);
};

export interface OSMPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string]; // Tuple of 4 strings (latitudes and longitudes)
}

type OSMPlaceResponse = OSMPlace[];

export { getAddress };
