import { API_ROUTES } from '@/apiConfig';
import { apiCall, ApiResponse } from '../apiCall';

const loginUser = async (data: { email: string; password: string }) => {
  return await apiCall(API_ROUTES.AUTH.LOGIN, 'POST', data);
};

const registerDriver = async (data: {
  email: string;
  password: string;
  full_name: string;
  licence_no: string;
  phone_number: string;
}) => {
  return await apiCall(API_ROUTES.AUTH.REGISTER_DRIVER, 'POST', data);
};

const registerConsignor = async (data: {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}) => {
  return await apiCall(API_ROUTES.AUTH.REGISTER_CONSIGNOR, 'POST', data);
};

export const verifyUser = async (token: string): Promise<IUserResponse> => {
  return await apiCall(API_ROUTES.AUTH.VERIFY, 'POST', undefined, token);
};

export const logoutUser = async () => {
  return await apiCall(API_ROUTES.AUTH.LOGOUT, 'POST', undefined);
};

export { loginUser, registerConsignor, registerDriver };

interface IUserResponse extends ApiResponse {
  data: {
    _id: string;
    email: string;
    role: 'driver' | 'admin' | 'customer'; // adjust roles as necessary
    full_name: string;
    phone_number: string;
  };
}
