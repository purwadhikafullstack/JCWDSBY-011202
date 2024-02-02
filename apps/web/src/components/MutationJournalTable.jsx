import { FaRegTrashAlt, FaBoxOpen, FaCheck } from 'react-icons/fa';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiConfirmed } from 'react-icons/gi';

const MutationJournalTable = ({
  mutation,
  onClickConfirmMutation,
  onClickArrived,
  onClickDeliver,
  onClickDone,
  onClickDelete,
}) => {
  const getPriority = (val) => {
    const priorities = {
      'waiting for confirmation': 1,
      processing: 2,
      'on delivery': 3,
      arrived: 4,
      done: 5,
      canceled: 6,
    };
    return priorities[val.status] || 0;
  };
  const sortedData = mutation.sort((a, b) => getPriority(a) - getPriority(b));
  return (
    <div>
      <div className="overflow-x-auto mx-auto">
        <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
          <thead className="bg-orange-50">
            <tr>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Product
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Quantity
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Source
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Destination
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Tanggal Pengiriman
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Tanggal Tiba
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Status
              </th>
              <th className="lg:px-4 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((val) => (
              <tr key={val.id}>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.productName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                  {val.quantity}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.sourceWarehouseName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.destinationWarehouseName}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.delivery_date || 'not shipped yet'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {val.arrival_date || 'please wait for delivery'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                  {val.status}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex flex-col h-[100px]">
                  {val.status === 'waiting for confirmation' && (
                    <>
                      <button
                        onClick={() => onClickConfirmMutation(val.id)}
                        className={`${
                          val.warehouse_id !== val.source_warehouse_id
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-yellow-400 hover:bg-yellow-600 text-white'
                        } px-4 py-2 rounded my-1`}
                        disabled={val.warehouse_id !== val.source_warehouse_id}
                      >
                        <div className="flex items-center justify-center">
                          <GiConfirmed />
                          <h1 className="ml-2">Confirm</h1>
                        </div>
                      </button>
                      <button
                        className=" text-black hover:text-red-700 px-4 py-2 rounded my-1"
                        onClick={() => handleCancel(val.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {val.status === 'processing' && (
                    <>
                      <button
                        onClick={() => onClickDeliver(val.id)}
                        className={`${
                          val.warehouse_id !== val.source_warehouse_id
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-blue-400 hover:bg-blue-600 text-white'
                        } px-4 py-2 rounded my-1`}
                        disabled={val.warehouse_id !== val.source_warehouse_id}
                      >
                        <div className="flex items-center justify-center">
                          <CiDeliveryTruck />
                          <h1 className="ml-2">Deliver</h1>
                        </div>
                      </button>
                      <button
                        className=" text-black hover:text-red-700 px-4 py-2 rounded my-1"
                        onClick={() => handleCancel(val.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {val.status === 'on delivery' && (
                    <>
                      <button
                        onClick={() => onClickArrived(val.id)}
                        className={`${
                          val.warehouse_id !== val.destination_warehouse_id
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-red-400 hover:bg-red-600 text-white'
                        } px-4 py-2 rounded my-1`}
                        disabled={
                          val.warehouse_id !== val.destination_warehouse_id
                        }
                      >
                        <div className="flex items-center justify-center">
                          <FaBoxOpen />
                          <h1 className="ml-2">Arrive</h1>
                        </div>
                      </button>
                      <button
                        className=" text-black hover:text-red-700 px-4 py-2 rounded my-1"
                        onClick={() => handleCancel(val.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {val.status === 'arrived' && (
                    <>
                      <button
                        onClick={() => onClickDone(val.id)}
                        className={`${
                          val.warehouse_id !== val.destination_warehouse_id
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            : 'bg-green-400 hover:bg-green-600 text-white'
                        } px-4 py-2 rounded my-1`}
                        disabled={
                          val.warehouse_id !== val.destination_warehouse_id
                        }
                      >
                        <div className="flex items-center justify-center">
                          <FaCheck />
                          <h1 className="ml-2">Done</h1>
                        </div>
                      </button>
                      <button
                        className=" text-black hover:text-red-700 px-4 py-2 rounded my-1"
                        onClick={() => handleCancel(val.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {['canceled', 'done'].includes(val.status) && (
                    <>
                      <button onClick={() => onClickDelete(val.id)}>
                        <div className="flex items-center justify-center py-6">
                          <FaRegTrashAlt className="hover:text-red-500" />
                        </div>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MutationJournalTable;
