import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatPriceToIDR } from '../../../../utils';
import Pagination from '../../../../components/Temporary/Pagination';
import SearchBar from '../../../../components/SearchBar';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
const ViewProduct = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const truncateDescription = (description) => {
    const maxLength = 15;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  const searchAccount = () => {
    setSearchParams((val) => {
      val.set('name', selectedProduct);
      if (!selectedProduct) {
        val.delete('name', selectedProduct);
      }
      return val;
    });
  };

  useEffect(() => {
    setSearchParams((val) => {
      val.set('page', page);
      return val;
    });
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products${location.search}`,
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [page, location.search]);

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
      <WareHouseAdminLayout>
        <div className="p-4 flex justify-between items-center bg-white ">
          <div className="font-bold text-xl sm:ml-0 ml-4">Products List</div>
        </div>
        <div className="sm:p-1 p-4 mx-4 flex justify-between items-center">
          <div className="w-full mt-4">
            <div className="flex w-full">
              <SearchBar
                onChange={(e) => setSelectedProduct(e.target.value)}
                onClick={searchAccount}
              />
              <div className="w-[200px] sm:ml-0 ml-3 sm:mt-4 mt-4 mr-2  sm:w-1/4 sm:pr-2 flex">
                <select
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSearchParams((val) => {
                      val.set('category_id', e.target.value);
                      if (!e.target.value) {
                        val.delete('category_id', e.target.value);
                      }
                      return val;
                    });
                  }}
                  className="w-full ml-4 h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">All Category</option>
                  {categories &&
                    categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.category}
                      </option>
                    ))}
                </select>
                <select
                  onChange={(e) => {
                    setSelectedPrice(e.target.value);
                    setSearchParams((val) => {
                      val.set('price', e.target.value);
                      if (!e.target.value) {
                        val.delete('price', e.target.value);
                      }
                      return val;
                    });
                  }}
                  className="w-full h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">By Price</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto mx-auto">
              <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      No.
                    </th>
                    <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Product
                    </th>
                    <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products && products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                          {formatPriceToIDR(product.price)}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap">
                          {truncateDescription(product.description)}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-500 whitespace-nowrap text-center">
                          {product.category
                            ? product.category.category
                            : 'Uncategorized'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-3 py-2 text-sm text-gray-500 text-center"
                      >
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            products={totalPages}
            page={page}
            onClickPrevious={() => setPage(page - 1)}
            onClickNext={() => setPage(page + 1)}
          />
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default ViewProduct;
