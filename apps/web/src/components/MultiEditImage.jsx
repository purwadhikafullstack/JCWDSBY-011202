import { useEffect, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { CiTrash } from 'react-icons/ci';
import axios from 'axios';

const MultiEditImage = ({ products }) => {
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (products?.length > 0) {
        const productImages = products[0]?.product_images;
        if (productImages?.length > 0) {
          setImages(productImages);
          setNewImages(Array(productImages.length).fill(null));
          setPreviewImages(Array(productImages.length).fill(null));
        }
      }
    };
    fetchData();
  }, [products]);
  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    setNewImages((prevNewImages) => {
      const newImagesCopy = [...prevNewImages];
      newImagesCopy[index] = file;
      return newImagesCopy;
    });
    setPreviewImages((prevPreviewImages) => {
      const previewImagesCopy = [...prevPreviewImages];
      previewImagesCopy[index] = URL.createObjectURL(file);
      return previewImagesCopy;
    });
  };
  const handleImageUpload = async (index) => {
    const file = newImages[index];
    if (!file) {
      console.error('No new image selected for upload.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('fileUpload', file);

      const response = await axios.patch(
        `http://localhost:8000/api/products/edit-image/${images[index + 1].id}`,
        formData,
      );
      if (response.status === 200) {
        const updatedProduct = response.data.data.result;

        setImages((prevImages) =>
          prevImages.map((image, i) =>
            i === index + 1 ? updatedProduct : image,
          ),
        );
        setNewImages((prevNewImages) => {
          const newImagesCopy = [...prevNewImages];
          newImagesCopy[index] = null;
          return newImagesCopy;
        });

        setPreviewImages((prevPreviewImages) => {
          const previewImagesCopy = [...prevPreviewImages];
          previewImagesCopy[index] = null;
          return previewImagesCopy;
        });
      } else {
        console.error('Failed to update image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddImage = async () => {
    const fileInput = document.getElementById('add-input');
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected for upload.');
      return;
    }
    const file = fileInput.files[0];
    try {
      const formData = new FormData();
      formData.append('filesUpload', file);

      const response = await axios.post(
        `http://localhost:8000/api/products/add-image/${products[0].id}`,
        formData,
      );
      if (response.status === 201) {
        const updatedProduct = response.data.data[0];

        setImages((prevImages) => [...prevImages, updatedProduct]);
        fileInput.value = '';
      } else {
        console.error('Failed to add image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/products/delete-image/${id}`,
      );
      if (response.status === 200) {
        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== id),
        );
      } else {
        console.error('Failed to delete image. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-wrap space-x-4 items-center">
      {images.slice(1).map((val, index) => (
        <div key={index} className="relative">
          <img
            src={
              previewImages[index] ||
              `http://localhost:8000/productimage/${val.image}`
            }
            className="sm:w-24 sm:h-24 w-20 object-cover rounded-md mb-2 md:w-[108px] md:h-[108px] md:mb-0"
            alt={`Image Preview ${index + 1}`}
          />
          <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <label
              htmlFor={`fileInput-${index}`}
              className="bg-white p-2 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              <FiEdit2 />
              <input
                type="file"
                id={`fileInput-${index}`}
                className="hidden"
                onChange={(event) => handleFileChange(event, index)}
              />
            </label>
            <button
              onClick={() => handleDeleteImage(val.id)}
              className="bg-white p-2 rounded-full border border-gray-300 hover:bg-gray-100 cursor-pointer ml-2"
            >
              <CiTrash />
            </button>
          </div>
          {newImages[index] && (
            <button
              onClick={() => handleImageUpload(index)}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-1 w-16 rounded-sm border border-gray-300 hover:bg-gray-100 cursor-pointer"
            >
              Save
            </button>
          )}
        </div>
      ))}
      {images.length < 5 && (
        <label
          htmlFor={`add-input`}
          className="sm:w-24 sm:h-24 w-8 h-8 object-cover text-center rounded-full mb-2 md:w-8 md:h-8 md:mb-0 border border-black text-black hover:border-orange-500 transition-all duration-300 hover:text-orange-500"
        >
          +
          <input
            type="file"
            id="add-input"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      )}
    </div>
  );
};

export default MultiEditImage;
