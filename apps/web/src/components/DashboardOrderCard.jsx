import { RxHamburgerMenu } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
export const OrderCardNone = (props) => {
  // if (!props.data) {
  return (
    <div className="bg-slate-100 rounded-md w-[full] h-[300px] flex justify-center items-center mb-4">
      <p className="text-slate-500">Belum ada history pesanan</p>
    </div>
  );
};

export const OrderCard = (props) => {
  const navigate = useNavigate()
  const statusStyle = (status) => {
    switch (status) {
      case 'Diproses':
        return 'bg-blue-300';
      case 'Dikirim':
        return 'bg-blue-300';
      case 'Berhasil':
        return 'bg-green-300';
      case 'Dibatalkan':
        return 'bg-red-300 ';
      default:
        return 'bg-yellow-300 ';
    }
  };
  if (
    props.status == 'Menunggu Pembayaran' ||
    props.status == 'Menunggu Konfirmasi Pembayaran'
  ) {
    const orderDate = new Date(props.orderDate)
    return (
      <div className="sm:w-full shadow p-4 mb-2 rounded-md">
        <div className=" items-center flex gap-2 text-xs mb-3">
          {/* <p className="font-semibold">Kursi</p> */}
          <p>
            {orderDate.toLocaleDateString("id",{day:"numeric",month:"short",year:"numeric"})}
            </p>
          <p
            className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap bg-yellow-300`}
          >
            {props.status}
          </p>
          <p className=" truncate">{props.invoice}</p>
        </div>
        <div className="flex justify-between mb-6">
          <div className=" flex flex-col gap-y-2">
            {props.orderItem.map((val, idx) => {
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
                      {val["product.name"]}
                    </p>
                    <p className="italic text-sm text-slate-600">
                      {val.quantity} Barang x Rp {val["product.price"].toLocaleString("id")}
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
        <div className="justify-end text-sm flex gap-2">
          <button
            className=" bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400"
            disabled={false}
            onClick={()=>{
              navigate(`/user/dashboard/upload-payment?order=${props.orderId}&inv=${props.invoice}`)
            }}
          >
            Upload bukti pembayaran
          </button>
          <button
            className="border-[1px] rounded-md px-2 border-[#F06105] hover:text-[#F06105]"
          >
            <RxHamburgerMenu />
          </button>
          <div id={'satu'} className="hidden relative">
            <ul className="absolute">
              <li
                className=" text-[#F06105]  font-semibold hover:text-orange-400"
                disabled={false}
              >
                Detail Pesanan
              </li>
              <li className="rounded-md px-5 py-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200">
                Batalkan pesanan
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    const orderDate = new Date(props.orderDate)
    return (

      <div className="sm:w-full shadow p-4 mb-2 rounded-md">
        <div className=" items-center flex gap-2 text-xs mb-3">
          {/* <p className="font-semibold">Kursi</p> */}
          <p>{orderDate.toLocaleDateString("id",{day:"numeric",month:"short",year:"numeric"})}</p>
          <p
            className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle(
              props.status,
            )}`}
          >
            {props.status}
          </p>
          <p className=" truncate">{props.invoice}</p>
        </div>
        <div className="flex justify-between mb-6">
          <div className=" flex flex-col gap-y-2">
          {props.orderItem.map((val, idx) => {
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
                      {val["product.name"]}
                    </p>
                    <p className="italic text-sm text-slate-600">
                      {val.quantity} Barang x Rp {val["product.price"].toLocaleString("id")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col justify-center border-l-[1px] pl-1">
            <p className="text-slate-600 text-sm md:text-md">Total Belanja</p>
            <p className="font-semibold">Rp {props.total_price}</p>
          </div>
        </div>
        <div className="justify-end text-sm flex gap-2">
          <button
            className="border-[1px] rounded-md px-2 py-2 border-[#F06105] hover:text-[#F06105]"
            onClick={() => {
              let setBlock = document.getElementById('satu');
              setBlock('');
            }}
          >
            <RxHamburgerMenu />
          </button>
          <div id={'satu'} className="hidden relative">
            <ul className="absolute">
              <li
                className=" text-[#F06105]  font-semibold hover:text-orange-400"
                disabled={false}
              >
                Detail Pesanan
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
