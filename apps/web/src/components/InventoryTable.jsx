import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InventoryTable = ({ warehouseInventory, onDelete }) => {
  const navigate = useNavigate();
  const [Inventory, setInventory] = useState([]);
  const [Product, setProduct] = useState([]);

  const onHandleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/warehouse/storage/${id}`);
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.id !== id),
      );
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setInventory(warehouseInventory);
  }, [warehouseInventory]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const tempProduct = [];
        const productIds = warehouseInventory.map((item) => item.product_id);

        for (let i = 0; i < productIds.length; i++) {
          const response = await axios.get(
            `http://localhost:8000/api/products?id=${productIds[i]}`,
          );
          tempProduct.push(response.data.products[0]);
        }

        setProduct(tempProduct);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [warehouseInventory]);

  return (
    <div className="overflow-x-auto mx-auto">
      <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
        <thead className="bg-orange-50">
          <tr>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Product Preview
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Product
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Inventory.map((val, index) => {
            const productImage = Product[index]?.product_images?.[0]?.image;
            return (
              <tr key={index}>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                  {productImage && (
                    <img
                      src={`http://localhost:8000/productimage/${productImage}`}
                      className="w-16 mx-auto"
                    />
                  )}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap text-center">
                  {val.product_name}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap text-center">
                  {val.stock}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap flex flex-col sm:flex-row items-center justify-center">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mb-2 sm:mb-0 mr-2 sm:w-auto w-full"
                    onClick={() => {
                      navigate(
                        `/warehouse-admin/edit-stock/storage-000${val.id}`,
                      );
                    }}
                  >
                    Edit Stock
                  </button>
                  <button
                    className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded sm:w-auto w-full"
                    onClick={() => {
                      onHandleDelete(val.id);
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

export default InventoryTable;
