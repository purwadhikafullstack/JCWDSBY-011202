import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useEffect } from 'react';
import ButtonWithLoading from './ButtonWithLoading';
import { useParams } from 'react-router-dom';
const EditModal = ({ closeModal, onEdit, initialData }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category_id: '',
  });

  console.log('Product Id:', id);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category_id: value,
    }));
  };

  const handleButtonClick = async () => {
    setLoading(true);

    try {
      const categoryId =
        formData.category_id !== '' ? parseInt(formData.category_id) : null;

      const formDataToSend = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category_id: categoryId,
      };

      console.log('MASUK');
      console.log(formDataToSend);

      await axios.patch(
        `http://localhost:8000/api/products/${id}`,
        formDataToSend,
      );

      const updatedProduct = await axios.get(
        `http://localhost:8000/api/products?id=${id}`,
      );

      if (onEdit) {
        onEdit(updatedProduct.data);
        console.log(updatedProduct.data);
      }
      setFormData({
        name: '',
        price: 0,
        description: '',
        category_id: '',
      });
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleCloseButtonClick = () => {
    closeModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        )
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#E6E6E6] py-2 w-10/12 mx-auto max-h-[80vh] overflow-y-auto rounded-lg max-w-md">
        <IoClose
          size={24}
          onClick={handleCloseButtonClick}
          className="cursor-pointer ml-2"
        />

        <div className="flex flex-col w-auto items-center my-2">
          <div className="w-11/12">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Product Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Price
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Categories
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.category_id}
              onChange={handleCategoryChange}
            >
              <option disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Description
            </label>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description Product..."
            ></textarea>
          </div>

          <div className="mt-2">
            <ButtonWithLoading
              title="Edit Product"
              isLoading={loading}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
