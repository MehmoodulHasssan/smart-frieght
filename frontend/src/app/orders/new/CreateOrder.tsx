'use client';

import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import Header from '@/components/Header';
import MapInput from '@/components/MapInput';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { City, Vehicle } from '@/utils/interfaces';
import { placeOrder } from '@/utils/mutations/consignorMutations';
import { createOrderSchema } from '@/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LatLng } from 'leaflet';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

interface PropTypes {
  citiesData: City[];
  vehiclesData: Vehicle[];
}
export interface Location {
  position: LatLng;
  address: string;
}
const CreateOrder = ({ citiesData, vehiclesData }: PropTypes) => {
  const [pickupLocation, setPickupLocation] = React.useState<Location | null>(
    null
  );
  const [dropLocation, setDropLocation] = React.useState<Location | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: placeOrder,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Order placed successfully',
      });
      form.reset();
      router.push('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const form = useForm<z.infer<typeof createOrderSchema>>({
    mode: 'onChange',
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      city: '',
      vehicle_type: '',
      weight: '',
    },
  });

  function onSubmit(data: z.infer<typeof createOrderSchema>) {
    if (!pickupLocation || !dropLocation) {
      toast({
        title: 'Error',
        description: 'Please select a pickup and drop location',
      });
      return;
    }
    const reqData = {
      pickup_location: pickupLocation,
      dropoff_location: dropLocation,
      weight: data.weight,
      city_id: data.city,
      vehicle_id: data.vehicle_type,
    };
    mutate(reqData);
  }
  // console.log(vehiclesData);
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center pb-12 space-y-4 items-center mt-12">
        <h1 className="text-2xl font-geist-bold text-center">Place Order</h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-11/12 md:w-7/12 lg:w-3/12 h-full justify-center flex flex-col space-y-4"
          >
            <MapInput
              location={pickupLocation}
              setLocation={setPickupLocation}
              name="pickup_location"
              label="Pickup Location"
              placeholder="--Pickup Location--"
            />
            <MapInput
              location={dropLocation}
              setLocation={setDropLocation}
              name="drop_location"
              label="Drop Off Location"
              placeholder="--Drop Off Location--"
            />

            <CustomSelect
              control={form.control}
              name="vehicle_type"
              label="Vehicle Type"
              selectItems={vehiclesData}
              displayAttribute="vehicle_model"
              valueAttribute="_id"
              placeholder="--Select a Vehicle Type--"
            />
            <CustomSelect
              control={form.control}
              name="city"
              label="City"
              selectItems={citiesData}
              displayAttribute="name"
              valueAttribute="_id"
              placeholder="--Select a City--"
            />

            <CustomFormField
              control={form.control}
              name="weight"
              label="Weight (kg)"
              type="number"
              placeholder="Enter Weight in kg"
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit order'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreateOrder;
