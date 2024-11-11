'use client';
import Header from '@/components/Header';
import React from 'react';
import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { loginSchema } from '@/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CustomFormField from '@/components/CustomFormField';
import { useRouter } from 'next/navigation';

// Infer form data type from Zod schema

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-[30rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-3/12 h-full justify-center flex flex-col space-y-8"
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
                onClick={() => router.push('/auth/signup')}
                className="hover:opacity-75"
              >
                Sign Up
              </button>
            </div>
            <Button className="" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Page;
