import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AccountsTable = ({ accounts, onClickDelete }) => {
  const [getAccount, setGetAccount] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setGetAccount(accounts || []);
  }, [accounts]);

  return (
    <div className="overflow-x-auto text">
      {getAccount.length > 0 ? (
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Full Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider  text-gray-500 uppercase text-center">
                Role
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Warehouse
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getAccount.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {account.fullname}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {account.email}
                </td>
                <td
                  className={`px-6 text-center py-4 text-sm whitespace-nowrap ${
                    account.role === 'superadmin'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {account.role.toUpperCase()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {account.role === 'superadmin'
                    ? 'Admin'
                    : account.warehouse_name}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/manage-account/edit-account?account=${
                          account.email.split('@')[0]
                        }-00${account.id}`,
                      )
                    }
                    className={`${
                      account.role === 'superadmin'
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-700'
                    } text-white px-4 py-2 rounded mr-2`}
                    disabled={account.role === 'superadmin'}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded"
                    onClick={() => onClickDelete(account.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No accounts available.</p>
      )}
      <div className="flex justify-center mt-4"></div>
    </div>
  );
};

export default AccountsTable;
