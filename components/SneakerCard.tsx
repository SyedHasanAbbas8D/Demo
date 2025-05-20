"use client";

import React from 'react';
import { Card, CardBody, CardFooter } from "@heroui/react";
import dynamic from "next/dynamic";
const SneakerCanvas = dynamic(() => import("./Sneaker/SneakerCanvas"), { ssr: false });

interface SneakerCardProps {
  title: string;
  price: string;
  image: string;
  model: string;
}

export const SneakerCard: React.FC<SneakerCardProps> = ({ title, price, model }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const priceRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;
    const footer = footerRef.current;
    const title = titleRef.current;
    const price = priceRef.current;

    const handleMouseEnter = () => {
      gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
      gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
      gsap.to(footer, { y: -5, duration: 0.3, ease: "power2.out" });
      gsap.to(title, { y: -2, duration: 0.3, ease: "power2.out" });
      gsap.to(price, { y: -2, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(footer, { y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(title, { y: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(price, { y: 0, duration: 0.3, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      isPressable
      shadow="sm"
      className="transition-all duration-300 hover:shadow-lg w-full h-96 flex flex-col justify-between 
        bg-white text-black 
        dark:bg-blue-900 dark:text-blue-100"
    >
      <CardBody className="overflow-visible p-0 flex-1">
        <div ref={imageRef} className="w-full h-60">
          <SneakerCanvas model={model} title={title} />
        </div>
      </CardBody>
      <CardFooter className="text-small flex flex-col items-start">
        <div ref={footerRef} className="w-full flex flex-col items-start">
          <b ref={titleRef}>{title}</b>
          <p ref={priceRef} className="text-default-500">{price}</p>
        </div>
      </CardFooter>
    </Card>
  );
};