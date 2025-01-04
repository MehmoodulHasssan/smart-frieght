import React from 'react';
import CreateOrder from './CreateOrder';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiCall, ApiError, ApiResponse } from '@/utils/apiCall';
import { API_ROUTES } from '@/apiConfig';
import ErrorPage from '@/components/ErrorPage';
import { City, Vehicle } from '@/utils/interfaces';

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  // console.log(token);
  if (!token?.value) return redirect('/auth/login');
  // console.log('reached');
  try {
    const vehiclesResponse: IVehicleRespose = await apiCall(
      API_ROUTES.PUBLIC.GET_ALL_VEHICLES,
      'GET',
      undefined,
      token.value
    );

    const citiesResponse: ICityResponse = await apiCall(
      API_ROUTES.PUBLIC.GET_ALL_CITIES,
      'GET',
      undefined,
      token.value
    );

    if (!vehiclesResponse || !citiesResponse) {
      return <ErrorPage code={404} text={'Vehicles or cities not found'} />;
    }

    return (
      <CreateOrder
        vehiclesData={vehiclesResponse.data}
        citiesData={citiesResponse.data}
      />
    );
  } catch (error) {
    if (error instanceof ApiError)
      return (
        <ErrorPage code={Number(error.statusCode)} text={error.statusText} />
      );
    return <ErrorPage code={500} text={'Something went wrong'} />;
  }
};

export default Page;

interface IVehicleRespose extends ApiResponse {
  data: Vehicle[];
}
interface ICityResponse extends ApiResponse {
  data: City[];
}
