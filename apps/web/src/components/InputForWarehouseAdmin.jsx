import axios from 'axios';
import { useEffect, useState } from 'react';
const InputForWarehouseAdmin = (props) => {
  const [warehouse, setWarehouses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouses`,
        );
        setWarehouses(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex">
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Full Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              onChange={props.onChangeFullName}
            />
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              onChange={props.onChangeEmail}
            />
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              onChange={props.onChangePassword}
            />
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Select Warehouse
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={props.onChangeWarehouse}
              value={props.selectedWarehouse}
            >
              <option value={''}>Select Warehouse</option>
              {warehouse.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForWarehouseAdmin;
