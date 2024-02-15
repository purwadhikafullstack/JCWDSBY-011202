const FilterPrice = (props) => {
  return (
    <div className="mt-2">
      <div className="flex flex-row-reverse w-full h-8  rounded bg-white">
        <input
          className="w-full  bg-transparent border p-1  text-black-400 outline-none focus:outline-none border-none"
          type="number"
          name="Min Price"
          placeholder="Min Price"
          onChange={props.MinPriceChange}
          value={props.MinPrice}
        />
        <button
          type="number"
          className="bg-gray-200 px-4  text-black rounded-l-sm border-none"
          disabled
        >
          Rp
        </button>
      </div>
      <div className="flex flex-row-reverse w-full h-8  rounded bg-white mt-2">
        <input
          className="w-full  bg-transparent border p-1  text-black-400 outline-none focus:outline-none border-none"
          type="number"
          name="Max Price"
          placeholder="Max Price"
          onChange={props.MaxPriceChange}
          value={props.MaxPrice}
        />
        <button
          type="submit"
          className="  bg-gray-200 px-4  text-black rounded-l-sm border-none"
          disabled
        >
          Rp
        </button>
      </div>
    </div>
  );
};

export default FilterPrice;
