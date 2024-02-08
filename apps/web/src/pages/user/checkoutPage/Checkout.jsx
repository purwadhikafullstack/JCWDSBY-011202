import { useEffect, useState } from 'react';
import ProductCheckoutCard from '../../../components/checkout-productCard';
import CheckoutPayment from '../../../components/checkout-listPayment';
import { useLocation, useNavigate } from 'react-router-dom';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import axios from 'axios';
import { Loading, MiniLoading } from '../../../components/loadingComponent';
import {
  IModalOpt,
  IModalCourier,
  IModal,
} from '../../../components/modalRama';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [firstloading, setFirstLoading] = useState(false);
  const [secondloading, setSecondLoading] = useState(false);
  const [thirdloading, setThirdLoading] = useState(false);
  const [recepient, setRecepient] = useState('');
  const [phone, setPhone] = useState('');
  const [cartData, setCartData] = useState([]);
  const [coPrice, setCoPrice] = useState(0);
  const [coWeight, setCoWeight] = useState(0);
  const [userData, setUserData] = useState([]);
  const [shippingCost, setShippingCost] = useState([]);
  const [warehouse_id, serWarehouse_id] = useState(0);
  const [shippingPrice, setShippingPrice] = useState('');
  const [userAddress, setUserAddress] = useState([]);
  const [finalPrice, setFinalPrice] = useState('-');
  const [changeAddress, setChangeAddress] = useState(false);
  const [courierOpt, setCourierOpt] = useState(false);
  const [shippingOpt, setShippingOpt] = useState(false);
  const [modalLanjutkanCheckout, setModalLanjutkanCheckout] = useState(false);
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  const openMiniLoading = (time) => {
    setSecondLoading(true);
    setTimeout(() => {
      setSecondLoading(false);
    }, time);
  };
  const getDataCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const cartId = localStorage.getItem('cartId');
      const result = await axios.get(
        `http://localhost:8000/api/checkout/get-cart/${cartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCoPrice(result.data.checkoutPrice);
      setCoWeight(result.data.checkoutWeight);
      setCartData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get(
        `http://localhost:8000/api/checkout/userData`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return setUserData(result.data.final);
    } catch (error) {
      console.log(error);
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
      return setUserAddress(result.data.address);
    } catch (error) {
      console.log(error);
    }
  };
  const getShippingCostApi = async (lat, lon, city, kota, weight) => {
    try {
      console.log('jalan uhuhuhuhu');
      const token = localStorage.getItem('token');
      const result = await axios.get(
        `http://localhost:8000/api/checkout/get-shipping-cost?lat=${lat}&lon=${lon}&city=${city}&kota=${kota}&weight=${weight}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // console.log('uny', result.data);
      serWarehouse_id(result.data.warehouse_id);
      setShippingCost(result.data.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleModalCourier = async () => {
    try {
      openLoading(1500);
      let hargaOngkir = parseInt(sessionStorage.getItem('hargaOngkir'));
      setCourierOpt(false);
      setShippingPrice('Rp ' + hargaOngkir.toLocaleString('id'));
      setFinalPrice(hargaOngkir + coPrice);
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleLanjutkanCheckout = async () => {
    try {
      if (finalPrice != '-') {
        console.log('masuk dah benar');
        const date = new Date();
        const token = localStorage.getItem('token');
        const result = await axios.post(
          `http://localhost:8000/api/checkout`,
          {
            invoice: `INV/${date.getFullYear()}${
              date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
            }${
              date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            }/${userData.city.slice(0, 3).toUpperCase()}/${
              userData.account_id
            }/`,
            // account_id,
            cartId: localStorage.getItem('cartId'),
            address_id: userData.address_id,
            warehouse_id,
            recepient: recepient ? recepient : userData.fullname,
            // phone,
            shipping_cost: parseInt(sessionStorage.getItem('hargaOngkir')),
            shipping_type: sessionStorage.getItem('service'),
            total_price: finalPrice,
            total_weight: coWeight,
            status: 'Menunggu Pembayaran',
            payment_proof: '',
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        console.log('ini hasil sudah di create', result);
        navigate(
          `/checkout/success?id=${result.data.id}&inv=${result.data.invoice}`,
        );
      } else {
        console.log('masuk kurang');
        alert('Mohon Lengkapi Terlebih Dahulu');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    openLoading(2000);
    getDataCart();
    getUserData();
    getUserAddress();
  }, []);
  console.log('userdata ', userData);

  return (
    <>
      {firstloading ? <Loading /> : ''}
      <TemporaryNavbar />
      <div className="text-center mt-5 mb-3 md:mb-8">
        <p className="text-4xl">Checkout</p>
        <p>home / checkout</p>
      </div>
      <div className="flex flex-col gap-y-5 md:flex-row md:justify-center md:gap-3 ">
        <div className="shadow-sm md:border-[1px] h-fit rounded-md">
          {/* cartdata disini */}
          {cartData.map((val, id) => {
            return (
              <ProductCheckoutCard
                key={id}
                productName={val['product.name']}
                productPrice={val['product.price'].toLocaleString('id')}
                qty={val.quantity}
                total_price={val.total_price.toLocaleString('id')}
                total_weightConvert={val.total_weightConvert}
                productWeightConvert={val.productWeightConvert}
                productImage={val['product.product_images.image']}
              />
            );
          })}
        </div>
        <div className="shadow-sm md:w-[320px] md:border-[1px] rounded-md pb-2">
          {/* co payment disini */}
          <CheckoutPayment
            recepient={recepient ? recepient : userData.fullname}
            address={userData['address']}
            phone={phone ? phone : userData['phone']}
            city={userData.city}
            shippingCost={'Pilih Pengiriman'}
            province={userData.province}
            shippingPrice={shippingPrice ? shippingPrice : ''}
            price={coPrice.toLocaleString('id')}
            finalCost={
              shippingPrice ? parseInt(finalPrice).toLocaleString('id') : '-'
            }
            ubah={() => {
              setShippingOpt(true);
              openMiniLoading(1000);
            }}
            onHandleCourier={() => {
              openMiniLoading(2000);
              setCourierOpt(true);
              getShippingCostApi(
                userData['lat'],
                userData['lon'],
                userData['city_id'],
                userData.city,
                coWeight,
              );
            }}
            onHandleModalClickBatal={() => {
              if (sessionStorage.getItem('hargaOngkir')) {
                sessionStorage.removeItem('hargaOngkir');
              }
              if (sessionStorage.getItem('idOngkir')) {
                sessionStorage.removeItem('idOngkir');
              }
              navigate('/cart');
            }}
            onHandleLanjutkanCheckout={() => setModalLanjutkanCheckout(true)}
          />
        </div>
      </div>
      {shippingOpt ? (
        <IModalOpt
          deskripsi1={'Penerima'}
          deskripsi2={'Alamat Utama'}
          confirm={'Confirm'}
          cancel={'Cancel'}
          valueRecepient={recepient}
          isLoading={secondloading}
          userAddress={userAddress}
          idUtama={userData['address_id']}
          onHandleModalClick={() => {
            let doc = document.getElementsByName('inputRecepient');
            if (doc[0].value) {
              setRecepient(doc[0].value);
            }
            getUserData();
            getUserAddress();
            if (sessionStorage.getItem('hargaOngkir')) {
              sessionStorage.removeItem('hargaOngkir');
              setShippingPrice('');
            }
            openLoading(1000);
            setShippingOpt(false);
          }}
          onHandleModalCancel={() => {
            setShippingOpt(false);
          }}
        />
      ) : (
        ''
      )}
      {courierOpt ? (
        <IModalCourier
          deskripsi1={'Pilih Opsi Pengiriman'}
          confirm={'Confirm'}
          cancel={'Cancel'}
          name={'courier'}
          isLoading={secondloading}
          data={shippingCost}
          onHandleModalClick={onHandleModalCourier}
          onHandleModalCancel={() => {
            setCourierOpt(false);
          }}
        />
      ) : (
        ''
      )}
      {modalLanjutkanCheckout ? (
        <IModal
          onHandleModalClick={onHandleLanjutkanCheckout}
          cancel={'Tidak'}
          confirm={'Ya'}
          deskripsi={'Apakah anda yakin untuk melanjutkan checkout?'}
          onHandleModalCancel={() => {
            setModalLanjutkanCheckout(false);
          }}
        />
      ) : (
        ''
      )}
      <TemporaryFooter />
    </>
  );
};

export default CheckoutPage;
