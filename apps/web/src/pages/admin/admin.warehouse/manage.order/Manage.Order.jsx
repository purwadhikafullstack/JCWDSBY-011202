import { useEffect, useState } from 'react';
import ManageOrderTable from '../../../../components/ManageOrderTableComponent.jsx';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import axios from 'axios';

const WarehouseManageOrder = () => {
  const [data, setData] = useState([]);
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
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOrder();
  }, []);
  console.log('ini lo', data);
  return (
    <>
      <WareHouseAdminLayout>
        <div>
          <ManageOrderTable
            // header={}
            data={data}
          />
        </div>
      </WareHouseAdminLayout>
    </>
  );
};

export default WarehouseManageOrder;
