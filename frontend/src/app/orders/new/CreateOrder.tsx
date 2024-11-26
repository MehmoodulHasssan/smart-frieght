'use client';

import CustomFormField from '@/components/CustomFormField';
import CustomSelect from '@/components/CustomSelect';
import Header from '@/components/Header';
import MapInput from '@/components/MapInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { citiesData, transportVehicles } from '@/utils/data';
import { createOrderSchema } from '@/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateOrder = () => {
  const form = useForm<z.infer<typeof createOrderSchema>>({
    mode: 'onChange',
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      pickup_location: '',
      dropoff_location: '',
      city: '',
      vehicle_type: '',
      weight_kg: 0,
    },
  });

  function onSubmit(data: z.infer<typeof createOrderSchema>) {
    console.log(data);
  }
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center space-y-4 items-center mt-12">
        <h1 className="text-2xl font-geist-bold text-center">User Login</h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-11/12 md:w-7/12 lg:w-3/12 h-full justify-center flex flex-col space-y-8"
          >
            <MapInput
              control={form.control}
              setLocation={form.setValue}
              name="pickup_location"
              label="Pickup Location"
              placeholder="--Pickup Location--"
              type="text"
              selectedLocation={form.getValues('pickup_location')}
            />

            <CustomSelect
              control={form.control}
              name="vehicle_type"
              label="Vehicle Type"
              selectItems={transportVehicles}
              placeholder="--Select a Vehicle Type--"
            />
            {/* <CustomFormField
              control={form.control}
              name="pickup_location"
              label="Pickup Location"
              placeholder="--Pickup Location--"
            /> */}
            {/* <CustomFormField
              control={form.control}
              name="dropoff_location"
              label="Dropoff Location"
              placeholder="--Dropoff Location--"
            /> */}
            <CustomFormField
              control={form.control}
              name="weight_kg"
              label="Weight (kg)"
              type="number"
              placeholder="Enter Weight in kg"
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default CreateOrder;
