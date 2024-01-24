import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import axios from 'axios';
const AddWarehouse = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/provincesandcities/provinces',
        );
        setProvinces(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/provincesandcities/cities?prov_id=${selectedProvince}`,
        );
        console.log(response);
        setCities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProvince]);

  console.log(selectedProvince);

  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center">
            <div
              className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate('/admin/manage-warehouse');
              }}
            >
              <IoMdArrowBack className="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold text-xl">Add New Warehouse</h1>
          </div>
          <div>
            <button className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none">
              Save Changes
            </button>
          </div>
        </div>

        <div className="m-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Warehouse Name
          </label>
          <input
            type="text"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter warehouse name"
          />

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Province
          </label>

          <select
            onChange={(e) => setSelectedProvince(e.target.value)}
            name="province"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            City
          </label>

          <select
            name="city"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter warehouse address"
          />
        </div>
      </AdminLayout>
    </div>
  );
};

export default AddWarehouse;
