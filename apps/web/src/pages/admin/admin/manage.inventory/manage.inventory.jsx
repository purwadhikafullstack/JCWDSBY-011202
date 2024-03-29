import { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import WarehouseTable from '../../../../components/WarehouseTable';
import API_CALL from '../../../../helpers/API';
const ManageInventory = () => {
  const [temporaryWareHouse, setTemporaryWareHouse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/warehouses');
        setTemporaryWareHouse(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('warehouse_selected')) {
      sessionStorage.removeItem('warehouse_selected');
    }
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl sm:ml-0 ml-4">Manage Inventory</div>
        </div>
        <div className="p-4">
          <WarehouseTable temporaryWareHouse={temporaryWareHouse} />
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageInventory;
