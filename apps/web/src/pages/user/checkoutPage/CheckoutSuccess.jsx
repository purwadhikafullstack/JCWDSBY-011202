import { useLocation, useNavigate } from 'react-router-dom';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import axios from 'axios';
import { Loading } from '../../../components/loadingComponent';
import { useEffect, useState } from 'react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [firstloading, setFirstLoading] = useState(false);
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  const getOrderData = async()=>{
    try {
      const token = localStorage.getItem("token")
      console.log("lokasi",location);
      // const orderData = await axios.get(`http://localhost:8000/api/checkout`,
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // },)
    } catch (error) {
     console.log(error); 
    }
  }
  useEffect(() => {
    openLoading(2000);
    getOrderData()
  }, []);
  return (
    <>
      {firstloading ? <Loading /> : ''}
      <TemporaryNavbar />
      <div className="flex flex-col items-center px-2 mt-4">
        <p className="text-4xl text-center mb-10 md:mb-20">Checkout Berhasil</p>
        <div className="flex flex-col justify-center pb-4 shadow-sm border-[1px] md:w-[740px] lg:w-[900px] rounded-md ">
          <div className="text-center bg-[#8FD14F] mb-8 font-bold">
            Success Order
          </div>
          <div className="flex flex-col gap-y-2 text-center px-2 ">
            <p>
              Nomor invoice anda <span className="font-bold">SYW90280KK</span>
            </p>
            <p>
              Total belanja anda{' '}
              <span className="text-[#F06105] font-bold">Rp 3.000.000</span>
            </p>
            <button className=" mx-auto bg-slate-300 w-fit rounded-md p-1 px-2 font-semibold border-[1px] border-slate-400">
              Cetak Invoice
            </button>
            <p>
              Kami juga telah mengirim detail pesanan anda ke{' '}
              <span className="font-bold italic px-1">rama@mail.com</span>
            </p>
            <p className="mb-14">
              Silahkan transfer dengan total Rp{' '}
              <span className="text-[#F06105] font-semibold ">3.000.000</span>{' '}
              melalui layanan pembayaran yang kami sediakan
            </p>
            <table className=" mb-10">
              <thead className="">
                <tr className="font-bold bg-slate-300">
                  <th>Nama Bank</th>
                  <th>No Rekening</th>
                  <th>Atas Nama</th>
                </tr>
              </thead>
              <tbody>
              <tr className="border-b-[1px]">
                <td>BCA</td>
                <td>088292093</td>
                <td>PT. Ace Warehouse</td>
              </tr>
              </tbody>
            </table>
            <p>
              Setelah melakukan pembayaran silahkan konfirmasi pembayaran anda{' '}
              <span className="mx-auto bg-slate-300 w-fit rounded-md px-2 border-[1px] border-slate-400 cursor-pointer ">
                disini
              </span>
            </p>
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </>
  );
};

export default CheckoutSuccess;
