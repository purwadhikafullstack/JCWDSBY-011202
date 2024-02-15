import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import EditWarehouseAdmin from './EditWarehouseAdmin';
import { IoMdArrowBack } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { Loading } from './loadingComponent';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import API_CALL from '../helpers/API';

const UpdateAccount = () => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [warehouse, setWarehouse] = useState(0);
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const realIdNumber = location.search.split('-')[1].replace('00', '');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API_CALL.get(`/accounts?id=${realIdNumber}`);
        const { email, fullname, warehouse_id } = response.data.accounts[0];
        setEmail(email);
        setFullName(fullname);
        setWarehouse(parseInt(warehouse_id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [realIdNumber]);

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleSaveChanges = () => {
    setShowConfirmationModal(true);
  };

  const onHandleYes = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await API_CALL.patch(
        `/accounts/update-account/${realIdNumber}`,
        {
          fullname,
          email,
          role: 'admin',
          warehouse_id: warehouse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success === true) {
        showToast('success', 'Update account successfully');
      } else {
        showToast(
          'danger',
          error.response.data.message || 'Failed to create account',
        );
      }
    } catch (error) {
      console.error('Error update account:', error);
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
            <div className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer sm:block hidden">
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
            <div className="mx-auto mt-4 font-bold">Warehouse Admin Update</div>
          </div>
          <hr className="w-11/12 mx-auto mt-3" />
          {loading ? (
            <Loading />
          ) : (
            <div className="mt-4">
              <EditWarehouseAdmin
                onChangeEmail={(e) => setEmail(e.target.value)}
                onChangeFullName={(e) => setFullName(e.target.value)}
                onChangeWarehouse={(e) => setWarehouse(e.target.value)}
                selectedWarehouse={warehouse}
                emailValue={email}
                fullNameValue={fullname}
              />
            </div>
          )}
          <div className="flex justify-end p-2 mt-2">
            <button
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
              onClick={handleSaveChanges}
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
          title="Edit Admin"
          isLoading={loading}
          onClick={onHandleYes}
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

export default UpdateAccount;
