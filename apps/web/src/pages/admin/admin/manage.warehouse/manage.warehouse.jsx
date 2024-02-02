import AdminLayout from '../../../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ListWarehouse from '../../../../components/ListWarehouse';
import { Loading } from '../../../../components/loadingComponent';
const ManageWarehouse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const onHandleDelete = async (id) => {
    try {
      const deleteWarehouse = await axios.delete(
        `http://localhost:8000/api/warehouses/${id}`,
      );
      setWarehouses((prevWarehouses) =>
        prevWarehouses.filter((warehouse) => warehouse.id !== id),
      );
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouses${location.search}`,
        );
        setWarehouses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);
  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl ">Warehouse List</div>
          <button
            style={{ cursor: 'pointer' }}
            onClick={() => {
              navigate('/admin/manage-warehouse/add-warehouse');
            }}
            className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
          >
            Add Warehouse <span className="font-bold">+</span>
          </button>
        </div>
        <div className="mt-4 mx-2 p-4">
          {loading ? (
            <Loading />
          ) : (
            <ListWarehouse
              warehouses={warehouses}
              onClickDelete={onHandleDelete}
            />
          )}
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageWarehouse;
