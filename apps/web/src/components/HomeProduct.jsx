import { useEffect, useState } from 'react';
import ProductCatalog from './ProductCatalogCard';
import { formatPriceToIDR } from '../utils';
import { useNavigate } from 'react-router-dom';
import API_CALL from '../helpers/API';
import { IMG_URL_PRODUCT_IMAGE } from '../helpers/Image';
const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API_CALL.get('/products?page=1');
      setProducts(response.data.products);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-wrap sm:-mx-2 mx-1">
      {products.map((product, index) => (
        <div key={index} className="w-1/2 sm:w-1/4  p-2 sm:p-4">
          <ProductCatalog
            productName={product?.name || 'N/A'}
            price={formatPriceToIDR(product?.price) || 'N/A'}
            category={product?.category?.category || 'N/A'}
            onClick={() => navigate(`/product-detail/${product.id}`)}
            src={
              `${IMG_URL_PRODUCT_IMAGE}/${product?.product_images?.[0]?.image}` ||
              'https://placehold.co/384x384'
            }
            src2={
              `${IMG_URL_PRODUCT_IMAGE}/${
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
