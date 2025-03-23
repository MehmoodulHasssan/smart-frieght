import { useSocket } from '@/context/socketContext';
import React, { useEffect, useState } from 'react';
import { ITrackingEvent } from '../data/data-sets';
import MapRouteModal from '@/components/map-subcomponents/MapRouteModal';
import { Location } from '@/app/orders/new/CreateOrder';
import { IOrderRes } from '@/utils/queries';
import { LatLng } from 'leaflet';

interface PropTypes {
  onOpenChange: () => void;
  geometry: string;
  from: Location;
  to: Location;
  tracker?: Location;
  driver: IOrderRes['data'][number]['driver'];
}

const OrdersTrack = ({ driver, ...props }: PropTypes) => {
  const { socket } = useSocket();
  const [currCoords, setCurrCoords] = useState<Location>(props.from);
  console.log(currCoords);
  useEffect(() => {
    if (socket) {
      socket.on('locationEvent', (data: ITrackingEvent) => {
        console.log('location event', data);
        if (data.driverId === driver?._id) {
          setCurrCoords({
            address: driver?.full_name || 'driver',
            position: new LatLng(
              data.location.latitude,
              data.location.longitude
            ),
          });
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('locationEvent');
      }
    };
  }, [socket]);
  return <MapRouteModal tracker={currCoords} {...props} />;
};

export default OrdersTrack;
