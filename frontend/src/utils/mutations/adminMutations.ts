import { ApiError, apiCall } from '../apiCall';
import { API_ROUTES } from '@/apiConfig';
import { IUserReq } from './authMutations';

export const createNewUser = async (data: IUserReq) => {
  return await apiCall(API_ROUTES.ADMIN.CREATE_USER, 'POST', data);
};

export const updateUser = async ({ _id, ...rest }: IUserReq) => {
  return await apiCall(API_ROUTES.ADMIN.UPDATE_USER + `/${_id}`, 'PUT', rest);
};

export const deleteUser = async (userId: string): Promise<any> => {
  return await apiCall(API_ROUTES.ADMIN.DELETE_USER + `/${userId}`, 'DELETE');
};

export const updateCar = async ({ _id, ...rest }: IVehicleReq) => {
  return await apiCall(
    API_ROUTES.ADMIN.UPDATE_VEHICLE + `/${_id}`,
    'PUT',
    rest
  );
};

export const createNewCar = async (data: IVehicleReq) => {
  return await apiCall(API_ROUTES.ADMIN.CREATE_VEHICLE, 'POST', data);
};

export const deleteCar = async (vehicleId: string) => {
  return await apiCall(
    API_ROUTES.ADMIN.DELETE_VEHICLE + `/${vehicleId}`,
    'DELETE'
  );
};

interface IVehicleReq {
  _id?: string;
  licence_plate: string; // Vehicle's license plate number
  vehicle_model: string; // Model of the vehicle
  capacity: number; // Capacity of the vehicle in kilograms or other unit
  avg_fuel_consumption: number; // Average fuel consumption (e.g., liters per 100 km or km per liter)
  notes?: string; // Additional notes about the vehicle}
}
