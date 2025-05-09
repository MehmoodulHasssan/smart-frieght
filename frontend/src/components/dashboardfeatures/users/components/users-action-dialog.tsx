'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PasswordInput } from '@/components/password-input';
import { SelectDropdown } from '@/components/select-dropdown';
import { userTypes } from '../data/data';
import { User } from '../data/schema';
import { IUserRes } from '@/utils/queries';
import { editUserSchema } from '@/utils/validationSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewUser, updateUser } from '@/utils/mutations/adminMutations';
import { ApiResponse } from '@/utils/apiCall';
import { useEffect } from 'react';
import ProfileImage from '@/components/profile-image';

interface Props {
  currentRow?: IUserRes['data'][number];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

let firstRender = true;

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  // const isDriver = currentRow?.role === 'driver';
  const isEdit = !!currentRow;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['update-create-user'],
    mutationFn: isEdit ? updateUser : createNewUser,
    onSuccess: (data: ApiResponse) => {
      toast({
        title: 'Success',
        description: data?.message,
      });
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      queryClient.refetchQueries({ queryKey: ['all-users'] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error?.message,
      });
    },
  });

  // console.log(currentRow);
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: isEdit
      ? {
          full_name: currentRow?.full_name || '',
          email: currentRow?.email || '',
          role: currentRow?.role || '',
          phone_number: currentRow?.phone_number || '',
          licence_no: currentRow?.driver?.licence_no || '',
          password: '',
          confirm_password: '',
          isEdit,
        }
      : {
          full_name: '',
          email: '',
          role: '',
          phone_number: '',
          password: '',
          confirm_password: '',
          isEdit,
        },
  });

  const onSubmit = (values: z.infer<typeof editUserSchema>) => {
    console.log(values);
    mutate({
      _id: currentRow?._id,
      ...values,
    });
  };

  // console.log(currentRow);

  const isPasswordTouched = !!form.formState.dirtyFields.password;

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    if (form.watch('role') === 'driver') {
      form.setValue(
        'licence_no',
        currentRow?.driver ? currentRow.driver.licence_no : ''
      ); // Set the default value to empty if role is 'driver'
    }
  }, [form.watch('role')]);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here. ' : 'Create new user here. '}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[26.25rem] w-full pr-4 -mr-4 py-1">
          <ProfileImage
            initialImage={currentRow?.profile_picture || ''}
            onImageChange={(file) => console.log(file)}
            editIcon={
              'https://cdn.iconscout.com/icon/free/png-256/free-edit-icon-download-in-svg-png-gif-file-formats--pen-write-pencil-ball-study-user-interface-vol-2-pack-icons-2202989.png?f=webp&w=256'
            }
            key={currentRow?._id || 'image'}
          />
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              {/* <FormField
                control={form.control}
                name="profile_image"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Profile Image
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="John Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
                /> */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="col-span-4"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@gmail.com"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+123456789"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={!field.value ? 'Select a role' : field.value}
                      className="col-span-4"
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {form.watch('role') === 'driver' && (
                <FormField
                  control={form.control}
                  name="licence_no"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                      <FormLabel className="col-span-2 text-right">
                        License No
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="XYZ123"
                          className="col-span-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="col-span-4 col-start-3" />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="e.g., S3cur3P@ssw0rd"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder="e.g., S3cur3P@ssw0rd"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="user-form" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
