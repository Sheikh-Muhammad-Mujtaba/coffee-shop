"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

// Sanitization function to clean input
const sanitizeInput = (input: string) => {
  // Remove potentially harmful characters or patterns
  return input.replace(/[<>;'"(){}[\]]/g, "");
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = sanitizeInput(value); // Sanitize input
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const res = await fetch(`/api/menu?search=${encodeURIComponent(value)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        console.error("Failed to fetch menu items");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectItem = () => {
    // Clear query and results to close the dropdown
    setQuery("");
    setResults([]);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setQuery("");
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchContainerRef}
      className="relative w-full lg:w-[180px] sm:w-[222px]"
    >
      {/* Search Input */}
      <div className="flex items-center px-2 h-[40px] bg-white rounded-full shadow-lg">
        <Search className="text-gray-500" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Cappuccino"
          value={query}
          onChange={handleSearch}
          className="w-full h-full border-none text-sm px-2 rounded-full focus:outline-none"
        />
      </div>

      {/* Search Results Dropdown */}
      {query && results.length > 0 && (
        <ul className="absolute top-[44px] left-0 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto z-10">
          {results.map((item: any) => (
            <li key={item.id} className="border-b border-gray-200 last:border-none">
              <Link
                href={`/product-detail/menu/${item.id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black"
                onClick={handleSelectItem} // Close dropdown on selection
              >
                {sanitizeInput(item.title)}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Loading Indicator */}
      {isSearching && (
        <div className="absolute top-[44px] left-0 w-full bg-white shadow-lg rounded-md p-4 z-10">
          <p className="text-sm text-gray-500">Searching...</p>
        </div>
      )}

      {/* No Results Found */}
      {query && !isSearching && results.length === 0 && (
        <div className="absolute top-[44px] left-0 w-full bg-white shadow-lg rounded-md p-4 z-10">
          <p className="text-sm text-gray-500">No results found.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
