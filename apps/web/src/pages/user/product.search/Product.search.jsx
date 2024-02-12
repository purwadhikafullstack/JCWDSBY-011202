import TemporaryNavbar from '../../../components/Temporary/Navbar';
import FilterPrice from '../../../components/FilterPrice';
import ProductCategorySearch from '../../../components/ProductCategoriesSearch';
import ProductCatalogCard from '../../../components/ProductCatalogCard';
import { formatPriceToIDR } from '../../../utils';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Pagination from '../../../components/Temporary/Pagination';
const ProdutSearch = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [price, setPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const handleFilter = () => {
    const emptyFilter = [...currentPage];
    let filteredProducts = [...products];
    if (minPrice !== '' && maxPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= parseInt(minPrice, 10) &&
          product.price <= parseInt(maxPrice, 10),
      );
    } else if (minPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= parseInt(minPrice, 10),
      );
    } else if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseInt(maxPrice, 10),
      );
    }
    setCurrentPage(
      filteredProducts.length > 0 ? filteredProducts : emptyFilter,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.search.includes('category_id=')) {
          if (page !== 1) {
            setPage(1);
          }
          const response1 = await axios.get(
            `http://localhost:8000/api/products${location.search}`,
          );
          setProducts(response1.data);
          const response2 = await axios.get(
            `http://localhost:8000/api/products${location.search}&page=${page}`,
          );
          setCurrentPage(response2.data);
        } else {
          const response1 = await axios.get(
            `http://localhost:8000/api/products${location.search}`,
          );
          setProducts(response1.data);
          if (location.search) {
            const response2 = await axios.get(
              `http://localhost:8000/api/products${location.search}&page=${page}`,
            );
            setCurrentPage(response2.data);
          } else {
            const response2 = await axios.get(
              `http://localhost:8000/api/products?page=${page}`,
            );
            setCurrentPage(response2.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [location.search, page]);

  useEffect(() => {
    if (location.search && !location.search.includes('price=')) {
      navigate(`/product-search${location.search}&price=${price}`);
    } else if (
      location.search.includes('category_id=') &&
      location.search.includes('price=')
    ) {
      const updatedQuery = location.search.split('&')[0];
      navigate(`/product-search${updatedQuery}&price=${price}`);
      if (!price) {
        navigate(`/product-search${updatedQuery}`);
      }
    } else {
      navigate(`?price=${price}`);
      if (!price) {
        navigate(`/product-search`);
      }
    }
  }, [price]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      <TemporaryNavbar />
      <div className="sm:w-9/12 w-11/12 mx-auto">
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
          <div className="sm:w-3/12">
            <div className="sm:block hidden">
              <ProductCategorySearch />
            </div>
            <div className="sm:block hidden">
              <FilterPrice
                MinPriceChange={(e) => {
                  setMinPrice(e.target.value);
                }}
                MaxPriceChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
              />
              <div className="mt-2">
                <button
                  onClick={() => handleFilter()}
                  className='w-full class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "'
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between h-8">
              <div className="w-4/12 mt-1 flex">
                <select
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className=' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"'
                >
                  <option value={''}>Default Sorting</option>
                  <option value="asc">Price Ascending</option>
                  <option value="desc">Price Descending</option>
                </select>
                <FaFilter
                  size={30}
                  className="mx-2 sm:hidden"
                  onClick={() => setFilterOpen(!isFilterOpen)}
                />
              </div>
              <h1 className="text-[14px] self-end">
                Showing <span>{currentPage.length}</span> results
              </h1>
            </div>
            <div className="flex flex-wrap -mx-2">
              {currentPage.map((product, index) => (
                <div key={index} className="sm:w-1/4 w-1/2 p-2">
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
            <div className="mx-auto p-6 ">
              <div className="flex justify-center">
                <Pagination
                  products={products}
                  page={page}
                  onClickPrevious={() => handlePageChange(page - 1)}
                  onClickNext={() => handlePageChange(page + 1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFilterOpen && (
        <div className="sm:hidden fixed top-0 right-0 h-full w-64 bg-white shadow">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-bold">Filter</h1>
            <button
              onClick={() => setFilterOpen(false)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mx-4">
            <ProductCategorySearch />
            <FilterPrice
              MinPriceChange={(e) => {
                setMinPrice(e.target.value);
              }}
              MaxPriceChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            />
            <div className="mt-2">
              <button
                onClick={() => handleFilter()}
                className='w-full class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "'
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProdutSearch;
