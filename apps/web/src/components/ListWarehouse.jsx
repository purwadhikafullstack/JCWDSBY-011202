import { useEffect, useState } from 'react';

const ListWarehouse = ({ warehouses, onClickDelete, onClickEdit }) => {
  const [listWarehouse, setListWarehouse] = useState([]);

  useEffect(() => {
    setListWarehouse(warehouses);
  }, [warehouses]);

  return (
    <div className=" mx-auto max-w-full">
      <div className=" overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase">
                Warehouse
              </th>
              <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase">
                Provinsi
              </th>
              <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase">
                Kota
              </th>
              <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase">
                Address
              </th>
              <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listWarehouse.map((val, index) => (
              <tr key={index}>
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.name}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.province_name}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.city_name}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap text-center">
                  {val.address}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap flex flex-col sm:flex-row items-center justify-center">
                  <button
                    onClick={() => onClickEdit(val.id)}
                    className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onClickDelete(val.id)}
                    className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListWarehouse;
