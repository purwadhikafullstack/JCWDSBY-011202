import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Productcard';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';

const DiscoverMore = ({ products }) => {
  const [discoverProducts, setDiscoverProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/discovering/${products[0].category_id}/${products[0].id}`,
        );
        setDiscoverProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [products]);

  return (
    <div className="">
      <div className="w-6/12 mx-auto text-center cursor-pointer">
        <h1 className="border-b hover:border-orange-500 hover:text-orange-400 transition-all duration-300">
          Discover More
        </h1>
        <br />
      </div>
      <div className="w-8/12 mx-auto flex ">
        {discoverProducts.map((product, index) => (
          <ProductCard
            key={index}
            productName={product?.name || 'N/A'}
            price={formatPriceToIDR(product?.price) || 'N/A'}
            category={product?.category?.category || 'N/A'}
            onClick={() => navigate(`/product-detail/${product.id}`)}
            src={
              `http://localhost:8000/productimage/${product?.product_images?.[0]?.image}` ||
              'https://placehold.co/384x384'
            }
            src2={
              `http://localhost:8000/productimage/${
                product?.product_images.length >= 2
                  ? product?.product_images?.[1]?.image
                  : product?.product_images?.[0]?.image
              }` || 'https://placehold.co/384x384'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;
