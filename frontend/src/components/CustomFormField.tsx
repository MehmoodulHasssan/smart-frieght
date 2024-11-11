import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface GenericFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const CustomFormField = <T extends FieldValues>(
  props: GenericFormFieldProps<T>
) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={props.placeholder}
              type={props.type || 'text'}
              {...field}
            />
          </FormControl>
          {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
