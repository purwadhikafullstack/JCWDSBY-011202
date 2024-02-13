import AdminLayout from '../../../../components/AdminLayout';
import ProductTable from '../../../../components/ProductTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/Temporary/Pagination';
import SearchProduct from '../../../../components/SearchProduct';
import SearchByCategory from '../../../../components/CategoryProductFilter';
import { Loading } from '../../../../components/loadingComponent';

const ManageProduct = () => {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [category, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(0);
  const [selectedPriceSorting, setSelectedPriceSorting] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [endPointAll, setEndPointAll] = useState(``);
  const handleAddButtonClick = () => {
    navigate('add-product');
  };

  const handleDelete = async (deletedProductId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const filter = [`?page=${page}`];
    if (selectedCategories > 0) {
      filter.push(`&category_id=${selectedCategories}`);
    }
    if (selectedPriceSorting !== '') {
      filter.push(`&price=${selectedPriceSorting}`);
    }
    setEndPoint(filter.join(''));
  }, [page, selectedCategories, selectedPriceSorting]);

  useEffect(() => {
    const filter = [`?`];
    if (selectedCategories > 0) {
      filter.push(`&category_id=${selectedCategories}`);
    }
    if (selectedPriceSorting !== '') {
      filter.push(`&price=${selectedPriceSorting}`);
    }
    setEndPointAll(filter.join(''));
  }, [selectedCategories, selectedPriceSorting]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products${endPoint || '?page=1'}`,
        );
        setCurrentPage(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [endPoint]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?${endPointAll}`,
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

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
      <AdminLayout>
        <div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div className="font-bold text-xl sm:ml-0 ml-4">Product List</div>
            <button
              onClick={handleAddButtonClick}
              style={{ cursor: 'pointer' }}
              className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
            >
              Add Product <span className="font-bold">+</span>
            </button>
          </div>
        </div>
        <div className="flex mt-4 sm:mx-2 justify-between">
          <div>
            <SearchProduct />
            <div className="w-[200px] sm:ml-0 ml-3 sm:mt-0 mt-2  sm:w-full sm:pr-2 flex">
              <select
                onChange={(e) => setSelectedCategories(e.target.value)}
                className="w-full h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">All Category</option>
                {category &&
                  category.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.category}
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => setSelectedPriceSorting(e.target.value)}
                className="w-full h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">By Price</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <h1 className="self-end sm:mx-4 text-[14px] sm:w-auto w-[200px]">
            Showing <span>{currentPage.length}</span> Results
          </h1>
        </div>
        <div className="w-full p-4">
          {loading ? (
            <Loading />
          ) : (
            <ProductTable products={currentPage} onDelete={handleDelete} />
          )}
        </div>
        <div className="flex justify-center mb-2">
          <Pagination
            products={products}
            onClickPrevious={() => handlePageChange(page - 1)}
            onClickNext={() => handlePageChange(page + 1)}
            page={page}
          />
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageProduct;
