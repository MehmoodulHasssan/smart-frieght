const navData = [
  { title: 'Home', href: '/' },
  { title: 'Place an order', href: '/orders/new' },
  { title: 'My orders', href: '/orders' },
  { title: 'About', href: '/about' },
  { title: 'Contact Us', href: '/contact-us' },
];

const citiesData = [
  {
    name: 'Faisalabad',
    boundingBox: {
      northeast: { lat: 31.5483862, lng: 73.2444678 },
      southwest: { lat: 31.2987568, lng: 72.93413409999999 },
    },
  },
  {
    name: 'Karachi',
    boundingBox: {
      northeast: {
        lat: 25.6398011,
        lng: 67.65694169999999,
      },
      southwest: {
        lat: 24.7466037,
        lng: 66.6539822,
      },
    },
  },
  {
    name: 'Lahore',
    boundingBox: {
      northeast: {
        lat: 31.69848649999999,
        lng: 74.55323989999999,
      },
      southwest: {
        lat: 31.2673942,
        lng: 74.1155387,
      },
    },
  },
  {
    name: 'Islamabad',
    boundingBox: {
      northeast: {
        lat: 33.786697,
        lng: 73.3841211,
      },
      southwest: {
        lat: 33.4455355,
        lng: 72.78809489999999,
      },
    },
  },
  {
    name: 'Multan',
    boundingBox: {
      northeast: {
        lat: 30.3105332,
        lng: 71.64538709999999,
      },
      southwest: {
        lat: 30.0519792,
        lng: 71.3039295,
      },
    },
  },
];

const transportVehicles = [
  {
    name: 'Hyundai Shehzore',
    maxWeightCapacityKg: 2500,
    notes: 'Popular for intra-city transportation of goods.',
  },
  {
    name: 'Suzuki Bolan (Carry)',
    maxWeightCapacityKg: 800,
    notes: 'Common for small cargo, often used by small businesses.',
  },
  {
    name: 'Suzuki Ravi',
    maxWeightCapacityKg: 750,
    notes: 'Widely used for small goods and deliveries.',
  },
  {
    name: 'Isuzu NPR',
    maxWeightCapacityKg: 6000,
    notes: 'Ideal for medium-weight cargo, reliable for city and highway use.',
  },
  {
    name: 'Mazda T3500',
    maxWeightCapacityKg: 3500,
    notes: 'Commonly seen for construction materials and goods transportation.',
  },
  {
    name: 'Toyota Dyna',
    maxWeightCapacityKg: 3000,
    notes: 'Durable and frequently used for businesses and farm goods.',
  },
  {
    name: 'Hino Dutro',
    maxWeightCapacityKg: 8000,
    notes: 'Reliable for industrial and large goods.',
  },
  {
    name: 'Hino 300 Series',
    maxWeightCapacityKg: 5000,
    notes: 'Commonly used for medium-to-heavy cargo.',
  },
  {
    name: 'Nissan Diesel UD',
    maxWeightCapacityKg: 15000,
    notes:
      'Heavy-duty truck for long-haul transport, construction, and machinery.',
  },
];

export { navData, citiesData, transportVehicles };
