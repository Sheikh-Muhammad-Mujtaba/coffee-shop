"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import SearchBar from "@/components/ui/Searchbar";

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const getLinkClasses = (path: string) =>
    `text-[16px] sm:text-[18px] ${
      pathname === path ? "text-[#FF902B]" : "text-gray-700"
    } hover:text-[#FF902B]`;

  // Close search bar on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close search bar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent z-50">
      <div className="max-w-[1161px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={150}
            height={40}
            className="w-[120px] sm:w-[150px] h-auto cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-8">
          <Link href="/#about" className={getLinkClasses("/#about")}>
            About Us
          </Link>
          <Link href="/#products" className={getLinkClasses("/#products")}>
            Our Product
          </Link>
          <Link href="/#delivery" className={getLinkClasses("/#delivery")}>
            Delivery
          </Link>
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center gap-4">
          {/* Search (Desktop) */}
          <div className="hidden lg:flex w-[180px] sm:w-[222px]">
            <SearchBar /> {/* Use the SearchBar component */}
          </div>

          {/* Search (Mobile) */}
          <button
            className="lg:hidden text-gray-700 hover:text-[#FF902B]"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search"
          >
            <Search size={24} />
          </button>

          {/* Shopping Cart */}
          <Link href={`/cart`} passHref>
            <ShoppingCart className="text-gray-700 hover:text-[#FF902B] cursor-pointer" />
          </Link>

          {/* Hamburger Menu Icon */}
          <button
            className="sm:hidden text-gray-700 hover:text-[#FF902B] z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`sm:hidden fixed top-0 left-0 w-full h-screen bg-white z-20 flex flex-col items-center gap-6 pt-20 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/#about"
          className={`${getLinkClasses("/#about")} text-xl`}
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/#products"
          className={`${getLinkClasses("/#products")} text-xl`}
          onClick={() => setIsMenuOpen(false)}
        >
          Our Product
        </Link>
        <Link
          href="/#delivery"
          className={`${getLinkClasses("/#delivery")} text-xl`}
          onClick={() => setIsMenuOpen(false)}
        >
          Delivery
        </Link>
      </div>

      {/* Search Bar for Mobile */}
      {isSearchOpen && (
        <div
          ref={searchRef}
          className="absolute top-[60px] left-0 w-full bg-white shadow-md p-4 z-30"
        >
          <div className="flex items-center w-full h-[40px] px-2 bg-gray-100 rounded-full">
            <SearchBar /> {/* Use the SearchBar component */}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
