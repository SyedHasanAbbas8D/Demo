"use client";

import React, { useEffect, useState } from 'react';
import { Input } from "@heroui/react";

interface ClientInputProps {
  isRequired?: boolean;
  errorMessage?: (props: { validationDetails: { valueMissing: boolean; typeMismatch: boolean } }) => string;
  classNames?: {
    inputWrapper?: string;
  };
  labelPlacement?: "inside" | "outside" | "outside-left";
  name?: string;
  placeholder?: string;
  type?: string;
  size?: "sm" | "md" | "lg";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ClientInput: React.FC<ClientInputProps> = ({
  isRequired,
  errorMessage,
  classNames,
  labelPlacement,
  name,
  placeholder,
  type = "text",
  size = "md",
  value,
  onChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`${classNames?.inputWrapper} bg-gray-100 animate-pulse rounded-lg`} style={{ height: size === "lg" ? "48px" : size === "sm" ? "32px" : "40px" }} />
    );
  }

  return (
    <Input
      isRequired={isRequired}
      errorMessage={errorMessage}
      classNames={classNames}
      labelPlacement={labelPlacement}
      name={name}
      placeholder={placeholder}
      type={type}
      size={size}
      value={value}
      onChange={onChange}
      suppressHydrationWarning
    />
  );
}; 