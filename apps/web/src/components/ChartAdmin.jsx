import JournalAdmin from './JornalAdminLanding';

import AdminLineStockChart from './Chart/AdminLineStockChart';
import AdminBarChart from './Chart/AdminBarChart';
import AdminProductChart from './Chart/AdminProductsChart';
import AdminCategoryChart from './Chart/AdminCategoriesChart';
const ChartAdmin = ({ warehouses, products }) => {
  return (
    <div>
      <div className="px-4 sm:px-16 w-full flex flex-col sm:flex-row mt-4 mb-8">
        <div className="flex sm:w-8/12">
          <div className="w-full bg-white shadow-md sm:mr-4 p-2">
            <AdminBarChart warehouses={warehouses} products={products} />
          </div>
        </div>
        <div className="w-full bg-white shadow-md h-auto mt-4 sm:mt-0">
          <JournalAdmin />
        </div>
      </div>
      <div className="sm:px-16 w-full flex flex-col sm:flex-row mt-4 mb-8">
        <div className=" bg-white shadow-md sm:mr-4 mx-4 sm:mx-0 p-2">
          <AdminProductChart warehouses={warehouses} />
        </div>
        <div className="bg-white shadow-md sm:mr-4 mx-4 sm:mx-0 mt-2 sm:mt-0 p-2">
          <AdminCategoryChart warehouses={warehouses} />
        </div>
        <div className="bg-white shadow-md  sm:mr-0 p-2 mr-4 mx-4 mt-2 sm:mt-0 sm:mx-0 sm:w-full">
          <AdminLineStockChart warehouses={warehouses} products={products} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdmin;
