"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@heroui/react";

interface ClientButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
  startContent?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

export const ClientButton: React.FC<ClientButtonProps> = ({
  children,
  className,
  color = "primary",
  type = "button",
  size = "md",
  variant = "solid",
  startContent,
  isLoading = false,
  onClick,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`${className} bg-gray-100 animate-pulse rounded-lg`} style={{ height: size === "lg" ? "48px" : size === "sm" ? "32px" : "40px" }} />
    );
  }

  return (
    <Button
      className={className}
      color={color}
      type={type}
      size={size}
      variant={variant}
      startContent={startContent}
      isLoading={isLoading}
      onClick={onClick}
      suppressHydrationWarning
    >
      {children}
    </Button>
  );
}; 