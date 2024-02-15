import API_CALL from '../../helpers/API';
import BarChart from './BarChart';
import { useState, useEffect } from 'react';

const AdminLineStockChart = ({ warehouses, products }) => {
  const [isData2, setData2] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const data2 = {
    labels: isData2.length > 0 ? isData2.map((item) => item.month) : [],
    datasets: [
      {
        label: 'Stock',
        data: isData2.length > 0 ? isData2.map((item) => item.stockSum) : [],
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/journal/stock-report?warehouse_id=${selectedWarehouse}&product_id=${selectedProduct}`,
        );
        setData2(response.data.reverse());
      } catch (error) {
        console.error(error);
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
      <BarChart data={data2} type={'line'} />
    </div>
  );
};

export default AdminLineStockChart;
