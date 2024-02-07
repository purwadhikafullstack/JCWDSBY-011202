import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseAdminLineStockChart = ({ product, user }) => {
  const [isData2, setData2] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const data2 = {
    labels: isData2.length > 0 ? isData2.map((item) => item.month) : [],
    datasets: [
      {
        label: 'Stock',
        data: isData2.length > 0 ? isData2.map((item) => item.stockSum) : [],
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
  console.log(selectedProduct, Number(user.warehouse_id));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/journal/stock-report?warehouse_id=${Number(
            user.warehouse_id,
          )}&product_id=${selectedProduct}`,
        );
        setData2(response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedWarehouse, selectedProduct]);

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">Stock Traffic</h1>
      <div className="flex">
        <select
          className="w-4/12 mx-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">All Product</option>
          {product &&
            product.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <BarChart data={data2} type={'line'} />
    </div>
  );
};

export default WarehouseAdminLineStockChart;
