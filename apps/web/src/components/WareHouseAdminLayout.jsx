import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const linksData = [
  { to: '/warehouse-admin/view-products', label: 'Products' },
  { to: '/warehouse-admin/view-categories', label: 'Categories' },
  { to: '/warehouse-admin/manage-order', label: 'Order' },
  { to: '/warehouse-admin/manage-inventory', label: 'Inventory' },
  { to: '/warehouse-admin/manage-mutation', label: 'Mutation' },
];

const WareHouseAdminLayout = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white text-black p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        } transition-all duration-300 min-h-screen md:min-h-0`}
      >
        <div
          className="flex items-center mb-4 cursor-pointer"
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
      <div className="flex-1 overflow-hidden overflow-y-auto">
        {props.children}
      </div>
    </div>
  );
};

export default WareHouseAdminLayout;
