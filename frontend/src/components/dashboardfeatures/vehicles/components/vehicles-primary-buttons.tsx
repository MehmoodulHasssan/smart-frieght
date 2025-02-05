import { IconMailPlus, IconUserPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useVehicles } from '../context/vehicles-context';

export function VehiclesPrimaryButtons() {
  const { setOpen } = useVehicles();
  return (
    <div className="flex gap-2">
      {/* <Button
        variant="outline"
        className="space-x-1"
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button> */}
      <Button className="space-x-1" onClick={() => setOpen('add')}>
        <span>Add Vehicle</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
