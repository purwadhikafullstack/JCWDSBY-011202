import { useEffect, useRef, useState } from 'react';
import ManageOrderTable from '../../../../components/ManageOrderTableComponent.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalOrderInformation,
  ModalUpdateStatus,
} from '../../../../components/modalRama3.jsx';
import { updateItem } from '../../../../redux/slice/orderSlice.js';
import { updateStatus } from '../../../../redux/slice/statusSlice.js';
import {
  InputSearchComponent,
  SearchByStatus,
  SearchDate,
} from '../../../../components/adminOrderSearchComponent.jsx';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../../components/AdminLayout.jsx';

const AdminManageOrder = () => {
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
  const header = [
    { th: 'Invoice', width: 'w-[130px]' },
    { th: 'Date Invoice', width: 'w-[150px]' },
    { th: 'Lokasi Gudang', width: 'w-[180px]' },
    { th: 'Bukti Pembayaran', width: 'w-[160px]' },
    { th: 'Total Price', width: 'w-[180px]' },
    { th: 'Status', width: 'w-[150px]' },
    { th: 'Action', width: 'w-[100px]' },
  ];
  const getDataOrder = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/warehouse/order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOrder();
  }, []);
  useEffect(() => {
    getDataOrder();
  }, [location.search]);
  return (
    <>
      <AdminLayout>
        <div className="px-4 py-3">
          <p className="font-bold mb-5 text-xl">Manage Order</p>
          <div className=" mb-2 flex gap-2">
            <InputSearchComponent
              valueInputSearch={filterInvoice}
              inputSearchId={'searchByInv'}
              placeholder={'Masukkan Invoice'}
              onChange={(e) => {
                let doc = document.getElementById('searchByInv');
                e.target.value;
                setFilterInvoice(doc.value);
              }}
            />
            <SearchDate />
          </div>
          <div>
            <SearchByStatus
              checkedValue={() => {
                setFilterStatus(
                  document.querySelector('input[name="status"]:checked').value,
                );
              }}
              onChangeStatus={() => {
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
              onClick={() => {
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
                // getDataOrder();
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
          <div></div>
          <ManageOrderTable
            header={[
              'Gudang',
              'Invoice',
              'Date Invoice',
              'Alamat Pengiriman',
              'Bukti Pembayaran',
              'Total Price',
              'Status',
              'Action',
            ]}
            // showModalChangeStatus={() => {
            //   setShowModalChangeStatus(true);
            // }}
            data={data}
          />
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
      </AdminLayout>
    </>
  );
};

export default AdminManageOrder;
