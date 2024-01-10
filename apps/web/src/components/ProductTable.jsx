import React from 'react';
import axios from 'axios';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products, onDelete }) => {
  const navigate = useNavigate();
  const truncateDescription = (description) => {
    const maxLength = 15;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const handleDelete = async (product) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${product.id}`);
      onDelete(product.id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="overflow-x-auto mx-auto">
      <div className="flex flex-col">
        <div className="hidden lg:table w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
          <thead className="bg-orange-50">
            <tr>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Product
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Price
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Description
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Category
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products && Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                    {products.length > 0 ? formatPriceToIDR(product.price) : ''}
                  </td>
                  <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                    {truncateDescription(product.description)}
                  </td>
                  <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500 whitespace-nowrap">
                    {product.category
                      ? product.category.category
                      : 'Uncategorized'}
                  </td>
                  <td className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs whitespace-nowrap">
                    <button
                      className="lg:bg-orange-500 lg:hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="lg:bg-slate-400 lg:hover:bg-slate-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="lg:px-6 lg:py-4 px-3 py-2 text-sm lg:text-sm sm:text-xs text-gray-500"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border-b border-orange-400 p-2"
              >
                <div className="font-medium">
                  {product.name} - {product.price}
                </div>
                <div className="text-sm text-gray-500">
                  {product.description}
                </div>
                <div className="text-xs text-gray-500">
                  Category:{' '}
                  {product.category
                    ? product.category.category
                    : 'Uncategorized'}
                </div>
                <div className="mt-2">
                  <button
                    className="w-[80px] bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleDelete(product)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="w-[80px] bg-slate-400 hover:bg-slate-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
