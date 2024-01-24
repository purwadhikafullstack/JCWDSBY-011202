const DataEditStock = ({ product }) => {
  console.log(product);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Product Name
      </label>
      <input
        value={product.name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled
      />
      <div className="flex mt-2">
        <div className="w-full mx-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Price
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            disabled
            value={product.price}
          />
        </div>
        <div className="w-full mx-1 mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Categories
          </label>
          <select
            disabled
            defaultValue="defaultCategory"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="defaultCategory" disabled>
              {product.category ? product.category.category : 'No Category'}
            </option>
            <option value="category1">Category 1</option>
          </select>
        </div>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Description
      </label>
      <textarea
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled
        value={product.description}
      ></textarea>
    </div>
  );
};

export default DataEditStock;
