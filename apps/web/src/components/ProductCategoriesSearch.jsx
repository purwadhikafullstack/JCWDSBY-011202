import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductCategorySearch = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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

  console.log(categories);
  return (
    <div>
      <h4 className="text-[18px] font-light">PRODUCT CATEGORIES</h4>
      <ul className="mt-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex font-light hover:text-orange-400 transition-all duration-300 cursor-pointer"
            onClick={() => {
              navigate(`?category_id=${category.id}`);
            }}
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
