import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseCategoryChart = ({ user }) => {
  const [isData, setData] = useState([]);

  const data = {
    labels: isData.length > 0 ? isData.map((item) => item.category_name) : [],
    datasets: [
      {
        label: 'Stock',
        data: isData.length > 0 ? isData.map((item) => item.category_sold) : [],
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
        const response = await axios.get(
          `http://localhost:8000/api/journal/category-sold?warehouse_id=${Number(
            user.warehouse_id,
          )}`,
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <h1 className="font-bold text-sm text-center my-1">
        Monthly Categories Sales
      </h1>
      <BarChart data={data} type={'doughnut'} />
    </div>
  );
};

export default WarehouseCategoryChart;
