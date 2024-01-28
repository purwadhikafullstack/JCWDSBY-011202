import { LiaShippingFastSolid } from 'react-icons/lia';
import { FaShippingFast } from 'react-icons/fa';
import { MiniLoading } from './loadingComponent';
const IModal = (props) => {
  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center items-center bg-slate-100 content-center gap-y-3 text-center">
      <div className="bg-white p-10 rounded-md flex flex-col shadow">
        <p className="mb-8 text-lg">{props.deskripsi}</p>
        <div className="flex gap-3">
          <button
            className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
            onClick={props.onHandleModalClick}
          >
            {props.confirm}
          </button>
          <button
            className="w-full bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
            onClick={props.onHandleModalCancel}
          >
            {props.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
const IModalOpt = (props) => {
  return (
    <>
      <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center bg-slate-100 items-center content-center gap-y-3 ">

        <div className="bg-white p-5 w-full rounded-md flex flex-col shadow md:w-[700px] md:p-10">
        {props.isLoading?<div className='h-[400px] '><MiniLoading/></div>:<div>
            <p className="mb-3  sm:w-full text-lg font-semibold">
              {props.deskripsi1}
            </p>
            <input
              type="text"
              name='inputRecepient'
              placeholder="Masukkan Nama Penerima"
              className="outline-blue-500 py-1 px-2 shadow-sm mb-3 w-full"
            //   value={props.valueRecepient}
              onChange={(e)=>e.target.value}
            />
            <p className="mb-3 text-lg font-semibold">{props.deskripsi2}</p>
            <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" flex justify-between">
                <p className="font-semibold mb-2">Jl Surabaya No 110</p>
                <p className="text-sm text-slate-600">Alamat Utama</p>
              </div>
              <div>
                <p>Surabaya, Jawa Timur</p>
                <p></p>
              </div>
            </div>
            <div className="shadow p-4 mb-2 rounded-md">
              <div className=" flex justify-between">
                <p className="font-semibold mb-2">Jl Surabaya No 110</p>
                <p className="text-sm text-slate-600 cursor-pointer hover:underline">
                  Set Alamat Utama
                </p>
              </div>
              <div>
                <p>Surabaya, Jawa Timur</p>
                <p></p>
              </div>
            </div>
            <p className="text-sm text-slate-600 cursor-pointer hover:underline w-fit">
              Tambah Alamat Baru
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className=" bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
                onClick={props.onHandleModalClick}
              >
                {props.confirm}
              </button>
              <button
                className=" bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
                onClick={props.onHandleModalCancel}
              >
                {props.cancel}
              </button>
            </div>
          </div>}
          
        </div>
      </div>
    </>
  );
};
const IModalCourier = (props) => {
  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center bg-slate-100 items-center content-center gap-y-3 ">
      {props.isLoading ? (
        <MiniLoading />
      ) : (
        <div className="bg-white p-5 w-full rounded-md flex flex-col shadow md:w-[700px] md:p-10">
          <p className="mb-3  sm:w-full text-lg font-semibold flex items-center gap-1">
            {props.deskripsi1}
            <FaShippingFast className="text-slate-700" />
          </p>
          <div className="mb-4">
            <div className="cursor-pointer hover:bg-slate-100 sm:w-full shadow p-4 mb-2 rounded-md">
              <p className="font-bold">Reguler (Rp 21.000)</p>
              <p className="">Estimasi tiba 27-29 Jan </p>
            </div>
            <div className="cursor-pointer hover:bg-slate-100 sm:w-full shadow p-4 mb-2 rounded-md">
              <p className="font-bold">YES (Rp 31.000)</p>
              <p className="">Estimasi tiba 27-28 Jan </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              className=" bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
              onClick={props.onHandleModalCancel}
            >
              {props.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { IModal, IModalOpt, IModalCourier };
