import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InputMutation = (props) => {
  const [product, setProduct] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouses`,
        );
        setWarehouse(response.data.data);
      } catch (error) {
        console.error('Error fetching warehouse data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <label className="px-2.5 pt-1 block  text-sm font-medium text-gray-900 dark:text-gray-400">
          Select Product
        </label>
        <select
          className="my-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue=""
          value={props.valueProduct}
          onChange={props.onChangeProduct}
        >
          <option value="">Choose a Product</option>
          {product.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="px-2.5 pt-1 block  text-sm font-medium text-gray-900 dark:text-gray-400">
          Select Source Warehouse
        </label>
        <select
          className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={props.valueWarehouse}
          onChange={props.onChangeWarehouse}
          defaultValue=""
        >
          <option value="">Choose Source Warehouse</option>
          {warehouse.map(
            (wh) =>
              wh.id != userGlobal.warehouse_id && (
                <option key={wh.id} value={wh.id}>
                  {wh.name}
                </option>
              ),
          )}
        </select>
      </div>
    </div>
  );
};

export default InputMutation;
