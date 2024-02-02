import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import AccountsTable from '../../../../components/AccountsTable';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../components/loadingComponent';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Toast from '../../../../components/Toast';

function ManageAccount() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [accountIdToDelete, setAccountIdToDelete] = useState(null);
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toastContent, setToastContent] = useState(null);
  const navigate = useNavigate();

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

  const onHandleDelete = (accountId) => {
    setAccountIdToDelete(accountId);
    setShowConfirmationModal(true);
  };

  const onHandleDeleteConfirmed = async () => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:8000/api/accounts/delete-account/${accountIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data.success === true) {
        showToast('success', 'Account deleted successfully');
        const response = await axios.get(
          'http://localhost:8000/api/accounts?role=admin&role=superadmin',
        );
        setAccount(response.data);
        showToast('success', 'delete account successfully');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showToast('danger', 'Error deleting account');
    } finally {
      setDeleteLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const onCloseHandleDelete = () => {
    setShowConfirmationModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/accounts?role=admin&role=superadmin',
        );
        setAccount(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('danger', 'Error fetching accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl">Warehouse Admins</div>
          <button
            onClick={() => navigate('/admin/manage-account/add-admin')}
            style={{ cursor: 'pointer' }}
            className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
          >
            Create Account <span className="font-bold">+</span>
          </button>
        </div>
        <div className="p-4">
          {loading ? (
            <Loading />
          ) : (
            <AccountsTable
              accounts={account}
              onClickDelete={(accountId) => onHandleDelete(accountId)}
            />
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseHandleDelete}
            onclickClose={onCloseHandleDelete}
            title="Delete Account"
            isLoading={deleteLoading}
            onClick={onHandleDeleteConfirmed}
          />
        )}
        {toastContent}
      </AdminLayout>
    </div>
  );
}

export default ManageAccount;
