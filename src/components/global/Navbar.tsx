"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationData } from "@/data/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const transparentOnTop = pathname === "/"; // Only homepage gets transparent-on-top behavior
  const [scrolled, setScrolled] = useState(!transparentOnTop);

  useEffect(() => {
    // For non-home pages, force solid background and skip scroll listener
    if (!transparentOnTop) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparentOnTop]);

  interface NavLinkProps {
    href: string;
    children: ReactNode;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const NavLink = ({ href, children }: NavLinkProps) => {
    const isRoute = href.startsWith("/");
    const baseClasses = "text-white px-3 py-2 text-sm font-medium hover:text-gray-200 border-b-2 border-transparent hover:border-white transition-all duration-200";
    if (isRoute) {
      return (
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      );
    }
    return (
      <button onClick={() => scrollToSection(href)} className={baseClasses}>
        {children}
      </button>
    );
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] px-5 py-4 flex justify-between items-center transition-all duration-300 ${
      scrolled ? 'bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <Link href='/'>
        <Image
          src={navigationData.logo.src}
          alt={navigationData.logo.alt}
          width={40}
          height={40}
        />
      </Link>

      {/* NAVIGATION */}
      <nav className="hidden md:flex flex-grow justify-center items-center">
        {navigationData.links.map((link) => (
          <NavLink key={link.id} href={link.id}>
            {link.label}
          </NavLink>
        ))}
          <NavLink href="/our-story">
            Our Story
          </NavLink>
      </nav>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon
              className="h-8 w-8 text-white border-2 border-white p-1"
              aria-hidden="true"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-blue-900/95 backdrop-blur-sm border-0 p-2 mt-2">
            {navigationData.links.map((link) => (
              <DropdownMenuItem key={link.id} className="focus:bg-blue-800/50 rounded-lg">
                {link.id.startsWith('/') ? (
                  <Link href={link.id} className="w-full text-left text-white py-2">
                    {link.label}
                  </Link>
                ) : (
                  <button 
                    onClick={() => scrollToSection(link.id)} 
                    className="w-full text-left text-white py-2"
                  >
                    {link.label}
                  </button>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
