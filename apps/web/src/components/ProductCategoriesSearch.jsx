import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCategorySearch = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4 className="text-[18px] font-light">PRODUCT CATEGORIES</h4>
      <ul className="mt-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex font-light hover:text-orange-400 transition-all duration-300 cursor-pointer"
          >
            {category.category} (<span>{category.productCount}</span>)
          </li>
        ))}
      </ul>
      <hr className="mt-2" />
    </div>
  );
};

export default ProductCategorySearch;
