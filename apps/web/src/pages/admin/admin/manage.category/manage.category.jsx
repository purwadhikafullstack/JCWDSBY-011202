import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import BasicTable from '../../../../components/CategoryTable';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { IoClose } from 'react-icons/io5';
import { Loading } from '../../../../components/loadingComponent';
import Toast from '../../../../components/Toast';
import ConfirmationModal from '../../../../components/ConfirmationModal';
const ManageCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const handleButtonClick = async () => {
    setButtonLoading(true);
    try {
      if (editingCategory) {
        await axios.patch(
          `http://localhost:8000/api/categories/${editingCategory.id}`,
          {
            category: newCategoryName,
          },
        );
        showToast('success', 'succes edit category');
      } else {
        await axios.post('http://localhost:8000/api/categories', {
          category: newCategoryName,
        });
        showToast('success', 'succes create category');
      }

      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setButtonLoading(false);
      setModalOpen(false);
      setNewCategoryName('');
      setEditingCategory(null);
    }
  };

  const handleAddButtonClick = () => {
    setModalOpen(true);
    setEditingCategory(null);
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(
        `http://localhost:8000/api/categories/${selectedCategoryId}`,
      );
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
      setDeleteLoading(false);
      setShowConfirmationModal(false);
      showToast('success', response.message || 'success delete category');
    } catch (error) {
      showToast('warning', error.response.message || 'failed delete category');
      console.error('Error deleting category:', error);
    } finally {
      setDeleteLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleEditClick = (category) => {
    setModalOpen(true);
    setEditingCategory(category);
    setNewCategoryName(category.category);
  };

  const deleteCategory = async (categoryId) => {
    setShowConfirmationModal(true);
    setSelectedCategoryId(categoryId);
  };

  const closeModal = () => {
    set(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
        setShowConfirmationModal(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold sm:ml-0 ml-4 text-xl">Category List</div>
          <button
            onClick={handleAddButtonClick}
            style={{ cursor: 'pointer' }}
            className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
          >
            Add Category <span className="font-bold">+</span>
          </button>
        </div>
        <div className="p-4">
          {loading ? (
            <Loading />
          ) : (
            <BasicTable
              categories={categories}
              onEdit={handleEditClick}
              onDelete={deleteCategory}
            />
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#E6E6E6] p-2 w-[400px] rounded-md">
              <IoClose
                size={24}
                onClick={closeModal}
                className="cursor-pointer"
              />
              <h2 className="text-xl font-bold mb-4 text-center">
                {editingCategory ? 'Confirm Edit' : 'Add Category'}
              </h2>
              <div className="w-10/12 mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                  Category Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="mt-2 flex justify-center items-center">
                <ButtonWithLoading
                  title={editingCategory ? 'Confirm Edit' : 'Add Category'}
                  isLoading={buttonLoading}
                  onClick={handleButtonClick}
                />
              </div>
            </div>
          </div>
        )}
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title="Delete Category"
            isLoading={deleteLoading}
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
      </AdminLayout>
    </div>
  );
};

export default ManageCategory;
