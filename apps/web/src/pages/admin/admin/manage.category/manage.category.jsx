import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../../../components/AdminLayout';
import BasicTable from '../../../../components/CategoryTable';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import { IoClose } from 'react-icons/io5';

const ManageCategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      if (editingCategory) {
        await axios.patch(
          `http://localhost:8000/api/categories/${editingCategory.id}`,
          {
            category: newCategoryName,
          },
        );
      } else {
        await axios.post('http://localhost:8000/api/categories', {
          category: newCategoryName,
        });
      }

      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setModalOpen(false);
      setNewCategoryName('');
      setEditingCategory(null);
    }
  };

  const handleAddButtonClick = () => {
    setModalOpen(true);
    setEditingCategory(null);
  };

  const handleEditClick = (category) => {
    setModalOpen(true);
    setEditingCategory(category);
    setNewCategoryName(category.category);
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${categoryId}`);
      const response = await axios.get('http://localhost:8000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl">Category List</div>
          <button
            onClick={handleAddButtonClick}
            style={{ cursor: 'pointer' }}
            className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
          >
            Add Category <span className="font-bold">+</span>
          </button>
        </div>
        <div className="p-4">
          <BasicTable
            categories={categories}
            onEdit={handleEditClick}
            onDelete={deleteCategory}
          />
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
                  isLoading={loading}
                  onClick={handleButtonClick}
                />
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </div>
  );
};

export default ManageCategory;
