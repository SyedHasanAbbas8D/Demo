"use client";

import React, { useEffect, useState } from 'react';
import { ClientButton } from "./ClientButton";
import { ClientInput } from "./ClientInput";

interface ClientFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <form className={className}>
        <div className="w-full h-10 bg-gray-100 animate-pulse rounded-lg" />
        <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-lg mt-2" />
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <ClientInput
        isRequired
        errorMessage={({validationDetails}) => {
          if (validationDetails.valueMissing) {
            return "Please enter your email";
          }
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }
          return ""; // Return empty string as fallback
        }}
        classNames={{
          inputWrapper: "bg-white transition-all duration-300 hover:shadow-md focus-within:shadow-lg",
        }}
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
        size="lg"
      />

      <ClientButton 
        className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg" 
        color="primary" 
        type="submit"
        size="lg"
      >
        Subscribe
      </ClientButton>
    </form>
  );
}; 