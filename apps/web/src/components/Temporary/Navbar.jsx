import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const linksData = [
  { to: '/products', label: 'Products' },
  { to: '/', label: 'Home' },
];

const TemporaryNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // console.log('Scroll Position:', scrollPosition);
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
      <div className="flex justify-between">
        <div className="flex ml-36 items-center">
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
        <div className="flex flex-row-reverse items-center">
          <Link to="/cart" className="mx-2">
            <CiShoppingCart
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
