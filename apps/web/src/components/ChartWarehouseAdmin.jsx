import JournalAdmin from './JornalAdminLanding';

import WarehouseLineStockChart from './Chart/WarehouseLineStockChart';
import WarehouseAdminBarChart from './Chart/WarehouseBarChart';
import WarehouseCategoryChart from './Chart/WarehouseCategoriesChart';
import WarehouseProductChart from './Chart/WarehouseProductChart';
const ChartAdmin = ({ user, product }) => {
  return (
    <div>
      <div className="sm:px-12 w-full flex sm:flex-row flex-col mt-4 mb-8 px-4 ">
        <div className="flex sm:w-8/12">
          <div className="w-full bg-white shadow-md sm:mr-4 p-2 ">
            <WarehouseAdminBarChart user={user} product={product} />
          </div>
        </div>
        <div className="w-full bg-white shadow-md h-auto sm:mt-0 mt-4">
          <JournalAdmin />
        </div>
      </div>
      <div className="sm:px-12 w-full flex sm:flex-row flex-col mt-4 mb-8 px-4">
        <div className=" bg-white shadow-md sm:mr-4 p-2 ">
          <WarehouseCategoryChart user={user} />
        </div>
        <div className="bg-white shadow-md sm:mr-4 p-2 sm:mt-0 mt-2">
          <WarehouseProductChart user={user} />
        </div>
        <div className="bg-white shadow-md sm:mx-0 p-2 w-full sm:mt-0 mt-2">
          <WarehouseLineStockChart user={user} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdmin;
