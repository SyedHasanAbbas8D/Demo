"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email) {
        throw new Error('Please enter your email');
      }
      
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email');
      }
      
      // Success case
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail("");
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage("");
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <footer className="w-full bg-default-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Sneaker Store</h3>
            <p className="text-default-600 text-sm">
              Your one-stop destination for premium sneakers and footwear.
            </p>
            <div className="flex gap-4">
              <Link isExternal aria-label="Twitter" href="#">
                <TwitterIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Discord" href="#">
                <DiscordIcon className="text-default-500" />
              </Link>
              <Link isExternal aria-label="Github" href="#">
                <GithubIcon className="text-default-500" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-default-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-default-600 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-default-600 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-default-600 hover:text-primary">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/mens" className="text-default-600 hover:text-primary">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/category/womens" className="text-default-600 hover:text-primary">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/category/kids" className="text-default-600 hover:text-primary">
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="text-default-600 hover:text-primary">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Newsletter</h3>
            <p className="text-default-600 text-sm">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  classNames={{
                    inputWrapper: "bg-white h-12",
                    input: "text-base",
                  }}
                  isDisabled={status === 'loading'}
                  errorMessage={status === 'error' ? message : undefined}
                  isInvalid={status === 'error'}
                />
                {status === 'success' && (
                  <div className="absolute -bottom-6 left-0 text-success text-sm">
                    {message}
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                color="primary" 
                className="w-full h-12 text-base font-medium"
                isLoading={status === 'loading'}
                isDisabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </Button>
              <p className="text-xs text-default-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-default-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-default-600 text-sm">
              © {new Date().getFullYear()} Sneaker Store. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-default-600 text-sm hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-default-600 text-sm hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-default-600 text-sm hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 