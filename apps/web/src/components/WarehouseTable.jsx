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
    <div className="overflow-x-auto mx-auto">
      <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
        <thead className="bg-orange-50">
          <tr>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Warehouse
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Provinsi
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Kota
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {warehouse.map((val, index) => {
            return (
              <tr key={index}>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.name}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.prov}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.city}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap flex items-center justify-center">
                  <button
                    className="lg:bg-orange-500 lg:hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      navigate(`/warehouse-admin/manage-inventory`);
                    }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseTable;
