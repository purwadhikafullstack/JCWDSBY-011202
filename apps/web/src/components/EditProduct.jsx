import TemporaryNavbar from './Temporary/Navbar';
import TemporaryFooter from './Temporary/Footer';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { CiHeart, CiShare1, CiEdit } from 'react-icons/ci';
import axios from 'axios';
import { formatPriceToIDR } from '../utils';
import EditModal from './EditModal';
const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?id=${id}`,
        );
        if (!response.data.length) {
          navigate('/not-found');
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const formattedPrice =
    products.length > 0 ? formatPriceToIDR(products[0].price * 1) : '';

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <TemporaryNavbar />
      <div>
        <div className="bg-gray-300 border-2 border-solid border-slate-300 ">
          <div className="flex items-center font-normal ml-40 text-xs ">
            <Link className="hover:text-orange-400 transition-all duration-300">
              Home
            </Link>
            <span>
              <MdNavigateNext size={20} />
            </span>
            <Link className="hover:text-orange-400 transition-all duration-300">
              {products.length > 0 && products[0].category.category}
            </Link>
            <span>
              <MdNavigateNext size={20} />
            </span>
            <Link className="font-bold">
              {products.length > 0 && products[0].name}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-32">
        <div className="flex mx-6 my-8">
          <div>
            <img src="https://placehold.co/384x384" alt="" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  className="w-[80px] h-[90px] "
                  src="https://placehold.co/384x384"
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="mx-8 w-5/12">
            <div>
              <h1 className="text-2xl font-extrabold flex items-center">
                {products.length > 0 && products[0].name}
                <span
                  className="fixed bottom-2 right-2 rounded-full bg-slate-400 p-2 cursor-pointer"
                  onClick={openModal}
                >
                  <CiEdit size={36} />
                </span>
              </h1>

              <h2 className='"text-lg font-semibold flex items-center'>
                {products.length > 0 && products[0].category.category}
              </h2>
            </div>
            <div className="mt-8">
              <p className="text-gray-500 flex items-center">
                {products.length > 0 && products[0].description}
              </p>
            </div>
          </div>
          <div className="sticky w-[250px]">
            <div className="w-full border border-gray-300 p-2 rounded-md font-medium">
              <h1 className="border-b border-grey-800 pb-2 text-center">
                {products.length > 0 && products[0].name}
              </h1>
              <h2 className="text-sm pt-2 font-medium text-gray-500">Harga</h2>
              <h1 className="text-xl text-orange-500 flex items-center">
                {formattedPrice}{' '}
              </h1>
              <h2 className="font-medium text-gray-500 text-sm pt-2">Jumlah</h2>
              <div className="flex items-center">
                <div>
                  <button className="px-4 py-1 border border-gray-500 rounded-l">
                    -
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={1}
                    className="px-4 py-1 border-t border-b border-gray-500 text-center w-3/12"
                  />
                  <button className="px-4 py-1 border border-gray-500 rounded-r">
                    +
                  </button>
                </div>
                <h1 className="text-orange-500 text-xs">
                  Tersisa <span>48</span>
                </h1>
              </div>
              <div className="pt-2">
                <button className="w-full inline-block px-4 py-1 text-sm font-bold text-white bg-orange-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-orange-600 focus:outline-none">
                  Add to Cart
                </button>
              </div>
              <div className="flex justify-around mt-2">
                <h1 className="text-xs text-slate-500 flex items-center hover:text-orange-400 transition-all duration-300 cursor-pointer">
                  <span className="mx-1">
                    <CiHeart />
                  </span>
                  Wishlist
                </h1>
                <h1 className="text-xs text-slate-500 flex items-center hover:text-orange-400 transition-all duration-300 cursor-pointer">
                  <span className="mx-1">
                    <CiShare1 />
                  </span>
                  Share
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          closeModal={closeModal}
          onAdd={(addedProduct) => {
            console.log('Product added:', addedProduct);
          }}
          initialData={products.length > 0 ? products[0] : {}}
        />
      )}
      <TemporaryFooter />
    </div>
  );
};

export default EditProduct;
