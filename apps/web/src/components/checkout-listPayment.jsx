import { useState } from "react";

const CheckoutPayment = (props) => {
  const [cancelModal,setCancelModal] = useState(false)
  const onHandleCancel = () => {
    setCancelModal(false)
  }

  return (
    <div className="flex flex-col p-3">
      {/* untuk list pengiriman dan penagihan */}
      <p className="text-lg mb-2 font-semibold">Pengiriman</p>
      <div className="border-[1px] mb-8 rounded-md">
        <div className="bg-slate-200 p-2 px-3 flex justify-between">
          <p>Penerima & Alamat</p>
          <p className="text-slate-500 cursor-pointer hover:text-slate-700">
            Ubah
          </p>
        </div>
        <div className="p-3 flex flex-col gap-y-1">
          <p className="font-bold">{props.recepient}</p>
          <p>{props.address}</p>
          {/* <p>6088{props.postcode}</p> */}
          <p>
            {props.province}, {props.city}
          </p>
          <p>{props.phone}</p>
        </div>
      </div>

      {/* Untuk Ringkasan Pembayaran */}
      <div className="mb-8">
        <p className="text-lg border-b-[1px] pb-3 font-semibold">Ringkasan Pesanan</p>
        <div className="flex justify-between pt-3">
            <p>Pricelist</p>
            <p>Rp 2.500.000{props.price}</p>
        </div>
        <div className="flex justify-between pt-1">
            <p>Biaya Pengiriman</p>
            <p>Rp 500.000{props.shippingCost}</p>
        </div>
        {/* <div className="flex justify-between pt-1">
            <p>Diskon</p>
            <p className="text-[#F06105]">(Rp 500.000{props.dicsount})</p>
        </div> */}
        <div className="flex justify-between pt-5 font-bold text-lg">
            <p className="">Total</p>
            <p className="">Rp 3.000.000{props.totalPrice}</p>
        </div>
      </div>

      {/* Untuk Button lanjutkan dan batal */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400">Lanjutkan Pembayaran</button>
        <button className="w-full bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
        onClick={()=>{setCancelModal(true)
        }}>Batal</button>
      </div>
      {/* {cancelModal?<CancelCheckoutModal onHandleCancel={onHandleCancel}/>:<></>} */}
    </div>
  );
};

export default CheckoutPayment;
