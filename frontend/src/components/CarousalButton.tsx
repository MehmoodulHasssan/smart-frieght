import React from 'react';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  api: CarouselApi;
  index: number;
  item: {
    name: string;
    component: React.JSX.Element;
  };
  current: number;
}

const CarousalButton = (props: PropTypes) => {
  return (
    <button
      className={cn(
        'relative px-2 py-1 text-sm font-geist-semibold transition-colors',
        props.current === props.index ? 'text-primary' : 'text-muted-foreground'
      )}
      onClick={() => props.api?.scrollTo(props.index)}
    >
      {props.item.name}
      {props.current === props.index && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transition-all duration-300" />
      )}
    </button>
  );
};

export default CarousalButton;
