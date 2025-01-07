import { apiCall, ApiResponse } from './apiCall';
import { API_ROUTES, MAP_API_DOMAIN } from '@/apiConfig';

const getAddress = async (address: string): Promise<OSMPlaceResponse> => {
  const urlEncodedAddress = encodeURIComponent(address);
  const response = await apiCall(
    `${MAP_API_DOMAIN}/search?q=${urlEncodedAddress}&format=jsonv2`,
    'GET',
    undefined,
    undefined,
    true
  );
  console.log(response);
  return response;
  // const response = await fetch(`${MAP_API_DOMAIN}/search?q=${address}&format=jsonv2&addressdetails=1&limit=1&polygon=1&extratags=1`);
};

const getAllVehicles = async (): Promise<IVehicleRes> => {
  return await apiCall(API_ROUTES.PUBLIC.GET_ALL_VEHICLES, 'GET');
};

const getConsignorOrders = async () => {
  return await apiCall(API_ROUTES.CONSIGNOR.GET_ALL_ORDERS, 'GET');
};

export { getAddress, getAllVehicles, getConsignorOrders };

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

export interface IVehicleRes extends ApiResponse {
  data: IVehicle[];
}

interface IVehicle {
  _id: string; // MongoDB ObjectId represented as a string
  license_plate: string; // Vehicle's license plate number
  vehicle_model: string; // Model of the vehicle
  capacity: number; // Capacity of the vehicle in kilograms or other unit
  status: 'AVAILABLE' | 'UNAVAILABLE'; // Status with specific allowed values
  avg_fuel_consumption: number; // Average fuel consumption (e.g., liters per 100 km or km per liter)
  notes: string; // Additional notes about the vehicle}
}
