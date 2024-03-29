import React, { useState, useRef } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const CustomFileInput = ({
  onChange,
  onImagePreviewsChange,
  onCancelPreview,
}) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files) {
      const newPreviews = [];
      const newFilesArray = Array.from(files);
      newFilesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === newFilesArray.length) {
            setImagePreviews(newPreviews);
            setFilesArray(newFilesArray);
            if (onImagePreviewsChange) {
              onImagePreviewsChange(newFilesArray);
            }
          }
        };

        reader.readAsDataURL(file);
      });

      if (onChange) {
        onChange(e);
      }
    }
  };

  const handleCancelPreview = () => {
    setImagePreviews([]);
    setFilesArray([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onCancelPreview) {
      onCancelPreview();
    }
  };

  return (
    <div className="w-full h-full mb-2 sm:mb-0">
      <label className="flex justify-center sm:w-[400px] sm:h-[400px] w-[300px] h-[300px] mx-auto transition bg-white border-2 border-gray-300 rounded-md appearance-none cursor-pointer hover:border-orange-500 focus:outline-none">
        {imagePreviews.length > 0 ? (
          <div className="relative">
            <img
              src={imagePreviews[0]}
              className="w-full h-full rounded-md"
              alt="Image Preview"
            />
            <button
              onClick={handleCancelPreview}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <IoCloseOutline />
            </button>
          </div>
        ) : (
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium text-gray-600">
              Drop Product Images
            </span>
          </span>
        )}
        <input
          type="file"
          name="file_upload"
          className="hidden"
          onChange={handleFileChange}
          multiple
          ref={fileInputRef}
        />
      </label>
    </div>
  );
};

export default CustomFileInput;
