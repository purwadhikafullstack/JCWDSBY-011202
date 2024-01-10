import TemporaryNavbar from '../../../components/Temporary/Navbar';
import FilterPrice from '../../../components/FilterPrice';
import ProductCategorySearch from '../../../components/ProductCategoriesSearch';
import ProductCatalogCard from '../../../components/ProductCatalogCard';
import { formatPriceToIDR } from '../../../utils';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ProdutSearch = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TemporaryNavbar />
      <div className="w-9/12 mx-auto">
        <div className="w-auto">
          <h1 className="text-4xl text-center">Products</h1>
          <p className="text-center">
            <span className="mx-1 font-semibold hover:text-orange-400 transition-all duration-300 cursor-pointer">
              Home
            </span>
            <span className="mx-1 font-semibold">/</span>
            <span className="mx-1 font-semibold">Products</span>
          </p>
        </div>
        <div className="flex w-full mt-8">
          <div className="w-3/12">
            <ProductCategorySearch />
            <div>
              <FilterPrice />
              <div className="mt-2">
                <button className='w-full class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "'>
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between h-8">
              <div className="w-4/12 mt-1">
                <select
                  name=""
                  id=""
                  className=' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"'
                >
                  <option value={''}>Default Sorting</option>
                  <option value="">Price Ascending</option>
                  <option value="">Price Descending</option>
                </select>
              </div>
              <h1 className="text-[14px] self-end">
                Showing <span>{products.length}</span> results
              </h1>
            </div>
            <div className="flex flex-wrap -mx-2">
              {products.map((product, index) => (
                <div key={index} className="w-1/4 p-2">
                  <ProductCatalogCard
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutSearch;
