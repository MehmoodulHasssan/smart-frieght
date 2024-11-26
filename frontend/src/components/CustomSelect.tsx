import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
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
import { attributeToLabel } from '@/utils/helpers';

type Item<T = object> = T & { name: string };

interface GenericFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  selectItems: Item[];
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

// interface Props extends SelectProps {
//   items: IItem[];
//   placeholder: string;
// }

const CustomSelect = <T extends FieldValues>(
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
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.selectItems.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default CustomSelect;
