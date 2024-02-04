import axios from 'axios';
import { useEffect, useState } from 'react';

const FormProductAdd = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Product Name
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name="name"
        onChange={props.onChangeName || (() => {})}
      />

      <div className="flex">
        <div className="w-full mx-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Price
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            name="price"
            onChange={props.onChangePrice || (() => {})}
          />
        </div>

        <div className="w-full mx-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Categories
          </label>
          <select
            onChange={props.onChangeCategory || (() => {})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={''}>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mx-1">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Weight
          </label>
          <select
            onChange={props.onChangeWeight || (() => {})}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={''}>Select Category</option>
            <option value={1000}>1 kg</option>
            <option value={2000}>2 kg</option>
            <option value={3000}>3 kg</option>
            <option value={4000}>4 kg</option>
            <option value={5000}>5 kg</option>
            <option value={6000}>6 kg</option>
            <option value={7000}>7 kg</option>
            <option value={8000}>8 kg</option>
            <option value={9000}>9 kg</option>
            <option value={1000}>10 kg</option>
            <option value={2000}>More than 10 kg</option>
          </select>
        </div>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Description
      </label>
      <textarea
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="description"
        placeholder="Description Product..."
        onChange={props.onChangeDescription || (() => {})}
      ></textarea>
    </div>
  );
};

export default FormProductAdd;
