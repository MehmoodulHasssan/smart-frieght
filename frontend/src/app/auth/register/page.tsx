'use client';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import ConsignorRegister from './ConsignorRegister';
import DriverRegister from './DriverRegister';
import Header from '@/components/Header';
import CarousalButton from '@/components/CarousalButton';

const componentsArr = [
  { name: 'Register as Consignor', component: <ConsignorRegister /> },
  {
    name: 'Register as Driver',
    component: <DriverRegister />,
  },
];

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Header />
      <div className="flex w-full justify-center pt-4 pb-12">
        <div className="w-11/12 md:w-7/12 lg:w-4/12">
          <div className="mb-4 flex justify-evenly">
            {componentsArr.map((item, index) => (
              <CarousalButton
                key={index}
                api={api}
                index={index}
                item={item}
                name={item.name}
                current={current}
              />
            ))}
          </div>
          <Carousel setApi={setApi}>
            <CarouselContent>
              {componentsArr.map((item, index) => (
                <CarouselItem key={index}>{item.component}</CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
