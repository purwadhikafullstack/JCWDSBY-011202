import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';

const linksData = [
  { to: '/', label: 'Home' },
  { to: '/product-search', label: 'Products' },
];

const TemporaryNavbar = (props) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCountCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:8000/api/cart/navbar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setCartCount(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountCart();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={` top-0 left-0 right-0 z-10 p-4 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow fixed' : 'bg-transparent '
      }`}
    >
      <div className="flex justify-between w-10/12 mx-auto">
        <div className="flex items-center">
          <div
            class="space-y-2 sm:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <GiHamburgerMenu />
          </div>
          <h1 className="font-bold text-xl text-orange-500 ml-2">Ace</h1>
          <h1 className="font-bold text-xl">Warehouse</h1>
          {linksData.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="hidden sm:block ml-8 font-semibold text-[14px] hover:text-orange-400 transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <Link to="/cart" className="mx-2">
            <CiShoppingCart
              onClick={() => navigate('/cart')}
              size={24}
              className="hover:text-orange-400 transition-all duration-300"
            />
            <div className={`relative`}>
              <div className="absolute text-xs rounded-full bg-[#F06105] px-1 text-white font-semibold -top-7 left-4">
                {props.cartCount ? props.cartCount : cartCount}
              </div>
            </div>
          </Link>
          <Link
            to={
              localStorage.getItem('token') ? '/user/dashboard' : '/user/login'
            }
            className="mx-2"
          >
            <VscAccount
              size={24}
              className="hover:text-orange-400 transition-all duration-300"
            />
          </Link>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 h-full w-64 bg-white shadow">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-bold">Menu</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <SearchBar />
            {linksData.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-800 hover:text-orange-400 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemporaryNavbar;
