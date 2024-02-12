import { RiArrowDropRightLine } from 'react-icons/ri';
const ModalOrderInformation = (props) => {
  const data = props.data;
  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center items-center bg-slate-100 content-center gap-y-3 text-center">
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-y-4 md:w-[700px] max-h-[600px]">
        <p className="font-bold text-2xl">Order Information</p>
        <div className="max-h-[400px] overflow-auto">
          <div className="text-left shadow p-2 flex flex-col gap-y-1 rounded-md">
            <p className="pl-2 text-sm">Invoice</p>
            <p className="p-2 rounded-md text-slate-600 bg-slate-100 font-bold">
              {data.invoice}
            </p>
            <p className="pl-2 text-sm ">Status</p>
            <p className="p-2 rounded-md text-slate-600 bg-slate-100 font-bold">
              {data.status}
            </p>
            <p className="pl-2 text-sm ">Tanggal Pesan</p>
            <p className="p-2 rounded-md text-slate-600 bg-slate-100 font-bold">
              {new Date(data.orderDate).toLocaleDateString('id', {
                dateStyle: 'medium',
              })}
            </p>
            <p className="pl-2 text-sm ">Alamat Pengiriman</p>
            <p className="p-2 rounded-md text-slate-600 bg-slate-100 font-bold">
              {data.address}, {data.city}, {data.province}
            </p>
            <p className="pl-2 text-sm ">Penerima</p>
            <p className="p-2 rounded-md text-slate-600 bg-slate-100 font-bold">
              {data.recepient}
            </p>
          </div>
          <div className="text-left shadow p-2 flex flex-col gap-y-1 rounded-md">
            <div>
              <p className="text-sm">Order Item/s : </p>
            </div>
            <div className="flex flex-col gap-y-2">
              {data.data.map((val, idx) => {
                return (
                  <div
                    key={idx}
                    className="px-2 py-4 pt-6 bg-slate-100 flex flex-col rounded-md"
                  >
                    <div className="flex w-full justify-between">
                      {/* untuk gambar dan informasi product */}
                      <div className="flex gap-2">
                        <div className=" flex justify-center items-center">
                          <img
                            src={`http://localhost:8000/productimage/${val['product.product_images.image']}`}
                            alt="gambar"
                            className="rounded-sm h-[60px] w-[60px]"
                          />
                        </div>
                        <div className=" w-[100px] md:w-[200px] ">
                          <p className=" truncate">{val['product.name']}</p>
                          <div className=" ">
                            <p className="text-[14px] text-slate-500 ">
                              {val['quantity'].toLocaleString('id')} item x Rp{' '}
                              {val['product.price'].toLocaleString('id')}
                            </p>
                            <p className="text-[14px] text-slate-500">
                              Berat Total : {val.total_weight / 1000} Kg
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-[16px] md:text-[17px]">
                          Rp {val.total_price.toLocaleString('id')}
                        </p>
                        <p className="text-right text-[14px] text-slate-500">
                          {val.total_weightConvert}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <p>Pembayaran :</p> */}
              <div className="flex justify-between pr-2">
                <p>Biaya pengiriman</p>
                <p className="text-[16px] md:text-[17px]">
                  Rp {data.shipping_cost.toLocaleString('id')}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Jenis Pengiriman </p>
                <p className="text-slate-500 italic">{data.shipping_type}</p>
              </div>
              <div className="flex justify-between pr-2">
                <p>Total Harga</p>
                <p className="text-[#F06105] font-bold text-[16px] md:text-[17px]">
                  Rp {data.total_price.toLocaleString('id')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className=" bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
            onClick={props.onHandleModalCancel}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const ModalUpdateStatus = (props) => {
  const data = props.data;
  let updateTo = []
  if (data.status == 'Dikirim') {
    updateTo = ['Diproses', 'Berhasil'];
  } else {
    updateTo = [
        'Menunggu Pembayaran',
        'Menunggu Konfirmasi Pembayaran',
        'Diproses',
        'Dikirim',
        'Berhasil',
        'Dibatalkan',
      ];
  }

  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center items-center bg-slate-100 content-center  text-center">
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-y-3 md:w-[700px] max-h-[600px]">
        <p className="font-bold text-2xl">Update Status Order</p>
        <div className="font-semibold">
          <p>{data.invoice}</p>
        </div>
        <div className="flex justify-between w-full mx-auto md:w-[530px] ">
          <div className="text-left">
            <p className="font-semibold text-center mb-2">From</p>
            <p className="text-sm bg-slate-200 p-2 rounded-md">{data.status}</p>
          </div>
          <div>
            <p className="font-semibold text-center mb-2">To</p>
            <select
              name="update"
              id="update"
              className="rounded-md p-2 text-sm"
            >
              {updateTo.map((val, idx) => {
                return <option value={val}>{val}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="w-fit bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
            onClick={props.onHandleModalClick}
          >
            Confirm
          </button>
          <button
            className=" bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
            onClick={props.onHandleModalCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export { ModalOrderInformation, ModalUpdateStatus };
