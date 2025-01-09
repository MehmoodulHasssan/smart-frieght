'use client';

import { useState } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { IVehicleRes } from '@/utils/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCar } from '@/utils/mutations/adminMutations';
import { ApiResponse } from '@/utils/apiCall';
// import { User } from '../data/schema'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: IVehicleRes['data'][number];
}

export function VehiclesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const [value, setValue] = useState('');
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteVehicle'],
    mutationFn: deleteCar,
    onSuccess: (data: ApiResponse) => {
      toast({
        title: 'Success',
        description: data?.message || 'Vehicle deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['all-vehicles'] });
      queryClient.refetchQueries({ queryKey: ['all-vehicles'] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    if (value.trim() !== currentRow.licence_plate) return;
    mutate(currentRow._id);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.licence_plate || isPending}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{' '}
          Delete Vehicle
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{' '}
            <span className="font-bold">{currentRow.licence_plate}</span>?
            <br />
            This action will permanently remove the car with the licence number
            of{' '}
            <span className="font-bold">
              {currentRow.licence_plate.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Licence No:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter username to confirm deletion."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={isPending ? 'Deleting...' : 'Delete'}
      destructive
    />
  );
}
