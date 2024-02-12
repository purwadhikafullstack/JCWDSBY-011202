import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import { useState } from 'react';
import InputForAdmin from './InputForAdmin';
import InputForWarehouseAdmin from './InputForWarehouseAdmin';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import axios from 'axios';

const AddAccount = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);
  const [isWarehouseAdmin, setIsWarehouseAdmin] = useState(false);
  const [role, setRole] = useState('superadmin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [warehouse, setWarehouse] = useState(0);

  const handleToggleAdmin = () => {
    setIsAdmin(true);
    setIsWarehouseAdmin(false);
    setRole('superadmin');
  };

  const handleToggleWarehouseAdmin = () => {
    setIsAdmin(false);
    setIsWarehouseAdmin(true);
    setRole('admin');
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
    const token = localStorage.getItem('token');
    console.log(email, warehouse);
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/accounts/create-account',
        {
          email,
          password,
          fullname,
          role,
          warehouse_id: warehouse,
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
            <div className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer sm:ml-0 ml-4 sm:block hidden">
              <IoMdArrowBack
                className="text-gray-700"
                size={24}
                onClick={() => navigate('/admin/manage-account')}
              />
            </div>
            <h1 className="mx-2 font-bold text-xl sm:ml-2 ml-4">Add Admin</h1>
          </div>
        </div>
        <div className="mx-6 bg-white m-8 pb-4">
          <div className="flex mx-auto sm:w-6/12">
            <div className="mx-auto mt-4 flex flex-col sm:block">
              <button
                className={`w-[200px] sm:my-0 my-2 mx-1 font-medium text-sm ${
                  isAdmin
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-200 text-black'
                } py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none`}
                onClick={handleToggleAdmin}
              >
                Admin
              </button>
              <button
                className={`w-[200px] mx-1 font-medium text-sm border-1 ${
                  isWarehouseAdmin
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-200 text-black'
                } py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none`}
                onClick={handleToggleWarehouseAdmin}
              >
                Warehouse Admin
              </button>
            </div>
          </div>
          <hr className="w-11/12 mx-auto mt-3" />
          <div className="p-4">
            {isAdmin && (
              <InputForAdmin
                onChangeEmail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onChangeFullName={(e) => setFullName(e.target.value)}
              />
            )}
            {isWarehouseAdmin && (
              <InputForWarehouseAdmin
                onChangeEmail={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                onChangeFullName={(e) => setFullName(e.target.value)}
                onChangeWarehouse={(e) => setWarehouse(e.target.value)}
              />
            )}
            <div className="flex justify-end p-2 mt-2">
              <button
                onClick={onHandleSaveChanges}
                className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
              >
                Save Changes
              </button>
              {showConfirmationModal && (
                <ConfirmationModal
                  onClickCancel={onCloseConfirmationModal}
                  onclickClose={onCloseConfirmationModal}
                  title="Add Account"
                  isLoading={loading}
                  onClick={onHandleAdd}
                />
              )}
            </div>
          </div>
        </div>
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

export default AddAccount;
