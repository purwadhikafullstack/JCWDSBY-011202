import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import AdminLayout from './AdminLayout';
import EditImage from './EditImage';
import MultiEditImage from './MultiEditImage';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import { Loading } from './loadingComponent';
import API_CALL from '../helpers/API';
const EditProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [newWeight, setNewWeight] = useState(products[0]?.weight || '');
  const [newName, setNewName] = useState(products[0]?.name || '');
  const [newPrice, setNewPrice] = useState(products[0]?.price || 0);
  const [newDescription, setNewDescription] = useState(
    products[0]?.description || '',
  );
  const [newCategory_id, setNewCategory_id] = useState(
    products[0]?.category_id || '',
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAgainProduct = async () => {
    try {
      const response = await API_CALL.get(`/products?id=${id}`);
      console.log(response.data.products);
      if (!response.data.products.length) {
        navigate('not-found');
      }
      setProducts(response.data.products);
      setNewWeight(response.data.products[0].weight);
      setNewName(response.data.products[0].name);
      setNewPrice(response.data.products[0].price);
      setNewCategory_id(response.data.products[0].category_id);
      setNewDescription(response.data.products[0].description);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAgainProduct();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    setButtonLoading(true);
    try {
      const response = await API_CALL.patch(`/products/${id}`, {
        name: newName,
        description: newDescription,
        category_id: newCategory_id,
        price: newPrice,
        weight: newWeight,
      });
      getAgainProduct();
      setShowConfirmationModal(false);
      showToast('success', response.data.message || `succes edit product`);
      setButtonLoading(false);
    } catch (error) {
      console.error('Error updating product:', error);
      showToast(
        'warning',
        error.response.data.message || `edit product failed`,
      );
      setButtonLoading(false);
    } finally {
      setButtonLoading(false);
    }
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleSaveChanges = () => {
    setShowConfirmationModal(true);
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div>
            <div className="flex items-center sm:ml-0 ml-4">
              <div
                className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate('/admin/manage-product');
                }}
              >
                <IoMdArrowBack className="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Edit Product</h1>
            </div>
          </div>
          <button
            onClick={onHandleSaveChanges}
            className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "
          >
            Save Changes
          </button>
        </div>
        <div className="mx-6 bg-white m-8 pb-4 rounded-sm sm:flex-row flex-col">
          <div className="p-4">
            <h1 className="font-medium text-black ">Edit Product</h1>
            <p className="text-sm font-light">
              Customize and modify your product
            </p>
            <hr className="mt-2" />
          </div>
          <div>
            <div className="p-4 flex sm:flex-row flex-col">
              <div className="w-full h-full sm:w-[400px] sm:h-[400px]">
                <EditImage products={products} />
              </div>
              <div className="w-full mr-4">
                <div className="sm:mx-6 w-full">
                  <div className="w-full">
                    <label className="block mb-2 sm:mt-0 mt-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Product Name
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="name"
                      defaultValue={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <div className="flex">
                      <div className="w-full mx-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Price
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          type="number"
                          name="price"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                        />
                      </div>
                      <div className="w-full mx-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Weight
                        </label>
                        <select
                          value={String(newWeight)}
                          onChange={(e) => setNewWeight(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value={''}>Select Weight</option>
                          <option value={1000}>1 kg</option>
                          <option value={2000}>2 kg</option>
                          <option value={3000}>3 kg</option>
                          <option value={4000}>4 kg</option>
                          <option value={5000}>5 kg</option>
                          <option value={6000}>6 kg</option>
                          <option value={7000}>7 kg</option>
                          <option value={8000}>8 kg</option>
                          <option value={9000}>9 kg</option>
                          <option value={1000}>10 kg</option>
                          <option value={2000}>More than 10 kg</option>
                        </select>
                      </div>
                      <div className="w-full mx-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                          Categories
                        </label>
                        <select
                          value={String(newCategory_id)}
                          onChange={(e) => setNewCategory_id(e.target.value)}
                          name="category_id"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value={''}>Select Category</option>
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              value={String(category.id)}
                            >
                              {category.category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                      Description
                    </label>
                    <textarea
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="description"
                      placeholder="Description Product..."
                      defaultValue={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    ></textarea>
                    <div className="w-full ">
                      <div className="mt-2 sm:h-32 h-auto border rounded-lg p-2 flex bg-gray-50 ">
                        <h1 className="text-sm font-medium text-gray-900 dark:text-gray-400 mr-4">
                          Other Images:
                        </h1>
                        <MultiEditImage products={products} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title="Add Product"
            isLoading={buttonLoading}
            onClick={handleFormSubmit}
          />
        )}
        {toast && (
          <Toast
            status={toast.status}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AdminLayout>
    </div>
  );
};

export default EditProduct;
