const API_DOMAIN = 'http://localhost:8000/api';
const MAP_API_DOMAIN = 'https://nominatim.openstreetmap.org';

const API_ROUTES = {
  AUTH: {
    LOGIN: API_DOMAIN + '/auth/login',
    REGISTER_CONSIGNOR: API_DOMAIN + '/auth/register/consignor',
    REGISTER_DRIVER: API_DOMAIN + '/auth/register/driver',
    LOGOUT: API_DOMAIN + '/auth/logout',
    VERIFY: API_DOMAIN + '/auth/verify',
  },
  DRIVER: {
    UPDATE_STATUS: API_DOMAIN + '/driver/update-status',
    GET_ALL_ORDERS: API_DOMAIN + '/driver/get-all-orders',
  },
  CONSIGNOR: {
    PLACE_ORDER: API_DOMAIN + '/consignor/place-order',
    GET_ALL_ORDERS: API_DOMAIN + '/consignor/get-all-orders',
  },
  ADMIN: {
    GET_ALL_ORDERS: API_DOMAIN + '/admin/get-all-orders',
  },
  PUBLIC: {
    GET_ALL_VEHICLES: API_DOMAIN + '/all-vehicles',
    GET_ALL_CITIES: API_DOMAIN + '/all-cities',
  },
};

export { API_ROUTES, API_DOMAIN, MAP_API_DOMAIN };
