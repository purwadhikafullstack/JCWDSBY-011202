import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import AccountsTable from '../../../../components/AccountsTable';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../components/loadingComponent';

function ManageAccount() {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/accounts?role=admin&role=superadmin',
        );
        setAccount(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
          {loading ? <Loading /> : <AccountsTable accounts={account} />}
        </div>
      </AdminLayout>
    </div>
  );
}

export default ManageAccount;
