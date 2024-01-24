import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchProduct() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    setSearchResult(
      products.filter((product) =>
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      ),
    );
  }, [debouncedQuery, products]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        <div className="flex w-full h-8 mx-10 rounded bg-white">
          <input
            className="w-full bg-transparent border p-1 text-black-400 outline-none focus:outline-none"
            type="search"
            name="search"
            placeholder="Search..."
            onChange={handleQueryChange}
          />
          <button
            type="submit"
            className="bg-orange-600 px-4 py-2 text-white rounded-e-sm"
          >
            <CiSearch />
          </button>
        </div>
      </div>
      {query !== '' && searchResult.length > 0 && (
        <div className="absolute top-full bg-white max-h-64  overflow-y-scroll border border-t-0">
          {searchResult.map((product) => (
            <div
              key={product.id}
              className="p-2 flex w-full cursor-pointer"
              onClick={() => navigate(`/edit-product/${product.id}`)}
            >
              <h1 className="font-semibold text-sm">{product.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
