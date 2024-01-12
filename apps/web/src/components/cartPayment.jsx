import { useNavigate } from "react-router-dom";


const CartPayment = (props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col p-3">
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
        <div className="flex justify-between pt-1">
          <p>Diskon</p>
          <p className="text-[#F06105]">(Rp 500.000{props.dicsount})</p>
        </div>
          <div className="mt-3 text-slate-500 cursor-pointer text-right hover:text-slate-600">
            Ubah Alamat
          </div>
        <div className="flex justify-between pt-5 font-bold text-lg">
          <p className="">Total</p>
          <p className="">Rp 3.000.000{props.totalPrice}</p>
        </div>
      </div>

      {/* Untuk Button lanjutkan dan batal */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
        onClick={props.onHandleCheckOut}>
          Checkout
        </button>
        <button className="w-full bg- rounded-md p-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200">
          Kembali
        </button>
      </div>
      
    </div>
  );
};

export default CartPayment;
