import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';

const EditImage = ({ products }) => {
  const [image, setImage] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      if (products && products.length > 0) {
        const productImages = products[0]?.product_images;
        if (productImages && productImages.length > 0) {
          setImage(productImages[0]);
        }
      }
    };

    fetchData();
  }, [products]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewImage(file);
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  };

  const handleImageUpload = async () => {
    console.log('MASUK');
    if (!newImage) {
      console.error('No new image selected for upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('fileUpload', newImage);

      let response;

      if (image.id === undefined) {
        response = await axios.post(
          'http://localhost:8000/api/products/add-image',
          formData,
        );
      } else {
        response = await axios.patch(
          `http://localhost:8000/api/products/edit-image/${image.id}`,
          formData,
        );
      }

      console.log(response.data.data);

      if (response.status >= 200 && response.status < 300) {
        console.log('Image updated successfully');
        setImage(response.data.data.result);
        setPreviewImage(null);
        setNewImage(null);
      } else {
        console.error('Failed to update image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-[400px] h-[400px] flex items-center justify-center relative">
      {image && (
        <>
          <img
            src={
              previewImage ||
              `http://localhost:8000/productimage/${image.image}`
            }
            className="w-[400px] h-[400px] border-2"
            alt=""
          />
          <label
            htmlFor="fileInput"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            <FiEdit2 />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {newImage && (
            <button
              onClick={handleImageUpload}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-1 w-16 rounded-sm border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Save
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditImage;
