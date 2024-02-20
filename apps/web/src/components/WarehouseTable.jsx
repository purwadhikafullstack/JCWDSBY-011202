import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WarehouseTable = ({ temporaryWareHouse }) => {
  const [warehouse, setWarehouse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!warehouse.length) {
      setWarehouse(temporaryWareHouse);
    }
  }, [temporaryWareHouse, warehouse]);

  return (
    <div className=" mx-auto">
      <div className="max-w-full overflow-hidden overflow-x-auto">
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {warehouse.map((val, index) => (
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
                <td className="py-2 px-2 sm:px-4 text-sm text-gray-500 whitespace-nowrap flex items-center justify-center">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      navigate(
                        `/admin/manage-warehouse-inventory?warehouse=${val.id}`,
                      );
                      sessionStorage.setItem('warehouse_selected', val.id);
                    }}
                  >
                    Manage
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

export default WarehouseTable;
