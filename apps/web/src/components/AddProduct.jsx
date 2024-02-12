import AdminLayout from './AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import CustomFileInput from './CustomFileInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormProductAdd from './FormProductAdd';

const AddProduct = () => {
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([]);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [NameProduct, setNameProduct] = useState('');
  const [Price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [Description, setDescription] = useState('');
  const [Category_id, setCategory_id] = useState('');
  const navigate = useNavigate();

  const handleImagePreviewsChange = (files) => {
    const previews = [];
    files.forEach((file) => {
      previews.push(URL.createObjectURL(file));
    });
    setSelectedImagePreviews(previews);
    setImageToUpload(files);
  };

  const handleCancelPreview = () => {
    setSelectedImagePreviews([]);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', NameProduct);
      formData.append('price', Price);
      formData.append('description', Description);
      formData.append('category_id', Category_id);
      formData.append('weight', weight);
      imageToUpload.forEach((image, index) => {
        formData.append(`filesUpload`, image);
      });
      const response = await axios.post(
        'http://localhost:8000/api/products',
        formData,
      );
      console.log('Product added successfully:', response.data);
      navigate('/admin/manage-product');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <AdminLayout>
        <div>
          <div className="flex justify-between bg-white h-16 p-4 items-center">
            <div className="flex items-center">
              <div
                class="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate('/admin/manage-product');
                }}
              >
                <IoMdArrowBack class="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Add New Product</h1>
            </div>
            <div>
              <button
                onClick={handleAddProduct}
                class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <div className="mx-6 bg-white m-8 pb-4">
          <div className="p-4">
            <h1 className="font-medium text-black ">Upload Image</h1>
            <p className="text-sm font-light">
              Upload capitaving Images to make the product stand out
            </p>
            <hr className="mt-2" />
          </div>
          <div className="mx-6 flex">
            <div>
              <div className="w-[400px] h-[400px]">
                <CustomFileInput
                  onImagePreviewsChange={handleImagePreviewsChange}
                  onCancelPreview={handleCancelPreview}
                />
              </div>
            </div>
            <div className="mx-2 w-full">
              <div className="w-full ml-4">
                <FormProductAdd
                  onChangeName={(e) => setNameProduct(e.target.value)}
                  onChangePrice={(e) => setPrice(e.target.value)}
                  onChangeCategory={(e) => setCategory_id(e.target.value)}
                  onChangeDescription={(e) => setDescription(e.target.value)}
                  onChangeWeight={(e) => setWeight(e.target.value)}
                />
                <div className="w-full ">
                  <div className="mt-2 h-32 border rounded-lg p-2 flex bg-gray-50 ">
                    <h1 className="text-sm font-medium text-gray-900 dark:text-gray-400 mr-4">
                      Other Images:
                    </h1>
                    {selectedImagePreviews.length > 1 && (
                      <div className="flex flex-wrap space-x-4  item-center">
                        {selectedImagePreviews
                          .slice(1)
                          .map((preview, index) => (
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
        </div>
      </AdminLayout>
    </div>
  );
};

export default AddProduct;
