import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBarChart = ({ warehouses, products }) => {
  const [data1, setData] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const labels = data1.map((item) => item.month);
  const salesData = data1.map((item) => item.sales);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Products sold',
        data: salesData,
        backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange'],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/journal/monthly-sales?warehouse_id=${selectedWarehouse}&product_id=${selectedProduct}`,
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedWarehouse, selectedProduct]);

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">Monthly Sales</h1>
      <div className="flex">
        <select
          className="w-4/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedWarehouse}
          onChange={handleWarehouseChange}
        >
          <option value="">All Warehouse</option>
          {warehouses &&
            warehouses.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          className="w-4/12 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">All Product</option>
          {products &&
            products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {data1.length > 0 && <BarChart data={data} type={'bar'} />}
    </div>
  );
};

export default AdminBarChart;