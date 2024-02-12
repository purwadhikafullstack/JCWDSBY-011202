import JournalAdmin from './JornalAdminLanding';

import WarehouseLineStockChart from './Chart/WarehouseLineStockChart';
import WarehouseAdminBarChart from './Chart/WarehouseBarChart';
import WarehouseCategoryChart from './Chart/WarehouseCategoriesChart';
import WarehouseProductChart from './Chart/WarehouseProductChart';
const ChartAdmin = ({ user, product }) => {
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
          <WarehouseCategoryChart user={user} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2">
          <WarehouseProductChart user={user} />
        </div>
        <div className="bg-white shadow-md mr-4 p-2 w-full">
          <WarehouseLineStockChart user={user} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ChartAdmin;
