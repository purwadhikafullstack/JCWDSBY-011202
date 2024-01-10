import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

const linksData = [
  { to: '/', label: 'Home' },
  { to: '/product-search', label: 'Products' },
];

const TemporaryNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-white p-4 ${
        isScrolled ? 'bg-transparent' : 'bg-white'
      } transition-all duration-300 opacity-95 z-10`}
    >
      <div className="flex justify-between w-10/12 mx-auto">
        <div className="flex  items-center">
          <h1 className="font-bold text-xl text-orange-500">Ace</h1>
          <h1 className="font-bold text-xl">Warehouse</h1>
          {linksData.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="ml-8 font-semibold text-[14px] hover:text-orange-400 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex  items-center">
          <SearchBar />
          <Link to="/cart" className="mx-2">
            <CiShoppingCart
              size={24}
              className="hover:text-orange-400 transition-all duration-300"
            />
          </Link>
          <Link to="/cart" className="mx-2">
            <VscAccount
              size={24}
              className="hover:text-orange-400 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemporaryNavbar;
