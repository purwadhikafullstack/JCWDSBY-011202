import AdminLayout from '../../../../components/AdminLayout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListWarehouse from '../../../../components/ListWarehouse';
import { Loading } from '../../../../components/loadingComponent';
import Toast from '../../../../components/Toast';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Pagination from '../../../../components/Temporary/Pagination';
import SearchBar from '../../../../components/SearchBar';
import API_CALL from '../../../../helpers/API';

const ManageWarehouse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastContent, setToastContent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [warehouseIdToDelete, setWarehouseIdToDelete] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleEdit = (id) => {
    navigate(
      `/admin/manage-warehouse/edit-warehouse?warehouse=Warehouse-00${id}`,
    );
  };

  const handleDelete = (id) => {
    setWarehouseIdToDelete(id);
    setShowConfirmationModal(true);
  };

  const handleCloseDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem('token');
    setDeleteLoading(true);
    try {
      const response = await API_CALL.delete(
        `/warehouses/${warehouseIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success === true) {
        showToast('success', 'Warehouse deleted successfully');
        const res = await API_CALL.get(
          `/warehouses?page=${page}&province_id=${selectedProvinceId}&name=${searchQuery}${location.search}`,
        );
        setWarehouses(res.data.data);
        setShowConfirmationModal(false);
        setLoading(false);
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
        const res = await API_CALL.get(
          `/warehouses?page=${page}&province_id=${selectedProvinceId}&name=${searchQuery}${location.search}`,
        );
        setWarehouses(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [location.search, page, selectedProvinceId, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API_CALL.get('/provincesandcities/provinces');
        setProvinces(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl sm:ml-0 ml-4">Warehouse List</div>
          <button
            className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
            onClick={() => navigate('/admin/manage-warehouse/add-warehouse')}
          >
            Add Warehouse <span className="font-bold">+</span>
          </button>
        </div>
        <div className="mt-4 mx-2 p-4">
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div className="flex w-full mb-2">
                <div className="w-1/2">
                  <SearchBar
                    placeholder="Search Warehouse"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-1/2">
                  <select
                    className="w-full sm:w-1/5 sm:ml-4 ml-2 h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:my-4"
                    onChange={(e) => setSelectedProvinceId(e.target.value)}
                  >
                    <option value="">Provinces</option>
                    {provinces.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <h1 className="text-end text-[14px] mt-1">
                    Showing <span>{warehouses.length}</span> Results
                  </h1>
                </div>
              </div>
              <ListWarehouse
                warehouses={warehouses}
                onClickDelete={handleDelete}
                onClickEdit={handleEdit}
              />
              <div className="flex justify-center my-4">
                <Pagination
                  page={page}
                  products={totalPages}
                  onClickPrevious={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                />
              </div>
            </div>
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={handleCloseDelete}
            onclickClose={handleCloseDelete}
            title="Delete Warehouse"
            isLoading={deleteLoading}
            onClick={handleDeleteConfirmed}
          />
        )}
        {toastContent}
      </AdminLayout>
    </div>
  );
};

export default ManageWarehouse;
