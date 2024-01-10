import React, { useState, useRef, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const CustomFileInput = ({
  onChange,
  onImagePreviewsChange,
  onCancelPreview,
}) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (imagePreviews.length > 0) {
      setIsInputDisabled(true);
      if (onImagePreviewsChange) {
        onImagePreviewsChange(filesArray);
      }
    }
  }, [imagePreviews, onImagePreviewsChange, filesArray]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files);

    if (files) {
      const newPreviews = Array.from(files).map((file) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(newPreviews).then((results) => {
        console.log('New Previews:', results);
        setImagePreviews(results);
        setFilesArray(Array.from(files));
        if (onImagePreviewsChange) {
          onImagePreviewsChange(Array.from(files));
        }
      });
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleCancelPreview = () => {
    setImagePreviews([]);
    setFilesArray([]);
    setIsInputDisabled(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (onCancelPreview) {
      onCancelPreview();
    }
  };

  return (
    <div className="w-full h-full">
      <label className="flex justify-center w-[400px] h-[400px]  transition bg-white border-2 border-gray-300 rounded-md appearance-none cursor-pointer hover:border-orange-500 focus:outline-none">
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
          disabled={isInputDisabled}
        />
      </label>
    </div>
  );
};

export default CustomFileInput;
