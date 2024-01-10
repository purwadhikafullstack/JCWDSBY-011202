import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryTable = () => {
  const navigate = useNavigate();
  const [warehouseInventory, setWarehouseInventory] = useState([
    {
      product: 'Hikari Dining Chair',
      stock: 2,
    },
    {
      product: 'Skona Sofa',
      stock: 4,
    },
    {
      product: 'Living Bed',
      stock: 2,
    },
    {
      product: 'Ivory Table',
      stock: 1,
    },
  ]);
  console.log(warehouseInventory);
  return (
    <div className="overflow-x-auto mx-auto">
      <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
        <thead className="bg-orange-50">
          <tr>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Product
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Stock
            </th>
            <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {warehouseInventory.map((val, index) => {
            return (
              <tr key={index}>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.product}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                  {val.stock}
                </td>
                <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap flex items-center justify-center">
                  <button
                    className="lg:bg-orange-500 lg:hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      navigate(`/warehouse-admin/edit-stock`);
                    }}
                  >
                    Edit Stock
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

export default InventoryTable;
