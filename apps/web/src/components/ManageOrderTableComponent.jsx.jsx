import { useState } from "react";

const ManageOrderTable = (props) => {
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
    // const [header,setHeader]=useState(props.header)
    // const header = [
    //     { th: 'Invoice', width: 'w-[130px]' },
    //     { th: 'Date Invoice', width: 'w-[150px]' },
    //     { th: 'Lokasi Gudang', width: 'w-[180px]' },
    //     { th: 'Bukti Pembayaran', width: 'w-[160px]' },
    //     { th: 'Total Price', width: 'w-[180px]' },
    //     { th: 'Status', width: 'w-[150px]' },
    //     { th: 'Action', width: 'w-[100px]' },
    //   ]
    const data = [props.data]
    console.log("apa",header);
    return (
      <div className="">
        <table className="w-full table-fixed">
          <thead className="bg-[#F06105] text-white font-semibold">
            <tr className="">
              {JSON.stringify(header).map((val, idx) => {
                if (val == 'Action') {
                  return (
                    <th
                      key={idx}
                      className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase "
                    >
                      {val}
                    </th>
                  );
                } else if (val == 'Bukti Pembayaran') {
                  return (
                    <th
                      key={idx}
                      className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase "
                    >
                      {val}
                    </th>
                  );
                } else {
                  return (
                    <th
                      key={idx}
                      className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase"
                    >
                      <div className="flex items-center justify-between">
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
            {data.length>0?data.map((val, id) => {
              return (
                <tr
                  className={` border-b-[1px] border-slate-300 text-[13px] ${id%2==0?"bg-slate-200":"bg-slate-300"}`}
                  key={id}
                >
                  
                  <td className="w-[14%]">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap">{val.invoice}</div>
                  </td>
                  <td className="w-[14%]">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap">{new Date(val.createdAt).toLocaleDateString("id")}</div>
                  </td>
                  <td className="w-[14%]">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap ">{val.address}</div>
                  </td>
                  <td className="w-[14%]">
                    <div className=" align-middle px-2 overflow-hidden text-ellipsis whitespace-nowrap ">{val.payment_proof}</div>
                  </td>
                  <td className="w-[14%]">
                    <div className=" align-middle font-semibold px-2">
                      {`Rp ${val.total_price}`}
                    </div>
                  </td>
                  <td className="w-[14%]">
                    <div className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle(val.status)}`}>
                      {val.status}
                    </div>
                  </td>
                  <td className="w-[14%]">
                    <div className="flex justify-center py-1 gap-2">
                      {props.button}
                    </div>
                  </td>
                </tr>
              );
            }):<div>

            </div>}
          </tbody>
        </table>
      </div>
    );
  };
  export default ManageOrderTable;
  