import { useEffect, useRef, useState } from 'react';
import ManageOrderTable from '../../../../components/ManageOrderTableComponent.jsx';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalOrderInformation,
  ModalUpdateStatus,
} from '../../../../components/modalRama3.jsx';
import { updateItem } from '../../../../redux/slice/orderSlice.js';
import { updateStatus } from '../../../../redux/slice/statusSlice.js';
import { IModal } from '../../../../components/modalRama.jsx';
import cancelOrderAdmin, {
  cancelOrder,
} from '../../../../redux/slice/cancelOrderAdmin.js';
import {
  InputSearchComponent,
  SearchByStatus,
  SearchDate,
} from '../../../../components/adminOrderSearchComponent.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import ManageOrderTable2 from '../../../../components/ManageOrderTableComponent2.jsx';

const WarehouseManageOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editItem = useSelector((state) => state.orderSlice);
  const editStatus = useSelector((state) => state.statusSlice);
  const cancelOrderItem = useSelector((state) => state.cancelOrderSlice);
  const dispatch = useDispatch();
  const [confirmationModalStatus, setConfirmationModalStatus] = useState(false);
  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false);
  const [showModalCancelOrder, setShowModalCancelOrder] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterInvoice, setFilterInvoice] = useState('');

  const [data, setData] = useState([]);
  const ref = useRef();
  const token = localStorage.getItem('token');
  const getDataOrder = async () => {
    try {
      if (location.search) {
        const result = await axios.get(
          `http://localhost:8000/api/warehouse/order/search-order${location.search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        return setData(result.data);
      } else {
        const result = await axios.get(
          `http://localhost:8000/api/warehouse/order`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        return setData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getQuery = () => {
    if (location.search) {
      console.log(location.search);
      console.log(location.hash);
    }
  };
  useEffect(() => {
    getQuery();
    getDataOrder();
  }, []);
  useEffect(() => {
    getQuery();
    getDataOrder();
  }, [location.search]);

  return (
    <>
      <WareHouseAdminLayout>
        <div className="px-4 py-3">
          <div className='bg-white'>
            <p className="font-bold mb-5 text-xl ">Manage Order</p>
          </div>
          <div className=" mb-2 flex gap-2">
            <InputSearchComponent
              inputSearchId={'searchByInv'}
              valueInputSearch={filterInvoice}
              placeholder={'Masukkan Invoice'}
              onChange={(e) => {
                let doc = document.getElementById('searchByInv');
                e.target.value;
                setFilterInvoice(doc.value);
              }}
            />
            <SearchDate
              onChangeFrom={(e) => {
                let doc = document.getElementById('from');
                e.target.value;
                setFilterDateFrom(doc.value);
              }}
              onChangeTo={(e) => {
                let doc = document.getElementById('to');
                e.target.value;
                setFilterDateTo(doc.value);
              }}
            />
          </div>
          <div className="flex justify-between  ">
            <SearchByStatus
              checked={filterStatus}
              checkedValue={() => {
                setFilterStatus(
                  document.querySelector('input[name="status"]:checked').value,
                );
              }}
              onClickStatus={() => {
                setFilterStatus(
                  document.querySelector('input[name="status"]:checked').value,
                );
              }}
              refStatus={ref}
            />
          </div>
          <div className="flex gap-2 mb-3 justify-end">
            <button
              className=" bg-[#F06105] text-white font-semibold my-auto px-4 rounded-md py-2 hover:bg-orange-400"
              disabled={false}
              onClick={async () => {
                try {
                  const object = {
                    invoice: filterInvoice,
                    status: filterStatus,
                    from: filterDateFrom,
                    to: filterDateTo,
                  };
                  const result = [];
                  console.log('yang dicari', object);
                  for (const key in object) {
                    if (object[key]) {
                      result.push(`${key}=${object[key]}`);
                    }
                  }
                  const finalresult = result.join('&');
                  navigate(`/warehouse-admin/manage-order?${finalresult}`);
                  getDataOrder();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Search
            </button>
            <button
              className=" bg-slate-300 font-semibold my-auto px-4 rounded-md py-2 hover:bg-slate-100"
              disabled={false}
              onClick={() => {
                navigate(`/warehouse-admin/manage-order`);
                setFilterDateFrom('');
                setFilterDateTo('');
                setFilterInvoice('');
                setFilterStatus('');
              }}
            >
              Reset
            </button>
          </div>
          <div className="">
            <ManageOrderTable2
              header={[
                'Invoice',
                'Date Invoice',
                'Alamat Pengiriman',
                'Bukti Pembayaran',
                'Total Price',
                'Status',
                'Action',
              ]}
              data={data}
            />
          </div>
        </div>
        {editItem.order_id ? (
          <ModalOrderInformation
            data={editItem}
            onHandleModalCancel={() => {
              dispatch(
                updateItem({
                  order_id: '',
                  address: '',
                  city: '',
                  province: '',
                  warehouse_id: '',
                  recepient: '',
                  status: '',
                  payment_proof: '',
                  invoice: '',
                  total_price: '',
                }),
              );
            }}
          />
        ) : (
          ''
        )}

        {editStatus.status ? (
          <ModalUpdateStatus
            data={editStatus}
            onHandleModalClick={() => {
              setConfirmationModalStatus(true);
            }}
            onHandleModalCancel={() => {
              dispatch(updateStatus({ order_id: '', status: '', invoice: '' }));
            }}
          />
        ) : (
          ''
        )}
        {confirmationModalStatus ? (
          <IModal
            confirm={'Ya'}
            cancel={'Tidak'}
            deskripsi={'Apakah anda yakin mengubah status order ini?'}
            onHandleModalClick={async () => {
              try {
                const token = localStorage.getItem('token');
                let doc = document.getElementById('update');
                const result = await axios.patch(
                  `http://localhost:8000/api/warehouse/order/update-status`,
                  {
                    status: doc.value,
                    invoice: editStatus.invoice,
                    id: editStatus.order_id,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  },
                );
                setConfirmationModalStatus(false);
                dispatch(
                  updateStatus({ order_id: '', status: '', invoice: '' }),
                );
                getDataOrder();
              } catch (error) {
                console.log(error);
              }
            }}
            onHandleModalCancel={() => {
              setConfirmationModalStatus(false);
            }}
          />
        ) : (
          ''
        )}
        {cancelOrderItem.status ? (
          <IModal
            confirm={'Ya'}
            cancel={'Tidak'}
            deskripsi={'Apakah anda yakin membatalkan Pesanan ini?'}
            onHandleModalClick={async () => {
              try {
                const batalkanOrder = await axios.patch(
                  `http://localhost:8000/api/warehouse/order/update-status`,
                  {
                    status: cancelOrderItem.status,
                    invoice: cancelOrderItem.invoice,
                    id: cancelOrderItem.order_id,
                  },
                );
              } catch (error) {
                console.log(error);
              }
            }}
            onHandleModalCancel={() => {
              dispatch(cancelOrder({ order_id: '', status: '', invoice: '' }));
            }}
          />
        ) : (
          ''
        )}
      </WareHouseAdminLayout>
    </>
  );
};

export default WarehouseManageOrder;
