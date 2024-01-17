import { useEffect, useState } from 'react';
import CartPayment from '../../../components/cartPayment';
import CartProductCard from '../../../components/cartProductCard';
import Layout from '../layout/layout';
import axios from 'axios';
import { Loading } from '../../../components/loadingComponent';
import { useNavigate } from 'react-router-dom';
import { cartToOrder } from './cart.api';

const CartPage = () => {
  const navigate = useNavigate();
  const [firstloading, setFirstLoading] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartSummary, setCartSummary] = useState([]);
  const [onChangeCheckedValue, setOnChangeCheckedValue] = useState(false);
  let checkedArray = '';
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem('token');
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
  const getSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(
        `http://localhost:8000/api/cart/summary/${checkedArray}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return setCartSummary(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getChecked = () => {
    let checkedResult = [];
    let checkedItem = document.getElementsByName('intoOrder');
    for (let i = 0; i < checkedItem.length; i++) {
      if (checkedItem[i].checked) {
        checkedResult.push(checkedItem[i].value);
      } 
    }
    if(checkedResult.length<1){
     setCartSummary(cartSummary.status=false)
    } else{
      checkedArray = checkedResult.join(' ');
    }
  };
  useEffect(() => {
    // USEEFFECT ketika pertama load
    getDataCart();
    openLoading(3000);
    getChecked();
    if (checkedArray) {
      getSummary();
    }
  }, []);
  useEffect(() => {
    // USEEFFECT ketika checkbox di klik
    getChecked();
    if (checkedArray) {
      getSummary();
    }
  }, [onChangeCheckedValue]);
  const onHandleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const deleteEvent = await axios.delete(
        `http://localhost:8000/api/cart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert('Berhasil menghapus cart');
      getDataCart();
      setOnChangeCheckedValue(!onChangeCheckedValue);
    } catch (error) {
      console.log(error);
    }
  };
  const onHandlePlusMinus = async (operator, id) => {
    try {
      const token = localStorage.getItem('token');
      if (operator === 'plus') {
        const edit = await axios.patch(
          `http://localhost:8000/api/cart/plus/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        getDataCart();
        setOnChangeCheckedValue(!onChangeCheckedValue);
      } else if (operator === 'minus') {
        const edit = await axios.patch(
          `http://localhost:8000/api/cart/minus/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        getDataCart();
        setOnChangeCheckedValue(!onChangeCheckedValue);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleCheckOut = () => {
    console.log("hai");
  };
  return (
    <>
      {firstloading ? <Loading /> : ''}
      <Layout>
        <div className="text-center mt-4 mb-3 md:mb-8">
          <p className="text-4xl">Cart</p>
          <p>home / cart</p>
        </div>
        <div className="flex flex-col gap-y-5 md:flex-row md:justify-center md:gap-3 md:mb-10">
          {cartProduct.length > 0 ? (
            <div className="shadow-sm md:border-[1px] h-fit rounded-md">
              {cartProduct.map((val, id) => {
                return (
                  <CartProductCard
                    key={id}
                    cardNames={'intoOrder'}
                    productName={val[`product.name`]}
                    qty={val.quantity}
                    productPrice={val[`product.price`]}
                    productWeight={val[`product.weight`]}
                    total_price={val.total_price}
                    productWeightConvert={val.productWeightConvert}
                    total_weightConvert={val.total_weightConvert}
                    checkBoxValue={val.id}
                    onHandleDelete={() => onHandleDelete(val.id)}
                    onClickMinus={() => {
                      onHandlePlusMinus('minus', val.id);
                    }}
                    onClickPlus={() => {
                      onHandlePlusMinus('plus', val.id);
                    }}
                    onChangeChecked={() => {
                      setOnChangeCheckedValue(!onChangeCheckedValue);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="shadow-sm md:border-[1px] h-[400px] rounded-md flex md:w-[500px] lg:w-[600px] bg-slate-100 text-slate-500 items-center justify-center flex-col gap-y-4">
              <p>Tidak ada product dalam keranjang anda</p>
              <button
                className="bg-[#F06105] text-white px-2 py-4 rounded-md"
                onClick={() => navigate('/product-search?')}
              >
                Mulai Search Produk
              </button>
            </div>
          )}

          <div className="shadow-sm md:w-[320px] md:border-[1px] rounded-md pb-2 mb-4">
            <CartPayment
              total_item={cartSummary.success ? cartSummary.totalItem : 0}
              total_price={
                cartSummary.success
                  ? cartSummary.allPrice.toLocaleString('id')
                  : 0
              }
              total_weight={
                cartSummary.success ? cartSummary.allWeightConvert : 0
              }
              onHandleCheckOut={()=>{
                cartToOrder();
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;