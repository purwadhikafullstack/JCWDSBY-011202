const MutationJournalTable = ({ mutation }) => {
  console.log(mutation);
  return (
    <div>
      <div className="overflow-x-auto mx-auto">
        <table className="w-full max-w-full overflow-hidden border divide-y divide-gray-200 rounded-md">
          <thead className="bg-orange-50">
            <tr>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Product
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Quantity
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Source
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Destination
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Tanggal Pengiriman
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Tanggal Tiba
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Status
              </th>
              <th className="lg:px-6 lg:py-3 px-3 py-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default MutationJournalTable;
