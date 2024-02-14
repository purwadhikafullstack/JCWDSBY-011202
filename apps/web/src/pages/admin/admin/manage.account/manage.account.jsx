import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import AccountsTable from '../../../../components/AccountsTable';
import { useNavigate, useSubmit } from 'react-router-dom';
import { Loading } from '../../../../components/loadingComponent';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Toast from '../../../../components/Toast';
import SearchBar from '../../../../components/SearchBar';
import Pagination from '../../../../components/Temporary/Pagination';
function ManageAccount() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [accountIdToDelete, setAccountIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toastContent, setToastContent] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState();
  const [endPoint, setEndPoint] = useState('');
  const [endPointAll, setEndPointAll] = useState(``);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
          `http://localhost:8000/api/accounts${
            endPoint || `?page=1&role=admin&role=superadmin`
          }`,
        );
        setCurrentPage(response.data.accounts);
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
    const filter = [`?page=${page}`];
    if (selectedWarehouse > 0) {
      filter.push(`&warehouse_id=${selectedWarehouse}`);
    }
    if (selectedAccount !== '') {
      filter.push(`&fullname=${selectedAccount}`);
    }
    if (selectedRole !== '') {
      filter.push(`&role=${selectedRole}`);
    } else {
      filter.push(`&role=admin&role=superadmin`);
    }
    setEndPoint(filter.join(''));
  }, [page, selectedRole, selectedWarehouse, selectedAccount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/accounts${
            endPoint || `?page=1&role=admin&role=superadmin`
          }`,
        );
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.accounts);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('danger', 'Error fetching accounts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endPoint]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/warehouses',
        );
        setWarehouses(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        showToast('danger', 'Error fetching accounts');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(currentPage, endPoint);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold ml-4 sm:ml-0 sm:text-xl">
            Warehouse Admins
          </div>
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
            <div>
              <div className="flex w-full my-2">
                <div className="sm:w-10/12 w-auto">
                  <SearchBar
                    onChange={(e) => setSelectedAccount(e.target.value)}
                  />
                </div>
                <div className="flex sm:w-1/2 w-full sm:mx-2">
                  <select
                    onChange={(e) => setSelectedWarehouse(e.target.value)}
                    className="w-1/2 h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:my-4"
                  >
                    <option value="">Warehouse</option>
                    {warehouses &&
                      warehouses.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                  <select
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-5/12 h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:my-4"
                  >
                    <option value="">Role</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </div>
              </div>
              <AccountsTable
                accounts={currentPage}
                onClickDelete={(accountId) => onHandleDelete(accountId)}
                page={page}
              />
              <div className="flex justify-center">
                <Pagination
                  products={totalPages}
                  onClickPrevious={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                  page={page}
                />
              </div>
            </div>
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
