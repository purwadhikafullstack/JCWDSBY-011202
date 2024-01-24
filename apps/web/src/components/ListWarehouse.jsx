import { useEffect, useState } from 'react';

const ListWarehouse = ({ warehouses, onClickDelete }) => {
  const [listWarehouse, setListWarehouse] = useState([]);
  useEffect(() => {
    setListWarehouse(warehouses);
  }, [warehouses]);

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
              Address
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listWarehouse.map((val, index) => {
            return (
              <tr key={index}>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.name}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.province_name}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.city_name}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap text-center">
                  {val.address}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap flex items-center justify-center">
                  <button className="lg:bg-orange-500 lg:hover:bg-orange-700 text-white px-4 py-2 rounded mr-2">
                    Edit
                  </button>
                  <button
                    className="lg:bg-slate-400 lg:hover:bg-slate-700 text-white px-4 py-2 rounded"
                    onClick={() => {
                      onClickDelete(val.id);
                    }}
                  >
                    Delete
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

export default ListWarehouse;
