'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, useToast } from '@/hooks/use-toast';
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
import { vehicleStatusTypes } from '../data/data';
import { IVehicleRes } from '@/utils/queries';
import { vehicleSchema } from '../data/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewCar, updateCar } from '@/utils/mutations/adminMutations';
import { ApiResponse } from '@/utils/apiCall';
// import { User } from '../data/schema';

// const formSchema = z
//   .object({
//     firstName: z.string().min(1, { message: 'First Name is required.' }),
//     lastName: z.string().min(1, { message: 'Last Name is required.' }),
//     username: z.string().min(1, { message: 'Username is required.' }),
//     phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
//     email: z
//       .string()
//       .min(1, { message: 'Email is required.' })
//       .email({ message: 'Email is invalid.' }),
//     password: z.string().transform((pwd) => pwd.trim()),
//     role: z.string().min(1, { message: 'Role is required.' }),
//     confirmPassword: z.string().transform((pwd) => pwd.trim()),
//     isEdit: z.boolean(),
//   })
//   .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
//     if (!isEdit || (isEdit && password !== '')) {
//       if (password === '') {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Password is required.',
//           path: ['password'],
//         });
//       }

//       if (password.length < 8) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Password must be at least 8 characters long.',
//           path: ['password'],
//         });
//       }

//       if (!password.match(/[a-z]/)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Password must contain at least one lowercase letter.',
//           path: ['password'],
//         });
//       }

//       if (!password.match(/\d/)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Password must contain at least one number.',
//           path: ['password'],
//         });
//       }

//       if (password !== confirmPassword) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "Passwords don't match.",
//           path: ['confirmPassword'],
//         });
//       }
//     }
//   });
// type UserForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: IVehicleRes['data'][number];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VehiclesActionDialog({
  currentRow,
  open,
  onOpenChange,
}: Props) {
  const { toast } = useToast();
  const { invalidateQueries, refetchQueries } = useQueryClient();
  const isEdit = !!currentRow;
  const { mutate, isPending } = useMutation({
    mutationKey: ['create-update-vehicle'],
    mutationFn: isEdit ? updateCar : createNewCar,
    onSuccess: (data: ApiResponse) => {
      toast({
        title: 'Success',
        description: data?.message,
      });
      invalidateQueries({ queryKey: ['all-vehicles'] });
      refetchQueries({ queryKey: ['all-vehicles'] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: isEdit
      ? {
          avg_fuel_consumption: currentRow.avg_fuel_consumption.toString(),
          capacity: currentRow.capacity.toString(),
          status: currentRow.status,
          vehicle_model: currentRow.vehicle_model,
          licence_plate: currentRow.licence_plate,
        }
      : {
          avg_fuel_consumption: '0',
          capacity: '0',
          status: '',
          vehicle_model: '',
          licence_plate: '',
        },
  });

  const onSubmit = (values: z.infer<typeof vehicleSchema>) => {
    const { avg_fuel_consumption, capacity, ...rest } = values;
    mutate({
      avg_fuel_consumption: Number(avg_fuel_consumption),
      capacity: Number(capacity),
      ...rest,
    });
  };

  // const isPasswordTouched = !!form.formState.dirtyFields.password;

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
          <Form {...form}>
            <form
              id="user-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="vehicle_model"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Vehile Model
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Honda Civic"
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
                name="licence_plate"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Licence No
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: ABC123"
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
                name="avg_fuel_consumption"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Average Fuel Consumption
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Fuel consumption  in litres per 1 km"
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
                name="capacity"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      {'Capacity (kg)'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Capacity in kilograms"
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
                name="status"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">
                      Vehicle Status
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a role"
                      className="col-span-4"
                      items={vehicleStatusTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="user-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
