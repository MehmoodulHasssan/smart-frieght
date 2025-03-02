import React from 'react';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // api: CarouselApi;
  label: string;
  forRole: 'driver' | 'consignor';
  currState: 'driver' | 'consignor';
  // index: number;
  // item: {
  //   name: string;
  //   component: React.JSX.Element;
  // };
  setCurrState: React.Dispatch<React.SetStateAction<'driver' | 'consignor'>>;
}

const CarousalButton = (props: PropTypes) => {
  return (
    <button
      className={cn(
        'relative px-2 py-1 text-sm font-geist-semibold transition-colors',
        props.currState === props.forRole
          ? 'text-primary'
          : 'text-muted-foreground'
      )}
      onClick={() => props.setCurrState(props.forRole)}
    >
      {props.label}
      {props.currState === props.forRole && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transition-all duration-300" />
      )}
    </button>
  );
};

export default CarousalButton;
