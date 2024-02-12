import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProductChart = ({ warehouses }) => {
  const [isData, setData] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const data = {
    labels: isData.length > 0 ? isData.map((item) => item.product_name) : [],
    datasets: [
      {
        label: 'Stock',
        data: isData.length > 0 ? isData.map((item) => item.product_sold) : [],
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/journal/product-sold?warehouse_id=${selectedWarehouse}`,
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedWarehouse]);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">Monthly Sales</h1>
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
      <BarChart data={data} type={'doughnut'} />
    </div>
  );
};

export default AdminProductChart;
