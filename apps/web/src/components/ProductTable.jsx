import React from 'react';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import API_CALL from '../helpers/API';
const ProductTable = ({ products, onDelete }) => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedProduct, setProduct] = useState();

  const truncateDescription = (description) => {
    const maxLength = 15;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const handleDelete = async (product) => {
    setButtonLoading(true);
    try {
      await API_CALL.delete(`/products/${selectedProduct.id}`);
      onDelete(selectedProduct.id);
      setButtonLoading(false);
      setShowConfirmationModal(false);
      showToast('success', 'Product deleted successfully');
    } catch (error) {
      setShowConfirmationModal(false);
      showToast('warning', 'Product deleted failed');
      console.error('Error deleting product:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleSaveChanges = (product) => {
    setProduct(product);
    setShowConfirmationModal(true);
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="overflow-x-auto mx-auto">
      <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
        <thead className="bg-orange-50">
          <tr>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Product
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Price
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Description
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Category
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Total Stock
            </th>
            <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                  {product.name}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                  {formatPriceToIDR(product.price)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                  {truncateDescription(product.description)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap text-center">
                  {product.category
                    ? product.category.category
                    : 'Uncategorized'}
                </td>
                <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap text-center">
                  {product.total_stock}
                </td>
                <td className="px-3 py-2 text-sm whitespace-nowrap">
                  <button
                    className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onHandleSaveChanges(product)}
                    className="bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-3 py-2 text-sm text-gray-500 text-center"
              >
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showConfirmationModal && (
        <ConfirmationModal
          onClickCancel={onCloseConfirmationModal}
          onclickClose={onCloseConfirmationModal}
          title="Add Product"
          isLoading={buttonLoading}
          onClick={handleDelete}
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

export default ProductTable;
