import JournalAdmin from './JornalAdminLanding';
import BarChart from './Chart/BarChart';
import WarehouseLineStockChart from './Chart/WarehouseLineStockChart';
import WarehouseAdminBarChart from './Chart/WarehouseBarChart';
const ChartAdmin = ({ user, product }) => {
  const data2 = {
    labels: [
      'August',
      'September',
      'October',
      'November',
      'Desember',
      'January',
    ],
    datasets: [
      {
        label: 'Stock',
        data: [12, 19, 3, 5, 2, 3],
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
  const data4 = {
    labels: ['Hikari Dining', 'Kursi', 'Bantal Dudukan', 'Sofa', 'others'],
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
            <WarehouseAdminBarChart user={user} product={product} />
          </div>
        </div>
        <div className="w-full bg-white shadow-md h-auto">
          <JournalAdmin />
        </div>
      </div>
      <div className="px-12 w-full flex mt-4 mb-8">
        <div className=" bg-white shadow-md mr-4 p-2">
          <h1 className="font-bold text-sm text-center my-1">
            Product Sold in a month
          </h1>

          <BarChart data={data4} type={'doughnut'} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2">
          <h1 className="font-bold text-sm text-center my-1">
            Categories Sold in a month
          </h1>

          <BarChart data={data3} type={'doughnut'} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2 w-full">
          <WarehouseLineStockChart user={user} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdmin;
