import AdminLayout from './AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import CustomFileInput from './CustomFileInput';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormProductAdd from './FormProductAdd';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import API_CALL from '../helpers/API';
const AddProduct = () => {
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([]);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const handleImagePreviewsChange = (files) => {
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedImagePreviews(previews);
    setImageToUpload(files);
  };

  const handleCancelPreview = () => {
    setSelectedImagePreviews([]);
  };

  const handleAddProduct = async () => {
    setButtonLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', nameProduct);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category_id', category_id);
      formData.append('weight', weight);
      imageToUpload.forEach((image, index) => {
        formData.append(`filesUpload`, image);
      });
      const response = await API_CALL.post('/products', formData);
      setShowConfirmationModal(false);
      showToast('success', 'Success Add Product');
      setButtonLoading(false);
      navigate('/admin/manage-product');
    } catch (error) {
      setShowConfirmationModal(false);
      setButtonLoading(false);
      console.error('Error adding product:', error);
      showToast('danger', error.response.data.message || 'Error Add Product');
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

  return (
    <AdminLayout>
      <div className="bg-white">
        <div className="flex justify-between p-4 items-center">
          <div className="flex items-center">
            <div
              className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer sm:ml-0 ml-4"
              onClick={() => {
                navigate('/admin/manage-product');
              }}
            >
              <IoMdArrowBack className="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold sm:text-xl">Add New Product</h1>
          </div>
          <div>
            <button
              onClick={onHandleSaveChanges}
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="mx-6 bg-white m-8">
        <div className="p-4">
          <h1 className="font-medium text-black">Upload Image</h1>
          <p className="text-sm font-light">
            Upload captivating Images to make the product stand out
          </p>
          <hr className="mt-2" />
        </div>
        <div className="sm:mx-6 flex sm:flex-row flex-col">
          <div className="w-auto">
            <CustomFileInput
              onImagePreviewsChange={handleImagePreviewsChange}
              onCancelPreview={handleCancelPreview}
            />
          </div>
          <div className="mx-2 w-full pb-2 pr-4">
            <FormProductAdd
              onChangeName={(e) => setNameProduct(e.target.value)}
              onChangePrice={(e) => setPrice(e.target.value)}
              onChangeCategory={(e) => setCategory_id(e.target.value)}
              onChangeDescription={(e) => setDescription(e.target.value)}
              onChangeWeight={(e) => setWeight(e.target.value)}
            />
            <div className="w-full ">
              <div className="mt-2 sm:h-32 h-auto border rounded-lg p-2 flex bg-gray-50 ">
                <h1 className="text-sm font-medium text-gray-900 dark:text-gray-400 mr-4">
                  Other Images:
                </h1>
                {selectedImagePreviews.length > 1 && (
                  <div className="flex flex-wrap space-x-4  item-center">
                    {selectedImagePreviews.slice(1).map((preview, index) => (
                      <img
                        key={index + 1}
                        src={preview}
                        className="w-24 h-24 object-cover rounded-md mb-2 md:w-[108px] md:h-[108px] md:mb-0"
                        alt={`Image Preview ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
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
          onClick={handleAddProduct}
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
  );
};

export default AddProduct;
