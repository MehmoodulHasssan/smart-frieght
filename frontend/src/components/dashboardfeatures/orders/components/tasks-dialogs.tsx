import { toast } from '@/hooks/use-toast';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useOrders } from '../context/orders-context';
// import { TasksImportDialog } from './tasks-import-dialog';
import { OrdersMutateDrawer } from './orders-mutate-drawer';
import MapRouteModal from '@/components/map-subcomponents/MapRouteModal';
import { LatLng } from 'leaflet';
// import { TasksMutateDrawer } from './orders-mutate-drawer';

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useOrders();
  return (
    <>
      {/* <TasksMutateDrawer
        key="task-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key="tasks-import"
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      /> */}

      {currentRow && (
        <>
          {open === 'route' && currentRow?.route && (
            <MapRouteModal
              key={`order-map-${currentRow._id}`}
              onOpenChange={() => setOpen(null)}
              geometry={currentRow.route.geometry}
              from={{
                position: new LatLng(
                  currentRow.pickup_location.latitude,
                  currentRow.pickup_location.longitude
                ),
                address: currentRow.pickup_location.address,
              }}
              to={{
                position: new LatLng(
                  currentRow.dropoff_location.latitude,
                  currentRow.dropoff_location.longitude
                ),
                address: currentRow.dropoff_location.address,
              }}
            />
          )}
          <OrdersMutateDrawer
            key={`order-details-${currentRow._id}`}
            open={open === 'details'}
            onOpenChange={() => {
              setOpen('update');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={() => {
              setOpen(null);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
              toast({
                title: 'The following task has been deleted:',
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
            className="max-w-md"
            title={`Delete Order:`}
            desc={
              <>
                You are about to delete an order with the ID{' '}
                <strong>{currentRow._id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  );
}
