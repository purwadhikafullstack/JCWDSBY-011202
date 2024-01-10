import { useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import WarehouseTable from '../../../../components/WarehouseTable';
const ManageInventory = () => {
  const [temporaryWareHouse, setTemporaryWareHouse] = useState([
    {
      name: 'Gudang 1',
      prov: 'Jawa Timur',
      city: 'Surabaya',
      address: 'Jl SidoKirim no.200',
    },
    {
      name: 'Gudang 2',
      prov: 'DKI Jakarta',
      city: 'Jakarta',
      address: 'Jl SidoSend no.200',
    },
    {
      name: 'Gudang 3',
      prov: 'Jawa Timur',
      city: 'Kediri',
      address: 'Jl SidoDelivery no.200',
    },
    {
      name: 'Gudang 4',
      prov: 'Jawa Barat',
      city: 'Bandung',
      address: 'Jl Palus no.200',
    },
    {
      name: 'Gudang 5',
      prov: 'Bali',
      city: 'Denpasar',
      address: 'Jl Aseli no.200',
    },
  ]);
  console.log(temporaryWareHouse);
  return (
    <div>
      <AdminLayout>
        <div className="p-4 flex justify-between items-center bg-white">
          <div className="font-bold text-xl">Manage Inventory</div>
        </div>
        <div className="p-4">
          <WarehouseTable temporaryWareHouse={temporaryWareHouse} />
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageInventory;
