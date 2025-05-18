import React from 'react';
import { SneakerCard } from './SneakerCard';

const sneakers = [
  {
    title: 'Sneaker 1',
    price: '$140',
    image: '/models/sneaker2.glb',
    model: 'sneaker2',
  },
  {
    title: 'Sneaker 2',
    price: '$240',
    image: '/models/sneaker3.glb',
    model: 'sneaker3',
  },
  {
    title: 'Sneaker 3',
    price: '$140',
    image: '/models/sneaker8.glb',
    model: 'sneaker8',
  },
];

export default function SneakerList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {sneakers.map((sneaker) => (
        <SneakerCard
          key={sneaker.model}
          title={sneaker.title}
          price={sneaker.price}
          image={sneaker.image}
          model={sneaker.model}
        />
      ))}
    </div>
  );
}