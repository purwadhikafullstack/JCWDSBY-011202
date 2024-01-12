import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import { formatPriceToIDR } from '../../../utils';
import DiscoverMore from '../../../components/DiscoverMore';

const ProductDetail = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const handleDecrease = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
 
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
const onHandleCart =async () => {
  try {
    const token = localStorage.getItem("token")
    const send = await axios.post(
      "http://localhost:8000/cart/add-to-cart",
      {
        // account_id : ,
        product_id : id,
        quantity : counter,
        total_price : products[0].price*counter
      },
      { headers: { Authorization: `Bearer ${token}`}})
  } catch (error) {
    console.log(error);
  }
}
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
          <div className="w-[600px]">
            <img
              className="w-[400px] h-[400px]  border-2"
              src={
                products.length > 0 && products[0].product_images?.length > 0
                  ? `http://localhost:8000/productimage/${products[0].product_images[0].image}`
                  : 'https://placehold.co/384x384'
              }
              alt="Main Image"
            />
            <div className="grid grid-cols-4 gap-4 mt-2">
              {products.length > 0 &&
                products[0].product_images
                  ?.slice(1, products[0].product_images.length)
                  .filter((image) => image)
                  .map((image, index) => (
                    <img
                      key={index}
                      className="w-[84px] h-[90px]  border-2"
                      src={`http://localhost:8000/productimage/${image.image}`}
                      alt={`Product ${index + 2}`}
                    />
                  ))}
            </div>
          </div>
          <div className="mx-8 w-full">
            <div>
              <h1 className="text-2xl font-extrabold">
                {products.length > 0 && products[0].name}
              </h1>
            </div>
            <div className="mt-8">
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
              <div className="w-full mt-16 border border-gray-300 p-2 rounded-md">
                <hr className="mt-1" />
                <div className="w-10/12 mx-auto font-medium flex justify-between">
                  <div>
                    <h2 className="text-sm pt-2 font-medium text-gray-500">
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
                      onChange={(e) =>
                        setCounter(parseInt(e.target.value) || 0)
                      }
                      className="px-4 py-1 border-gray-500 text-center w-full focus:outline-none"
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    />
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="px-4 py-1 border border-gray-500 rounded-full"
                    >
                      +
                    </button>
                  </div>
                  <div className="mt-1">
                    <div className="pt-2">
                      <button className="w-full inline-block px-4 py-1 text-sm font-bold text-white bg-orange-500 rounded-md cursor-pointer transition-all duration-300 hover:bg-orange-600 focus:outline-none"
                      onClick={onHandleCart}
                      >
                        Add to Cart
                      </button>
                      <h1 className="text-orange-500 text-xs">
                        Tersisa <span>48</span>
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
