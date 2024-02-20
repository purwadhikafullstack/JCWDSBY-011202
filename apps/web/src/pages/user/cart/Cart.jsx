import { useEffect, useState } from 'react';
import CartPayment from '../../../components/cartPayment';
import CartProductCard from '../../../components/cartProductCard';
import axios from 'axios';
import { Loading } from '../../../components/loadingComponent';
import { useNavigate } from 'react-router-dom';
import { cartToOrder } from './cart.api';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import { IModal } from '../../../components/modalRama';

const CartPage = () => {
  const navigate = useNavigate();
  const [firstloading, setFirstLoading] = useState(false);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartSummary, setCartSummary] = useState([]);
  const [onChangeCheckedValue, setOnChangeCheckedValue] = useState(false);
  const [changeQty, setChangeQty] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userAddress, setUserAddress] = useState([]);
  let checkedResult = [];
  let checkedArray = '';
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:8000/api/cart/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartCount(result.data.count);
      return setCartProduct(result.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  const getUserAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(
        `http://localhost:8000/api/checkout/userAddress`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserAddress(result.data.address);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };
  const getChecked = async () => {
    try {
      let checkedItem = document.getElementsByName('intoOrder');
      for (let i = 0; i < checkedItem.length; i++) {
        if (checkedItem[i].checked) {
          checkedResult.push(checkedItem[i].value);
          localStorage.setItem('cartId', checkedResult);
        } else {
          checkedItem[i].checked = false;
        }
      }
      if (checkedResult.length > 0) {
        checkedArray = checkedResult.join(' ');
      } else {
        localStorage.removeItem('cartId');
        return setCartSummary((cartSummary.status = false));
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserAddress();
    // USEEFFECT ketika pertama load
    getDataCart();
    openLoading(1500);
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
      console.error(error);
    }
  };
  const onHandleChangeQty = async (cartId, idx, stock) => {
    try {
      const token = localStorage.getItem('token');
      let item = document.getElementsByName('inputQty');
      let changeItem = item[idx].value;
      if (!changeItem) {
        const updateQty = await axios.patch(
          `http://localhost:8000/api/checkout/qty/${cartId}`,
          { quantity: 0 },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        getDataCart();
        setOnChangeCheckedValue(!onChangeCheckedValue);
      } else {
        if (changeItem > stock) {
          alert(`Oops jumlah maksimal pembelian adalah ${stock}`);
        }
        const updateQty = await axios.patch(
          `http://localhost:8000/api/cart/qty/${cartId}`,
          { quantity: parseInt(changeItem), stock: stock },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        getDataCart();
        setOnChangeCheckedValue(!onChangeCheckedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onHandlePlusMinus = async (operator, id, qty, stock) => {
    try {
      const token = localStorage.getItem('token');
      if (operator === 'plus') {
        if (qty + 1 > stock) {
          alert(`Oops jumlah maksimal pembelian adalah ${stock}`);
        }
        const edit = await axios.patch(
          `http://localhost:8000/api/cart/plus/${id}`,
          { stock: stock },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        getDataCart();
        setOnChangeCheckedValue(!onChangeCheckedValue);
      } else if (operator === 'minus') {
        // getChecked()
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
      console.error(error);
    }
  };
  const onHandleCheckOut = () => {
    if (userAddress.length > 0) {
      if (cartSummary.success) {
        document.body.style.overflow = 'auto';
        setOpenModal(false);
        navigate(`/checkout`);
      } else {
        alert('Oops data produk belum di checklist');
      }
    } else {
      alert(
        'Anda belum memiliki alamat terdaftar, silahkan tambahkan alamat anda',
      );
      navigate('/user/dashboard/address');
    }
  };
  return (
    <>
      {firstloading ? <Loading /> : ''}
      <TemporaryNavbar cartCount={cartCount} />
      <div className="text-center mt-4 mb-2 md:mb-8">
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
                  inputNames={'inputQty'}
                  cardNames={'intoOrder'}
                  productName={val[`product.name`]}
                  qty={val.quantity}
                  productPrice={val[`product.price`]}
                  productWeight={val[`product.weight`]}
                  productImage={val['product.product_images.image']}
                  total_price={val.total_price.toLocaleString('id')}
                  productWeightConvert={val.productWeightConvert}
                  total_weightConvert={val.total_weightConvert}
                  checkBoxValue={val.id}
                  stock={val.stock}
                  navigateProduct={() =>
                    navigate(`/product-detail/${val[`product.id`]}`)
                  }
                  onHandleDelete={() => onHandleDelete(val.id)}
                  onClickMinus={() => {
                    onHandlePlusMinus('minus', val.id);
                  }}
                  onClickPlus={() => {
                    onHandlePlusMinus('plus', val.id, val.quantity, val.stock);
                  }}
                  onChangeChecked={() => {
                    setOnChangeCheckedValue(!onChangeCheckedValue);
                  }}
                  onHandleChangeQty={() => {
                    onHandleChangeQty(val.id, id, val.stock);
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
            total_item={cartSummary.success > 0 ? cartSummary.totalItem : 0}
            total_price={
              cartSummary.success
                ? cartSummary.allPrice.toLocaleString('id')
                : 0
            }
            total_weight={
              cartSummary.success ? cartSummary.allWeightConvert : 0
            }
            onHandleCheckOut={() => {
              setOpenModal(true);
              document.body.style.overflow = 'hidden';
            }}
          />
        </div>
      </div>
      {openModal ? (
        <IModal
          deskripsi={'Apakah anda yakin melanjutkan checkout?'}
          confirm={'Lanjutkan'}
          cancel={'Cancel'}
          onHandleModalClick={onHandleCheckOut}
          onHandleModalCancel={() => {
            document.body.style.overflow = 'auto';
            setOpenModal(false);
          }}
        />
      ) : (
        ''
      )}
      <TemporaryFooter />
    </>
  );
};

export default CartPage;
