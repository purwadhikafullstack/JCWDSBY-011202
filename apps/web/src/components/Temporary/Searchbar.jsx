import React from 'react';
import { CiSearch } from 'react-icons/ci';

function SearchBar() {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex w-full h-8 mx-10 rounded bg-white">
        <input
          className="w-full  bg-transparent border p-1  text-gray-400 outline-none focus:outline-none"
          type="search"
          name="search"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="  bg-orange-600 px-4 py-2 text-white rounded-e-sm"
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
