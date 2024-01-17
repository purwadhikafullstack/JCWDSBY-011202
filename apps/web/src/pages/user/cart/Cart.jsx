import { useEffect, useState } from 'react';
import CartPayment from '../../../components/cartPayment';
import CartProductCard from '../../../components/cartProductCard';
import Layout from '../layout/layout';
import axios from 'axios';
import { Loading } from '../../../components/loadingComponent';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState('');
  const [firstloading, setFirstLoading] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem("token")

      const result = await axios.get('http://localhost:8000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setCartProduct(result.data.result.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  useEffect(() => {
    // setToken(localStorage.getItem("token"))
    getDataCart();
    openLoading(3000);
  }, []);

  const onHandleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const deleteEvent = await axios.delete(
        `http://localhost:8000/api/cart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert('Berhasil menghapus cart');
      getDataCart();
    } catch (error) {
      console.log(error);
    }
  };
  const onHandlePlusMinus = async (operator,id) => {
    try {
      const token = localStorage.getItem("token")
      if(operator==="plus"){
        
      const edit = await axios.patch(
        `http://localhost:8000/api/cart/plus/${id}`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        },) 
        getDataCart()
    } else if(operator==="minus"){
      const edit = await axios.patch(
        `http://localhost:8000/api/cart/minus/${id}`,{},
        {
          headers: { Authorization: `Bearer ${token}` },
        },)
        getDataCart()
    }
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleCheckOut = async () => {
    navigate('/user-checkout');
  };
  return (
    <>
      {firstloading ? <Loading /> : ''}
      <Layout>
        <div className="text-center mt-4 mb-3 md:mb-8">
          <p className="text-4xl">Cart</p>
          <p>home / cart</p>
        </div>
        <div className="flex flex-col gap-y-5 md:flex-row md:justify-center md:gap-3 ">
          <div className="shadow-sm md:border-[1px] h-fit rounded-md">
            {cartProduct.map((val, id) => {
              return (
                <CartProductCard
                  key={id}
                  productName={val[`product.name`]}
                  qty={val.quantity}
                  productPrice={val[`product.price`]}
                  productFinalPrice={val.total_price}
                  onHandleDelete={() => onHandleDelete(val.id)}
                  onClickMinus={()=>{onHandlePlusMinus("minus",val.id)}}
                  onClickPlus={()=>{onHandlePlusMinus("plus",val.id)}}
                />
              );
            })}
          </div>
          <div className="shadow-sm md:w-[320px] md:border-[1px] rounded-md pb-2 mb-4">
            <CartPayment
              onHandleCheckout={() => {
                onHandleCheckOut();
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
