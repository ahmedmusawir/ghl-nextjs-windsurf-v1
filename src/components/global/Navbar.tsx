"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationData } from "@/data/navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

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
    return (
      <button
        onClick={() => scrollToSection(href)}
        className="text-white px-3 py-2 text-sm font-medium hover:text-gray-200 border-b-2 border-transparent hover:border-white transition-all duration-200"
      >
        {children}
      </button>
    );
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] px-5 py-4 flex justify-between items-center transition-all duration-300 ${
      scrolled ? 'bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <button onClick={() => scrollToSection("hero")} className="cursor-pointer">
        <Image
          src={navigationData.logo.src}
          alt={navigationData.logo.alt}
          width={40}
          height={40}
        />
      </button>

      {/* NAVIGATION */}
      <nav className="hidden md:flex flex-grow justify-center items-center">
        {navigationData.links.map((link) => (
          <NavLink key={link.id} href={link.id}>
            {link.label}
          </NavLink>
        ))}
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
                <button 
                  onClick={() => scrollToSection(link.id)} 
                  className="w-full text-left text-white py-2"
                >
                  {link.label}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
