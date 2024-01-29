import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import axios from 'axios';
import InputForWarehouse from './InputForWarehouse';
import ConfirmationModal from './ConfirmationModal';

import Toast from './Toast';
const AddWarehouse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const handleFormData = (data) => {
    setFormData(data);
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleSaveChanges = () => {
    setShowConfirmationModal(true);
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const onHandleAdd = async () => {
    console.log(formData);
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/warehouses',
        {
          name: formData.warehouse,
          prov_id: formData.selectedProvince,
          city_id: formData.selectedCityIndex,
          address: formData.selectedAddress,
          lon: formData.geometry.lng,
          lat: formData.geometry.lat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success === true) {
        showToast('success', 'Account created successfully');
      } else {
        showToast(
          'danger',
          error.response.data.message || 'Failed to create account',
        );
      }
    } catch (error) {
      console.error('Error creating account:', error);
      showToast(
        'danger',
        error.response.data.message || 'An error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
      onCloseConfirmationModal();
    }
  };

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
            <h1 className="mx-2 font-bold text-xl">Add New Warehouse</h1>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-4 bg-white p-4 rounded-md">
          <div>
            <h1 className="text-center text-xl font-bold">WAREHOUSE</h1>
            <hr className="mb-4 mt-2" />
          </div>
          <InputForWarehouse onFormChange={handleFormData} />
          <div className="mt-4 flex justify-end">
            <button
              onClick={onHandleSaveChanges}
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title="Add Warehouse"
            isLoading={loading}
            onClick={onHandleAdd}
          />
        )}
        {toast && (
          <Toast
            status={toast.status}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AdminLayout>
    </div>
  );
};

export default AddWarehouse;
