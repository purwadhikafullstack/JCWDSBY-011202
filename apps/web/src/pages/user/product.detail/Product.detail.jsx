import React, { useState, useEffect, CSSProperties } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import { formatPriceToIDR } from '../../../utils';
import DiscoverMore from '../../../components/DiscoverMore';

import ButtonWithLoading from '../../../components/ButtonWithLoading';

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [cartCount, setCartCount] = useState(0);
  const getCountCart = async () => {
    try {
      console.log('jalan');
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:8000/api/cart/navbar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setCartCount(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrease = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  useEffect(() => {
    getCountCart();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products?id=${id}`,
        );
        if (response.data.length === 0) {
          navigate('/not-found');
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, navigate]);

  const formattedPrice =
    products.length > 0 ? formatPriceToIDR(products[0].price * counter) : '';

  const onHandleCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const send = await axios.post(
        'http://localhost:8000/api/cart/add-to-cart',
        {
          product_id: id,
          quantity: counter,
          weight: products[0].weight,
          price: products[0].price,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert('Berhasil menambahkan data');
      getCountCart();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(products[0]);

  return (
    <div className="flex flex-col min-h-screen">
      <TemporaryNavbar cartCount={cartCount} />
      <div>
        <div className="bg-gray-300 border-2 border-solid border-slate-300 ">
          <div className="flex items-center font-normal ml-6 sm:ml-40 text-sm sm:text-xs h-[55px] sm:h-[40px]">
            <Link
              to={'/'}
              className="hover:text-orange-400 transition-all duration-300"
            >
              Home
            </Link>
            <span>
              <MdNavigateNext size={20} />
            </span>
            <Link
              to={`/product-search?category_id=${
                products.length > 0 && products[0].category_id
              }`}
              className="hover:text-orange-400 transition-all duration-300"
            >
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
      <div className="sm:mx-32">
        <div className="sm:flex mx-2 sm:mx-6 my-8">
          <div className="w-full sm:w-[600px] mx-auto">
            <img
              className="w-full sm:w-[400px] h-auto border-2"
              src={
                products.length > 0 && products[0].product_images?.length > 0
                  ? `http://localhost:8000/productimage/${products[0].product_images[0].image}`
                  : 'https://placehold.co/384x384'
              }
              alt="Main Image"
            />
            <div className="grid grid-cols-5 sm:grid-cols-4 gap-1 sm:gap-4 mt-2">
              {products.length > 0 &&
                products[0].product_images
                  ?.slice(1, products[0].product_images.length)
                  .filter((image) => image)
                  .map((image, index) => (
                    <img
                      key={index}
                      className="w-16 sm:w-[84px] h-auto border-2"
                      src={`http://localhost:8000/productimage/${image.image}`}
                      alt={`Product ${index + 2}`}
                    />
                  ))}
            </div>
          </div>
          <div className="sm:mx-8 mt-6 sm:mt-0 w-full">
            <div>
              <h1 className="text-2xl font-extrabold">
                {products.length > 0 && products[0].name}
              </h1>
            </div>
            <div className="mt-2 sm:mt-8">
              <p className="text-gray-500">
                {products.length > 0 && products[0].description}
              </p>
              <div className="mt-8 w-10/12 text-gray-500 text-[14px]">
                <h1>INFORMASI PENTING, HARAP DIBACA</h1>
                <ul>
                  <li>
                    1. Produk dikirim belum dirakit disertai panduan
                    pemasangannya (Minor Asssembly required).
                  </li>
                  <li>
                    2. Setelah barang diterima, pastikan pesanan Anda sesuai dan
                    video
                  </li>
                  <li>
                    3. Jika barang tidak sesuai atau bermasalah segera hubungi
                    melalui email acewarehose@gmail.com
                  </li>
                </ul>
              </div>
              <div className="w-full mt-4 sm:mt-16 border border-gray-300 p-2 rounded-md">
                <hr className="mt-1" />
                <div className="w-10/12 mx-auto font-medium flex sm:flex-row flex-col justify-between">
                  <div>
                    <h2 className="text-sm sm:text-sm pt-2 font-medium text-gray-500">
                      Harga
                    </h2>
                    <h1 className="text-xl text-orange-500">
                      {formattedPrice}
                    </h1>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={handleDecrease}
                      className="px-4 py-1 border border-gray-500  rounded-full"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={counter}
                      onChange={(e) => {
                        setCounter(parseInt(e.target.value) || 0);
                        if (e.target.value > products[0].total_stock) {
                          setCounter(products[0].total_stock);
                          alert(
                            `Oops stock yang tersedia hanya ${products[0].total_stock}`,
                          );
                        }
                      }}
                      className="px-4 py-1 border-none text-center w-full focus:outline-none"
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    />
                    <button
                      onClick={() => {
                        setCounter(counter + 1);
                        if (counter > products[0].total_stock - 1) {
                          setCounter(products[0].total_stock);
                          alert(
                            `Oops stock yang tersedia hanya ${products[0].total_stock}`,
                          );
                        }
                      }}
                      className="px-4 py-1 border border-gray-500 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-1">
                    <div className="pt-2">
                      <ButtonWithLoading
                        title={'Add to cart'}
                        isLoading={loading}
                        // className="w-full inline-block px-4 py-1 text-sm font-bold text-white bg-orange-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-orange-600 focus:outline-none"
                        onClick={onHandleCart}
                      />
                      {/* </button> */}
                      {/* <ButtonWithLoading/> */}
                      <h1 className="text-orange-500 text-xs">
                        Tersisa{' '}
                        <span>
                          {products.length > 0
                            ? products[0].total_stock > 0
                              ? products[0].total_stock
                              : 0
                            : 0}
                        </span>
                      </h1>
                    </div>
                  </div>
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
      </div>
      <DiscoverMore products={products} />
      <TemporaryFooter />
    </div>
  );
};

export default ProductDetail;
