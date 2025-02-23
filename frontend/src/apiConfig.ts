const API_BASE_URL = 'http://localhost:8000';
const API_DOMAIN = API_BASE_URL + '/api';
const MAP_API_DOMAIN = 'https://nominatim.openstreetmap.org';

const API_ROUTES = {
  AUTH: {
    LOGIN: API_DOMAIN + '/auth/login',
    // REGISTER_CONSIGNOR: API_DOMAIN + '/auth/register/consignor',
    REGISTER_USER: API_DOMAIN + '/auth/register',
    LOGOUT: API_DOMAIN + '/auth/logout',
    VERIFY: API_DOMAIN + '/auth/verify',
  },
  DRIVER: {
    UPDATE_STATUS: API_DOMAIN + '/driver/update-status',
    GET_ALL_ORDERS: API_DOMAIN + '/driver/all-orders',
  },
  CONSIGNOR: {
    PLACE_ORDER: API_DOMAIN + '/consignor/place-order',
    GET_ALL_ORDERS: API_DOMAIN + '/consignor/all-orders',
  },
  ADMIN: {
    GET_ALL_USERS: API_DOMAIN + '/admin/all-users',
    GET_ALL_VEHICLES: API_DOMAIN + '/admin/all-vehicles',
    CREATE_USER: API_DOMAIN + '/admin/create-user',
    UPDATE_USER: API_DOMAIN + '/admin/update-user',
    DELETE_USER: API_DOMAIN + '/admin/delete-user',
    CREATE_VEHICLE: API_DOMAIN + '/admin/create-vehicle',
    UPDATE_VEHICLE: API_DOMAIN + '/admin/update-vehicle',
    DELETE_VEHICLE: API_DOMAIN + '/admin/delete-vehicle',
    GET_ALL_ORDERS: API_DOMAIN + '/admin/all-orders',
  },
  PUBLIC: {
    GET_AVAILAIBLE_VEHICLES: API_DOMAIN + '/available-vehicles',
    GET_ALL_CITIES: API_DOMAIN + '/all-cities',
  },
};

export { API_ROUTES, API_DOMAIN, MAP_API_DOMAIN, API_BASE_URL };
