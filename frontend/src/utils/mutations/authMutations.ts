import { API_ROUTES } from '@/apiConfig';
import { apiCall, ApiResponse } from '../apiCall';
import { UserRoles } from '../queries';

const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<IUserResponse> => {
  return await apiCall(API_ROUTES.AUTH.LOGIN, 'POST', data);
};

const registerUser = async (data: IUserReq) => {
  return await apiCall(API_ROUTES.AUTH.REGISTER_USER, 'POST', data);
};

// const registerConsignor = async (data: {
//   email: string;
//   password: string;
//   full_name: string;
//   phone_number: string;
// }) => {
//   return await apiCall(API_ROUTES.AUTH.REGISTER_CONSIGNOR, 'POST', data);
// };

export const verifyUser = async (token?: string): Promise<IUserResponse> => {
  return await apiCall(API_ROUTES.AUTH.VERIFY, 'POST', undefined, token);
};

export const logoutUser = async () => {
  return await apiCall(API_ROUTES.AUTH.LOGOUT, 'POST', undefined);
};

export { loginUser, registerUser };

interface IUserResponse extends ApiResponse {
  data: {
    _id: string;
    email: string;
    role: UserRoles;
    full_name: string;
    phone_number: string;
    profile_picture?: string;
  };
}

export interface IUserReq {
  _id?: string;
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
  licence_no?: string;
  phone_number: string;
  role: string;
}
