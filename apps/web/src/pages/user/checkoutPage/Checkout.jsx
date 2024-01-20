import { useEffect, useState } from 'react';
import ProductCheckoutCard from '../../../components/checkout-productCard';
import CheckoutPayment from '../../../components/checkout-listPayment';
import { useLocation } from 'react-router-dom';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import axios from 'axios';

const CheckoutPage = () => {
  const [firstloading, setFirstLoading] = useState(false);
  const [cartData, setCartData] = useState([])
  const [userData, setUserData] = useState([])
  const location = useLocation()
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const cartId = localStorage.getItem("cartId")
      const result = await axios.get(`http://localhost:8000/api/checkout/get-cart/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setCartData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async()=>{
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(`http://localhost:8000/api/checkout/userData`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setUserData(result.data.final)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getDataCart()
    getUserData()
  },[])
  console.log("1",cartData);
  console.log("2",userData);
  return (
    <>
    < TemporaryNavbar/>
      <div className="text-center mt-5 mb-3 md:mb-8">
        <p className="text-4xl">Checkout</p>
        <p>home / checkout</p>
      </div>
      <div className="flex flex-col gap-y-5 md:flex-row md:justify-center md:gap-3 ">
        <div className="shadow-sm md:border-[1px] h-fit rounded-md">
          {cartData.map((val,id)=>{
            return <ProductCheckoutCard
            key={id}
            productName={val["product.name"]}
            productPrice={val["product.price"].toLocaleString("id")}
            qty={val.quantity}
            total_price={val.total_price.toLocaleString("id")}
            total_weightConvert={val.total_weightConvert}
            productWeightConvert={val.productWeightConvert}
            productImage={val["product.product_images.image"]}
            />

          })}
        </div>
        <div className="shadow-sm md:w-[320px] md:border-[1px] rounded-md pb-2">
          <CheckoutPayment
           recepient={userData.fullname}
           address={userData["addresses.address"]}
           phone={userData["addresses.phone"]}
           city={userData.city}
           province={userData.province}

           />
        </div>
      </div>
      <TemporaryFooter/>
    </>
    
  );
};

export default CheckoutPage;
