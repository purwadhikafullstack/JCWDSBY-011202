import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';
import { MiniLoading } from '../components/loadingComponent';
import API_CALL from '../helpers/API';
import { IMG_URL_PRODUCT } from '../helper';

const DiscoverMore = ({ products }) => {
  const [discoverProducts, setDiscoverProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/products/discovering/${products[0].category_id}/${products[0].id}`,
        );
        setDiscoverProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [products]);

  if (loading) {
    return <MiniLoading />;
  }

  return (
    <div className="">
      <div className="w-6/12 mx-auto text-center cursor-pointer">
        <h1 className="border-b hover:border-orange-500 hover:text-orange-400 transition-all duration-300">
          Discover More
        </h1>
        <br />
      </div>
      <div className="sm:w-8/12 mx-auto sm:flex ">
        {discoverProducts.map((product, index) => (
          <ProductCard
            key={index}
            productName={product?.name || 'N/A'}
            price={formatPriceToIDR(product?.price) || 'N/A'}
            category={product?.category?.category || 'N/A'}
            onClick={() => {
              navigate(`/product-detail/${product.name}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            src={
              `${IMG_URL_PRODUCT}/productimage/${product?.product_images?.[0]?.image}` ||
              'https://placehold.co/384x384'
            }
            src2={
              `${IMG_URL_PRODUCT}/productimage/${
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
