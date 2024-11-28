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

interface GenericFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  displayAttribute: string;
  valueAttribute: string;
  selectItems: any[];
  type?: React.HTMLInputTypeAttribute | undefined;
}

// interface Props extends SelectProps {
//   items: IItem[];
//   placeholder: string;
// }

const CustomSelect = <T extends FieldValues>(
  props: GenericFormFieldProps<T>
) => {
  console.log(props.selectItems[0][props.displayAttribute]);
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
                  <SelectItem
                    key={item[props.valueAttribute]}
                    value={item[props.valueAttribute]}
                  >
                    {item[props.displayAttribute]}
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
