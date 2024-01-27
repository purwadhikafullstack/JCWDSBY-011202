import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';
import axios from 'axios';

const linksData = [
  { to: '/', label: 'Home' },
  { to: '/product-search', label: 'Products' },
];

const TemporaryNavbar = (props) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const getCountCart = async () => {
    try {
      const token = localStorage.getItem('login');
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
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={`bg-white p-4 shadow ${
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
    </div>
  );
};

export default TemporaryNavbar;
