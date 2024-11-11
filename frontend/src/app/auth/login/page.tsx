'use client';
import Header from '@/components/Header';
import React from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomFormField from '@/components/CustomFormField';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/utils/mutations/authMutations';
import { useAuthContext } from '@/context/authContext';
import { useToast } from '@/hooks/use-toast';
import { title } from 'process';
import { ApiError } from '@/utils/apiCall';

// Infer form data type from Zod schema

const Page = () => {
  const { setCurrentUser } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      setCurrentUser(data.data);
      toast({
        title: 'Success',
        description: data.message,
      });
      router.push('/');
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Error',
        description: error.message,
      });
      setCurrentUser(null);
    },
  });
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center space-y-4 items-center mt-12">
        <h1 className="text-2xl font-geist-bold text-center">User Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-11/12 md:w-7/12 lg:w-3/12 h-full justify-center flex flex-col space-y-8"
          >
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />

            <CustomFormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <div className="flex space-x-2 text-sm">
              <p>Don&apos;t have an account? </p>
              <button
                onClick={() => router.push('/auth/register')}
                className="hover:opacity-75"
              >
                Register
              </button>
            </div>
            <Button disabled={isPending} className="max-w-fit" type="submit">
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Page;
