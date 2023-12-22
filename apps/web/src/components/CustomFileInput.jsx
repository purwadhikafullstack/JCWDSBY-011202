import React, { useState, useRef } from 'react';

const CustomFileInput = ({ onChange }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

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
        setImagePreviews(results);
      });
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleCancelPreview = () => {
    setImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-orange-500 focus:outline-none">
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
          <span className="font-medium text-gray-600">Drop Product Images</span>
        </span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          onChange={handleFileChange}
          multiple
          ref={fileInputRef}
        />
      </label>

      {imagePreviews.length > 0 && (
        <div className="mt-4 flex flex-wrap space-x-2 max-h-72 overflow-y-auto">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              className="w-24 h-24 object-cover rounded-md mb-2 md:w-32 md:h-32 md:mb-0"
              alt={`Image Preview ${index + 1}`}
            />
          ))}
          {imagePreviews.length > 0 && (
            <button
              className="text-orange-500 hover:text-orange-700 block w-full md:w-auto"
              onClick={handleCancelPreview}
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomFileInput;
