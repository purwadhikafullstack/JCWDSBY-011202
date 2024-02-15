import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CALL from '../helpers/API';

const ProductCategorySearch = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/categories');
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
        <li
          className="flex font-light hover:text-orange-400 transition-all duration-300 cursor-pointer"
          onClick={() => {
            navigate(`/product-search?page=1`);
          }}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex font-light hover:text-orange-400 transition-all duration-300 cursor-pointer"
            onClick={() => {
              navigate(`?category_id=${category.id}&page=1`);
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
