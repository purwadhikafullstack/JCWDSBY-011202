import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import { useSelector } from 'react-redux';
const InventoryTable = ({ warehouseInventory, onDelete }) => {
  const navigate = useNavigate();
  const [Inventory, setInventory] = useState([]);
  const [Product, setProduct] = useState([]);
  const [isConfirmationModal, setConfirmationModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteId, setDeleteId] = useState(0);
  const [loading, setLoading] = useState(false);
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleConfirmation = (id) => {
    setDeleteId(id);
    setConfirmationModal(true);
  };

  const onHandleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:8000/api/warehouse/storage/${deleteId}`,
      );
      setInventory((prevInventory) =>
        prevInventory.filter((item) => item.id !== id),
      );
      onDelete();
      showToast('success', 'Item deleted successfully.');
    } catch (error) {
      console.log(error);
      showToast('error', 'Failed to delete item. Please try again.');
    } finally {
      setLoading(false);
      setConfirmationModal(false);
    }
  };

  const onConfirmationClose = () => setConfirmationModal(false);

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
                      userGlobal.role === 'admin'
                        ? navigate(
                            `/warehouse-admin/edit-stock/storage-000${val.id}`,
                          )
                        : navigate(`/admin/edit-stock/storage-000${val.id}`);
                    }}
                  >
                    Edit Stock
                  </button>
                  <button
                    className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded sm:w-auto w-full"
                    onClick={() => {
                      onHandleConfirmation(val.id);
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
      {isConfirmationModal && (
        <ConfirmationModal
          title={'Delete Storage'}
          onclickClose={onConfirmationClose}
          onClickCancel={onConfirmationClose}
          isLoading={loading}
          onClick={onHandleDelete}
        />
      )}
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default InventoryTable;
