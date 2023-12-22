import icon from '../assets/bussinesman.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const linksData = [
  { to: '/manage-account', label: 'Account' },
  { to: '/manage-product', label: 'Products' },
  { to: '/transaction', label: 'Transaction' },
  { to: '/warehouses', label: 'Warehouses' },
  { to: '/manage-category', label: 'Categories' },
];

const AdminLayout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white text-black p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        } transition-all duration-300 min-h-screen md:min-h-0`}
      >
        <div className="flex items-center mb-4">
          <Link to="/admin-landing">
            <img src={icon} className="w-[25px]" alt="" />
          </Link>
          <h1 className="ml-2 font-bold text-lg">Super Admin</h1>
        </div>
        <div className="text-[12px]">
          {linksData.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block py-2 px-4 transition-all duration-300 hover:bg-slate-200 hover:rounded-md "
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Burger Menu Button for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="text-orange-500 p-2 focus:outline-none transition-all duration-300 hover:text-orange-700"
        >
          ☰
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
