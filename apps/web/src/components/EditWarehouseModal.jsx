import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';

const EditWarehouse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [warehouse, setWarehouse] = useState(null);
  const realIdNumber = parseInt(
    location.search.split('=')[1].replace('Warehouse-00', ''),
  );
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseAddress, setWarehouseAddress] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const onCloseConfirmationModal = () => setShowConfirmationModal(false);

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onHandleSaveEdit = () => setShowConfirmationModal(true);

  const onHandleEdit = async () => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/api/warehouses/${realIdNumber}`,
        {
          prov_id: selectedProvince,
          city_id: selectedCityIndex,
          name: warehouseName,
          address: warehouseAddress,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      showToast(
        response.data.success ? 'success' : 'danger',
        response.data.success
          ? 'warehouse edited successfully'
          : 'Failed to edit warehouse',
      );
    } catch (error) {
      console.error('Error editing warehouse:', error);
      showToast(
        'danger',
        error.response?.data?.message || 'An error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
      onCloseConfirmationModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouses?warehouse_id=${realIdNumber}`,
        );
        const fetchedWarehouse = response.data.data[0];
        setWarehouse(fetchedWarehouse);
        setWarehouseName(fetchedWarehouse.name);
        setWarehouseAddress(fetchedWarehouse.address);
        setSelectedProvince(fetchedWarehouse.prov_id);
        setSelectedCityIndex(fetchedWarehouse.city_id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [realIdNumber]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/provincesandcities/provinces',
        );
        setProvinces(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/provincesandcities/cities?prov_id=${selectedProvince}`,
        );
        setCities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedProvince) fetchCities();
  }, [selectedProvince]);

  console.log(selectedProvince, selectedCityIndex);
  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center">
            <div
              className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate('/admin/manage-warehouse');
              }}
            >
              <IoMdArrowBack className="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold text-xl">Edit Warehouse</h1>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-4 bg-white p-4 rounded-md">
          <div>
            <h1 className="text-center text-xl font-bold">WAREHOUSE</h1>
            <hr className="mb-4 mt-2" />
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Warehouse Name
            </label>
            <input
              value={warehouseName}
              onChange={(e) => setWarehouseName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              City
            </label>
            <select
              value={selectedCityIndex}
              onChange={(e) => setSelectedCityIndex(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mx-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Address
            </label>
            <input
              value={warehouseAddress}
              onChange={(e) => setWarehouseAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onHandleSaveEdit}
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </AdminLayout>
      {showConfirmationModal && (
        <ConfirmationModal
          onClickCancel={onCloseConfirmationModal}
          onclickClose={onCloseConfirmationModal}
          title="Edit Warehouse"
          isLoading={loading}
          onClick={onHandleEdit}
        />
      )}
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EditWarehouse;
