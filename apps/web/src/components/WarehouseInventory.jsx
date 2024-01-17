import { useNavigate } from 'react-router-dom';
import WarehouseAdminLayout from '../components/WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import WarehouseTable from './WarehouseTable';
import InventoryTable from './InventoryTable';
const WarehouseInventory = () => {
  const navigate = useNavigate();
  return (
    <div>
      <WarehouseAdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center">
            <div
              class="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate('/admin/manage-inventory');
              }}
            >
              <IoMdArrowBack class="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold text-xl">Manage Inventory</h1>
          </div>
          <div>
            <button class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none ">
              Add New Stock
            </button>
          </div>
        </div>
        <div className="p-4">
          <InventoryTable />
        </div>
      </WarehouseAdminLayout>
    </div>
  );
};

export default WarehouseInventory;
