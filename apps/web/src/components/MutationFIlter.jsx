import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from './loadingComponent';
import API_CALL from '../helpers/API';
const MutationFilter = ({ page }) => {
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const [products, setProducts] = useState([]);
  const [codeQuery, setCodeQuery] = useState('');
  const [status, setStatus] = useState('');
  const [product_id, setProduct_id] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const searchCode = () => {
    if (codeQuery) {
      navigate(
        `?warehouse_id=${
          userGlobal.warehouse_id
        }&page=${page}&code=${codeQuery.toLocaleUpperCase()}`,
      );
    }
  };

  useEffect(() => {
    if (product_id === 0 && status !== '') {
      navigate(
        `?warehouse_id=${userGlobal.warehouse_id}&page=${page}&status=${status}`,
      );
    }
    if (product_id > 0 && status === '') {
      navigate(
        `?warehouse_id=${userGlobal.warehouse_id}&page=${page}&product_id=${product_id}`,
      );
    }
    if (product_id === 0 && status === '') {
      navigate(`?warehouse_id=${userGlobal.warehouse_id}&page=${page}`);
    } else {
      if (codeQuery) {
        navigate(
          `?warehouse_id=${
            userGlobal.warehouse_id
          }&page=${page}&code=${codeQuery.toLocaleUpperCase()}&product_id=${product_id}&status=${status}`,
        );
      } else {
        navigate(
          `?warehouse_id=${userGlobal.warehouse_id}&page=${page}&product_id=${product_id}&status=${status}`,
        );
      }
    }
  }, [product_id, status, codeQuery, page]);

  const reset = () => {
    navigate(`?warehouse_id=${userGlobal.warehouse_id}&page=${page}`);
  };

  return (
    <div className="flex mb-2">
      <div className="w-10/12">
        <SearchBar
          onClick={searchCode}
          onChange={(e) => setCodeQuery(e.target.value)}
        />
      </div>
      <div className="flex sm:mx-2">
        <select
          onChange={(e) => setProduct_id(e.target.value)}
          className="w-1/2 sm:mx-2 h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:my-4"
        >
          <option value="">All Product</option>
          {products &&
            products.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="w-1/2 sm:mx-2  h-8 mx-1 bg-gray-50 border text-xs border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:my-4"
        >
          <option value="">Status</option>
          <option value="waiting for confirmation">
            Waiting For Confirmation
          </option>
          <option value="processing">Processing</option>
          <option value="on delivery">On Delivery</option>
          <option value="arrived">Arrived</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          onClick={reset}
          className="text-xs px-2 bg-orange-500 sm:h-9 sm:my-4 text-white rounded-md shadow-sm hover:bg-orange-600 transition-colors duration-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MutationFilter;
