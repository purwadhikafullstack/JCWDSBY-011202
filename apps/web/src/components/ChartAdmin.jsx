import JournalAdmin from './JornalAdminLanding';
import BarChart from './Chart/BarChart';
import AdminLineStockChart from './Chart/AdminLineStockChart';
import AdminBarChart from './Chart/AdminBarChart';
import AdminProductChart from './Chart/AdminProductsChart';
import AdminCategoryChart from './Chart/AdminCategoriesChart';
const ChartAdmin = ({ warehouses, products }) => {
  const data3 = {
    labels: ['Meja', 'Kursi', 'Bantal Dudukan', 'Sofa', 'others'],
    datasets: [
      {
        label: 'Stock',
        data: [12, 19, 3, 5, 12, 2],
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

  return (
    <div>
      <div className="px-12 w-full flex mt-4 mb-8">
        <div className="flex w-8/12">
          <div className="w-full bg-white shadow-md mr-4 p-2">
            <AdminBarChart warehouses={warehouses} products={products} />
          </div>
        </div>
        <div className="w-full bg-white shadow-md h-auto">
          <JournalAdmin />
        </div>
      </div>
      <div className="px-12 w-full flex mt-4 mb-8">
        <div className=" bg-white shadow-md mr-4 p-2">
          <AdminProductChart warehouses={warehouses} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2">
          <AdminCategoryChart warehouses={warehouses} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2 w-full">
          <AdminLineStockChart warehouses={warehouses} products={products} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdmin;
