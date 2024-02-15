import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import API_CALL from '../../helpers/API';

const WarehouseAdminBarChart = ({ product, user }) => {
  const [data1, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const labels = data1.map((item) => item.month);
  const salesData = data1.map((item) => item.sales);
  console.log(product);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Products sold',
        data: salesData,
        backgroundColor: [
          'rgba(132, 136, 114, 1)',
          'rgba(24, 58, 55, 1)',
          'rgba(239, 214, 172, 1)',
          'rgba(218, 144, 86, 1)',
          'rgba(199, 82, 11, 1)',
          'rgba(196, 73, 0, 1)',
        ],
        borderColor: [
          'rgba(132, 136, 114, 1)',
          'rgba(24, 58, 55, 1)',
          'rgba(239, 214, 172, 1)',
          'rgba(218, 144, 86, 1)',
          'rgba(199, 82, 11, 1)',
          'rgba(196, 73, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/journal/monthly-sales?warehouse_id=${user.warehouse_id}&product_id=${selectedProduct}`,
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProduct]);

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">Monthly Sales</h1>
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
      {data1.length > 0 && <BarChart data={data} type={'bar'} />}
    </div>
  );
};

export default WarehouseAdminBarChart;
