import React from 'react';

const AccountsTable = ({ accounts, onEdit = () => { }, onDelete = () => { } }) => {
  return (
    <div className="overflow-x-auto text">
      <table className="min-w-full border divide-y divide-gray-200 ">
        <thead className="bg-orange-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Account
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Address ID
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Warehouse ID
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {accounts.map((account) => (
            <tr key={account.id}>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {account.username}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {account.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {account.address_id ? account.address_id : '-'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {account.warehouse_id ? account.warehouse_id : '-'}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                  onClick={() => onEdit(account)}
                >
                  Edit
                </button>
                <button
                  className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded"
                  onClick={() => onDelete(account.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
