import { Location } from '@/app/orders/new/CreateOrder';
import { apiCall } from '../apiCall';
import { API_ROUTES } from '@/apiConfig';

const placeOrder = async (data: INewOrder): Promise<any> => {
  console.log(data);
  return await apiCall(API_ROUTES.CONSIGNOR.PLACE_ORDER, 'POST', data);
};

interface INewOrder {
  vehicle_id: string;
  pickup_location: Location;
  dropoff_location: Location;
  weight: string;
  city_id: string;
}

export { placeOrder };
