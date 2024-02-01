import AdminLayout from '../../../../components/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ListWarehouse from '../../../../components/ListWarehouse';
import { Loading } from '../../../../components/loadingComponent';
import Toast from '../../../../components/Toast';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import EditWarehouse from '../../../../components/EditWarehouseModal';

const ManageWarehouse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastContent, setToastContent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [warehouseIdToDelete, setWarehouseIdToDelete] = useState(null);

  const showToast = (status, message) => {
    const content = (
      <Toast
        status={status}
        message={message}
        onClose={() => setToastContent(null)}
      />
    );
    setToastContent(content);
  };

  const onHandleEdit = (id) => {
    navigate(
      `/admin/manage-warehouse/edit-warehouse?warehouse=Warehouse-00${id}`,
    );
  };

  const onHandleDelete = (id) => {
    setWarehouseIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const onCloseHandleDelete = () => {
    setShowConfirmationModal(false);
  };

  const onHandleDeleteConfirmed = async () => {
    const token = localStorage.getItem('token');
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/warehouses/${warehouseIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success === true) {
        showToast('success', 'Warehouse deleted successfully');
        const response = await axios.get(
          'http://localhost:8000/api/warehouses',
        );
        setWarehouses(response.data.data);
        setShowConfirmationModal(false);
      }
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      showToast('error', 'Error deleting warehouse');
    } finally {
      setDeleteLoading(false);
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
              onClickEdit={onHandleEdit}
            />
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseHandleDelete}
            onclickClose={onCloseHandleDelete}
            title="Delete Warehouse"
            isLoading={deleteLoading}
            onClick={onHandleDeleteConfirmed}
          />
        )}
        {toastContent}
      </AdminLayout>
    </div>
  );
};

export default ManageWarehouse;
