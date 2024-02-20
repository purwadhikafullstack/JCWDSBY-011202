import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { IModal } from './modalRama';
import { useState } from 'react';
import { ModalDetailOrder } from './modalRama2';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../redux/slice/statusSlice';
import { updateItem } from '../redux/slice/orderSlice';
import API_CALL from '../helpers/API';
export const OrderCardNone = (props) => {
  // if (!props.data) {
  return (
    <div className="bg-slate-100 rounded-md w-[full] h-[300px] flex justify-center items-center mb-4">
      <p className="text-slate-500">Belum ada history pesanan</p>
    </div>
  );
};
export const OrderCard = (props) => {
  const dispatch = useDispatch()
  const [itemDisplay, setItemDisplay] = useState([props.itemDisplay]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const statusStyle = (status) => {
    switch (status) {
      case 'Diproses':
        return 'bg-blue-300';
      case 'Dikirim':
        return 'bg-green-300';
      case 'Berhasil':
        return 'bg-green-300';
      case 'Dibatalkan':
        return 'bg-red-300 ';
      default:
        return 'bg-yellow-300 ';
    }
  };
  const checkButton = () => {
    if (props.status == 'Menunggu Pembayaran') {
      return (
        <div className="justify-end text-sm flex gap-2">
          <button
            className=" bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400"
            disabled={false}
            onClick={() => {
              // sessionStorage.setItem("orderItem",JSON.stringify(props.orderItem))
              navigate(
                `/user/dashboard/upload-payment?order=${props.orderId}&inv=${props.invoice}`,
              );
            }}
          >
            Upload bukti pembayaran
          </button>
          <button
            className="border-[1px] rounded-md px-2 border-[#F06105] hover:text-[#F06105]"
            onClick={() => {
              let doc = document.getElementById(props.idName);
              if (doc.style.display == 'block') {
                doc.style.display = 'none';
              } else if (doc.style.display == 'none') {
                doc.style.display = 'block';
              }
            }}
          >
            <RxHamburgerMenu />
          </button>
          <div className="relative">
            <div
              id={props.idName}
              style={{ display: 'none' }}
              className="absolute w-[134px]  sm:top-[40px] sm:right-[5px]  bg-white text-left rounded-md border-[1px]"
            >
              <ul className=" flex-col flex">
                <li
                  className=" hover:bg-orange-200 cursor-pointer w-full rounded-md p-2"
                  onClick={()=>{
                    dispatch(updateItem({ order_id:props.orderId , invoice:props.invoice }));
                  }}
                >
                  Detail Pesanan
                </li>
                <li className="border-t-[1px]"></li>
                <li
                  className="hover:bg-orange-200 cursor-pointer w-full rounded-sm p-2"
                  onClick={() => {
                    setShowModal(true);
                    sessionStorage.setItem(
                      'deleteOrderId',
                      JSON.stringify({ id: props.orderId, inv: props.invoice }),
                    );
                  }}
                >
                  Batalkan pesanan
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (props.status == 'Dikirim') {
      return (
        <div className="justify-end text-sm flex gap-2">
          <button
            className=" bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400"
            disabled={false}
            onClick={() => {
              dispatch(updateStatus({
                order_id:props.orderId,
                invoice:props.invoice
              }))
            }}
          >
            Konfirmasi Pesanan
          </button>
          <button
            className="border-[1px] rounded-md px-2 border-[#F06105] hover:text-[#F06105]"
            onClick={() => {
              let doc = document.getElementById(props.idName);
              if (doc.style.display == 'block') {
                doc.style.display = 'none';
              } else if (doc.style.display == 'none') {
                doc.style.display = 'block';
              }
            }}
          >
            <RxHamburgerMenu />
          </button>
          <div className="relative">
            <div
              id={props.idName}
              style={{ display: 'none' }}
              className="absolute w-[134px]  sm:top-[40px] sm:right-[5px]  bg-white text-left rounded-md border-[1px]"
            >
              <ul className=" flex-col flex">
                <li
                  className=" hover:bg-orange-200 cursor-pointer w-fit rounded-md p-2 "
                  onClick={()=>{
                    dispatch(updateItem({ order_id:props.orderId , invoice:props.invoice }));
                  }
                }
                >
                  Detail Pesanan
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="justify-end text-sm flex gap-2">
          <p
            className="font-semibold text-right  text-[#F06105] hover:text-orange-400 cursor-pointer w-fit rounded-md p-2"
            disabled={false}
            onClick={()=>{
              dispatch(updateItem({ order_id:props.orderId , invoice:props.invoice }));
            }}
          >
            Detail Pesanan
          </p>
        </div>
      );
    }
  };

  const orderDate = new Date(props.orderDate);
  return (
    <div className="sm:w-full shadow p-4 mb-2 rounded-md">
      <div className=" items-center flex justify-between text-xs mb-3">
        <div className="flex gap-2 items-center">
          <p>
            {orderDate.toLocaleDateString('id', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
          <p className=" truncate">{props.invoice}</p>
        </div>
        <div>
          <p
            className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle(
              props.status,
            )}`}
          >
            {props.status}
          </p>
        </div>
      </div>
      <div className="flex justify-between mb-6">
        <div className=" flex flex-col gap-y-2">
          {itemDisplay.map((val, idx) => {
            return (
              <div key={idx} className="flex  gap-2 w-[370px] ">
                <img
                  src={`http://localhost:8000/productimage/${val['product.product_images.image']}`}
                  alt=""
                  srcSet=""
                  className="rounded-sm h-[60px] w-[60px]"
                />
                <div>
                  <p className=" truncate font-semibold">
                    {val['product.name']}
                  </p>
                  <p className="italic text-sm text-slate-600">
                    {val.quantity} Barang x Rp{' '}
                    {val['product.price'].toLocaleString('id')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center border-l-[1px] pl-1 md:w-[200px] lg:pl-10 md:pl-5 ">
          <p className="text-slate-600 text-sm md:text-md">Total Belanja</p>
          <p className="font-semibold">Rp {props.total_price}</p>
        </div>
      </div>
      {checkButton()}
      {showModal ? (
        <IModal
          deskripsi={'Apakah anda yakin untuk membatalkan pesanan ini?'}
          confirm={'Ya'}
          cancel={'Tidak'}
          onHandleModalClick={props.onHandleModalClick}
          onHandleModalCancel={() => {
            setShowModal(false);
            sessionStorage.removeItem('deleteOrderId');
          }}
        />
      ) : (
        ''
      )}
      
    </div>
  );
};
