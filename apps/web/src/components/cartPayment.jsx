import { useNavigate } from "react-router-dom";


const CartPayment = (props) => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col p-3">
      {/* Untuk Ringkasan Pembayaran */}
      <div className="mb-8">
        <p className="text-lg border-b-[1px] pb-3 font-semibold">Ringkasan Pesanan</p>
        <div className="text-slate-500 italic flex justify-between pt-3">
          <p>Total Item</p>
          <p className="text-slate-500">{props.total_item} item/s</p>
        </div>
        {/* <div className="flex justify-between pt-1">
          <p>Pricelist</p>
          <p>Rp 2.500.000{props.price}</p>
        </div> */}
        <div className="flex justify-between pt-1 text-slate-500 italic ">
          <p>Berat Total</p>
          <p>{props.total_weight} Kg</p>
        </div>
        
          {/* <div className="mt-3 text-slate-500 cursor-pointer text-right hover:text-slate-600">
            Ubah Alamat
          </div> */}
        <div className="flex justify-between pt-5 font-bold text-lg">
          <p className="">Total</p>
          <p className="">Rp {props.total_price}</p>
        </div>
      </div>

      {/* Untuk Button lanjutkan dan batal */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
        onClick={props.onHandleCheckOut}>
          Checkout
        </button>
        <button className="w-full rounded-md p-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200" onClick={()=>{navigate("/")}}>
          Kembali
        </button>
      </div>
      
    </div>
  );
};

export default CartPayment;
