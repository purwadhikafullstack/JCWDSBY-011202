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
  const [filterStatus, setFilterStatus] = useState('');

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
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/products?');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?page=${page}`,
        );
        setCurrentPage(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page, products, filterStatus]);

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
        <div className="flex mt-4 sm:mx-2">
          <div>
            <SearchProduct />
          </div>
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
