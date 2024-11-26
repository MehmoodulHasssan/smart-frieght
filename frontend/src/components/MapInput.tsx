'use client';
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
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
// import MapModal from './MapModal';
import { useTheme } from '@/context/themeContext';
import Image from 'next/image';
import { LatLng } from 'leaflet';
import dynamic from 'next/dynamic';

const MapModal = dynamic(() => import('./MapModal'), { ssr: true });

interface GenericFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setLocation: UseFormReturn<T>['setValue'];
  selectedLocation: PathValue<T, Path<T>>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const MapInput = <T extends FieldValues>(props: GenericFormFieldProps<T>) => {
  const [selectedLocation, setSelectedLocation] = React.useState<LatLng | null>(
    null
  );
  const [mapModalOpen, setMapModalOpen] = React.useState(false);
  const { theme } = useTheme();
  const handleOpenMap = () => {
    setMapModalOpen(true);
  };

  return (
    <>
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => {
          // console.log(field.value);
          // field.value = selectedLocation as PathValue<T, Path<T>>;
          return (
            <FormItem className="w-full relative">
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={props.placeholder}
                  type={props.type || 'text'}
                  readOnly
                  className="hover:cursor-pointer"
                  onClick={handleOpenMap}
                />
              </FormControl>
              <Image
                width={25}
                height={25}
                className="absolute right-2 bottom-1"
                objectPosition="center"
                src={
                  theme === 'light'
                    ? '/images/location-black.png'
                    : '/images/location-white.png'
                }
                alt="map"
                onClick={() => {
                  console.log('clicked');
                }}
              />
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {mapModalOpen && (
        <MapModal
          point={selectedLocation}
          setPoint={setSelectedLocation}
          setOpen={setMapModalOpen}
          isOpen={mapModalOpen}
        />
      )}
    </>
  );
};

export default MapInput;
