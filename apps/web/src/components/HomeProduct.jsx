import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCatalog from './ProductCatalogCard';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';
const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'http://localhost:8000/api/products?page=1',
      );
      setProducts(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap -mx-2">
      {products.map((product, index) => (
        <div key={index} className="w-1/4 p-4">
          <ProductCatalog
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
        </div>
      ))}
    </div>
  );
};

export default HomeProduct;
