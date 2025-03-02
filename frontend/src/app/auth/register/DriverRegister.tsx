import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { driverRegisterSchema } from '@/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomFormField from '@/components/CustomFormField';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ApiError } from '@/utils/apiCall';
import { registerUser } from '@/utils/mutations/authMutations';
import { renderRegisterInitValues } from '@/utils/helpers';

const DriverRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: 'Success',
        description: data.message,
      });
      router.push('/auth/login');
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Error',
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof driverRegisterSchema>>({
    mode: 'onChange',
    resolver: zodResolver(driverRegisterSchema),
    defaultValues: renderRegisterInitValues('driver'),
  });

  console.log(renderRegisterInitValues('driver'));
  function onSubmit({
    isEdit,
    ...values
  }: z.infer<typeof driverRegisterSchema>) {
    mutate(values);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-[30rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full h-full justify-center flex flex-col px-1 space-y-8"
          >
            <CustomFormField
              control={form.control}
              name="full_name"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <CustomFormField
              control={form.control}
              name="phone_number"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <CustomFormField
              control={form.control}
              name="licence_no"
              label="Licence Number"
              placeholder="Enter your licence number"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <CustomFormField
              control={form.control}
              name="confirm_password"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <div className="flex space-x-2 text-sm">
              <p>Don&apos;t have an account? </p>
              <button
                onClick={() => router.push('/auth/signup')}
                className="hover:opacity-75"
              >
                Login
              </button>
            </div>
            <Button
              disabled={isPending}
              className="max-w-fit"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isPending ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default DriverRegister;
