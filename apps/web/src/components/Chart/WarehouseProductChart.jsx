import API_CALL from '../../helpers/API';
import BarChart from './BarChart';
import { useState, useEffect } from 'react';

const WarehouseProductChart = ({ user }) => {
  const [isData, setData] = useState([]);

  const data = {
    labels: isData.length > 0 ? isData.map((item) => item.product_name) : [],
    datasets: [
      {
        label: 'Stock',
        data: isData.length > 0 ? isData.map((item) => item.product_sold) : [],
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
          `/journal/product-sold?warehouse_id=${Number(user.warehouse_id)}`,
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">
        Monthly Products Sales
      </h1>
      <BarChart data={data} type={'doughnut'} />
    </div>
  );
};

export default WarehouseProductChart;
