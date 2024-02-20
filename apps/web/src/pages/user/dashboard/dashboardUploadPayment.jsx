import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineCloudUpload, AiOutlineFileImage } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../../components/loadingComponent';
import { IModal } from '../../../components/modalRama';
import { API_CALL } from '../../../helper';
const DashboardUploadPayment = (props) => {
  const [media, setMedia] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  const [imageFile, setImageFile] = useState('');
  const [fileToUpload, setfileToUpload] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState('');
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem('orderItem')),
  );
  const [firstloading, setFirstLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  const onHandleModalClick = async () => {
    try {
      if (!media) {
        alert('Silahkan upload bukti pembayaran terlebih dahulu ');
      } else {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('fileUpload', fileToUpload);
        // const result = await axios.patch(
        //   `http://localhost:8000/api/userOrder/upload/payment-proof${location.search}`,
        //   formData,
        // );
        const result2 = await API_CALL.post(
          `/userOrder/request-mutation${location.search}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        // navigate("/user/dashboard/order")
        alert(
          'Terima kasih sudah mengupload pembayaran, pembayaran anda akan segera dikonfirmasi ',
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getOrderDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await API_CALL.get(
        `/userOrder/order-detail${location.search}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setOrderDetail(result.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // if (!sessionStorage.getItem('orderItem')) {
    //   navigate('/user/dashboard/order');
    // } else {
    // }
    openLoading(1500);
    getOrderDetail();
  }, []);

  return (
    <>
      {firstloading ? (
        <Loading />
      ) : (
        <>
          <TemporaryNavbar />
          <DashboardTitle
            title={'Konfirmasi Pesanan Anda'}
            subTitle={'User/Konfirmasi Pesanan Anda'}
          />
          <div className="flex justify-center gap-4">
            <DashboardSidebar />
            <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
              <div className="flex flex-col gap-y-2">
                <p>No Invoice</p>
                <p className="bg-slate-200 rounded-md py-1 px-2 font-semibold">
                  {orderDetail.invoice}
                </p>
                <p className="">Detail Transfer</p>
                <div className="bg-slate-200 rounded-md py-1 px-2 font-semibold flex flex-col gap-y-1">
                  <p>Rekening Tujuan : </p>
                  <p>BCA 088292093 a/n PT. Ace Warehouse</p>
                  <p className="mt-2">Nominal Pembayaran :</p>
                  <p>
                    Rp{' '}
                    {orderDetail
                      ? orderDetail.total_price.toLocaleString('id')
                      : ''}
                  </p>
                </div>
                <p>Info Pengiriman</p>
                <div className="bg-slate-200 rounded-md py-1 px-2 font-semibold flex flex-col gap-y-1">
                  <p>Penerima :</p>
                  <p>{orderDetail.recepient}</p>
                  <p className="mt-2">Alamat Pengiriman :</p>
                  <p>
                    {orderDetail['address.address']},{' '}
                    {orderDetail['address.city.name']},{' '}
                    {orderDetail['address.province.name']}{' '}
                  </p>
                </div>
                <p className="text-center">Bukti Pembayaran</p>
                <div
                  className="h-[250px] w-full flex flex-col rounded-md border-2 border-dashed border-[#F06105] bg-slate-200  items-center justify-center cursor-pointer"
                  onClick={() => {
                    document.querySelector('.inputImage').click();
                  }}
                >
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    className="inputImage hidden bg-slate-200]"
                    onChange={({ target: { files } }) => {
                      setImageFile(files[0]);
                      files[0] && setFileName(files[0].name);
                      if (files) {
                        setfileToUpload(files[0]);
                        setMedia(URL.createObjectURL(files[0]));
                      }
                    }}
                  />
                  {media ? (
                    <img src={media} className=" h-full " alt={fileName} />
                  ) : (
                    <>
                      <AiOutlineCloudUpload className=" text-5xl text-slate-600" />
                      <p className="text-slate-600">Upload bukti bayar anda</p>
                    </>
                  )}
                </div>
                <div className="flex items-center w-full mx-auto justify-between pt-2">
                  <AiOutlineFileImage className=" text-lg" />
                  <span className="flex items-center text-sm">
                    {fileName} -{' '}
                    <TiDeleteOutline
                      className=" text-lg"
                      onClick={() => {
                        setFileName('No selected file');
                        setMedia(null);
                      }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex mt-10 gap-3 justify-end">
                <button
                  className=" bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Kirim Data Pembayaran
                </button>
                <button
                  className=" bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
                  onClick={() => {
                    sessionStorage.removeItem('orderItem');
                    navigate('/user/dashboard/order');
                  }}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
          <TemporaryFooter />
          {showModal ? (
            <IModal
              deskripsi={'Apakah anda yakin mengirim bukti pembayaran anda?'}
              confirm={'Ya'}
              cancel={'Tidak'}
              onHandleModalCancel={() => {
                setShowModal(false);
              }}
              onHandleModalClick={onHandleModalClick}
            />
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default DashboardUploadPayment;
