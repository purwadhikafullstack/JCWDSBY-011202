import { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../redux/slice/orderSlice';
import axios from 'axios';
import { updateStatus } from '../redux/slice/statusSlice';
import { cancelOrder } from '../redux/slice/cancelOrderAdmin';
import API_CALL from '../helpers/API';
const ManageOrderTable2 = (props) => {
  const index = ['Diproses', 'Dikirim', 'Berhasil', 'Dibatalkan'];
  const dispatch = useDispatch();
  const statusStyle = (status) => {
    switch (status) {
      case 'Diproses':
        return 'bg-blue-300';
      case 'Dikirim':
        return 'bg-blue-300';
      case 'Pesanan Dikonfirmasi':
        return 'bg-green-300';
      case 'Dibatalkan':
        return 'bg-red-300 ';
      default:
        return 'bg-yellow-300 ';
    }
  };
  let activeHamburger = null;
  const data = [props.data];
  return (
    <div className=" overflow-scroll">
      <table className="table-fixed overflow-scroll w-full">
        <thead className="bg-[rgb(240,97,5)] text-white font-semibold ">
          <tr className="">
            {props.header.map((val, idx) => {
              if (val == 'Action') {
                return (
                  <th
                    key={idx}
                    className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase w-[150px]"
                  >
                    {val}
                  </th>
                );
              } else if (val == 'Bukti Pembayaran') {
                return (
                  <th
                    key={idx}
                    className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase w-[100px]"
                  >
                    {val}
                  </th>
                );
              } else {
                return (
                  <th
                    key={idx}
                    className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase w-[150px]"
                  >
                    <div className="flex items-center justify-between w-fit">
                      {val}{' '}
                      <button className="p-2 rounded-md text-slate-800 cursor-pointer hover:bg-orange-500">
                        {props.sortBy}
                      </button>
                    </div>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data[0].length > 0 ? (
            data[0].map((val, id) => {
              return (
                <tr
                  className={` border-b-[1px] border-slate-300 text-[13px] ${
                    id % 2 == 0 ? 'bg-slate-200' : 'bg-slate-300'
                  }`}
                  key={id}
                >
                  <td className="">
                    <div className=" align-middle py-4 px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {val['warehouse.name']}
                    </div>
                  </td>
                  <td className="">
                    <div className=" align-middle py-4 px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {val.invoice}
                    </div>
                  </td>
                  <td className="">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {new Date(val.createdAt).toLocaleDateString('id', {
                        dateStyle: 'medium',
                      })}
                    </div>
                  </td>
                  <td className="">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap ">
                      {val['address.address']}, {val['address.city.name']},{' '}
                      {val['address.province.name']}
                    </div>
                  </td>
                  <td className="">
                    <div className=" align-middle px-2  ">
                      <a
                        href={`http://localhost:8000/paymentProof/${val.payment_proof}`}
                        target="blank"
                      >
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline cursor-pointer hover:text-blue-600">
                          {val.payment_proof}{' '}
                        </p>
                      </a>
                    </div>
                  </td>
                  <td className="">
                    <div className=" align-middle font-semibold px-2">
                      Rp{' '}
                      <span className="text-right">
                        {val.total_price.toLocaleString('id')}
                      </span>
                    </div>
                  </td>
                  <td className="">
                    <div
                      className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle(
                        val.status,
                      )}`}
                    >
                      {val.status}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex justify-center py-1 gap-1">
                      <button
                        className="rounded-md  bg-[#F06105] text-white py-1 px-2 hover:bg-orange-400 "
                        type="button"
                        onClick={() => {
                          dispatch(
                            updateStatus({
                              order_id: val.id,
                              invoice: val.invoice,
                              orderDate: val.createdAt,
                              status: val.status,
                            }),
                          );
                        }}
                      >
                        Update Status
                      </button>
                      <button
                        className="border-[1px] rounded-md px-2 border-[#F06105] hover:text-[#F06105]"
                        onClick={() => {
                          let doc = document.getElementById(`hamburger${id}`);
                          if (doc.style.display == 'block') {
                            doc.style.display = 'none';
                            activeHamburger = null;
                          } else if (doc.style.display == 'none') {
                            doc.style.display = 'block';
                          }
                        }}
                      >
                        <RxHamburgerMenu />
                      </button>
                      <div className="relative">
                        <div
                          id={`hamburger${id}`}
                          style={{ display: 'none' }}
                          className="absolute w-[134px]  sm:top-[29px] sm:right-[5px]  bg-white  text-left rounded-md border-[1px]"
                        >
                          <ul className=" flex-col flex">
                            <li
                              className=" hover:bg-orange-200 cursor-pointer w-full rounded-md p-2"
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem('token');
                                  const result = await API_CALL.get(
                                    `/warehouse/order/manage-order?id=${val.id}&inv=${val.invoice}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    },
                                  );
                                  dispatch(
                                    updateItem({
                                      order_id: val.id,
                                      address: val['address.address'],
                                      city: val['address.city.name'],
                                      province: val['address.province.name'],
                                      warehouse_id: val.warehouse_id,
                                      recepient: val.recepient,
                                      status: val.status,
                                      payment_proof: val.payment_proof,
                                      invoice: val.invoice,
                                      total_price: val.total_price,
                                      total_weight: val.total_weight,
                                      shipping_cost: val.shipping_cost,
                                      shipping_type: val.shipping_type,
                                      orderDate: val.createdAt,
                                      data: result.data,
                                    }),
                                  );
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              Detail Pesanan
                            </li>
                            <li className="border-t-[1px]"></li>
                            {!index.includes(val.status) ? (
                              <li
                                className="hover:bg-orange-200 cursor-pointer w-full rounded-sm p-2"
                                onClick={() => {
                                  dispatch(
                                    cancelOrder({
                                      order_id: val.id,
                                      invoice: val.invoice,
                                      status: val.status,
                                      orderDate: val.createdAt,
                                    }),
                                  );
                                }}
                              >
                                Batalkan pesanan
                              </li>
                            ) : (
                              ''
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="">
              <td className=""></td>
            </tr>
          )}
        </tbody>
      </table>
      {data[0].length < 1 ? (
        <div className="flex bg-slate-300 rounded-md min-h-[400px] justify-center items-center w-full">
          <p className=" text-md text-slate-500">Tidak Ada Pesanan</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default ManageOrderTable2;
