import { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import WarehouseTable from '../../../../components/WarehouseTable';
import axios from 'axios';
const ManageInventory = () => {
  const [temporaryWareHouse, setTemporaryWareHouse] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/warehouses',
        );
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
          <div className="font-bold text-xl">Manage Inventory</div>
        </div>
        <div className="p-4">
          <WarehouseTable temporaryWareHouse={temporaryWareHouse} />
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageInventory;
