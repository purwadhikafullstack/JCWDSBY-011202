import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';

const linksData = [
  { to: '/warehouse-admin/view-products', label: 'Products' },
  { to: '/warehouse-admin/view-categories', label: 'Categories' },
  { to: '/warehouse-admin/manage-order', label: 'Order' },
  { to: '/warehouse-admin/manage-inventory', label: 'Inventory' },
  { to: '/warehouse-admin/manage-mutation', label: 'Mutation' },
];

const LandingWareHouseAdminLayout = (props) => {
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white text-black p-4 hidden sm:block
        transition-all duration-300 min-h-screen md:min-h-0`}
      >
        <div
          className="flex items-center mb-4"
          onClick={() => navigate('/warehouse-admin')}
        >
          <h1 className="font-bold text-xl text-orange-500">Ace</h1>
          <h1 className="font-bold text-xl">Warehouse</h1>
        </div>
        <div className="text-[12px]">
          {linksData.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block py-2 px-4 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:rounded-md "
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="block w-full text-start mt-4 py-2 px-4 text-black-500 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 h-full w-64 bg-white shadow pt-4">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 focus:outline-none mx-4"
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
            <h1
              className="font-bold text-xl text-orange-500 cursor-pointer"
              onClick={() => navigate('/admin')}
            >
              Ace
            </h1>
            <h1
              className="font-bold text-xl cursor-pointer"
              onClick={() => navigate('/admin')}
            >
              Warehouse
            </h1>
          </div>
          <div>
            <div className="text-[12px]">
              {linksData.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="block py-2 px-4 transition-all duration-300 hover:bg-orange-500 hover:rounded-md hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="block w-full text-start mt-4 py-2 px-4 text-black-500 transition-all duration-300 hover:bg-orange-500 hover:text-white hover:rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden overflow-y-auto">
        <div>
          <div className="w-full mx-auto bg-orange-500 flex p-4 justify-between items-center">
            <div
              class="space-y-2 sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <GiHamburgerMenu />
            </div>
            <h1 className="text-md sm:text-2xl font-bold text-white">
              Welcome, Warehouse Admin
            </h1>
            <div className="flex items-center">
              <div className="mr-4">
                <h1 className=" text-[10px] sm:text-xs font-semibold text-white">
                  {userGlobal.fullname}
                </h1>
                <h2 className="text-[10px] sm:text-xs text-white">
                  {userGlobal.role}
                </h2>
              </div>
              <VscAccount
                size={24}
                className="text-white hover:text-orange-200 transition-all duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default LandingWareHouseAdminLayout;
