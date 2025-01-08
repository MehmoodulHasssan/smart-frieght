'use client';

import { useState } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { toast, useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { IUserRes } from '@/utils/queries';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/utils/mutations/adminMutations';
// import { User } from '../data/schema'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: IUserRes['data'][number];
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUser,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'The user has been deleted successfully',
      });
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      queryClient.refetchQueries({ queryKey: ['all-users'] });
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
    if (value.trim() !== currentRow.email) return;
    mutate(currentRow._id);
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.email}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{' '}
          Delete User
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete{' '}
            <span className="font-bold">{currentRow.email}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className="font-bold">
              {currentRow.role.toUpperCase()}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className="my-2">
            Email:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter email to confirm deletion."
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
