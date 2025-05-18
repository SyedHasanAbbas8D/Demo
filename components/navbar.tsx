"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  LoginIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const CustomNavbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Wait for next tick to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!navbarRef.current) return;

      // Initial animation for navbar elements
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate brand
      if (brandRef.current) {
        tl.from(brandRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
        });
      }

      // Animate nav items with stagger
      const validNavItems = navItemsRef.current.filter(Boolean);
      if (validNavItems.length > 0) {
        tl.from(validNavItems, {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        }, "-=0.4");
      }

      // Animate social icons
      const validSocialIcons = socialIconsRef.current.filter(Boolean);
      if (validSocialIcons.length > 0) {
        tl.from(validSocialIcons, {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
        }, "-=0.3");
      }

      // Animate search input
      if (searchInputRef.current) {
        tl.from(searchInputRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.6,
        }, "-=0.2");
      }

      // Animate login button
      if (loginButtonRef.current) {
        tl.from(loginButtonRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.6,
        }, "-=0.4");
      }

      // Scroll-based animations
      gsap.to(navbarRef.current, {
        scrollTrigger: {
          trigger: "body",
          start: "top -100",
          end: "top -100",
          toggleActions: "play none none reverse",
        },
        backgroundColor: "rgba(var(--nextui-colors-background), 0.8)",
        backdropFilter: "blur(10px)",
        duration: 0.3,
      });

      // Hover animations for nav items
      validNavItems.forEach((item) => {
        if (!item) return;
        
        const handleMouseEnter = () => {
          gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // Cleanup function
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const searchInput = (
    <Input
      ref={searchInputRef}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar ref={navbarRef} maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SoleVault</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarItem 
              key={item.href}
            >
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            startContent={<LoginIcon className="text-primary" />}
            variant="flat"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
