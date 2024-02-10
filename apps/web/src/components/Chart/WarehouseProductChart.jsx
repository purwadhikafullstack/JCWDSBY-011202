import BarChart from './BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios';

const WarehouseProductChart = ({ user }) => {
  const [isData, setData] = useState([]);

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

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/journal/product-sold?warehouse_id=${Number(
            user.warehouse_id,
          )}`,
        );
        console.log(response);
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
        Monthly Products Sales
      </h1>
      <BarChart data={data} type={'doughnut'} />
    </div>
  );
};

export default WarehouseProductChart;
