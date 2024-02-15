import TemporaryNavbar from '../../../components/Temporary/Navbar';
import FilterPrice from '../../../components/FilterPrice';
import ProductCategorySearch from '../../../components/ProductCategoriesSearch';
import ProductCatalogCard from '../../../components/ProductCatalogCard';
import { formatPriceToIDR } from '../../../utils';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import Pagination from '../../../components/Temporary/Pagination';
import { IoMdClose } from 'react-icons/io';
import { Loading } from '../../../components/loadingComponent';
import API_CALL from '../../../helpers/API';

const ProductSearch = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState([]);
  const [price, setPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState('');
  const [selectedMaxPrice, setSelectedMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentRole, setCurrentRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API_CALL.get('/accounts/authcheck', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentRole(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (currentRole === 'admin' || currentRole === 'superadmin') {
    navigate('/not-authorized');
  }
  const handleFilter = () => {
    setSelectedMaxPrice(maxPrice);
    setSelectedMinPrice(minPrice);
    setSearchParams((val) => {
      val.set('min_price', minPrice);
      val.set('max_price', maxPrice);
      return val;
    });
  };

  useEffect(() => {
    setSearchParams((val) => {
      val.set('page', page);
      if (page > totalPage) {
        val.set('page', totalPage);
      }
      return val;
    });
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API_CALL.get(`/products${location.search}`);
        setCurrentPage(response.data.products);
        setTotalPage(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, location.search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <TemporaryNavbar />
      <div className="sm:w-9/12 w-11/12 mx-auto">
        {/* Header */}
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

        {/* Filter Section */}
        <div className="flex w-full mt-8">
          <div className="sm:w-3/12">
            {/* Category Search */}
            <div className="sm:block hidden">
              <ProductCategorySearch />
            </div>
            {/* Price Filter */}
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
                  className="w-full font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Product Display */}
          <div className="w-full">
            {/* Filter Toggle Button */}
            <div className="flex justify-between h-8">
              <div className="w-4/12 mt-1 flex">
                <select
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setSearchParams((val) => {
                      val.set('price', e.target.value);
                      return val;
                    });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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

            {/* Product Cards */}
            <div className="flex flex-wrap -mx-2">
              {currentPage.map((product, index) => (
                <div key={index} className="sm:w-1/4 w-1/2 p-2">
                  <ProductCatalogCard
                    productName={product?.name || 'N/A'}
                    price={formatPriceToIDR(product?.price) || 'N/A'}
                    category={product?.category?.category || 'N/A'}
                    onClick={() => navigate(`/product-detail/${product.name}`)}
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

            {/* Pagination */}
            <div className="mx-auto p-6 ">
              <div className="flex justify-center">
                <Pagination
                  products={totalPage}
                  page={page}
                  onClickPrevious={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="sm:hidden fixed top-0 right-0 h-full w-64 bg-white shadow">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-bold">Filter</h1>
            <IoMdClose
              onClick={() => setFilterOpen(false)}
              className="text-gray-600 focus:outline-none"
            />
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
                className="w-full font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
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

export default ProductSearch;
