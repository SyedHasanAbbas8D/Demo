"use client"
import React, { useRef, useEffect } from 'react';
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SneakerCard } from "@/components/SneakerCard";
import { ClientOnly } from "@/components/ClientOnly";
import { ClientForm } from "@/components/ClientForm";
import { gsap } from "gsap";
import SneakerList from '@/components/SneakerList';

export default function Home() {
  const [submitted, setSubmitted] = React.useState<Record<string, FormDataEntryValue> | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email as string)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data as Record<string, FormDataEntryValue>);
  };

  const list = [
    {
      title: "Air Jordan 1",
      price: "$199.99",
      image: "/sneaker.jpg"
    },
    {
      title: "Nike Air Max",
      price: "$179.99",
      image: "/sneaker2.jpg"
    },
    {
      title: "Adidas Ultraboost",
      price: "$189.99",
      image: "/sneaker3.jpg"
    },
    {
      title: "New Balance 990",
      price: "$175.00",
      image: "/sneaker4.jpg"
    },
    {
      title: "Puma RS-X",
      price: "$110.00",
      image: "/sneaker5.jpg"
    },
    {
      title: "Reebok Classic",
      price: "$89.99",
      image: "/sneaker6.jpg"
    },
    {
      title: "Converse Chuck 70",
      price: "$85.00",
      image: "/sneaker7.jpg"
    },
    {
      title: "Vans Old Skool",
      price: "$65.00",
      image: "/sneaker8.jpg"
    },
  ];

  const categories = [
    {
      title: "Men's Collection",
      img: "/sneaker.jpg",
      description: "Explore men's footwear",
    },
    {
      title: "Women's Collection",
      img: "/sneaker2.jpg",
      description: "Discover women's styles",
    },
    {
      title: "Kids' Collection",
      img: "/sneaker3.jpg",
      description: "Fun styles for kids",
    },
    {
      title: "Sports",
      img: "/sneaker4.jpg",
      description: "Performance footwear",
    },
    {
      title: "Casual",
      img: "/sneaker5.jpg",
      description: "Everyday comfort",
    },
    {
      title: "Limited Edition",
      img: "/sneaker6.jpg",
      description: "Exclusive releases",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <AnimatedSection>
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <ClientOnly key={index}>
                <Card 
                  isPressable 
                  shadow="sm" 
                  className="transform-gpu transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onPress={() => console.log("category pressed")}
                >
          <CardBody className="overflow-visible p-0">
            <Image
                      alt={category.title}
                      className="w-full object-cover h-[140px] transition-transform duration-300 hover:scale-110"
              radius="lg"
              shadow="sm"
                      src={category.img}
              width="100%"
            />
          </CardBody>
                  <CardFooter className="text-small flex flex-col items-start transition-transform duration-300 hover:-translate-y-1">
                    <b>{category.title}</b>
                    <p className="text-default-500 text-xs">{category.description}</p>
          </CardFooter>
        </Card>
              </ClientOnly>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <SneakerList />
        </AnimatedSection>
      </div>
    
      <AnimatedSection>
        <div className="w-full bg-default-100 py-12 mt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-default-600 mb-8">Stay updated with our latest products and exclusive offers.</p>
              
              <ClientForm
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                onSubmit={onSubmit}
              />

              {submitted && (
                <div className="text-success mt-4 animate-fade-in">
                  Thank you for subscribing! We'll keep you updated.
                </div>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
        </>
  );
}
