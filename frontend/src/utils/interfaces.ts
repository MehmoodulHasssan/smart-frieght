export interface Vehicle {
  _id: string;
  license_plate: string;
  vehicle_model: string;
  capacity: number;
  status: string;
  avg_fuel_consumption: number;
  notes?: string;
}

export interface City {
  _id: string;
  name: string;
  northeast_latitude: number;
  northeast_longitude: number;
  southwest_latitude: number;
  southwest_longitude: number;
}
