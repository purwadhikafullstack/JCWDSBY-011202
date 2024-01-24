import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import MutationJournalTable from '../../../../components/MutationJournalTable';
import { useState } from 'react';
const ManageMutation = () => {
  const [temporaryMutation, setTemporaryMutation] = useState([
    {
      product: 'Skona Sofa',
      quantity: 1,
      source_warehouse: 'Surabaya',
      destination_warehouse: 'Kediri',
      date_sent: '10 Jan 2024',
      arrival_date: undefined,
      status: 'Dikirim',
    },
    {
      product: 'Hikari Dining Chair',
      quantity: 2,
      source_warehouse: 'Kediri',
      destination_warehouse: 'Surabaya',
      date_sent: '8 Jan 2024',
      arrival_date: '11 Jan 2024',
      status: 'Selesai',
    },
    {
      product: 'Alladin Cussions',
      quantity: 4,
      source_warehouse: 'Semarang',
      destination_warehouse: 'Jakarta',
      date_sent: undefined,
      arrival_date: undefined,
      status: 'Menunggu Dikirim',
    },
    {
      product: 'Skona Sofa',
      quantity: 1,
      source_warehouse: 'Surabaya',
      destination_warehouse: 'Semarang',
      date_sent: '1 Jan 2024',
      arrival_date: '6 Jan 2024',
      status: 'Dikirim',
    },
    {
      product: 'Sharon Sofa',
      quantity: 1,
      source_warehouse: 'Surabaya',
      destination_warehouse: 'Kediri',
      date_sent: '10 Jan 2024',
      arrival_date: undefined,
      status: 'Dikirim',
    },
  ]);
  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div className="font-bold text-xl ">Mutation Stock</div>
            <button
              style={{ cursor: 'pointer' }}
              className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
            >
              Make Request <span className="font-bold">+</span>
            </button>
          </div>
        </div>
        <div className="w-full mt-4 p-4">
          <MutationJournalTable mutation={temporaryMutation} />
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default ManageMutation;
