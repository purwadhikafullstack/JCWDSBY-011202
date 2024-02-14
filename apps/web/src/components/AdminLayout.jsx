import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
const linksData = [
  { to: '/admin/manage-account', label: 'Account' },
  { to: '/admin/manage-product', label: 'Products' },
  { to: '/admin/manage-order', label: 'Order' },
  { to: '/admin/manage-warehouse', label: 'Warehouses' },
  { to: '/admin/manage-category', label: 'Categories' },
  { to: '/admin/manage-inventory', label: 'Inventory' },
];

const AdminLayout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  console.log(isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white text-black p-4 hidden sm:block
         transition-all duration-300 min-h-screen md:min-h-0`}
      >
        <div
          className="flex items-center mb-4"
          onClick={() => navigate('/admin')}
        >
          <h1 className="font-bold text-xl text-orange-500 cursor-pointer">
            Ace
          </h1>
          <h1 className="font-bold text-xl cursor-pointer">Warehouse</h1>
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
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-0 left-0 h-full w-64 bg-white shadow pt-4 z-50">
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
        <div className="relative">
          <div
            class={`space-y-2 absolute top-6 left-2 sm:hidden ${
              isMobileMenuOpen ? 'hidden' : 'auto'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <GiHamburgerMenu />
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
