const FilterPrice = () => {
  return (
    <div className="mt-2">
      <div className="flex flex-row-reverse w-full h-8  rounded bg-white">
        <input
          className="w-full  bg-transparent border p-1  text-gray-400 outline-none focus:outline-none"
          type="number"
          name="Min Price"
          placeholder="Min Price"
        />
        <button
          type="number"
          className="  bg-gray-200 px-4  text-black rounded-l-sm"
        >
          Rp
        </button>
      </div>
      <div className="flex flex-row-reverse w-full h-8  rounded bg-white mt-2">
        <input
          className="w-full  bg-transparent border p-1  text-gray-400 outline-none focus:outline-none"
          type="number"
          name="Max Price"
          placeholder="Max Price"
        />
        <button
          type="submit"
          className="  bg-gray-200 px-4  text-black rounded-l-sm"
        >
          Rp
        </button>
      </div>
    </div>
  );
};

export default FilterPrice;
