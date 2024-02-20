import { LiaShippingFastSolid } from 'react-icons/lia';
import { FaShippingFast } from 'react-icons/fa';
import { MiniLoading } from './loadingComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';
const IModal = (props) => {
  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center items-center bg-slate-100 content-center gap-y-3 text-center z-50">
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
  const [secondloading, setSecondLoading] = useState(false);
  const openMiniLoading = (time) => {
    setSecondLoading(true);
    setTimeout(() => {
      setSecondLoading(false);
    }, time);
  };
  const [address, setAddress] = useState(props.userAddress);
  const [idIndex, setIdIndex] = useState(props.idUtama);
  useEffect(() => {});
  return (
    <>
      <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center bg-slate-100 items-center content-center gap-y-3 ">
        <div className="bg-white p-5 w-full rounded-md flex flex-col shadow md:w-[700px] md:p-10">
          {props.isLoading || secondloading ? (
            <div className="h-[400px] ">
              <MiniLoading />
            </div>
          ) : (
            <div>
              <p className="mb-3  sm:w-full text-lg font-semibold">
                {props.deskripsi1}
              </p>
              <input
                type="text"
                name="inputRecepient"
                placeholder="Masukkan Nama Penerima"
                className="outline-blue-500 py-1 px-2 shadow-sm mb-3 w-full rounded-md border-none"
                onChange={(e) => e.target.value}
              />
              <p className="mb-3 text-lg font-semibold">{props.deskripsi2}</p>
              {address.map((val, idx) => {
                if (val.id == idIndex) {
                  return (
                    <div
                      key={idx}
                      className="sm:w-full shadow p-4 mb-2 rounded-md"
                    >
                      <div className=" flex justify-between">
                        <p className="font-semibold mb-2">{val.address}</p>
                        <p className="text-sm text-slate-600">Alamat Utama</p>
                      </div>
                      <div>
                        <p>
                          {val['city.name']}, {val['province.name']}
                        </p>
                        <p></p>
                      </div>
                    </div>
                  );
                }
              })}
              {address.map((val, idx) => {
                if (val.id != idIndex) {
                  return (
                    <div key={idx} className="shadow p-4 mb-2 rounded-md">
                      <div className=" flex justify-between">
                        <p className="font-semibold mb-2">{val.address}</p>
                        <p
                          className="text-sm text-slate-600 cursor-pointer hover:underline"
                          onClick={async () => {
                            openMiniLoading(500);
                            setIdIndex(val.id);
                            const token = localStorage.getItem('token');
                            const result = await axios.patch(
                              `http://localhost:8000/api/checkout/changeUserAddress`,
                              { address: val.id },
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              },
                            );
                          }}
                        >
                          Set Alamat Utama
                        </p>
                      </div>
                      <div>
                        <p>
                          {val['city.name']}, {val['province.name']}
                        </p>
                        <p></p>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="flex gap-3 mt-8 justify-end">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const IModalCourier = (props) => {
  const [secondloading, setSecondLoading] = useState(false);
  const openMiniLoading = (time) => {
    setSecondLoading(true);
    setTimeout(() => {
      setSecondLoading(false);
    }, time);
  };
  // const [data, setData] = useState([prop]);
  const idNumber = sessionStorage.getItem('idOngkir')
    ? sessionStorage.getItem('idOngkir')
    : 999;
  const [idCourier, setIdCourier] = useState(idNumber);
  return (
    <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center bg-slate-100 items-center content-center gap-y-3 ">
      {props.isLoading ? (
        <div className="h-[400px] w-full md:w-[700px]">
          <MiniLoading />
        </div>
      ) : (
        <div className="bg-white p-5 w-full rounded-md flex flex-col shadow md:w-[700px] md:p-10">
          <p className="mb-3  sm:w-full text-lg font-semibold flex items-center gap-1">
            {props.deskripsi1}
            <FaShippingFast className="text-slate-700" />
          </p>
          <div className="mb-4">
            {props.data.map((val, idx) => {
              if (idx == idCourier) {
                return (
                  <div
                    key={idx}
                    className={` cursor-pointer bg-slate-100 sm:w-full shadow p-4 mb-2 rounded-md`}
                    onClick={() => {
                      sessionStorage.setItem('idOngkir', idx);
                      sessionStorage.setItem('service', val.service);
                      sessionStorage.setItem('hargaOngkir', val.cost[0].value);

                      setIdCourier(idx);
                    }}
                  >
                    <p className="font-bold">
                      {val.service} (Rp.{' '}
                      {val.cost[0].value.toLocaleString('id')})
                    </p>
                    <p className="text-sm text-slate-500">{val.description}</p>
                    <p className="">
                      Estimasi tiba{' '}
                      {val.cost[0].etd == '1-1'
                        ? 'besok'
                        : val.cost[0].etd + ' hari'}
                    </p>
                  </div>
                );
              } else if (idx != idCourier) {
                return (
                  <div
                    key={idx}
                    className={` cursor-pointer hover:bg-slate-100 sm:w-full shadow p-4 mb-2 rounded-md`}
                    onClick={() => {
                      sessionStorage.setItem('idOngkir', idx);
                      sessionStorage.setItem('hargaOngkir', val.cost[0].value);
                      setIdCourier(idx);
                      sessionStorage.setItem('service', val.service);
                    }}
                  >
                    <p className="font-bold">
                      {val.service} (Rp.{' '}
                      {val.cost[0].value.toLocaleString('id')})
                    </p>
                    <p className="text-sm text-slate-500">{val.description}</p>
                    <p className="">
                      Estimasi tiba{' '}
                      {val.cost[0].etd == '1-1'
                        ? 'besok'
                        : val.cost[0].etd + ' hari'}
                    </p>
                  </div>
                );
              }
            })}
          </div>
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
        </div>
      )}
    </div>
  );
};

export { IModal, IModalOpt, IModalCourier };
